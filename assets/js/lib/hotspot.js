// Shared hotspot click/keyboard handler for SVG-based interactive viz.
// On activation: shows a floating popover anchored near the clicked
// element (preferred placement: right of element; falls back to left,
// below, or above based on viewport space). Esc / outside-click /
// close button dismiss.
//
// Components emit elements like:
//   <g class="hs" tabindex="0" role="button"
//      aria-label="..." data-hotspot-id="x"
//      data-hotspot-title="..." data-hotspot-body="...">
//     <title>tooltip text</title>
//     ...visible shapes
//   </g>
//
// data-hotspot-body may contain HTML (trusted authored content).
//
// No external deps. Vanilla JS only.

(function() {
  function escHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Singleton popover element appended to <body>.
  var popover = null;
  var activeHotspot = null;

  function ensurePopover() {
    if (popover) return popover;
    popover = document.createElement('aside');
    popover.className = 'hotspot-pop';
    popover.setAttribute('role', 'dialog');
    popover.setAttribute('aria-modal', 'false');
    popover.setAttribute('aria-live', 'polite');
    popover.hidden = true;
    popover.innerHTML =
      '<button class="hp-close" type="button" aria-label="Закрыть">×</button>' +
      '<div class="hp-title"></div>' +
      '<div class="hp-body"></div>';
    document.body.appendChild(popover);
    popover.querySelector('.hp-close').addEventListener('click', hidePopover);
    return popover;
  }

  function placePopover(panel, anchor) {
    // Make panel visible (off-screen) so we can measure.
    panel.style.visibility = 'hidden';
    panel.style.left = '0px';
    panel.style.top = '0px';
    panel.hidden = false;

    var rect = anchor.getBoundingClientRect();
    var pw = panel.offsetWidth;
    var ph = panel.offsetHeight;
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var margin = 12;
    var x, y;

    // Try placement: right of anchor first.
    if (rect.right + margin + pw + 16 <= vw) {
      x = rect.right + margin;
      y = clamp(rect.top, 16, vh - ph - 16);
    }
    // Else left.
    else if (rect.left - margin - pw - 16 >= 0) {
      x = rect.left - margin - pw;
      y = clamp(rect.top, 16, vh - ph - 16);
    }
    // Else below.
    else if (rect.bottom + margin + ph + 16 <= vh) {
      x = clamp(rect.left, 16, vw - pw - 16);
      y = rect.bottom + margin;
    }
    // Else above.
    else if (rect.top - margin - ph - 16 >= 0) {
      x = clamp(rect.left, 16, vw - pw - 16);
      y = rect.top - margin - ph;
    }
    // Fallback: centre on viewport.
    else {
      x = (vw - pw) / 2;
      y = (vh - ph) / 2;
    }

    panel.style.left = x + 'px';
    panel.style.top = y + 'px';
    panel.style.visibility = '';
  }

  function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
  }

  function showPopover(anchor, title, body) {
    var panel = ensurePopover();
    panel.querySelector('.hp-title').innerHTML = title || '';
    panel.querySelector('.hp-body').innerHTML = body || '';
    panel.classList.add('is-open');
    placePopover(panel, anchor);
  }

  function hidePopover() {
    if (!popover) return;
    popover.classList.remove('is-open');
    popover.hidden = true;
    if (activeHotspot && activeHotspot.classList) {
      activeHotspot.classList.remove('is-active');
    }
    activeHotspot = null;
  }

  function activateHotspot(el) {
    var title = el.dataset.hotspotTitle || el.getAttribute('aria-label') || '';
    var body = el.dataset.hotspotBody || '';
    showPopover(el, escHtml(title), body);

    // Mark active across all root containers.
    document.querySelectorAll('.hs.is-active').forEach(function(n) {
      n.classList.remove('is-active');
    });
    el.classList.add('is-active');
    activeHotspot = el;
  }

  function init(rootEl) {
    if (!rootEl || rootEl._hotspotInit) return;
    rootEl._hotspotInit = true;

    rootEl.addEventListener('click', function(e) {
      var hs = e.target.closest('.hs');
      if (!hs) return;
      e.preventDefault();
      e.stopPropagation();
      activateHotspot(hs);
    });

    rootEl.addEventListener('keydown', function(e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var hs = e.target.closest('.hs');
      if (!hs) return;
      e.preventDefault();
      activateHotspot(hs);
    });
  }

  // Global Esc + outside-click close
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && popover && popover.classList.contains('is-open')) {
      hidePopover();
    }
  });
  document.addEventListener('click', function(e) {
    if (!popover || !popover.classList.contains('is-open')) return;
    // Click inside popover — keep open
    if (popover.contains(e.target)) return;
    // Click on a hotspot — handled by hotspot rootEl listener which re-shows
    if (e.target.closest('.hs')) return;
    hidePopover();
  });
  // Reposition on scroll/resize while open
  window.addEventListener('scroll', function() {
    if (popover && popover.classList.contains('is-open') && activeHotspot) {
      placePopover(popover, activeHotspot);
    }
  }, { passive: true });
  window.addEventListener('resize', function() {
    if (popover && popover.classList.contains('is-open') && activeHotspot) {
      placePopover(popover, activeHotspot);
    }
  });

  window.initHotspots = init;
})();
