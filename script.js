// ===== মসৃণ স্ক্রল আচরণ =====
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

// ===== যোগাযোগ ফর্ম হ্যান্ডলিং =====
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // ফর্ম ডেটা সংগ্রহ করুন
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const message = this.querySelector('textarea').value;

    // ভ্যালিডেশন
    if (!name || !email || !phone || !message) {
        showAlert('সমস্ত ক্ষেত্র পূরণ করুন', 'error');
        return;
    }

    // ইমেইল ভ্যালিডেশন
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showAlert('সঠিক ইমেইল ঠিকানা দিন', 'error');
        return;
    }

    // সফল বার্তা
    showAlert('আপনার বার্তা সফলভাবে পাঠানো হয়েছে! ধন্যবাদ।', 'success');

    // ফর্ম রিসেট করুন
    this.reset();
});

// ===== সতর্কতা বার্তা প্রদর্শন =====
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // স্টাইল যোগ করুন
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        z-index: 2000;
        animation: slideInRight 0.3s ease;
        ${type === 'success' ? 'background: #00b894; color: white;' : 'background: #ff6348; color: white;'}
    `;

    document.body.appendChild(alertDiv);

    // ৩ সেকেন্ড পর সরিয়ে দিন
    setTimeout(() => {
        alertDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
}

// ===== পৃষ্ঠা লোডিং অ্যানিমেশন =====
window.addEventListener('load', function () {
    // অ্যানিমেশন শুরু করুন
    const cards = document.querySelectorAll('.service-card, .stat-item');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'fadeInUp 0.6s ease forwards';
        }, index * 100);
    });
});

// ===== স্ক্রল ইফেক্ট =====
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// ===== সংখ্যা গণনা অ্যানিমেশন =====
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// যখন সম্পর্কে বিভাগ দেখা যাবে তখন গণনা শুরু করুন
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const h4 = entry.target.querySelector('h4');
            const number = parseInt(h4.textContent);
            animateCounter(h4, number);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-item').forEach(item => {
    observer.observe(item);
});

// ===== বোতাম ক্লিক ইফেক্ট =====
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255,255,255,0.5);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// ===== ডার্ক মোড টগল (ঐচ্ছিক) =====
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// প্রাথমিক ডার্ক মোড চেক করুন
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ===== কনসোল বার্তা =====
console.log('%c ইত্তেহাদুল ফিত্ইয়ান ফাউন্ডেশনে স্বাগতম!', 'color: #6c5ce7; font-size: 16px; font-weight: bold;');
