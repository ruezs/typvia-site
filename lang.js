// Shows the page in one language: the one picked before, else the browser's.
(function () {
  var KEY = "typvia.site.lang";

  function initial() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "zh" || q === "en") return q;
    try {
      var saved = localStorage.getItem(KEY);
      if (saved === "zh" || saved === "en") return saved;
    } catch (e) {}
    return /^zh/i.test(navigator.language || "") ? "zh" : "en";
  }

  function apply(lang) {
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : "en";
    document.querySelectorAll("[data-l]").forEach(function (el) {
      el.classList.toggle("show", el.getAttribute("data-l") === lang);
    });
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.value === lang));
    });
    var title = document.querySelector('meta[name="title-' + lang + '"]');
    if (title) document.title = title.content;
  }

  document.addEventListener("DOMContentLoaded", function () {
    apply(initial());
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.addEventListener("click", function () {
        try { localStorage.setItem(KEY, b.value); } catch (e) {}
        apply(b.value);
      });
    });
  });
})();
