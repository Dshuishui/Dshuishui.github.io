// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    
    // 滚动动画观察器
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // 为所有section添加滚动动画
    const sections = document.querySelectorAll('.section, header, footer');
    sections.forEach(function(section) {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // 技能标签悬停效果
    // const skillTags = document.querySelectorAll('.skill');
    // skillTags.forEach(function(tag) {
    //     tag.addEventListener('mouseenter', function() {
    //         this.style.transform = 'translateY(-3px) scale(1.05)';
    //     });
        
    //     tag.addEventListener('mouseleave', function() {
    //         this.style.transform = 'translateY(0) scale(1)';
    //     });
    // });

    // 项目卡片悬停效果
    // const projectItems = document.querySelectorAll('.project-item');
    // projectItems.forEach(function(item) {
    //     item.addEventListener('mouseenter', function() {
    //         this.style.transform = 'translateY(-5px)';
    //         this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
    //     });
        
    //     item.addEventListener('mouseleave', function() {
    //         this.style.transform = 'translateY(0)';
    //         this.style.boxShadow = 'none';
    //     });
    // });

    // 平滑滚动到锚点
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
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

    // 头像加载错误处理
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.addEventListener('error', function() {
            // 如果图片加载失败，创建一个文字头像
            const fallback = document.createElement('div');
            fallback.className = 'profile-img-fallback';
            fallback.style.cssText = `
                width: 180px;
                height: 180px;
                border-radius: 50%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 48px;
                font-weight: bold;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            `;
            fallback.textContent = '董';
            this.parentNode.replaceChild(fallback, this);
        });
    }

    // 添加一些交互反馈
    const interactiveElements = document.querySelectorAll('.education-item, .experience-item, .award-group');
    interactiveElements.forEach(function(element) {
        element.addEventListener('click', function() {
            // 添加点击反馈效果
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // 页面滚动时的导航效果（如果需要的话）
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 可以在这里添加滚动时的特效
        if (scrollTop > lastScrollTop) {
            // 向下滚动
        } else {
            // 向上滚动
        }
        lastScrollTop = scrollTop;
    });

    // 添加页面加载完成的淡入效果
    setTimeout(function() {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease-in-out';
    }, 100);

    // 联系链接点击统计（可选）
    const contactLinks = document.querySelectorAll('footer a');
    contactLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            console.log('Contact link clicked:', this.href);
        });
    });

    // 技能组悬停效果
    const skillGroups = document.querySelectorAll('.skill-group');
    skillGroups.forEach(function(group) {
        group.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        group.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        });
    });

});