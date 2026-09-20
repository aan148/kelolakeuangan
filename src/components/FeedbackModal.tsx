import React, { useState, useEffect } from 'react';
import { X, MessageSquare, Send, CheckCircle2, Heart, Sparkles } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [feedbackText, setFeedbackText] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.keyCode === 27) {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown, true);
    }
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFeedbackText('');
      setUserEmail('');
      onClose();
    }, 1500);
  };

  return (
    <div
      id="feedback-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="How to leave feedback"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="feedback-modal-content"
        className="bg-[#FAF7F2] rounded-3xl border border-[#E9DACD] shadow-2xl max-w-md w-full p-6 sm:p-7 relative max-h-[92vh] overflow-y-auto"
      >
        {/* Visible close button with aria-label="Close" */}
        <button
          id="btn-close-feedback"
          data-testid="close-feedback-modal"
          onClick={onClose}
          aria-label="Close"
          title="Close"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#EFE5DB] hover:bg-[#E2D4C8] flex items-center justify-center text-[#5A4940] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#FAF0EC] border border-[#F2D7CE] flex items-center justify-center text-[#9E5D4B]">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif-display text-lg sm:text-xl font-bold text-[#352721] leading-tight">
              How to leave feedback
            </h3>
            <span className="text-[11.5px] text-[#86756B]">Beri Saran & Masukan untuk Aplikasi</span>
          </div>
        </div>

        <p className="text-xs text-[#736359] leading-relaxed mb-4">
          Kami sangat menghargai masukan dan ide dari Anda untuk membuat pencatatan keuangan keluarga semakin mudah dan nyaman digunakan.
        </p>

        {submitted ? (
          <div className="p-4 rounded-2xl bg-[#EFF6F0] border border-[#CCE2D1] text-center space-y-2 py-6 animate-in zoom-in-95">
            <CheckCircle2 className="w-8 h-8 text-[#3B7A4B] mx-auto" />
            <p className="text-sm font-bold text-[#235430]">Terima Kasih!</p>
            <p className="text-xs text-[#437550]">Masukan Anda telah kami terima dengan hangat.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="feedback-email-input" className="block text-xs font-semibold text-[#483B33] mb-1">
                Email Anda (Opsional)
              </label>
              <input
                id="feedback-email-input"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD1C4] text-xs text-[#352721] focus:outline-none focus:border-[#7A5B4C]"
              />
            </div>

            <div>
              <label htmlFor="feedback-textarea-input" className="block text-xs font-semibold text-[#483B33] mb-1">
                Masukan / Saran Fitur
              </label>
              <textarea
                id="feedback-textarea-input"
                required
                rows={4}
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Tuliskan pengalaman, kendala, atau fitur yang ingin ditambahkan..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD1C4] text-xs text-[#352721] focus:outline-none focus:border-[#7A5B4C] resize-none"
              />
            </div>

            <div className="pt-1 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-[#E0D5CA] text-xs text-[#6B5A51] hover:bg-[#F2ECE4] transition-colors"
              >
                Batal (Esc)
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#684D40] hover:bg-[#523C31] text-white text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Masukan</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
