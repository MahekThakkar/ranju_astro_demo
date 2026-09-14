(function () {
  "use strict";

  // ---------- Footer year ----------
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Navbar scroll state ----------
  var nav = document.getElementById("siteNav");
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Close mobile nav after clicking a link
  var navMenu = document.getElementById("navMenu");
  if (navMenu) {
    navMenu.querySelectorAll(".nav-link, .btn-book").forEach(function (link) {
      link.addEventListener("click", function () {
        var collapse = bootstrap.Collapse.getInstance(navMenu);
        if (collapse && navMenu.classList.contains("show")) collapse.hide();
      });
    });
  }

  // ---------- Build the birth-chart wheel (12 houses) ----------
  var SIGN_GLYPHS = ["\u2648", "\u2649", "\u264A", "\u264B", "\u264C", "\u264D", "\u264E", "\u264F", "\u2650", "\u2651", "\u2652", "\u2653"];
  var cx = 240, cy = 240;

  function polar(r, angleDeg) {
    var rad = (angleDeg - 90) * (Math.PI / 180);
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  var spokesGroup = document.querySelector(".spokes");
  var ticksGroup = document.querySelector(".ticks");
  var glyphsGroup = document.querySelector(".glyphs");

  if (spokesGroup && ticksGroup && glyphsGroup) {
    var svgNS = "http://www.w3.org/2000/svg";

    for (var i = 0; i < 12; i++) {
      var angle = i * 30;

      // spoke line from inner ring to outer ring
      var pInner = polar(60, angle);
      var pOuter = polar(200, angle);
      var line = document.createElementNS(svgNS, "line");
      line.setAttribute("x1", pInner.x.toFixed(1));
      line.setAttribute("y1", pInner.y.toFixed(1));
      line.setAttribute("x2", pOuter.x.toFixed(1));
      line.setAttribute("y2", pOuter.y.toFixed(1));
      line.setAttribute("stroke", "currentColor");
      line.setAttribute("stroke-width", "0.75");
      line.setAttribute("opacity", "0.35");
      spokesGroup.appendChild(line);

      // small tick marks on the outer ring at 15deg offsets
      var tickAngle = angle + 15;
      var t1 = polar(196, tickAngle);
      var t2 = polar(204, tickAngle);
      var tick = document.createElementNS(svgNS, "line");
      tick.setAttribute("x1", t1.x.toFixed(1));
      tick.setAttribute("y1", t1.y.toFixed(1));
      tick.setAttribute("x2", t2.x.toFixed(1));
      tick.setAttribute("y2", t2.y.toFixed(1));
      tick.setAttribute("stroke", "currentColor");
      tick.setAttribute("stroke-width", "1");
      tick.setAttribute("opacity", "0.5");
      ticksGroup.appendChild(tick);
    }

    // glyphs sit in the mid ring, counter to the wheel's own rotation container
    // (placed outside .wheel-spin so they stay upright)
    for (var g = 0; g < 12; g++) {
      var glyphAngle = g * 30 + 15;
      var pos = polar(172, glyphAngle);
      var text = document.createElementNS(svgNS, "text");
      text.setAttribute("x", pos.x.toFixed(1));
      text.setAttribute("y", pos.y.toFixed(1));
      // U+FE0E forces the monochrome "text" glyph instead of a colour emoji
      // rendering on platforms that have both (keeps the wheel on-palette).
      text.textContent = SIGN_GLYPHS[g] + "\uFE0E";
      glyphsGroup.appendChild(text);
    }
  }

  // ---------- Booking form (client-side only demo) ----------
  // var form = document.getElementById("bookingForm");
  // var statusEl = document.getElementById("formStatus");

  // if (form) {
  //   form.addEventListener("submit", function (event) {
  //     event.preventDefault();
  //     event.stopPropagation();

  //     if (!form.checkValidity()) {
  //       form.classList.add("was-validated");
  //       if (statusEl) statusEl.textContent = "";
  //       return;
  //     }

  //     form.classList.add("was-validated");
  //     if (statusEl) {
  //       statusEl.textContent = "Thank you — your request has been noted. Ranju's team will confirm shortly.";
  //     }
  //     form.reset();
  //     form.classList.remove("was-validated");
  //   });
  // }
})();
