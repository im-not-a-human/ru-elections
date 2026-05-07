// Telegram-style spoiler — click the cover to reveal the content underneath.
// A11y: cover is a real <button> with aria-expanded/aria-controls; on reveal the
// inner content gets aria-hidden="false" and the cover removes itself from tab order.
(function () {
  function init() {
    $$('.spoiler[data-spoiler]').forEach((el) => {
      const cover = el.querySelector('.spoiler-cover');
      const content = el.querySelector('.spoiler-content');
      if (!cover) return;

      const reveal = () => {
        el.classList.add('is-revealed');
        cover.setAttribute('aria-expanded', 'true');
        if (content) {
          content.setAttribute('aria-hidden', 'false');
          // Make the revealed content focusable so screen-reader users
          // know the disclosure opened. Tab from here goes to the next
          // natural focusable in DOM.
          if (!content.hasAttribute('tabindex')) content.setAttribute('tabindex', '-1');
          content.focus({ preventScroll: true });
        }
        // After fade-out completes, fully isolate cover from a11y tree.
        setTimeout(() => {
          cover.setAttribute('hidden', '');
          cover.setAttribute('inert', '');
          cover.setAttribute('aria-hidden', 'true');
        }, 500);
      };

      cover.addEventListener('click', reveal);
      // Native <button> handles Enter/Space on keydown automatically.
    });
  }
  window.initSpoilers = init;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
