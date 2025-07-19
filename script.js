document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeThemeToggle();
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeSkillBars();
    initializeContactForm();
    initializeMobileMenu();
    initializeTypingEffect();
    initializeParticles();
    initializeProjectModals();
    initializeScrollDown();
    revealElements();
});

// Theme Toggle Functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-checkbox');
    const themeLabel = document.getElementById('theme-label');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial theme based on preference or localStorage
    if (localStorage.getItem('theme') === 'light' || 
        (!localStorage.getItem('theme') && !prefersDarkScheme.matches)) {
        document.body.classList.add('light-theme');
        themeToggle.checked = false;
        themeLabel.textContent = 'Dark Mode';
    } else {
        document.body.classList.remove('light-theme');
        themeToggle.checked = true;
        themeLabel.textContent = 'Light Mode';
    }
    
    // Toggle theme on switch
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
            themeLabel.textContent = 'Light Mode';
        } else {
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            themeLabel.textContent = 'Dark Mode';
        }
    });
}

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section, .hero');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.getAttribute('data-project')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100) {
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
}

// Scroll effects
function initializeScrollEffects() {
    const header = document.querySelector('header');
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        // Header background change on scroll
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Show/hide scroll to top button
        if (scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Scroll down from hero section
function initializeScrollDown() {
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', function(e) {
            e.preventDefault();
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Intersection Observer for animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special handling for skill categories
                if (entry.target.classList.contains('skill-category')) {
                    setTimeout(() => {
                        animateSkillBars(entry.target);
                    }, 300);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToObserve = document.querySelectorAll(
        '.skill-category, .project-card, .timeline-item, .achievement-card, .about-content'
    );
    
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}

// Skill bars animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
}

function animateSkillBars(skillCategory) {
    const skillBars = skillCategory.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const targetWidth = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = targetWidth + '%';
        }, index * 200);
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Simulate form submission
            submitForm(formObject);
        });
    }
}

function submitForm(formData) {
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showNotification('Message sent successfully!', 'success');
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Project Modals
function initializeProjectModals() {
    const modal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');
    const projectLinks = document.querySelectorAll('.project-link, .project-more');
    
    // Project data
    const projects = {
        'mental-health': {
            title: 'Mental Health Management Site',
            description: 'A comprehensive web application designed to help users manage their mental health with resources, tracking tools, and support features. The application includes mood tracking, journaling, meditation guides, and professional resources to support mental wellbeing.',
            tech: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MongoDB'],
            date: 'April 2025',
            image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            link: '#'
        },
        'employee-system': {
            title: 'Employee Management System',
            description: 'A React-based application for managing employee data, tracking performance, and handling HR operations efficiently. Features include employee profiles, attendance tracking, performance reviews, and departmental management with secure access controls.',
            tech: ['React', 'JavaScript', 'CSS', 'Firebase', 'Redux'],
            date: 'May 2025',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            link: '#'
        },
        'hospital-system': {
            title: 'Hospital Management System',
            description: 'A comprehensive system for managing hospital operations, patient records, appointments, and staff management. The system streamlines workflows for doctors, nurses, administrators, and patients with modules for billing, inventory, and reporting.',
            tech: ['Java', 'MySQL', 'Spring Boot', 'Hibernate', 'Thymeleaf'],
            date: 'In Development',
            image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            link: '#'
        }
    };
    
    // Open modal when project is clicked
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            const project = projects[projectId];
            
            if (project) {
                document.getElementById('modal-title').textContent = project.title;
                document.getElementById('modal-description').textContent = project.description;
                document.getElementById('modal-date').textContent = project.date;
                document.getElementById('modal-img').src = project.image;
                document.getElementById('modal-img').alt = project.title;
                document.getElementById('modal-link').href = project.link;
                
                // Clear and add tech tags
                const modalTech = document.getElementById('modal-tech');
                modalTech.innerHTML = '';
                project.tech.forEach(tech => {
                    const tag = document.createElement('span');
                    tag.className = 'tech-tag';
                    tag.textContent = tech;
                    modalTech.appendChild(tag);
                });
                
                // Show modal
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', function() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = 'linear-gradient(45deg, var(--success-color), #45a049)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(45deg, var(--danger-color), #da190b)';
            break;
        default:
            notification.style.background = 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))';
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Mobile menu functionality
function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Change hamburger to X
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking on a link
        const navLinkItems = document.querySelectorAll('.nav-links a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                if (!this.getAttribute('data-project')) {
                    navLinks.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

// Typing effect for hero section
function initializeTypingEffect() {
    const tagline = document.querySelector('.hero .tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        
        let i = 0;
        const typeWriter = function() {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after hero animation
        setTimeout(typeWriter, 1000);
    }
}

// Resume download functionality
function downloadResume() {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = 'asserts/Mohammed_Ali_A_Resume.pdf'; // Replace with actual resume URL
    link.download = 'Mohammed_Ali_A_Resume.pdf';
    link.textContent = 'Download Resume';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    event.preventDefault();
    // For demo purposes, show a message
    showNotification('Resume download would start here. Please add your actual resume URL.', 'info');
}

// Particle effect for hero background
function initializeParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    const particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Connect particles that are close
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Smooth reveal animations for elements
function revealElements() {
    const elements = document.querySelectorAll('.skill-category, .project-card, .timeline-item');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Add custom CSS animations
const additionalStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification {
        animation: slideInRight 0.5s ease-out;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(function() {
    // Your scroll handling code here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);