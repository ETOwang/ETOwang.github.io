(function(){
  var storageKey = 'theme';
  var classNameDark = 'dark';
  var d = document.documentElement;

  // Apply on load (in case this file is loaded early)
  function applyTheme(theme){
    if (theme === 'dark') d.classList.add(classNameDark);
    else d.classList.remove(classNameDark);
  }

  // Init preference if none: follow system
  function getPreferredTheme(){
    var stored = localStorage.getItem(storageKey);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  applyTheme(getPreferredTheme());

  // Sync with system
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e){
      var stored = localStorage.getItem(storageKey);
      if (stored !== 'light' && stored !== 'dark') {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // Toggle button handler
  function updateToggleState(btn, theme){
    if (!btn) return;
    btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    var sun = btn.querySelector('.icon-sun');
    var moon = btn.querySelector('.icon-moon');
    if (sun && moon){
      if (theme === 'dark') { sun.style.display = 'none'; moon.style.display = 'inline-block'; }
      else { sun.style.display = 'inline-block'; moon.style.display = 'none'; }
    }
  }

  function attach(){
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    // initial state
    updateToggleState(btn, getPreferredTheme());
    btn.addEventListener('click', function(){
      var current = getPreferredTheme();
      var next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem(storageKey, next);
      applyTheme(next);
      updateToggleState(btn, next);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', attach);
  else attach();
})();
