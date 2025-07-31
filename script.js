// Portfolio Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation functionality
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile navigation toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Animated counters for statistics
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }

    // Animated skill bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 300);
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Animate stats section
                if (target.classList.contains('about')) {
                    animateCounters();
                }
                
                // Animate skills section
                if (target.classList.contains('skills')) {
                    animateSkillBars();
                }
                
                // Animate project cards
                if (target.classList.contains('project-card')) {
                    target.style.opacity = '1';
                    target.style.transform = 'translateY(0)';
                }
                
                // Add fade-in animation to sections
                target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe sections for animations
    const sectionsToObserve = document.querySelectorAll('.about, .skills, .project-card');
    sectionsToObserve.forEach(section => {
        observer.observe(section);
    });

    // Typing animation for hero subtitle
    function typeWriter() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;
        
        const text = typingElement.textContent;
        typingElement.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        }
        
        type();
    }

    // Start typing animation after a delay
    setTimeout(typeWriter, 1000);

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (hero && scrolled < hero.offsetHeight) {
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
            }
        }
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                // Show success message
                submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitButton.style.background = '#10b981';
                
                // Reset form
                this.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                }, 3000);
                
                // Show success notification
                showNotification('Message sent successfully!', 'success');
            }, 2000);
        });
    }

    // Form validation
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        // Remove existing error styling
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Validate based on field type
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            showFieldError(field, 'This field is required');
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                showFieldError(field, 'Please enter a valid email address');
            }
        }
        
        return isValid;
    }

    function showFieldError(field, message) {
        field.classList.add('error');
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#ef4444';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        errorElement.style.display = 'block';
        field.parentNode.appendChild(errorElement);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#10b981' : '#3b82f6',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            zIndex: '9999',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // Add CSS for form validation
    const validationCSS = `
        .form-group input.error,
        .form-group textarea.error {
            border-color: #ef4444 !important;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = validationCSS;
    document.head.appendChild(styleSheet);

    // Smooth reveal animations for elements
    const revealElements = document.querySelectorAll('.highlight-item, .contact-method, .skill-category');
    revealElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        element.style.transitionDelay = `${index * 0.1}s`;
    });

    // Reveal elements on scroll
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Add active navigation highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
            
            if (navLink) {
                if (scrollPos >= top && scrollPos <= bottom) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Add active navigation CSS
    const navCSS = `
        .nav-link.active {
            color: var(--primary-color) !important;
        }
        .nav-link.active::after {
            width: 100% !important;
        }
    `;
    
    const navStyleSheet = document.createElement('style');
    navStyleSheet.textContent = navCSS;
    document.head.appendChild(navStyleSheet);

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call

    // Loading animation for the page
    function addLoadingAnimation() {
        const elements = document.querySelectorAll('.hero-content, .hero-image, .section-title');
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Initialize loading animations
    addLoadingAnimation();

    // Add smooth hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('btn-secondary')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    // Console welcome message
    console.log('%c🚀 Welcome to Loh Wey Herng\'s Portfolio!', 'color: #2563eb; font-size: 16px; font-weight: bold;');
    console.log('%cThis portfolio is built with modern web technologies and features smooth animations, responsive design, and interactive elements.', 'color: #64748b; font-size: 12px;');
    console.log('%cInterested in the code? Check out the source at: https://github.com/WeyHerng', 'color: #10b981; font-size: 12px;');

});