/**
 * Raghav Soni - Portfolio Website Scripts
 * Vanilla JavaScript implementation for interactive UI, navigation, modals, and contact form.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Navigation & Mobile Menu Toggle
  // --------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle mobile navigation drawer
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          hamburger.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 2. Sticky Navbar & Active Section Highlighting (Scroll-spy)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  const handleScrollEffects = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header background blur effect on scroll
    if (navbar) {
      if (scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'auto';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.pointerEvents = 'none';
      }
    }

    // Scroll-spy active link detection across all sections
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (correspondingLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          correspondingLink.classList.add('active');
        } else {
          correspondingLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', handleScrollEffects, { passive: true });
  handleScrollEffects(); // Trigger once on load

  // Smooth scroll for Back to Top button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.style.transition = 'opacity 0.3s ease, background-color 0.2s ease, transform 0.2s ease';
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. Project Details Dynamic Modal (Clean Placeholders)
  // --------------------------------------------------------------------------
  const projectModal = document.getElementById('project-modal');
  const projModalTitle = document.getElementById('proj-modal-title');
  const projModalSubtitle = document.getElementById('proj-modal-subtitle');
  const projModalBody = document.getElementById('proj-modal-body');
  const projModalClose = document.getElementById('proj-modal-close');
  const projModalDone = document.getElementById('proj-modal-done');
  const demoTriggers = document.querySelectorAll('.project-demo-trigger');

  const projectDetailsMap = {
    'Java Project (In Preparation)': {
      title: 'Java Project (In Preparation)',
      status: '⚡ Coming Soon',
      statusColor: '#2563EB',
      category: 'Java Programming Workspace',
      description: 'This card is reserved for Raghav Soni\'s upcoming Java application. As Java concepts (OOP, classes, methods, and logic) are learned and practiced, actual project details and repository links will be placed here.',
      highlights: [
        'Planned to demonstrate core Object-Oriented Programming (OOP) concepts.',
        'Focus on writing modular, well-structured Java code.',
        'Will include interactive console input/output or management logic.',
        'You can replace this card anytime in index.html once your project is built.'
      ],
      techStack: 'Java, Object-Oriented Programming (OOP)'
    },
    'Web Development Project (In Preparation)': {
      title: 'Web Development Project (In Preparation)',
      status: '⚡ Coming Soon',
      statusColor: '#2563EB',
      category: 'Web Development Workspace',
      description: 'This card is reserved for Raghav Soni\'s upcoming responsive web project. Designed to showcase semantic HTML structure and CSS styling layouts.',
      highlights: [
        'Built with clean, semantic HTML5 tags and modern CSS3 styling.',
        'Responsive layout designed to look great across mobile and desktop devices.',
        'Focus on generous spacing, typography, and clean design principles.',
        'Ready to be linked with a live demo and GitHub repository once developed.'
      ],
      techStack: 'HTML, CSS, Responsive Layout'
    },
    'DSA Practice Repository': {
      title: 'DSA Practice Repository',
      status: '⚡ Coming Soon',
      statusColor: '#2563EB',
      category: 'Planned Milestone',
      description: 'Planned repository to practice and organize Data Structures and Algorithms in Java as the next step in Raghav Soni\'s learning journey.',
      highlights: [
        'Planned to explore fundamental data structures (Arrays, Strings, Linked Lists).',
        'Focus on understanding algorithm efficiency and time/space complexity.',
        'Documenting step-by-step problem-solving approaches in Java.',
        'Will be initiated after establishing a strong core in Java programming.'
      ],
      techStack: 'Java, Data Structures & Algorithms (Planned)'
    }
  };

  const openProjectModal = (projKey) => {
    const data = projectDetailsMap[projKey];
    if (!data || !projectModal) return;

    projModalTitle.innerHTML = data.title;
    projModalSubtitle.innerHTML = `<span style="color: ${data.statusColor}; font-weight: 600; margin-right: 0.5rem;">${data.status}</span> &bull; ${data.category}`;

    let highlightsHtml = '';
    data.highlights.forEach(h => {
      highlightsHtml += `<li>${h}</li>`;
    });

    projModalBody.innerHTML = `
      <div class="resume-preview-section">
        <h4>Overview</h4>
        <p>${data.description}</p>
      </div>
      <div class="resume-preview-section">
        <h4>Planned Focus</h4>
        <ul>${highlightsHtml}</ul>
      </div>
      <div class="resume-preview-section">
        <h4>Technologies</h4>
        <p><code style="color: var(--accent-blue); background-color: var(--accent-blue-bg); border: 1px solid var(--accent-blue-border); padding: 0.2rem 0.5rem; border-radius: 4px; font-family: var(--font-mono);">${data.techStack}</code></p>
      </div>
    `;

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    if (projectModal) {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  demoTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projTitle = btn.getAttribute('data-title');
      openProjectModal(projTitle);
    });
  });

  if (projModalClose) projModalClose.addEventListener('click', closeProjectModal);
  if (projModalDone) projModalDone.addEventListener('click', closeProjectModal);

  if (projectModal) {
    const backdrop = projectModal.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', closeProjectModal);
    }
  }

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
    }
  });

  // --------------------------------------------------------------------------
  // 4. Contact Form Validation & Submission
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('submit-btn');
  const formSpinner = document.getElementById('form-spinner');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  if (nameInput) {
    nameInput.addEventListener('input', () => {
      nameInput.classList.remove('error');
      if (nameError) nameError.textContent = '';
    });
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      emailInput.classList.remove('error');
      if (emailError) emailError.textContent = '';
    });
  }

  if (messageInput) {
    messageInput.addEventListener('input', () => {
      messageInput.classList.remove('error');
      if (messageError) messageError.textContent = '';
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let hasError = false;

      // Validate Name
      const nameVal = nameInput ? nameInput.value.trim() : '';
      if (!nameVal) {
        hasError = true;
        nameInput.classList.add('error');
        if (nameError) nameError.textContent = 'Please enter your name.';
      } else if (nameVal.length < 2) {
        hasError = true;
        nameInput.classList.add('error');
        if (nameError) nameError.textContent = 'Name must be at least 2 characters.';
      }

      // Validate Email
      const emailVal = emailInput ? emailInput.value.trim() : '';
      if (!emailVal) {
        hasError = true;
        emailInput.classList.add('error');
        if (emailError) emailError.textContent = 'Please enter your email address.';
      } else if (!isValidEmail(emailVal)) {
        hasError = true;
        emailInput.classList.add('error');
        if (emailError) emailError.textContent = 'Please enter a valid email address.';
      }

      // Validate Message
      const messageVal = messageInput ? messageInput.value.trim() : '';
      if (!messageVal) {
        hasError = true;
        messageInput.classList.add('error');
        if (messageError) messageError.textContent = 'Please enter your message.';
      } else if (messageVal.length < 10) {
        hasError = true;
        messageInput.classList.add('error');
        if (messageError) messageError.textContent = 'Message must be at least 10 characters long.';
      }

      if (hasError) {
        return;
      }

      // Show loading spinner
      if (submitBtn && formSpinner) {
        submitBtn.disabled = true;
        formSpinner.style.display = 'inline-block';
      }

      setTimeout(() => {
        if (submitBtn && formSpinner) {
          submitBtn.disabled = false;
          formSpinner.style.display = 'none';
        }

        showToast(`Thank you, ${nameVal}! Your message has been sent to Raghav Soni.`);
        contactForm.reset();
      }, 700);
    });
  }

  // --------------------------------------------------------------------------
  // 5. Toast Notification Handler
  // --------------------------------------------------------------------------
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  let toastTimeout;

  function showToast(message) {
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  // --------------------------------------------------------------------------
  // 6. Scroll Reveal Animations (Intersection Observer)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll(
    '.about-card-main, .about-side-cards, .skill-category-card, .certification-card, .achievement-card, .project-card, .timeline-item, .contact-info-card, .contact-form-card'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

});
