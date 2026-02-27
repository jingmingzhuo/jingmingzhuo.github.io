(function () {
  var themeToggle = document.getElementById("theme-toggle");
  var themeStorageKey = "homepageTheme";
  var mobileNavBreakpoint = 1200;

  function readStoredTheme() {
    try {
      return localStorage.getItem(themeStorageKey);
    } catch (error) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(themeStorageKey, theme);
    } catch (error) {
      // Ignore storage failures.
    }
  }

  function getSystemTheme() {
    if (!window.matchMedia) return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    var nextTheme = theme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", nextTheme);
    if (themeToggle) {
      var label = nextTheme === "dark" ? "Switch to light mode" : "Switch to dark mode";
      themeToggle.setAttribute("aria-label", label);
      themeToggle.setAttribute("title", label);
    }
  }

  var savedTheme = readStoredTheme();
  var hasSavedTheme = savedTheme === "light" || savedTheme === "dark";
  applyTheme(hasSavedTheme ? savedTheme : getSystemTheme());

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var currentTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
      var nextTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      storeTheme(nextTheme);
    });
  }

  if (!hasSavedTheme && window.matchMedia) {
    var themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (themeMediaQuery.addEventListener) {
      themeMediaQuery.addEventListener("change", function (event) {
        applyTheme(event.matches ? "dark" : "light");
      });
    }
  }

  var burger = document.querySelector(".navbar-burger");
  if (!burger) return;

  var targetId = burger.getAttribute("data-target");
  var menu = targetId ? document.getElementById(targetId) : null;
  if (!menu) return;

  function isMobileNavViewport() {
    return window.innerWidth <= mobileNavBreakpoint;
  }

  function closeMenu() {
    burger.classList.remove("is-active");
    menu.classList.remove("is-active");
    burger.setAttribute("aria-expanded", "false");
  }

  function toggleMenu() {
    var shouldOpen = !menu.classList.contains("is-active");
    menu.classList.toggle("is-active", shouldOpen);
    burger.classList.toggle("is-active", shouldOpen);
    burger.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
  }

  burger.addEventListener("click", toggleMenu);

  menu.querySelectorAll("a.navbar-item").forEach(function (link) {
    link.addEventListener("click", function () {
      if (isMobileNavViewport()) {
        closeMenu();
      }
    });
  });

  window.addEventListener("resize", function () {
    if (!isMobileNavViewport()) {
      closeMenu();
    }
  });
})();
