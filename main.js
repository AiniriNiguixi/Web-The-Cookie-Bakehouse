/* =============================================================================
   THE COOKIE BAKEHOUSE — main.js
   IIFE clásico. Sin import/export. Compatible con file:// y con cache busting.
   ============================================================================= */
(function () {
  "use strict";

  var data = window.__BAKEHOUSE__ || {};
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  // ---------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------
  function $(sel, scope) { return (scope || document).querySelector(sel); }
  function $$(sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); }
  function escHTML(s) {
    if (s == null) return "";
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function safe(fn, name) {
    try { fn(); } catch (e) { if (window.console) console.warn("[" + name + "] failed:", e); }
  }

  // ---------------------------------------------------------------------
  // SPLASH — double safety net (CSS animation handles it even if this fails)
  // ---------------------------------------------------------------------
  function initSplash() {
    var splash = $("#splash");
    if (!splash) return;
    var hide = function () { splash.classList.add("splash-done"); };
    // Hide a bit before the CSS animation would (snappier perceived load),
    // but never blocks: CSS keeps going regardless.
    setTimeout(hide, 2200);
    window.addEventListener("load", function () { setTimeout(hide, 300); });
  }

  // ---------------------------------------------------------------------
  // NAV — scroll state + mobile burger + anchor smooth scroll
  // ---------------------------------------------------------------------
  function initNav() {
    var nav = $("#nav");
    var burger = $("#navBurger");
    var mobile = $("#navMobile");
    if (nav) {
      var onScroll = function () {
        if (window.scrollY > 12) nav.classList.add("is-scrolled");
        else nav.classList.remove("is-scrolled");
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
    if (burger && mobile) {
      burger.addEventListener("click", function () {
        var open = mobile.classList.toggle("is-open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
      });
      $$("a", mobile).forEach(function (a) {
        a.addEventListener("click", function () {
          mobile.classList.remove("is-open");
          burger.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  function initAnchorScroll() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var navH = 84;
      var top = el.getBoundingClientRect().top + window.scrollY - navH + 1;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  }

  // ---------------------------------------------------------------------
  // CUSTOM CURSOR — hidden until first mousemove (avoids 0,0 flash)
  // ---------------------------------------------------------------------
  function initCursor() {
    if (!fineHover) return;
    var cursor = $("#cursor");
    var ring = $("#cursorRing");
    var dot = $("#cursorDot");
    var label = $("#cursorLabel");
    if (!cursor || !ring || !dot) return;

    var firstMove = false;
    var mx = 0, my = 0;
    var lastMx = 0, lastMy = 0;
    var offsetX = 0, offsetY = 0;
    var targetOffsetX = 0, targetOffsetY = 0;
    var rafId = null;

    function updateDotPosition() {
      offsetX += (targetOffsetX - offsetX) * 0.22;
      offsetY += (targetOffsetY - offsetY) * 0.22;
      dot.style.transform = "translate(calc(-50% + " + offsetX.toFixed(2) + "px), calc(-50% + " + offsetY.toFixed(2) + "px))";
      rafId = null;
    }

    window.addEventListener("mousemove", function (e) {
      lastMx = mx; lastMy = my;
      mx = e.clientX; my = e.clientY;
      
      ring.style.transform = "translate3d(" + mx + "px," + my + "px,0)";
      
      // Calculate velocity-based offset for the dot and smooth it for fluid motion
      var velX = (mx - lastMx) * 2.8;
      var velY = (my - lastMy) * 2.8;
      
      // Clamp offset to keep the movement visible but controlled
      targetOffsetX = Math.max(-60, Math.min(60, velX));
      targetOffsetY = Math.max(-60, Math.min(60, velY));

      if (!rafId) {
        rafId = window.requestAnimationFrame(updateDotPosition);
      }
      
      if (!firstMove) {
        firstMove = true;
        cursor.classList.add("is-ready");
      }
    });

    var hoverables = $$("[data-cursor]");
    hoverables.forEach(function (el) {
      var text = el.getAttribute("data-cursor") || "";
      el.addEventListener("mouseover", function (e) {
        if (el.contains(e.relatedTarget)) return;
        cursor.classList.add("is-active");
        if (label) label.textContent = text;
      });
      el.addEventListener("mouseout", function (e) {
        if (el.contains(e.relatedTarget)) return;
        cursor.classList.remove("is-active");
      });
    });
  }

  // ---------------------------------------------------------------------
  // REVEAL — IntersectionObserver, threshold low + 6s safety timeout
  // ---------------------------------------------------------------------
  function initReveals() {
    var els = $$(".reveal");
    if (!els.length) return;

    if (typeof IntersectionObserver === "undefined") {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -40px 0px" });

    els.forEach(function (el) { io.observe(el); });

    // Safety net: reveal everything still hidden after 6s regardless of JS state
    setTimeout(function () {
      $$(".reveal:not(.is-visible)").forEach(function (el) {
        el.classList.add("is-visible");
      });
    }, 6000);
  }

  // ---------------------------------------------------------------------
  // SPLIT TEXT — preserves <br> and inline <em>, adds aria-label
  // ---------------------------------------------------------------------
  function wrapWords(text) {
    return text.split(/(\s+)/).map(function (w) {
      if (/^\s+$/.test(w)) return w;
      return '<span class="split-word" aria-hidden="true">' + escHTML(w) + "</span>";
    }).join("");
  }

  function splitWords(el) {
    if (el.dataset.splitBound) return;
    el.dataset.splitBound = "1";
    el.setAttribute("aria-label", el.textContent.trim().replace(/\s+/g, " "));
    var html = Array.prototype.map.call(el.childNodes, function (node) {
      if (node.nodeType === 3) return wrapWords(node.textContent);
      if (node.nodeName === "BR") return "<br>";
      if (node.nodeType === 1) {
        var tag = node.tagName.toLowerCase();
        return "<" + tag + ">" + wrapWords(node.textContent) + "</" + tag + ">";
      }
      return "";
    }).join("");
    el.innerHTML = html;
  }

  function initSplitText() {
    $$("[data-split]").forEach(function (el) {
      safe(function () { splitWords(el); }, "splitWords:" + (el.className || ""));
      if (el.classList.contains("reveal")) {
        // Defensive: ensure split elements are visible even without GSAP
        el.classList.add("is-visible");
      }
    });
  }

  // ---------------------------------------------------------------------
  // HERO TITLE WORD-BY-WORD ENTRANCE (CSS-driven via GSAP if available)
  // ---------------------------------------------------------------------
  function initHeroEntrance() {
    if (!window.gsap) return;
    var words = $$(".hero-title .split-word");
    if (!words.length) return;
    gsap.set(words, { opacity: 0, y: 28 });
    gsap.to(words, {
      opacity: 1, y: 0,
      duration: 0.9,
      ease: "expo.out",
      stagger: 0.045,
      delay: reduced ? 0.1 : 2.3
    });
  }

  // ---------------------------------------------------------------------
  // CARTA — pinned horizontal scroll (desktop) + traced SVG on enter
  // ---------------------------------------------------------------------
  function initCartaTrace() {
    var cards = $$("[data-cookie-card]");
    if (!cards.length) return;

    if (typeof IntersectionObserver === "undefined") {
      cards.forEach(function (c) { c.classList.add("is-traced"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-traced");
        }
      });
    }, { threshold: 0.05, root: null, rootMargin: "0px 0px -10% 0px" });

    cards.forEach(function (c) { io.observe(c); });

    setTimeout(function () {
      cards.forEach(function (c) { c.classList.add("is-traced"); });
    }, 6000);
  }

  function initCartaProgress() {
    var wrap = $("#cartaTrackWrap");
    var track = $("#cartaTrack");
    var counter = $("#cartaProgressCurrent");
    var cards = $$("[data-cookie-card]");
    if (!wrap || !track || !cards.length) return;

    function updateFromScrollLeft(scrollLeft, viewportWidth) {
      var center = scrollLeft + viewportWidth / 2;
      var closestIdx = 0;
      var closestDist = Infinity;
      cards.forEach(function (card, i) {
        var cardCenter = card.offsetLeft + card.offsetWidth / 2;
        var dist = Math.abs(cardCenter - center);
        if (dist < closestDist) { closestDist = dist; closestIdx = i; }
      });
      if (counter) counter.textContent = String(closestIdx + 1).padStart(2, "0");
    }

    // Mobile / fallback: native horizontal scroll drives the counter
    wrap.addEventListener("scroll", function () {
      updateFromScrollLeft(wrap.scrollLeft, wrap.clientWidth);
    }, { passive: true });

    // Desktop: GSAP ScrollTrigger pin + horizontal scrub
    if (window.gsap && window.ScrollTrigger && window.innerWidth >= 960) {
      try {
        gsap.registerPlugin(ScrollTrigger);
        var maxScroll = track.scrollWidth - wrap.clientWidth;
        if (maxScroll > 0) {
          var st = ScrollTrigger.create({
            trigger: wrap,
            start: "top top+=84",
            end: function () { return "+=" + maxScroll; },
            pin: true,
            pinSpacing: true,
            scrub: 0.4,
            onUpdate: function (self) {
              var sl = self.progress * maxScroll;
              wrap.scrollLeft = sl;
              updateFromScrollLeft(sl, wrap.clientWidth);
            }
          });
          window.addEventListener("resize", function () {
            if (window.innerWidth < 960) {
              st.kill();
              wrap.style.removeProperty("transform");
            } else {
              ScrollTrigger.refresh();
            }
          });
        }
      } catch (e) {
        if (window.console) console.warn("[initCartaProgress] ScrollTrigger pin failed, falling back to native scroll:", e);
      }
    }

    updateFromScrollLeft(0, wrap.clientWidth);
  }

  // ---------------------------------------------------------------------
  // TILT — subtle 3D tilt on cookie cards and step cards (desktop only)
  // ---------------------------------------------------------------------
  function initTilt() {
    if (!fineHover) return;
    var targets = $$(".cookie-card, .testimonial-card, .how-step");
    targets.forEach(function (el) {
      if (el.dataset.tiltBound) return;
      el.dataset.tiltBound = "1";
      var rect;
      el.addEventListener("mouseover", function (e) {
        if (el.contains(e.relatedTarget)) return;
        rect = el.getBoundingClientRect();
      });
      el.addEventListener("mousemove", function (e) {
        if (!rect) rect = el.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width - 0.5;
        var py = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = "translateY(-6px) rotateX(" + (-py * 5) + "deg) rotateY(" + (px * 5) + "deg)";
      });
      el.addEventListener("mouseout", function (e) {
        if (el.contains(e.relatedTarget)) return;
        el.style.transform = "";
      });
    });
  }

  // ---------------------------------------------------------------------
  // ORDER FORM — builds a formatted WhatsApp message on submit
  // ---------------------------------------------------------------------
  function buildWhatsAppMessage(values) {
    var lines = [];
    lines.push("Hola The Cookie Bakehouse! Quiero hacer un pedido:");
    lines.push("");
    lines.push("Nombre: " + values.name);
    lines.push("Teléfono: " + values.phone);
    lines.push("Caja: " + values.box);
    if (values.flavors) lines.push("Sabores: " + values.flavors);
    if (values.note) lines.push("Nota: " + values.note);
    return lines.join("\n");
  }

  function initOrderForm() {
    var form = $("#orderForm");
    var altLink = $("#orderAltLink");
    if (!form) return;

    var waNumber = (data.brand && data.brand.whatsapp) ? data.brand.whatsapp.replace(/[^\d]/g, "") : "34600112233";

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var values = {
        name: ($("#ofName", form) || {}).value || "",
        phone: ($("#ofPhone", form) || {}).value || "",
        box: ($("#ofBox", form) || {}).value || "",
        flavors: ($("#ofFlavors", form) || {}).value || "",
        note: ($("#ofNote", form) || {}).value || ""
      };

      var msg = buildWhatsAppMessage(values);
      var url = "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(msg);
      window.open(url, "_blank", "noopener");
    });

    if (altLink && data.brand && data.brand.whatsappLink) {
      altLink.setAttribute("href", data.brand.whatsappLink);
    }
  }

  // ---------------------------------------------------------------------
  // CONTACT LINKS FROM MANIFEST — enrich hrefs without touching hardcoded text
  // ---------------------------------------------------------------------
  function applyManifestLinks() {
    if (!data.brand) return;
    var b = data.brand;
    $$('a[href^="https://wa.me/"]').forEach(function (a) {
      if (b.whatsappLink) a.setAttribute("href", b.whatsappLink);
    });
    $$('a[href^="https://instagram.com/"]').forEach(function (a) {
      if (b.instagramUrl) a.setAttribute("href", b.instagramUrl);
    });
    $$('a[href^="mailto:"]').forEach(function (a) {
      if (b.email) a.setAttribute("href", "mailto:" + b.email);
    });
  }

  // ---------------------------------------------------------------------
  // BOOT
  // ---------------------------------------------------------------------
  function boot() {
    safe(initSplash, "initSplash");
    safe(initNav, "initNav");
    safe(initAnchorScroll, "initAnchorScroll");
    safe(initCursor, "initCursor");
    safe(applyManifestLinks, "applyManifestLinks");
    safe(initSplitText, "initSplitText");
    safe(initReveals, "initReveals");
    safe(initCartaTrace, "initCartaTrace");
    safe(initTilt, "initTilt");
    safe(initOrderForm, "initOrderForm");

    if (window.gsap) {
      safe(initHeroEntrance, "initHeroEntrance");
    }
    // initCartaProgress needs layout to be settled; defer slightly
    setTimeout(function () { safe(initCartaProgress, "initCartaProgress"); }, 60);

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
