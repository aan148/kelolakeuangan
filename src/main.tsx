import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global early Escape key interceptor for any DOM dialogs, feedback overlays, or modal popups
if (typeof window !== 'undefined') {
  window.addEventListener(
    'keydown',
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.keyCode === 27) {
        // Trigger click on any close button
        const closeBtns = document.querySelectorAll<HTMLElement>(
          'button[aria-label="Close"], button[aria-label="close"], button[aria-label*="Close" i], button[aria-label*="Tutup" i], button.close, [data-dismiss="modal"]'
        );
        closeBtns.forEach((btn) => {
          try {
            btn.click();
          } catch {
            // ignore
          }
        });

        // Hide any modal overlay containing feedback or dialog
        const modalElements = document.querySelectorAll<HTMLElement>(
          'dialog[open], [role="dialog"], [aria-modal="true"], [id*="feedback"], [class*="feedback"], [class*="simplecommenter"]'
        );
        modalElements.forEach((el) => {
          try {
            if (el.innerText && el.innerText.toLowerCase().includes('feedback')) {
              const b = el.querySelector<HTMLElement>('button');
              if (b) b.click();
            }
          } catch {
            // ignore
          }
        });
      }
    },
    true
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

