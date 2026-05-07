// Sticky table-of-contents scroll-spy.
// Highlights the active section in a TOC nav as the user scrolls,
// and updates a progress bar.
//
// Usage: initScrollSpy({
//   tocSelector: '#mainTOC a[data-target]',
//   sectionSelector: 'section[data-toc-id]',
//   progressBarSelector: '#mainTOCProgress'
// });
window.initScrollSpy = function initScrollSpy(opts) {
  const tocLinks = document.querySelectorAll(opts.tocSelector);
  const sections = document.querySelectorAll(opts.sectionSelector);
  const progressBar = opts.progressBarSelector ? document.querySelector(opts.progressBarSelector) : null;

  if (!tocLinks.length || !sections.length) return;

  // Map section id → toc link
  const linkBySectionId = {};
  tocLinks.forEach(link => {
    const target = link.getAttribute('data-target');
    if (target) linkBySectionId[target] = link;
  });

  // Smooth scroll on click
  tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('data-target');
      const section = document.querySelector(`[data-toc-id="${target}"]`);
      if (section) {
        e.preventDefault();
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // IntersectionObserver — top 20% of viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('data-toc-id');
        // Clear current
        tocLinks.forEach(l => l.classList.remove('toc-cur'));
        // Mark new
        if (linkBySectionId[id]) linkBySectionId[id].classList.add('toc-cur');
      }
    });
  }, { rootMargin: '-20% 0px -75% 0px' });

  sections.forEach(s => observer.observe(s));

  // Progress bar
  if (progressBar) {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
      progressBar.style.width = pct + '%';
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
  }
};
