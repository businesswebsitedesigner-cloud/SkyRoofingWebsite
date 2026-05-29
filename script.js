// ==========================================
//   SKY ROOFING - JAVASCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', function () {

    // === PRELOADER ===
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hide');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 2500);

    // === AOS (Scroll Animations) ===
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 60,
    });

    // === PARTICLES ===
    function createParticles() {
        const container = document.getElementById('heroParticles');
        if (!container) return;
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
            particle.style.animationDelay = (Math.random() * 10) + 's';
            particle.style.width = (Math.random() * 4 + 2) + 'px';
            particle.style.height = particle.style.width;
            particle.style.opacity = Math.random() * 0.4 + 0.1;
            container.appendChild(particle);
        }
    }
    createParticles();

    // === NAVBAR SCROLL EFFECT ===
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // === HAMBURGER MENU ===
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // === ACTIVE NAV LINK on SCROLL ===
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        rootMargin: '-20% 0px -70% 0px',
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // === COUNTER ANIMATION ===
    function animateCounter(el, target, duration = 2000) {
        let start = 0;
        const step = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(start);
            }
        }, 16);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'));
                animateCounter(el, target);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-num[data-count]').forEach(el => {
        counterObserver.observe(el);
    });

    // === PRODUCT FILTER TABS ===
    const tabBtns = document.querySelectorAll('.tab-btn');
    const productCards = document.querySelectorAll('.product-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInCard 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Add keyframe dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInCard {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // === SCROLL TO TOP ===
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // === SMOOTH SCROLL for ALL ANCHORS ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // === ENQUIRY FORM ===
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = this.querySelector('input[type="text"]').value;
            const mobile = this.querySelector('input[type="tel"]').value;
            const product = this.querySelector('select').value;
            const message = this.querySelector('textarea').value;

            if (!name || !mobile || !product || !message) {
                alert('Please fill all required fields!');
                return;
            }

            // Build WhatsApp message
            const waMsg = encodeURIComponent(
                `*New Enquiry from Sky Roofing Website*\n\n` +
                `*Name:* ${name}\n` +
                `*Mobile:* ${mobile}\n` +
                `*Product Interested In:* ${product}\n` +
                `*Requirements:*\n${message}\n\n` +
                `_Sent via skyroofing.in website_`
            );

            // Show success animation
            const btn = this.querySelector('.form-submit-btn');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check-circle"></i> Sending...';
            btn.style.background = '#10b981';

            setTimeout(() => {
                // Open WhatsApp with pre-filled message
                window.open(`https://wa.me/919765872995?text=${waMsg}`, '_blank');
                
                btn.innerHTML = '<i class="fas fa-check-circle"></i> Enquiry Sent! WhatsApp Opened.';
                
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.background = '';
                    enquiryForm.reset();
                }, 4000);
            }, 1000);
        });
    }

    // === NAVBAR MOBILE OVERLAY ===
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed; inset: 0; background: rgba(0,0,0,0.5);
        z-index: 998; display: none; backdrop-filter: blur(4px);
    `;
    overlay.id = 'mobileOverlay';
    document.body.appendChild(overlay);

    hamburger.addEventListener('click', () => {
        overlay.style.display = navMenu.classList.contains('active') ? 'block' : 'none';
    });

    overlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    });

    // === HEADER SCROLL HIDE/SHOW on MOBILE ===
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const current = window.scrollY;
        if (current < lastScroll || current < 100) {
            header.style.transform = 'translateY(0)';
        } else if (current > lastScroll && current > 200) {
            // Only hide on mobile
            if (window.innerWidth < 768) {
                header.style.transform = 'translateY(-100%)';
            }
        }
        lastScroll = current;
    });

    // === PRODUCT CARD HOVER SHINE EFFECT ===
    document.querySelectorAll('.product-card-inner').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.background = `
                radial-gradient(circle at ${x}% ${y}%, rgba(26,86,219,0.03), transparent 60%),
                white
            `;
        });
        card.addEventListener('mouseleave', () => {
            card.style.background = 'white';
        });
    });

    // === TYPED TEXT EFFECT (Hero Badge) ===
    const badge = document.querySelector('.hero-badge span');
    if (badge) {
        const texts = [
            "Maharashtra's Most Trusted Roofing Manufacturer",
            "Over 13 Years of Industrial Excellence",
            "Serving MIDC Hubs Across Maharashtra",
            "In-House Manufacturing at Nashik"
        ];
        let index = 0;
        
        setInterval(() => {
            index = (index + 1) % texts.length;
            badge.style.opacity = '0';
            setTimeout(() => {
                badge.textContent = texts[index];
                badge.style.opacity = '1';
            }, 300);
        }, 3500);
        
        badge.style.transition = 'opacity 0.3s ease';
    }

    console.log('%cSky Roofing Website | Nashik | +91 97658 72995', 
        'color: #1a56db; font-size: 14px; font-weight: bold; padding: 5px;');
});