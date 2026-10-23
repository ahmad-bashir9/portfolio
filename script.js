/* Ahmad Bashir - portfolio. Minimal progressive enhancement:
   current year, a hairline on the header once scrolled, and
   active-section highlighting in the nav. No dependencies. */
(function () {
  "use strict";

  // Current year in the footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Show the header's bottom hairline only after scrolling past the hero top
  var header = document.getElementById("site-header");
  if (header) {
    var onScroll = function () {
      header.setAttribute("data-scrolled", window.scrollY > 8 ? "true" : "false");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Highlight the nav link for the section currently in view
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__links a[href^="#"]'));
  var byId = {};
  links.forEach(function (a) {
    byId[a.getAttribute("href").slice(1)] = a;
  });

  var sections = links
    .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
    .filter(Boolean);

  var setCurrent = function (id) {
    links.forEach(function (a) { a.removeAttribute("aria-current"); });
    if (id && byId[id]) byId[id].setAttribute("aria-current", "true");
  };

  if ("IntersectionObserver" in window && sections.length) {
    var visible = {};
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        visible[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
      });
      // Pick the most-visible observed section
      var bestId = null, best = 0;
      sections.forEach(function (s) {
        var v = visible[s.id] || 0;
        if (v > best) { best = v; bestId = s.id; }
      });
      setCurrent(bestId);
    }, { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] });

    sections.forEach(function (s) { observer.observe(s); });
  }
})();
