// One-time onboarding ping on the page toggle: pulses around the inactive tab
// for ~4 seconds so the user notices the second page exists.
// Triggered after intro popup is dismissed (or on first load if intro skipped).
(function () {
  const KEY = 'gbv-toggle-pinged';
  const INTRO_KEY = 'gbv-intro-seen';

  function safeGet(key) {
    try { if (localStorage.getItem(key)) return true; } catch (_) {}
    try { if (sessionStorage.getItem(key)) return true; } catch (_) {}
    return false;
  }
  function safeSet(key) {
    try { localStorage.setItem(key, '1'); return; } catch (_) {}
    try { sessionStorage.setItem(key, '1'); return; } catch (_) {}
  }

  function ping() {
    if (safeGet(KEY)) return;
    const toggle = $('#pageToggle');
    if (!toggle) return;
    // Honour reduced-motion: skip the animated pulse entirely. The mark-as-seen
    // still fires so we don't try again on next visit.
    const prefersReduced = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    safeSet(KEY);
    if (prefersReduced) return;
    toggle.classList.add('is-pinging');
    setTimeout(() => toggle.classList.remove('is-pinging'), 5200);
  }

  function init() {
    const introVisible = !!document.querySelector('.intro-overlay');
    const introAlreadySeen = safeGet(INTRO_KEY);

    if (introAlreadySeen && !introVisible) {
      // Intro was dismissed in a previous session — ping right away
      setTimeout(ping, 600);
      return;
    }
    if (!introVisible) {
      // No intro for some reason — still ping
      setTimeout(ping, 600);
      return;
    }
    // Intro is open: wait for it to dismiss, then ping after a short beat.
    const observer = new MutationObserver(() => {
      if (!document.querySelector('.intro-overlay')) {
        observer.disconnect();
        setTimeout(ping, 500);
      }
    });
    observer.observe(document.body, { childList: true, subtree: false });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
