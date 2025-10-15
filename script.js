document.addEventListener('DOMContentLoaded', function() {
    // Utilities
    const q = (sel, el = document) => el.querySelector(sel);
    const qAll = (sel, el = document) => Array.from(el.querySelectorAll(sel));
    const header = document.getElementById('siteHeader');
    const sections = qAll('main section');
    const navLinks = qAll('nav a');
    
    // 1) Header hide/show on scroll
    (function headerHideShow() {
        let lastY = window.scrollY;
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const y = window.scrollY;
                    if (y > lastY && y > 120) header.classList.add('hidden');
                    else header.classList.remove('hidden');
                    lastY = y;
                    ticking = false;
                });
                ticking = true;
            }
        }, {
            passive: true
        });
    })();

    // 2) Scroll-triggered animations with IntersectionObserver + stagger
    (function scrollAnimations() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    el.classList.add('in-view');
                    const staggerChildren = el.dataset.staggerChildren;
                    if (staggerChildren) {
                        const children = qAll(staggerChildren, el);
                        children.forEach((c, i) => c.style.transitionDelay = (i * 90) + 'ms');
                    }
                    observer.unobserve(el);
                }
            });
        }, {
            threshold: 0.12
        });
        document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    })();
    
    // 3) Background decorative circles (parallax)
    (function parallax() {
        const parallaxEls = [];
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.inset = '0';
        container.style.zIndex = '-1';
        container.style.pointerEvents = 'none';
        document.body.appendChild(container);
        const make = (size, left, top, blur, opacity, speed, color) => {
            const d = document.createElement('div');
            d.style.position = 'absolute';
            d.style.left = left;
            d.style.top = top;
            d.style.width = size;
            d.style.height = size;
            d.style.borderRadius = '50%';
            d.style.filter = `blur(${blur})`;
            d.style.opacity = opacity;
            d.style.background = color;
            d.style.transform = 'translate3d(0,0,0)';
            container.appendChild(d);
            parallaxEls.push({
                el: d,
                speed
            });
        };
        make('400px', '-8%', '-6%', '30px', 0.06, 0.2, 'linear-gradient(180deg,var(--accent),var(--accent-2))');
        make('300px', '70%', '70%', '40px', 0.04, 0.08, 'linear-gradient(180deg,var(--accent),var(--accent-2))');
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            parallaxEls.forEach(p => {
                p.el.style.transform = `translateY(${y * p.speed}px)`;
            });
        }, {
            passive: true
        });
    })();

    // 4) Button ripple effect
    (function ripples() {
        const buttons = qAll('[data-ripple]');
        buttons.forEach(btn => {
            btn.addEventListener('pointerdown', function (e) {
                const rect = btn.getBoundingClientRect();
                const circle = document.createElement('span');
                const size = Math.max(rect.width, rect.height) * 1.6;
                circle.style.position = 'absolute';
                circle.style.width = circle.style.height = size + 'px';
                circle.style.left = (e.clientX - rect.left - size / 2) + 'px';
                circle.style.top = (e.clientY - rect.top - size / 2) + 'px';
                circle.style.borderRadius = '50%';
                circle.style.background = 'rgba(255,255,255,0.12)';
                circle.style.transform = 'scale(0.2)';
                circle.style.opacity = '1';
                circle.style.pointerEvents = 'none';
                circle.style.transition = 'transform .6s var(--ease), opacity .6s var(--ease)';
                btn.style.position = 'relative';
                btn.style.overflow = 'hidden'; // Ensure ripple stays within bounds
                btn.appendChild(circle);
                requestAnimationFrame(() => circle.style.transform = 'scale(1)');
                setTimeout(() => {
                    circle.style.opacity = '0';
                    setTimeout(() => circle.remove(), 700);
                }, 350);
            });
        });
    })();

    // 5) Custom Typewriter Effect
    (function typewriterEffect() {
        const words = ['Smart Energy', 'IoT Innovation', 'AI Integration', 'Quantum Computing', 'Green Technology', 'Future Systems'];
        const typewriter = document.getElementById('typewriter');
        if (!typewriter) return;
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let speed = 100;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                charIndex--;
                if (charIndex < 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    speed = 500;
                } else {
                    speed = 50;
                }
            } else {
                charIndex++;
                if (charIndex > currentWord.length) {
                    isDeleting = true;
                    speed = 2000;
                    charIndex = currentWord.length;
                } else {
                    speed = 100;
                }
            }
            typewriter.textContent = currentWord.substring(0, charIndex);
            setTimeout(type, speed);
        }
        type();
    })();

    // 6) Skills Progress Bar Animation
    (function skillsProgress() {
        const progressBars = qAll('.skill-progress');
        const obs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.dataset.width;
                    progressBar.style.width = width + '%';
                    obs.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });
        progressBars.forEach(bar => obs.observe(bar));
    })();

    // 7) Active Navigation State with Intersection Observer
    (function activeNav() {
        const observerOptions = {
            root: null,
            rootMargin: "0px 0px -70% 0px", // Highlight section when it's mostly in view
            threshold: 0.2 
        };
        
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const sectionId = entry.target.id;
                const navLink = q(`a[data-nav-section="${sectionId}"]`);
                
                if (entry.isIntersecting) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    if (navLink) {
                        navLink.classList.add('active');
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => navObserver.observe(section));
    })();
    
    // 8) Project Filtering Logic
    (function projectFiltering() {
        const filterContainer = document.getElementById('projectFilters');
        const projects = qAll('.project');

        filterContainer.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') return;

            const filterTag = e.target.dataset.filter;
            
            // Update active button state
            qAll('#projectFilters button').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            // Filter projects
            projects.forEach(project => {
                const tags = project.dataset.tags.split(' ').map(t => t.toLowerCase());
                const filterLower = filterTag.toLowerCase();

                if (filterTag === 'all' || tags.includes(filterLower)) {
                    project.style.display = 'block';
                    project.classList.remove('hidden');
                } else {
                    project.style.display = 'none';
                    project.classList.add('hidden');
                }
            });
        });
    })();

    // utilities: set current year
    document.getElementById('year').textContent = new Date().getFullYear();
});
