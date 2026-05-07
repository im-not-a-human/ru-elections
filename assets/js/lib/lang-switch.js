// Language switcher — floating pill, sits left of the feedback FAB.
// Persists user choice in localStorage and redirects on next visit if pref differs from current page lang.
// Same file is loaded by both RU and EN pages; reads document.documentElement.lang to know which language.
(function () {
  const LS_KEY = 'lang-pref';
  const currentLang = (document.documentElement.lang || 'ru').slice(0, 2);

  function siblingPath() {
    const path = window.location.pathname;
    if (/\/en\//.test(path)) return path.replace('/en/', '/');
    if (path.endsWith('/')) return path + 'en/';
    return path.replace(/(\/)([^\/]+\.html)$/, '$1en/$2');
  }

  function siblingUrl() {
    return window.location.origin + siblingPath() + window.location.search + window.location.hash;
  }

  function applyRedirect() {
    let pref;
    try { pref = localStorage.getItem(LS_KEY); } catch (_) { return false; }
    if (!pref || pref === currentLang) return false;
    window.location.replace(siblingUrl());
    return true;
  }

  function injectFab() {
    if (document.querySelector('.lang-fab')) return;

    const otherUrl = window.location.origin + siblingPath();

    const wrap = document.createElement('div');
    wrap.className = 'lang-fab';
    wrap.setAttribute('role', 'group');
    wrap.setAttribute('aria-label', currentLang === 'en' ? 'Language' : 'Язык');

    const langs = [
      { code: 'ru', label: 'RU' },
      { code: 'en', label: 'EN' },
    ];

    langs.forEach(({ code, label }) => {
      const a = document.createElement('a');
      a.textContent = label;
      a.dataset.lang = code;
      const isCurrent = code === currentLang;
      if (isCurrent) {
        a.className = 'is-current';
        a.setAttribute('aria-current', 'true');
        a.href = window.location.pathname + window.location.search + window.location.hash;
        a.addEventListener('click', (e) => e.preventDefault());
      } else {
        a.href = otherUrl;
      }
      a.addEventListener('click', () => {
        try { localStorage.setItem(LS_KEY, code); } catch (_) {}
      });
      wrap.appendChild(a);
    });

    document.body.appendChild(wrap);
  }

  function init() {
    if (applyRedirect()) return;
    injectFab();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
