// GSAP Entrance Animations
window.addEventListener('DOMContentLoaded', () => {
    gsap.to('.hero-title', { opacity: 1, y: -20, duration: 1.2, ease: 'power3.out' });
    gsap.to('.hero-subtitle', { opacity: 1, y: -10, duration: 1.2, delay: 0.3, ease: 'power3.out' });
    gsap.from('.card', { opacity: 0, y: 30, duration: 0.8, delay: 0.6, stagger: 0.2, ease: 'power2.out' });
});

const head = document.getElementById('head');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) { // If scrolled more than 50px down
      head.classList.add('scrolled');
    } else {
      head.classList.remove('scrolled');
    }
  });

var typed = new Typed('#typed', {
  strings: ['Engineering Student', 'Author', 'Independent Researcher', 'Freelancer'],
  typeSpeed: 50,    // Speed of typing
  backSpeed: 30,    // Speed of deleting/backspacing
  loop: true   ,    // Loop the animation infinitely
  showCursor: false,
  cursorChar: '|',
  autoInsertCss: false
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
  root: null,
  // Triggers when a section crosses the upper-middle area of the screen
  rootMargin: '-30% 0px -50% 0px', 
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');

      // Remove .active class from all nav links
      navLinks.forEach(link => link.classList.remove('active'));

      // Add .active class to matching href
      const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}, observerOptions);

// Start observing each section
sections.forEach(section => observer.observe(section));

window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');

  setTimeout(() => {
    preloader.classList.add('hidden');

    // Run GSAP entrance animations once preloader is gone
    gsap.to('.hero-title', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
    gsap.to('.hero-subtitle', { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'power3.out' });
  }, 1743);
});

// Select all your cards
const cards = document.querySelectorAll(".leftabout .container .card");

cards.forEach(card => {
  // When the mouse enters the card zone
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      scale: 1.05,
      zIndex: 10,
      overwrite: "auto", // Prevents conflict if scroll animation is still playing
      duration: 0.25,
      ease: "power1.out"
    });
  });

  // When the mouse leaves the card zone
  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      scale: 1,
      zIndex: 1,
      overwrite: "auto",
      duration: 0.25,
      ease: "power1.out"
    });
  });
});

const canvas = document.getElementById('starfield-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Track scroll movement
let lastScrollY = window.scrollY;
let scrollVelocity = 0;

// Resize canvas dynamically on window resize
window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  initStars();
});

// Update scroll delta on page scroll
window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  scrollVelocity = currentScrollY - lastScrollY;
  lastScrollY = currentScrollY;
});

// Configuration & Star Generation
const STAR_COUNT = 150;
let stars = [];

function initStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    // Random depth layer (0.1 = far background, 1.0 = foreground)
    const z = Math.random(); 
    
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height * 2 - height * 0.5, // Allow stars to spawn off-screen
      radius: z * 1.8 + 0.5,                       // Foreground stars are larger
      z: z,                                        // Depth layer coefficient
      opacity: Math.random() * 0.5 + 0.4,          // Random opacity
      blur: z > 0.75 ? 0 : (1 - z) * 3             // Stars close (z > 0.75) are focused (0 blur)
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, width, height);

  // Smoothly damp scroll velocity back to zero when scrolling stops
  scrollVelocity *= 0.9;

  stars.forEach(star => {
    // Parallax Shift: Far stars (low z) move slow, near stars (high z) move fast
    star.y -= scrollVelocity * star.z * 0.4;

    // Wrap-around boundaries so stars continuously flow as you scroll
    if (star.y < -20) star.y = height + 20;
    if (star.y > height + 20) star.y = -20;

    ctx.save();
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

    // Apply blur depth effect
    if (star.blur > 0) {
      ctx.filter = `blur(${star.blur}px)`;
    } else {
      ctx.filter = 'none';
    }

    // Glowing star color matching purple/pink themes
    ctx.fillStyle = `rgba(240, 235, 255, ${star.opacity})`;
    
    // Extra glow effect for focused foreground stars
    if (star.z > 0.8) {
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(168, 85, 247, 0.8)';
    }

    ctx.fill();
    ctx.restore();
  });

  requestAnimationFrame(drawStars);
}

initStars();
drawStars();


		  
var items = document.querySelectorAll(".experience li");

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function callbackFunc() {
  for (var i = 0; i < items.length; i++) {
    if (isElementInViewport(items[i])) {
      if(!items[i].classList.contains("in-view")){
        items[i].classList.add("in-view");
      }
    } else if(items[i].classList.contains("in-view")) {
        items[i].classList.remove("in-view");
    }
  }
}
 
window.addEventListener("load", callbackFunc);
window.addEventListener("scroll", callbackFunc);

document.addEventListener('DOMContentLoaded', () => {
  const storeCards = document.querySelectorAll('.store-card:not(.upcoming)');

  storeCards.forEach(card => {
    const formatButtons = card.querySelectorAll('.format-btn');
    const priceDisplay = card.querySelector('.price-amount');
    const buyLink = card.querySelector('.buy-btn');

    formatButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active button style
        formatButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update price and buy link
        const newPrice = btn.getAttribute('data-price');
        const newLink = btn.getAttribute('data-link');

        priceDisplay.textContent = newPrice;
        buyLink.setAttribute('href', newLink);
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const statusText = document.getElementById('form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'json'
        }
      });

      if (response.ok) {
        statusText.style.color = '#4ade80'; // Success green
        statusText.textContent = 'Message sent successfully! I will get back to you soon.';
        form.reset();
      } else {
        statusText.style.color = '#f87171'; // Error red
        statusText.textContent = 'Oops! There was a problem submitting your form.';
      }
    } catch (error) {
      statusText.style.color = '#f87171';
      statusText.textContent = 'Network error. Please try again later.';
    } finally {
      submitBtn.textContent = 'Send Message ➔';
      submitBtn.disabled = false;
    }
  });
});