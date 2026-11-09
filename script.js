(function () {
  "use strict";

  const menuToggle = document.getElementById("menuToggle");
  const primaryNav = document.getElementById("primaryNav");
  const backdrop = document.getElementById("navBackdrop");
  const dropdownToggles = document.querySelectorAll(".nav__toggle");
  const chevronImgs = {
    down: "./images/icon-arrow-down.svg",
    up: "./images/icon-arrow-up.svg"
  };

  function openMenu() {
    primaryNav.classList.add("is-open");
    backdrop.hidden = false;
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");
    menuToggle.querySelector("img").src = "./images/icon-close-menu.svg";
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    primaryNav.classList.remove("is-open");
    backdrop.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    menuToggle.querySelector("img").src = "./images/icon-menu.svg";
    document.body.style.overflow = "";
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      if (primaryNav.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (backdrop) {
    backdrop.addEventListener("click", closeMenu);
  }

  dropdownToggles.forEach(function (toggle) {
    const menuId = toggle.getAttribute("aria-controls");
    const menu = document.getElementById(menuId);
    const chevron = toggle.querySelector(".chevron");

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = toggle.getAttribute("aria-expanded") === "true";

      // close other dropdowns
      dropdownToggles.forEach(function (other) {
        if (other !== toggle) {
          other.setAttribute("aria-expanded", "false");
          const otherMenu = document.getElementById(other.getAttribute("aria-controls"));
          if (otherMenu) otherMenu.hidden = true;
          const otherChevron = other.querySelector(".chevron");
          if (otherChevron) otherChevron.src = chevronImgs.down;
        }
      });

      toggle.setAttribute("aria-expanded", String(!isOpen));
      if (menu) menu.hidden = isOpen;
      if (chevron) chevron.src = isOpen ? chevronImgs.down : chevronImgs.up;
    });
  });

  // close dropdowns when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".has-dropdown")) {
      dropdownToggles.forEach(function (toggle) {
        toggle.setAttribute("aria-expanded", "false");
        const menu = document.getElementById(toggle.getAttribute("aria-controls"));
        if (menu) menu.hidden = true;
        const chevron = toggle.querySelector(".chevron");
        if (chevron) chevron.src = chevronImgs.down;
      });
    }
  });

  // close on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      dropdownToggles.forEach(function (toggle) {
        toggle.setAttribute("aria-expanded", "false");
        const menu = document.getElementById(toggle.getAttribute("aria-controls"));
        if (menu) menu.hidden = true;
        const chevron = toggle.querySelector(".chevron");
        if (chevron) chevron.src = chevronImgs.down;
      });
      if (primaryNav.classList.contains("is-open")) closeMenu();
    }
  });

  // close mobile menu when a nav link is clicked
  primaryNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.matchMedia("(max-width: 899px)").matches) {
        closeMenu();
      }
    });
  });

  // close mobile menu when resizing to desktop
  window.addEventListener("resize", function () {
    if (window.matchMedia("(min-width: 900px)").matches && primaryNav.classList.contains("is-open")) {
      closeMenu();
    }
  });
})();
