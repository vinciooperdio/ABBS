document.addEventListener('DOMContentLoaded', function() {
  // Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuBackdrop = document.querySelector('.mobile-menu-backdrop');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu .nav-link');
  
  if (menuToggle && mobileMenu && mobileMenuBackdrop) {
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('open');
      mobileMenuBackdrop.classList.toggle('open');
      document.body.classList.toggle('menu-open');
    });
    
    mobileMenuBackdrop.addEventListener('click', function() {
      mobileMenu.classList.remove('open');
      mobileMenuBackdrop.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
    
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        mobileMenuBackdrop.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });
  }
  
  // Scroll Events
  window.addEventListener('scroll', function() {
    const scrollY = window.pageYOffset;
    
    // Navbar background change on scroll
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    
    // Active nav link on scroll
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
    
    // Show back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
      if (scrollY > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    }
    
    // Animate elements on scroll
    animateOnScroll();
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Back to top button
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Timeline animation
  function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('show');
      }, 300 * index);
    });
  }
  
  // FAQ accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  if (faqQuestions.length > 0) {
    faqQuestions.forEach(question => {
      question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const isActive = this.classList.contains('active');
        
        // Close all other answers
        faqQuestions.forEach(q => {
          if (q !== this) {
            q.classList.remove('active');
            q.nextElementSibling.classList.remove('active');
          }
        });
        
        // Toggle current answer
        if (isActive) {
          this.classList.remove('active');
          answer.classList.remove('active');
        } else {
          this.classList.add('active');
          answer.classList.add('active');
        }
      });
    });
  }
  
  // Form validation
  const waitlistForm = document.querySelector('#waitlistForm');
  
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const firstName = document.querySelector('#firstName');
      const lastName = document.querySelector('#lastName');
      const email = document.querySelector('#email');
      const userType = document.querySelector('#userType');
      
      let isValid = true;
      
      // Simple validation
      if (!firstName.value.trim()) {
        showError(firstName, 'First name is required');
        isValid = false;
      } else {
        removeError(firstName);
      }
      
      if (!lastName.value.trim()) {
        showError(lastName, 'Last name is required');
        isValid = false;
      } else {
        removeError(lastName);
      }
      
      if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
      } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
      } else {
        removeError(email);
      }
      
      if (!userType.value) {
        showError(userType, 'Please select your profile');
        isValid = false;
      } else {
        removeError(userType);
      }
      
      if (isValid) {
        // Show success message or modal
        const successModal = document.querySelector('#successModal');
        if (successModal) {
          successModal.classList.add('open');
          setTimeout(() => {
            waitlistForm.reset();
          }, 1000);
        } else {
          alert('Thank you for joining our waitlist!');
          waitlistForm.reset();
        }
      }
    });
  }
  
  // Helper functions
  function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
    
    if (!formGroup.querySelector('.error-message')) {
      errorElement.className = 'error-message text-red-500 text-sm mt-1';
      formGroup.appendChild(errorElement);
    }
    
    input.classList.add('border-red-500');
    errorElement.textContent = message;
  }
  
  function removeError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    input.classList.remove('border-red-500');
    
    if (errorElement) {
      errorElement.textContent = '';
    }
  }
  
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  // Animate elements on scroll using Intersection Observer
  function setupScrollAnimation() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
      observer.observe(element);
    });
  }
  
  function animateOnScroll() {
    // Only run if IntersectionObserver is not supported
    if (!('IntersectionObserver' in window)) {
      const fadeElements = document.querySelectorAll('.fade-in');
      const windowHeight = window.innerHeight;
      
      fadeElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        if (elementPosition < windowHeight - 50) {
          element.classList.add('active');
        }
      });
    }
  }
  
  // Initialize functions
  setupScrollAnimation();
  animateTimeline();
  
  // Gallery modal
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryModal = document.querySelector('#galleryModal');
  
  if (galleryItems.length > 0 && galleryModal) {
    const modalImage = galleryModal.querySelector('.modal-image');
    const modalCaption = galleryModal.querySelector('.modal-caption');
    const modalClose = galleryModal.querySelector('.modal-close');
    
    galleryItems.forEach(item => {
      item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').getAttribute('src');
        const caption = this.querySelector('.gallery-title').textContent;
        
        modalImage.setAttribute('src', imgSrc);
        modalCaption.textContent = caption;
        galleryModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    
    if (modalClose) {
      modalClose.addEventListener('click', function() {
        galleryModal.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
    
    galleryModal.addEventListener('click', function(e) {
      if (e.target === galleryModal) {
        galleryModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
  
  // Success modal close
  const successModal = document.querySelector('#successModal');
  if (successModal) {
    const successModalClose = successModal.querySelector('.modal-close');
    
    if (successModalClose) {
      successModalClose.addEventListener('click', function() {
        successModal.classList.remove('open');
      });
    }
    
    successModal.addEventListener('click', function(e) {
      if (e.target === successModal) {
        successModal.classList.remove('open');
      }
    });
  }
  
  // Countdown timer
  const countdownElement = document.querySelector('#countdown');
  if (countdownElement) {
    // Set launch date - change this to your actual launch date
    const launchDate = new Date('2025-12-31T00:00:00');
    
    function updateCountdown() {
      const now = new Date();
      const distance = launchDate - now;
      
      if (distance < 0) {
        countdownElement.innerHTML = '<span class="text-gradient">We are live!</span>';
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      countdownElement.innerHTML = `
        <div class="countdown-item">
          <span class="countdown-number">${days}</span>
          <span class="countdown-label">Days</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-number">${hours}</span>
          <span class="countdown-label">Hours</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-number">${minutes}</span>
          <span class="countdown-label">Minutes</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-number">${seconds}</span>
          <span class="countdown-label">Seconds</span>
        </div>
      `;
    }
    
    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }
  
  // Parallax effect
  const parallaxElements = document.querySelectorAll('.parallax');
  
  function updateParallax() {
    const scrollY = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-speed') || 0.1;
      const offsetY = scrollY * speed;
      
      element.style.transform = `translateY(${offsetY}px)`;
    });
  }
  
  window.addEventListener('scroll', updateParallax);
});

// Preloader
window.addEventListener('load', function() {
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
}); 