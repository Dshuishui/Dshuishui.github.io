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

    // Smooth scroll for sidebar nav
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Active nav highlight on scroll
    const navLinks = document.querySelectorAll('.side-nav a');
    const sections = Array.from(document.querySelectorAll('section[id]'));

    function updateActiveNav() {
        const scrollY = window.scrollY + 80;
        let current = sections[0];
        sections.forEach(function (s) {
            if (s.offsetTop <= scrollY) current = s;
        });
        navLinks.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + current.id);
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

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
