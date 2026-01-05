// Language Switching Functionality
let currentLang = localStorage.getItem('preferredLanguage') || 'zh';

// Function to switch language
function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferredLanguage', lang);
    
    // Update HTML lang attribute
    const htmlElement = document.documentElement;
    htmlElement.lang = lang === 'zh' ? 'zh-TW' : 'en';
    if (htmlElement.id === 'htmlLang') {
        htmlElement.setAttribute('lang', lang === 'zh' ? 'zh-TW' : 'en');
    }
    
    // Update all elements with data-zh and data-en attributes
    document.querySelectorAll('[data-zh][data-en]').forEach(element => {
        if (lang === 'zh') {
            element.textContent = element.getAttribute('data-zh');
        } else {
            element.textContent = element.getAttribute('data-en');
        }
    });
    
    // Update title
    const title = document.querySelector('title');
    if (title) {
        title.textContent = lang === 'zh' ? title.getAttribute('data-zh') : title.getAttribute('data-en');
    }
    
    // Update language toggle button
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        const langCurrent = langToggle.querySelector('.lang-current');
        if (langCurrent) {
            langCurrent.textContent = lang === 'zh' ? '中文' : 'English';
        }
    }
    
    // Update form placeholders and messages
    updateFormLabels(lang);
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = lang === 'zh' 
            ? '醫生Chang - 專業血糖管理專家，幫助您逆轉糖路，重獲健康主導權'
            : 'Dr. Chang - Professional Blood Sugar Management Expert, helping you reverse your diabetes journey and regain control of your health';
    }
}

// Update form labels and placeholders
function updateFormLabels(lang) {
    const labels = {
        name: { zh: '姓名 *', en: 'Name *' },
        phone: { zh: '電話 *', en: 'Phone *' },
        email: { zh: '電子郵件', en: 'Email' },
        message: { zh: '訊息', en: 'Message' }
    };
    
    Object.keys(labels).forEach(key => {
        const label = document.querySelector(`label[for="${key}"]`);
        if (label) {
            label.textContent = lang === 'zh' ? labels[key].zh : labels[key].en;
        }
    });
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    switchLanguage(currentLang);
    
    // Language toggle button event
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const newLang = currentLang === 'zh' ? 'en' : 'zh';
            switchLanguage(newLang);
        });
    }
});

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const isClickInsideNav = navMenu.contains(e.target) || navToggle.contains(e.target);
    const isNavActive = navMenu.classList.contains('active');
    
    if (!isClickInsideNav && isNavActive && window.innerWidth <= 768) {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Prevent body scroll when mobile menu is open
const body = document.body;
const originalOverflow = body.style.overflow;

navToggle.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
        body.style.overflow = originalOverflow;
    } else {
        body.style.overflow = 'hidden';
    }
});

// Restore body scroll when menu closes
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
            if (!navMenu.classList.contains('active')) {
                body.style.overflow = originalOverflow;
            }
        }
    });
});

observer.observe(navMenu, { attributes: true });

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Here you would typically send the data to a server
        // For now, we'll show a success message
        const successMsg = currentLang === 'zh' 
            ? `感謝您的報名！\n\n我們已收到您的資料：\n姓名：${formData.name}\n電話：${formData.phone}\n\n我們會盡快與您聯絡！`
            : `Thank you for your registration!\n\nWe have received your information:\nName: ${formData.name}\nPhone: ${formData.phone}\n\nWe will contact you soon!`;
        alert(successMsg);
        
        // Reset form
        contactForm.reset();
        
        // In a real implementation, you would send this to your backend:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        // })
    });
}

// Intersection Observer for fade-in animations
const animationObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, animationObserverOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .stat-card, .contact-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(el);
    });
});

// Improve touch interactions on mobile
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Add touch-friendly class to buttons
    document.querySelectorAll('.btn, .faq-question, .lang-toggle').forEach(el => {
        el.classList.add('touch-friendly');
    });
}

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

