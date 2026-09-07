// Pedro Gain Studios - Interactive JavaScript

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

// CTA Button functionality
document.querySelector('.cta-button').addEventListener('click', function() {
    document.querySelector('#ads').scrollIntoView({
        behavior: 'smooth'
    });
});

// Ad Card interactions
document.querySelectorAll('.ad-button').forEach(button => {
    button.addEventListener('click', function() {
        const cardTitle = this.parentElement.querySelector('h3').textContent;
        showNotification(`Interested in ${cardTitle}!`);
    });
});

// Game Card interactions
document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', function() {
        const gameName = this.parentElement.querySelector('h3').textContent;
        showNotification(`Launching ${gameName}...`);
        setTimeout(() => {
            showNotification(`${gameName} game window opened!`);
        }, 1000);
    });
});

// Website Demo buttons
document.querySelectorAll('.website-button').forEach(button => {
    button.addEventListener('click', function() {
        const websiteName = this.parentElement.querySelector('h3').textContent;
        showNotification(`Opening ${websiteName} demo...`);
    });
});

// Contact Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.querySelector('input[type="text"]').value;
        showNotification(`Thank you ${name}! Your message has been sent.`);
        this.reset();
    });
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%);
        color: white;
        padding: 20px 30px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.ad-card, .game-card, .website-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

console.log('%cPedro Gain Studios', 'font-size: 24px; font-weight: bold; color: #6c5ce7;');
console.log('%cOwner: fkjjce', 'font-size: 16px; color: #a29bfe;');
console.log('%cWelcome to Pedro Gain - Your Premier Ads & Gaming Hub!', 'font-size: 14px; color: #636e72;');

document.addEventListener('DOMContentLoaded', function() {
    console.log('Pedro Gain website loaded successfully!');
});

window.addEventListener('error', function(event) {
    console.error('An error occurred:', event.error);
    showNotification('An error occurred. Please try again.');
});