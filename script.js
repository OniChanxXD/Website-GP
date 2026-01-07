// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.project-card, .blog-card, .about-text, .about-stats, .contact-info, .contact-form');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Get submit button and update state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Real form submission using fetch
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Thank you for your message! I\'ll get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            } else {
                alert('Oops! There was a problem sending your message. Please try again.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        })
        .catch(error => {
            alert('Oops! There was a network error. Please try again.');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Smooth reveal animation for stats
function animateStats() {
    const stats = document.querySelectorAll('.stat h3');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + (stat.textContent.includes('+') ? '+' : '') + (stat.textContent.includes('%') ? '%' : '');
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '') + (stat.textContent.includes('%') ? '%' : '');
            }
        }, 30);
    });
}

// Trigger stats animation when about section is visible
const aboutSection = document.querySelector('#about');
if (aboutSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(aboutSection);
}

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click tracking for project links (for analytics)
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const projectName = this.closest('.project-card').querySelector('h3').textContent;
        console.log(`Clicked on project: ${projectName}`);
        // Here you could send analytics data to your preferred service
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu on escape
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add focus styles for accessibility
document.querySelectorAll('a, button, input, textarea').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #2563eb';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Carousel initialization for project cards
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.carousel-container').forEach(container => {
        const slides = Array.from(container.querySelectorAll('.carousel-slide'));
        if (!slides.length) return;
        let index = 0;
        slides.forEach((s,i) => s.classList.toggle('active', i === 0));

        const indicators = document.createElement('div');
        indicators.className = 'carousel-indicators';
        slides.forEach((_, i) => {
            const btn = document.createElement('button');
            btn.addEventListener('click', () => show(i));
            indicators.appendChild(btn);
        });
        container.appendChild(indicators);
        if (indicators.children[0]) indicators.children[0].classList.add('active');

        const prev = container.querySelector('.carousel-prev');
        const next = container.querySelector('.carousel-next');

        prev && prev.addEventListener('click', () => show(index - 1));
        next && next.addEventListener('click', () => show(index + 1));

        function show(n) {
            index = (n + slides.length) % slides.length;
            slides.forEach((s,i) => s.classList.toggle('active', i === index));
            Array.from(indicators.children).forEach((b,i) => b.classList.toggle('active', i === index));
        }

        // expose show function for outside controls (used by test-section buttons)
        container.show = show;

        // autoplay
        let autoplay = setInterval(() => show(index + 1), 5000);
        container.addEventListener('mouseenter', () => clearInterval(autoplay));
        container.addEventListener('mouseleave', () => autoplay = setInterval(() => show(index + 1), 5000));

        // keyboard support
        container.tabIndex = 0;
        container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') show(index - 1);
            if (e.key === 'ArrowRight') show(index + 1);
        });
    });

    // Hook up test-section buttons
    document.querySelectorAll('.test-section-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const start = parseInt(btn.dataset.start, 10) || 0;
            const card = btn.closest('.project-card');
            const container = card && card.querySelector('.carousel-container');
            if (container && typeof container.show === 'function') {
                container.show(start);
                // active style for buttons
                card.querySelectorAll('.test-section-btn').forEach(b => b.classList.toggle('active', b === btn));
            }
        });
    });
});

// Lightbox functionality
(function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lbImage = lightbox && lightbox.querySelector('.lightbox-image');
    const lbCaption = lightbox && lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox && lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox && lightbox.querySelector('.lightbox-nav.prev');
    const nextBtn = lightbox && lightbox.querySelector('.lightbox-nav.next');

    let currentSet = [];
    let currentIndex = 0;

    function open(images, index) {
        currentSet = images;
        currentIndex = index;
        const img = currentSet[currentIndex];
        // Prefer optimized WebP from the sibling <picture> source if available
        const picture = img.closest && img.closest('picture');
        const webpSource = picture && picture.querySelector('source[type="image/webp"]');
        const preferred = webpSource ? webpSource.srcset.split(',')[0].trim().split(' ')[0] : (img.dataset.full || img.src);
        lbImage.src = preferred;
        lbImage.alt = img.alt || '';
        lbCaption.textContent = img.alt || '';
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        lbImage.focus && lbImage.focus();
    }

    function close() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        lbImage.src = '';
        currentSet = [];
        currentIndex = 0;
    }

    function show(n) {
        if (!currentSet.length) return;
        currentIndex = (n + currentSet.length) % currentSet.length;
        const img = currentSet[currentIndex];
        const picture = img.closest && img.closest('picture');
        const webpSource = picture && picture.querySelector('source[type="image/webp"]');
        const preferred = webpSource ? webpSource.srcset.split(',')[0].trim().split(' ')[0] : (img.dataset.full || img.src);
        lbImage.src = preferred;
        lbImage.alt = img.alt || '';
        lbCaption.textContent = img.alt || '';
    }

    // Delegate clicks on carousel images
    document.addEventListener('click', (e) => {
        const img = e.target.closest && e.target.closest('.carousel-slide img');
        if (!img) return;
        const container = img.closest('.carousel-container');
        const imgs = Array.from(container.querySelectorAll('.carousel-slide img'));
        open(imgs, imgs.indexOf(img));
    });

    closeBtn && closeBtn.addEventListener('click', close);
    lightbox && lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) close();
    });
    prevBtn && prevBtn.addEventListener('click', () => show(currentIndex - 1));
    nextBtn && nextBtn.addEventListener('click', () => show(currentIndex + 1));

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') show(currentIndex - 1);
        if (e.key === 'ArrowRight') show(currentIndex + 1);
    });
})();


// Lazy loading for images (if you add real images later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Lazy-load interactive Looker Studio embeds (click-to-load or auto-load when visible)
function setupEmbedPlaceholders() {
    const placeholders = document.querySelectorAll('.embed-placeholder');
    if (!placeholders.length) return;

    const loadEmbed = (el) => {
        if (el.dataset.loaded) return;
        const url = el.dataset.embedUrl;
        if (!url) return;
        const iframe = document.createElement('iframe');
        iframe.className = 'embed-iframe';
        iframe.loading = 'lazy';
        iframe.allow = 'fullscreen';
        iframe.src = url;
        // Fallback button if embedding blocked
        iframe.addEventListener('error', () => {
            window.open(url.replace('/embed/reporting/', '/reporting/'), '_blank', 'noopener');
        });
        el.innerHTML = '';
        el.appendChild(iframe);
        el.dataset.loaded = '1';
    };

    // IntersectionObserver to auto-load when at least half visible
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.45) {
                loadEmbed(entry.target);
                io.unobserve(entry.target);
            }
        });
    }, { threshold: [0.45] });

    placeholders.forEach(p => {
        // click or Enter/Space loads embed
        p.addEventListener('click', (e) => {
            // ignore clicks on the 'Open in new tab' anchor
            if (e.target.closest('.embed-open-link')) return;
            loadEmbed(p);
        });
        p.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && !p.dataset.loaded) { e.preventDefault(); loadEmbed(p); } });
        io.observe(p);
    });
}

document.addEventListener('DOMContentLoaded', setupEmbedPlaceholders);

