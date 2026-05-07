// Wires click-handler on all .sources-fold blocks on the page,
// toggling the .open class on the fold container.
window.wireSourcesFold = function wireSourcesFold() {
  document.querySelectorAll('.sources-fold-head').forEach(head => {
    if (head.dataset.foldWired === '1') return;
    head.dataset.foldWired = '1';

    head.setAttribute('role', 'button');
    head.setAttribute('tabindex', '0');
    head.setAttribute('aria-expanded', 'false');

    const toggle = () => {
      const fold = head.closest('.sources-fold');
      if (!fold) return;
      fold.classList.toggle('open');
      head.setAttribute('aria-expanded', fold.classList.contains('open') ? 'true' : 'false');
    };

    head.addEventListener('click', toggle);
    head.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
};
