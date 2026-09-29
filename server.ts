import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Accept larger base64 image payloads
  app.use(express.json({ limit: "15mb" }));

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  // Health check API
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // AI OCR Scan Receipt API
  app.post("/api/scan-receipt", async (req, res) => {
    try {
      const { imageBase64, mimeType } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ error: "Foto atau gambar struk tidak ditemukan." });
      }

      // Clean base64 prefix if present
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z+]+;base64,/, "");
      const validMime = mimeType || "image/jpeg";

      const prompt = `Anda adalah asisten keuangan keluarga cerdas spesialis membaca struk dan nota belanja (OCR & receipt analysis).
Tugas Anda:
1. Baca foto struk/nota belanja ini secara seksama.
2. Temukan nama merchant/toko (contoh: Indomaret, Alfamart, Superindo, SPBU Pertamina, Toko Sayur, dll).
3. Temukan tanggal transaksi jika ada (format YYYY-MM-DD, jika tahun tidak tertera gunakan tahun 2026).
4. Temukan total nominal akhir pembayaran (total belanja) dalam angka murni tanpa koma/titik/Rp.
5. Klasifikasikan ke dalam salah satu kategori pengeluaran keluarga berikut:
   - "Belanja Dapur" (jika makanan pokok, sayur, minimarket mingguan)
   - "Makanan & Belanja" (jika resto, cafe, jajan)
   - "Transportasi & Bensin" (jika SPBU, parkir, tol)
   - "Listrik & Utilitas" (jika token listrik, air, pulsa)
   - "Kesehatan & Obat" (jika apotek, klinik)
   - "Pendidikan Anak" (jika toko buku, perlengkapan sekolah)
   - "Lain-lain"
6. Buat daftar item barang belanja yang dibeli beserta harganya jika terbaca.
7. Buat deskripsi atau catatan singkat yang ramah keluarga.

Jika foto struk agak buram atau terpotong, berikan hasil tebakan terbaik dan beri tahu di kolom notes.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: validMime,
            },
          },
          { text: prompt },
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              merchantName: {
                type: Type.STRING,
                description: "Nama toko atau tempat belanja",
              },
              date: {
                type: Type.STRING,
                description: "Tanggal struk dalam format YYYY-MM-DD",
              },
              totalAmount: {
                type: Type.NUMBER,
                description: "Total nominal pembayaran dalam angka murni (contoh: 125000)",
              },
              category: {
                type: Type.STRING,
                description: "Kategori pengeluaran keluarga yang paling tepat",
              },
              items: {
                type: Type.ARRAY,
                description: "Daftar barang belanja yang terbaca pada struk",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING, description: "Nama item barang" },
                    price: { type: Type.NUMBER, description: "Harga per item atau subtotal" },
                    quantity: { type: Type.NUMBER, description: "Jumlah unit barang" },
                  },
                  required: ["name"],
                },
              },
              notes: {
                type: Type.STRING,
                description: "Catatan pembacaan struk atau tips penghematan",
              },
              confidence: {
                type: Type.STRING,
                description: "Tingkat kejelasan struk: 'tinggi', 'sedang', atau 'perlu_dicek'",
              },
            },
            required: ["merchantName", "totalAmount", "category"],
          },
        },
      });

      const rawText = response.text || "{}";
      const parsedData = JSON.parse(rawText);

      return res.json({
        success: true,
        data: parsedData,
      });
    } catch (error: any) {
      console.error("Error scanning receipt:", error);
      return res.status(500).json({
        error: error.message || "Gagal memproses struk belanja. Pastikan foto cukup jelas dan coba lagi.",
      });
    }
  });

  // Serve public assets (manifest.json, sw.js, icons)
  app.use(express.static(path.join(process.cwd(), "public")));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
