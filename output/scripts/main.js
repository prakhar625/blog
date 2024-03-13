// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      target.scrollIntoView({
        behavior: "smooth",
      });
    });
  });
});

// Toggle mobile navigation menu
// const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
// const mobileMenu = document.querySelector(".mobile-menu");

// mobileMenuToggle.addEventListener("click", function () {
//   mobileMenu.classList.toggle("active");
// });

// Close mobile menu when a link is clicked
// const mobileNavLinks = document.querySelectorAll(".mobile-menu a");

// mobileNavLinks.forEach(function (link) {
//   link.addEventListener("click", function () {
//     mobileMenu.classList.remove("active");
//   });
// });

// Highlight active navigation link
const currentPath = window.location.pathname;
const currentPageLink = document.querySelector(`nav a[href="${currentPath}"]`);

if (currentPageLink) {
  currentPageLink.classList.add("active");
}

// Accordian interaction
document.addEventListener("DOMContentLoaded", function () {
  const details = document.querySelectorAll("details");

  details.forEach(function (detail) {
    detail.addEventListener("toggle", function () {
      if (this.open) {
        this.classList.add("open");
      } else {
        this.classList.remove("open");
      }
    });
  });
});
