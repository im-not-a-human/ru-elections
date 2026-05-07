// Generic modal controller. Looks up #modalOverlay / #modal / #modalClose.
// Pages can populate #modalContent and call openModal().
// A11y: focus moves into modal on open, restored on close. Tab is trapped.
(function () {
  let previousFocus = null;

  function focusableIn(modal) {
    return Array.from(modal.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )).filter(el => el.offsetParent !== null);
  }

  function trapTab(e) {
    if (e.key !== 'Tab') return;
    const modal = $('#modal');
    if (!modal) return;
    const focusables = focusableIn(modal);
    if (!focusables.length) return;
    const first = focusables[0], last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      last.focus(); e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === last) {
      first.focus(); e.preventDefault();
    }
  }

  // Mark background as inert/hidden from assistive tech while modal is open.
  function setBackgroundInert(on) {
    ['nav.topnav', 'main', 'footer'].forEach((sel) => {
      const el = $(sel);
      if (!el) return;
      if (on) { el.setAttribute('inert', ''); el.setAttribute('aria-hidden', 'true'); }
      else { el.removeAttribute('inert'); el.removeAttribute('aria-hidden'); }
    });
  }

  window.openModal = function openModal() {
    const overlay = $('#modalOverlay');
    const modal = $('#modal');
    if (!overlay || !modal) return;
    previousFocus = document.activeElement;
    overlay.removeAttribute('hidden');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    modal.scrollTo(0, 0);
    setBackgroundInert(true);
    // Focus the close button (or first focusable)
    const closeBtn = $('#modalClose');
    setTimeout(() => (closeBtn || focusableIn(modal)[0])?.focus(), 50);
    document.addEventListener('keydown', trapTab);
  };

  window.closeModal = function closeModal() {
    const overlay = $('#modalOverlay');
    if (!overlay) return;
    overlay.classList.remove('active');
    overlay.setAttribute('hidden', '');
    document.body.style.overflow = '';
    setBackgroundInert(false);
    document.removeEventListener('keydown', trapTab);
    if (previousFocus && typeof previousFocus.focus === 'function') {
      previousFocus.focus();
    }
    previousFocus = null;
  };

  document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = $('#modalClose');
    const overlay = $('#modalOverlay');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target.id === 'modalOverlay') closeModal();
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  });
})();
