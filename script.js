// Main JavaScript for UnderRetail

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });

    // Application Form Handling
    const applicationForm = document.getElementById('applicationForm');
    
    if (applicationForm) {
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(applicationForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.phone || !data.tier || !data.amount) {
                alert('Please fill in all required fields.');
                return;
            }
            
            if (parseInt(data.amount) < 40) {
                alert('Minimum investment amount is £40.');
                return;
            }
            
            // In a real application, you would send this data to a server
            console.log('Application submitted:', data);
            
            // Show success message
            alert('Thank you for your application! We will contact you within 24 hours.');
            applicationForm.reset();
        });
    }

    // Tier selection updates investment amount
    const tierSelect = document.getElementById('tier');
    const amountInput = document.getElementById('amount');
    
    if (tierSelect && amountInput) {
        tierSelect.addEventListener('change', function() {
            const tier = this.value;
            let minAmount = 40;
            
            switch(tier) {
                case 'bronze':
                    minAmount = 40;
                    break;
                case 'silver':
                    minAmount = 55;
                    break;
                case 'gold':
                    minAmount = 65;
                    break;
                case 'vip':
                    minAmount = 100;
                    break;
            }
            
            amountInput.min = minAmount;
            amountInput.placeholder = `Minimum: £${minAmount}`;
            
            if (parseInt(amountInput.value) < minAmount || !amountInput.value) {
                amountInput.value = minAmount;
            }
        });
    }

    // FIXED: Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for actual anchor links, not page links
            if (href !== '#' && !href.includes('.html')) {
                e.preventDefault();
                
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without page refresh
                    history.pushState(null, null, href);
                }
            }
        });
    });

    // Header background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            } else {
                header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            }
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && navLinks) {
                navLinks.style.display = 'none';
            }
        });
    });
});

// Utility function for formatting currency
function formatCurrency(amount, currency = 'GBP') {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// Utility function for calculating ROI
function calculateROI(investment, profit) {
    return ((profit / investment) * 100).toFixed(1);
}
