document.addEventListener('DOMContentLoaded', function () {

    // Scroll fade-in
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.section').forEach(function (el) {
        observer.observe(el);
    });

    // Active nav highlight + mobile section indicator
    const navLinks = document.querySelectorAll('.side-nav a');
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const sectionIndicator = document.getElementById('mobileSectionLabel');

    function updateActiveNav() {
        const scrollY = window.scrollY + 80;
        let current = sections[0];
        sections.forEach(function (s) {
            if (s.offsetTop <= scrollY) current = s;
        });
        navLinks.forEach(function (a) {
            const isActive = a.getAttribute('href') === '#' + current.id;
            a.classList.toggle('active', isActive);
            if (isActive && sectionIndicator) {
                sectionIndicator.textContent = a.textContent.trim();
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // Mobile hamburger menu
    const menuBtn = document.getElementById('mobileMenuBtn');
    const backdrop = document.getElementById('mobileNavBackdrop');

    function closeMobileNav() {
        document.body.classList.remove('nav-open');
        if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', function () {
            const isOpen = document.body.classList.toggle('nav-open');
            menuBtn.setAttribute('aria-expanded', String(isOpen));
        });
    }

    if (backdrop) {
        backdrop.addEventListener('click', closeMobileNav);
    }

    // Smooth scroll + close menu on nav link click
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                closeMobileNav();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Avatar fallback
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.addEventListener('error', function () {
            const fb = document.createElement('div');
            fb.style.cssText = 'width:96px;height:96px;border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;color:#fff;font-size:32px;font-weight:700;margin:0 auto 1rem;';
            fb.textContent = '董';
            this.replaceWith(fb);
        });
    }
});
