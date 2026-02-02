document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const navlinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");
  const toggleBtn = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-links");

  // Scroll to section function
  window.scrollToSection = function(id) {
    document.getElementById(id).scrollIntoView({
      behavior: "smooth"
    });
  };

  // Shrink navbar on scroll
  window.addEventListener("scroll", function() {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Active link on scroll
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        navlinks.forEach(function(link) {
          link.classList.remove("active");
        });

        const activeLink = document.querySelector(
          '.nav-link[href="#' + entry.target.id + '"]'
        );

        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }, { threshold: 0.6 });

  sections.forEach(section => observer.observe(section));

  /* Mobile menu toggle */
  toggleBtn.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });

  // Typing Effect
  const words = ["Developer", "Designer", "Problem Solver", "UI Specialist"];
  let i = 0;
  let j = 0;
  let current = "";
  let isDeleting = false;
  const typingEl = document.getElementById("typing");

  function typeEffect() {
    if (!isDeleting && j <= words[i].length) {
      current = words[i].substring(0, j++);
    } else if (isDeleting && j >= 0) {
      current = words[i].substring(0, j--);
    }

    typingEl.textContent = current;

    if (j === words[i].length) isDeleting = true;
    if (j === 0 && isDeleting) {
      isDeleting = false;
      i = (i + 1) % words.length;
    }

    setTimeout(typeEffect, isDeleting ? 80 : 120);
  }

  typeEffect();

  // ===== Scroll Reveal Animation =====
  const reveals = document.querySelectorAll(".about, .skills-section, .project-card, .contact");
  reveals.forEach(function(element) {
    element.classList.add("reveal");
  });

  const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => revealObserver.observe(el));

  // ===== Skill Counter Animation =====
  function animateSkills() {
    const skillElements = document.querySelectorAll(".skill-percent");
    
    skillElements.forEach(function(skillElement) {
      const target = parseInt(skillElement.getAttribute("data-skill"));
      let count = 0;
      
      // Clear any existing interval
      if (skillElement.intervalId) {
        clearInterval(skillElement.intervalId);
      }
      
      skillElement.intervalId = setInterval(function() {
        if (count >= target) {
          clearInterval(skillElement.intervalId);
          // Ensure final value is exactly the target
          skillElement.textContent = target + "%";
        } else {
          count++;
          skillElement.textContent = count + "%";
        }
      }, 25); // Adjust speed here (lower = faster)
    });
  }

  // Observe skills section for animation
  const skillsSection = document.querySelector(".skills-section");
  let hasAnimated = false;

  const skillsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting && !hasAnimated) {
        animateSkills();
        hasAnimated = true;
      }
    });
  }, { threshold: 0.4 });

  skillsObserver.observe(skillsSection);
});