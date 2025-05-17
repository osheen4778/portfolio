document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky navbar on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // Project card animation on scroll
    const projectCards = document.querySelectorAll('.project-card');
    
    const animateOnScroll = function() {
        projectCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Animate when scrolling
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});



const roles = [
  "Backend Developer",
  "Full-Stack Developer",
  "MERN Stack Developer"
];

const typingSpeed = 100;   // milliseconds per character
const pauseTime = 2000;    // 2 seconds pause between roles

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedRole = document.getElementById("typed-role");

function typeEffect() {
  const currentRole = roles[roleIndex];
  if (!isDeleting) {
    typedRole.textContent = currentRole.substring(0, charIndex++);
    if (charIndex > currentRole.length) {
      isDeleting = true;
      setTimeout(typeEffect, pauseTime);
      return;
    }
  } else {
    typedRole.textContent = currentRole.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? typingSpeed / 2 : typingSpeed);
}

document.addEventListener("DOMContentLoaded", typeEffect);




const timelineItems = document.querySelectorAll('.timeline-item');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show'); // <-- this line allows repeated animation
    }
  });
}, {
  threshold: 0.2
});

timelineItems.forEach(item => observer.observe(item));


window.addEventListener("scroll", () => {
    const items = document.querySelectorAll(".timeline-item");
    const triggerBottom = window.innerHeight * 0.85;

    items.forEach((item, index) => {
      const itemTop = item.getBoundingClientRect().top;

      if (itemTop < triggerBottom) {
        setTimeout(() => {
          item.classList.add("active");
        }, index * 300); // 300ms stagger per item
      }
    });
  });




  



// GitHub Stats Animation
const statsCards = document.querySelectorAll('.stats-card');

const animateStats = () => {
    statsCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
};

// Initialize
statsCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
});

// Animate when visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

statsObserver.observe(document.querySelector('.github-section'));

// Add this to your script.js
document.querySelectorAll('.github-graph img').forEach(img => {
    // Add loading state
    img.style.opacity = '0';
    img.style.transition = 'opacity 5000s ease';
    
    // Fade in when loaded
    img.onload = function() {
        this.style.opacity = '1';
    };
    
    // Fallback if image fails to load
    img.onerror = function() {
        this.style.display = 'none';
        const fallback = document.createElement('p');
        fallback.textContent = 'GitHub graph could not be loaded';
        fallback.style.color = '#e74c3c';
        this.parentNode.appendChild(fallback);
    };
});


document.addEventListener('DOMContentLoaded', function() {
    // Simple intersection observer for projects
    const projectBoxes = document.querySelectorAll('.project-box');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    projectBoxes.forEach(box => {
        box.style.animationPlayState = 'paused';
        observer.observe(box);
    });
    
    // Hover effect enhancement
    projectBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.querySelector('.project-title').style.backgroundColor = '#2980b9';
        });
        
        box.addEventListener('mouseleave', function() {
            this.querySelector('.project-title').style.backgroundColor = '#3498db';
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Lazy load images with intersection observer
    const projectImages = document.querySelectorAll('.project-image img');
    
    const imgObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            const img = entry.target;
            img.src = img.getAttribute('src');
            img.style.opacity = 1;
            observer.unobserve(img);
        });
    }, { threshold: 0.1, rootMargin: '200px' });
    
    projectImages.forEach(img => {
        img.style.opacity = 0;
        img.style.transition = 'opacity 0.5s ease';
        imgObserver.observe(img);
    });
    
    // Smooth hover effects
    const projectBoxes = document.querySelectorAll('.project-box');
    
    projectBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.querySelector('.project-title h3').style.color = '#3498db';
            this.querySelector('.project-category').style.background = '#2980b9';
        });
        
        box.addEventListener('mouseleave', function() {
            this.querySelector('.project-title h3').style.color = '#2c3e50';
            this.querySelector('.project-category').style.background = '#3498db';
        });
    });
});

// Education Timeline Animation
(function() {
    const timelineItems = document.querySelectorAll('.timeline-v2-item');
    if (!timelineItems.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Staggered reveal
                timelineItems.forEach((item, idx) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, idx * 350);
                });
            } else {
                // Remove visible class when out of view
                timelineItems.forEach(item => item.classList.remove('visible'));
            }
        });
    }, { threshold: 0.2 });

    observer.observe(document.querySelector('.timeline-v2'));
})();

// About Section Animated Reveal
(function() {
    const aboutImage = document.querySelector('.about-image');
    const aboutMain = document.querySelector('.about-main');
    if (!aboutImage || !aboutMain) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutImage.classList.add('visible');
                setTimeout(() => {
                    aboutMain.classList.add('visible');
                }, 250);
            } else {
                aboutImage.classList.remove('visible');
                aboutMain.classList.remove('visible');
            }
        });
    }, { threshold: 0.2 });

    observer.observe(document.getElementById('about'));
})();