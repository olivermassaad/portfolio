"use strict";

// Mobile nav toggle
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (!toggle || !menu) return;
  var links = menu.querySelectorAll("a");
  var activeLink = menu.querySelector("a.active") || links[0];

  function moveNavPill(target) {
    if (!target) return;
    // Disabled on mobile where menu turns into full-width list
    if (window.matchMedia("(max-width: 640px)").matches) return;
    var menuRect = menu.getBoundingClientRect();
    var targetRect = target.getBoundingClientRect();
    menu.style.setProperty("--nav-pill-x", targetRect.left - menuRect.left + "px");
    menu.style.setProperty("--nav-pill-w", targetRect.width + "px");
  }

  if (activeLink) {
    moveNavPill(activeLink);
  }

  toggle.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });

  // Close menu when a link is clicked (for in-page nav on mobile)
  links.forEach(function (link) {
    link.addEventListener("mouseenter", function () {
      moveNavPill(link);
    });

    link.addEventListener("focus", function () {
      moveNavPill(link);
    });

    link.addEventListener("click", function () {
      activeLink = link;
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  menu.addEventListener("mouseleave", function () {
    moveNavPill(activeLink);
  });

  window.addEventListener("resize", function () {
    moveNavPill(activeLink);
  });
})();

// Copy email button (only on contact page)
(function () {
  var btn = document.getElementById("emailbutton");
  if (!btn) return;

  btn.addEventListener("click", function () {
    navigator.clipboard.writeText("olimasad@gmail.com").then(
      function () {
        var label = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(function () {
          btn.textContent = label;
        }, 2000);
      }
    );
  });
})();

// Smooth reveal-on-load + on-scroll interactions
(function () {
  var revealObserver = null;

  function setupPageReveals() {
    var revealTargets = document.querySelectorAll(
      ".hero-flat, .page-header, .section, .card, .contact-block, .form-section, .fact-card, .mini-card, .experience-card, .achievement-banner"
    );
    if (!revealTargets.length) return;

    if (revealObserver) {
      revealObserver.disconnect();
    }

    // Reset state first so animations replay whenever a new page loads.
    revealTargets.forEach(function (el, index) {
      el.classList.remove("reveal", "in-view");
      el.style.setProperty("--reveal-delay", Math.min(index * 55, 320) + "ms");
    });

    // Two-frame setup:
    // 1) add hidden reveal state
    // 2) start observing so entering-view transition always has a pre-state
    window.requestAnimationFrame(function () {
      revealTargets.forEach(function (el) {
        el.classList.add("reveal");
      });

      window.requestAnimationFrame(function () {
        revealObserver = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                revealObserver.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.12 }
        );

        revealTargets.forEach(function (el) {
          revealObserver.observe(el);
        });
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupPageReveals, { once: true });
  } else {
    setupPageReveals();
  }

  // Also retrigger when a page is restored from cache.
  window.addEventListener("pageshow", function () {
    setupPageReveals();
  });
})();

// Pointer-reactive soft highlight on cards and sections
(function () {
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var interactiveEls = document.querySelectorAll(
    ".section, .card, .skill-group, .contact-block, .fact-card, .mini-card, .experience-card, .chip"
  );
  if (!interactiveEls.length) return;

  interactiveEls.forEach(function (el) {
    if (prefersReducedMotion) {
      return;
    }

    el.addEventListener("mousemove", function (event) {
      var rect = el.getBoundingClientRect();
      var x = ((event.clientX - rect.left) / rect.width) * 100;
      var y = ((event.clientY - rect.top) / rect.height) * 100;
      var dx = (x - 50) / 50;
      var dy = (y - 50) / 50;
      el.style.setProperty("--mx", x + "%");
      el.style.setProperty("--my", y + "%");
      el.style.setProperty("--ry", (dx * 3).toFixed(2) + "deg");
      el.style.setProperty("--rx", (-dy * 3).toFixed(2) + "deg");
    });

    el.addEventListener("mouseleave", function () {
      el.style.setProperty("--mx", "-20%");
      el.style.setProperty("--my", "-20%");
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    });
  });
})();

// Subtle scroll parallax for hero block
(function () {
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  var hero = document.querySelector(".hero-flat");
  if (!hero) return;

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      var y = Math.min(window.scrollY, 500);
      hero.style.setProperty("--hero-parallax", y * -0.02 + "px");
      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// Animate long paragraphs word-by-word on scroll (About Me)
(function () {
  var longParagraphs = document.querySelectorAll(".long-animate");
  if (!longParagraphs.length) return;

  longParagraphs.forEach(function (paragraph) {
    var text = paragraph.textContent.trim();
    if (!text) return;

    var words = text.split(/\s+/);
    paragraph.textContent = "";

    words.forEach(function (word, index) {
      var span = document.createElement("span");
      span.className = "long-word";
      span.textContent = word;
      span.style.setProperty("--d", index * 24 + "ms");
      paragraph.appendChild(span);

      if (index !== words.length - 1) {
        paragraph.appendChild(document.createTextNode(" "));
      }
    });
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("play");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.35 }
  );

  longParagraphs.forEach(function (paragraph) {
    observer.observe(paragraph);
  });
})();
