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

    // Toast helper
    function showToast(msg) {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(function () { toast.classList.remove('show'); }, 2200);
    }

    // Copy email to clipboard
    document.querySelectorAll('a[href^="mailto:"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const email = this.href.replace('mailto:', '');
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(function () {
                    showToast('邮箱已复制 · ' + email);
                });
            } else {
                window.location.href = 'mailto:' + email;
            }
        });
    });

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function () {
            backToTop.classList.toggle('visible', window.scrollY > 320);
        }, { passive: true });

        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // GitHub followers (live)
    fetch('https://api.github.com/users/Dshuishui')
        .then(function (r) { return r.json(); })
        .then(function (data) {
            document.querySelectorAll('.github-followers').forEach(function (el) {
                if (data.followers !== undefined) el.textContent = data.followers + ' followers';
            });
        })
        .catch(function () {});

    // Avatar fallback
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.addEventListener('error', function () {
            const fb = document.createElement('div');
            fb.style.cssText = 'width:98px;height:98px;border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;color:#fff;font-size:32px;font-weight:700;';
            fb.textContent = '董';
            this.replaceWith(fb);
        });
    }
});
