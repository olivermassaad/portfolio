"use strict";

// Temporarily disable all pointer interactions until initial animations complete.
(function () {
  var root = document.documentElement;
  var unlockTimer = null;
  var INTERACTION_BUFFER_MS = 0.01;
  var interactionLockSelectors = ".section, .card, .contact-block, .form-section, .fact-card, .mini-card, .experience-card, .achievement-banner, .award-mini, .timeline-card, .chip, .skill-cloud span";

  function getRevealIntroDurationMs() {
    var revealTargets = document.querySelectorAll(interactionLockSelectors);
    if (!revealTargets.length) return 0;

    var maxRevealDelay = Math.min((revealTargets.length - 1) * 45, 560);
    var revealTransitionMs = 560;
    return maxRevealDelay + revealTransitionMs;
  }

  function getHeroIntroDurationMs() {
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return 0;

    var hero = document.querySelector(".hero-flat");
    if (!hero) return 0;

    var introItems = hero.querySelectorAll(".intro-item");
    if (!introItems.length) return 0;

    var elapsed = 130;
    introItems.forEach(function (_, index) {
      elapsed += index === introItems.length - 2 ? 210 : 140;
    });

    var heroCompleteDelay = 120;
    var settleTransitionMs = 720;
    return elapsed + heroCompleteDelay + settleTransitionMs;
  }

  function scheduleInteractionUnlock() {
    root.classList.add("ui-locked");

    if (unlockTimer) {
      window.clearTimeout(unlockTimer);
    }

    var totalDuration = Math.max(getRevealIntroDurationMs(), getHeroIntroDurationMs());
    unlockTimer = window.setTimeout(function () {
      root.classList.remove("ui-locked");
    }, Math.max(1, totalDuration + INTERACTION_BUFFER_MS));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleInteractionUnlock, { once: true });
  } else {
    scheduleInteractionUnlock();
  }

  // Ensure lock/release also works when returning from bfcache.
  window.addEventListener("pageshow", function () {
    scheduleInteractionUnlock();
  });
})();

// Mobile nav toggle
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (!toggle || !menu) return;
  var body = document.body;
  var links = menu.querySelectorAll("a");
  var activeLink = menu.querySelector("a.active") || links[0];
  var mobileQuery = window.matchMedia("(max-width: 640px)");

  function setMenuState(open) {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    if (body) {
      body.classList.toggle("mobile-nav-open", open);
    }
  }

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
    var open = !menu.classList.contains("open");
    setMenuState(open);
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
      setMenuState(false);
    });
  });

  menu.addEventListener("mouseleave", function () {
    moveNavPill(activeLink);
  });

  window.addEventListener("resize", function () {
    moveNavPill(activeLink);
    if (!mobileQuery.matches) {
      setMenuState(false);
    }
  });

  document.addEventListener("click", function (event) {
    if (!menu.classList.contains("open")) return;
    if (!mobileQuery.matches) return;
    if (menu.contains(event.target) || toggle.contains(event.target)) return;
    setMenuState(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    if (!menu.classList.contains("open")) return;
    setMenuState(false);
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
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var REVEAL_TRANSITION_MS = 560;
  var INTERACTION_BUFFER_MS = 0.01;
  var revealLockSelectors = ".section, .card, .contact-block, .form-section, .fact-card, .mini-card, .experience-card, .achievement-banner, .award-mini, .timeline-card, .chip, .skill-cloud span";

  function parseDelayMs(value) {
    if (!value) return 0;
    var numeric = parseFloat(String(value).replace("ms", "").trim());
    return Number.isFinite(numeric) ? numeric : 0;
  }

  function getMaxNestedRevealDelayMs(container) {
    if (!container || !container.querySelectorAll) return 0;
    var maxDelay = 0;
    var nestedRevealEls = container.querySelectorAll(".reveal");
    nestedRevealEls.forEach(function (el) {
      var delay = parseDelayMs(el.style.getPropertyValue("--reveal-delay"));
      if (delay > maxDelay) {
        maxDelay = delay;
      }
    });
    return maxDelay;
  }

  function setupPageReveals() {
    var revealTargets = document.querySelectorAll(revealLockSelectors);
    if (!revealTargets.length) return;

    if (revealObserver) {
      revealObserver.disconnect();
    }

    // Reset state first so animations replay whenever a new page loads.
    revealTargets.forEach(function (el, index) {
      el.classList.remove("reveal", "in-view");
      el.classList.add("reveal-lock");
      // Keep stagger subtle so cards animate almost immediately on entry.
      el.style.setProperty("--reveal-delay", Math.min(index * 16, 120) + "ms");
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
                if (prefersReducedMotion) {
                  entry.target.classList.remove("reveal-lock");
                } else {
                  // Keep parent blocks locked until nested staggered reveals are done too.
                  var nestedDelay = getMaxNestedRevealDelayMs(entry.target);
                  var unlockDelay = REVEAL_TRANSITION_MS + nestedDelay + INTERACTION_BUFFER_MS;
                  window.setTimeout(function () {
                    entry.target.classList.remove("reveal-lock");
                  }, unlockDelay);
                }
                revealObserver.unobserve(entry.target);
              }
            });
          },
          // Trigger sooner as elements begin entering the viewport.
          { threshold: 0.02, rootMargin: "0px 0px -4% 0px" }
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

// Hero intro choreography (home page)
(function () {
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hero = document.querySelector(".hero-flat");
  if (!hero) return;

  function finishInstantly(items) {
    items.forEach(function (item) {
      item.classList.add("intro-in");
    });
    hero.classList.add("hero-complete");
  }

  function runHeroIntro() {
    var introItems = hero.querySelectorAll(".intro-item");
    if (!introItems.length) return;

    hero.classList.remove("hero-complete");
    introItems.forEach(function (item) {
      item.classList.remove("intro-in");
    });

    if (prefersReducedMotion) {
      finishInstantly(introItems);
      return;
    }

    var elapsed = 130;
    introItems.forEach(function (item, index) {
      window.setTimeout(function () {
        item.classList.add("intro-in");
      }, elapsed);

      elapsed += index === introItems.length - 2 ? 210 : 140;
    });

    window.setTimeout(function () {
      hero.classList.add("hero-complete");
    }, elapsed + 120);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runHeroIntro, { once: true });
  } else {
    runHeroIntro();
  }

  // Trigger again when restoring from bfcache.
  window.addEventListener("pageshow", function () {
    runHeroIntro();
  });
})();

// Modern custom cursor (desktop only)
(function () {
  var root = document.documentElement;
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (prefersReducedMotion || coarsePointer) return;

  // Hide native cursor as soon as this script executes.
  root.classList.add("modern-cursor-enabled");

  function initModernCursor() {
    var body = document.body;
    if (!body) return;

    var blur = document.createElement("div");
    blur.className = "cursor-blur";
    body.appendChild(blur);

    var mouseX = window.innerWidth / 2;
    var mouseY = window.innerHeight / 2;
    var blurX = mouseX;
    var blurY = mouseY;
    var rafId = null;
    var idleTimer = null;

    function setActiveCursorState() {
      body.classList.add("cursor-active");
      if (idleTimer) {
        window.clearTimeout(idleTimer);
      }
      idleTimer = window.setTimeout(function () {
        body.classList.remove("cursor-active");
      }, 1600);
    }

    function render() {
      blurX += (mouseX - blurX) * 0.2;
      blurY += (mouseY - blurY) * 0.2;

      blur.style.left = blurX + "px";
      blur.style.top = blurY + "px";
      rafId = window.requestAnimationFrame(render);
    }

    function startRenderLoop() {
      if (rafId) return;
      rafId = window.requestAnimationFrame(render);
    }

    function stopRenderLoop() {
      if (!rafId) return;
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }

    window.addEventListener("mousemove", function (event) {
      mouseX = event.clientX;
      mouseY = event.clientY;
      setActiveCursorState();
      startRenderLoop();
    }, { passive: true });

    window.addEventListener("mouseleave", function () {
      body.classList.remove("cursor-active");
      stopRenderLoop();
    });

    window.addEventListener("blur", function () {
      body.classList.remove("cursor-active");
    });

    window.addEventListener("pageshow", function () {
      startRenderLoop();
    });

    startRenderLoop();
  }

  if (document.readyState === "loading" && !document.body) {
    document.addEventListener("DOMContentLoaded", initModernCursor, { once: true });
  } else {
    initModernCursor();
  }
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
  var autoAnimateTargets = document.querySelectorAll(
    ".page-header p, .card p, .card .meta, .contact-block h2, .form-section h2, .achievement-banner"
  );
  autoAnimateTargets.forEach(function (el) {
    el.classList.add("long-animate");
  });

  var longParagraphs = document.querySelectorAll(".long-animate");
  if (!longParagraphs.length) return;

  longParagraphs.forEach(function (paragraph) {
    if (paragraph.dataset.longAnimated === "1") return;
    // Preserve structured markup (e.g., links/forms) by only animating plain-text nodes.
    if (paragraph.children.length > 0) return;

    var text = paragraph.textContent.trim();
    if (!text) return;

    var words = text.split(/\s+/);
    paragraph.textContent = "";
    paragraph.dataset.longAnimated = "1";

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

// Dedicated on-scroll fade-in for achievements and projects cards
(function () {
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var cards = document.querySelectorAll(".achievement-track .achievement-card, .projects-gallery .project-item");
  if (!cards.length) return;

  if (prefersReducedMotion) {
    return;
  }

  cards.forEach(function (card) {
    card.classList.remove("ach-fade", "in");
    card.classList.add("ach-fade");
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -6% 0px" }
  );

  cards.forEach(function (card) {
    observer.observe(card);
  });
})();
