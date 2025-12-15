// YVAPE - Main JavaScript
// Form logic, navigation, and interactions

// ========================================
// Mobile Navigation
// ========================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active')) {
        if (!e.target.closest('.nav-wrapper')) {
            navMenu.classList.remove('active');
        }
    }
});

// ========================================
// Form Configuration
// ========================================
const formSteps = {
    'school-personnel': [
        {
            title: 'School Personnel Information',
            fields: [
                { name: 'personnelFirstName', label: 'First Name', type: 'text', required: true, placeholder: 'First Name*' },
                { name: 'personnelLastName', label: 'Last Name', type: 'text', required: true, placeholder: 'Last Name*' },
                { name: 'personnelEmail', label: 'Email', type: 'email', required: true, placeholder: 'Email*' },
                { name: 'personnelPhone', label: 'Phone Number', type: 'tel', required: true, placeholder: 'Phone Number*' },
                { name: 'personnelPhoneExt', label: 'Phone Extension (optional)', type: 'text', required: false, placeholder: 'Phone Extension (optional)' }
            ]
        },
        {
            title: 'Search for your school:',
            fields: [
                { name: 'schoolName', label: 'School Name', type: 'text', required: true, placeholder: 'School Name*' }
            ]
        },
        {
            title: 'What you are here to do:',
            fields: [
                { 
                    name: 'enrollmentPurpose', 
                    label: 'What you are here to do', 
                    type: 'radio', 
                    required: true,
                    options: [
                        { value: 'enroll', label: "I'm ready to enroll students in YVAPE." },
                        { value: 'information', label: "I'd like to receive more information on YVAPE." }
                    ]
                }
            ]
        }
    ],
    'parent': [
        {
            title: 'Parent/Guardian Information',
            fields: [
                { name: 'parentFirstName', label: 'First Name', type: 'text', required: true },
                { name: 'parentLastName', label: 'Last Name', type: 'text', required: true },
                { name: 'parentEmail', label: 'Email', type: 'email', required: true },
                { name: 'parentPhone', label: 'Phone Number', type: 'tel', required: true, pattern: '[0-9]{10}' },
                { name: 'relationshipToStudent', label: 'Relationship to Student', type: 'text', required: true }
            ]
        },
        {
            title: 'Student Information',
            fields: [
                { name: 'studentFirstName', label: 'Student First Name', type: 'text', required: true },
                { name: 'studentLastName', label: 'Student Last Name', type: 'text', required: true },
                { name: 'studentAge', label: 'Student Age', type: 'number', required: true, min: 12, max: 19 },
                { name: 'schoolName', label: 'School Name', type: 'text', required: true }
            ]
        },
        {
            title: 'Consent',
            fields: [
                { 
                    name: 'parentConsent', 
                    label: 'I consent to my child participating in YVAPE', 
                    type: 'checkbox', 
                    required: true 
                },
                { 
                    name: 'understandPrivacy', 
                    label: 'I understand that all sessions are confidential and educational', 
                    type: 'checkbox', 
                    required: true 
                }
            ]
        }
    ],
    'student': [
        {
            title: 'Student Information',
            fields: [
                { name: 'studentFirstName', label: 'First Name', type: 'text', required: true },
                { name: 'studentLastName', label: 'Last Name', type: 'text', required: true },
                { name: 'studentEmail', label: 'Email (optional)', type: 'email', required: false },
                { name: 'studentPhone', label: 'Phone Number', type: 'tel', required: true, pattern: '[0-9]{10}' },
                { name: 'studentAge', label: 'Age', type: 'number', required: true, min: 12, max: 19 }
            ]
        },
        {
            title: 'School Information',
            fields: [
                { name: 'schoolName', label: 'School Name', type: 'text', required: true },
                { name: 'grade', label: 'Grade Level', type: 'select', required: true, options: [
                    { value: '', label: 'Select Grade' },
                    { value: '6', label: '6th Grade' },
                    { value: '7', label: '7th Grade' },
                    { value: '8', label: '8th Grade' },
                    { value: '9', label: '9th Grade' },
                    { value: '10', label: '10th Grade' },
                    { value: '11', label: '11th Grade' },
                    { value: '12', label: '12th Grade' }
                ]}
            ]
        },
        {
            title: 'Consent & Preferences',
            fields: [
                { 
                    name: 'studentConsent', 
                    label: 'I consent to participate in YVAPE', 
                    type: 'checkbox', 
                    required: true 
                },
                { 
                    name: 'preferredContact', 
                    label: 'Preferred Contact Method', 
                    type: 'radio', 
                    required: true,
                    options: [
                        { value: 'phone', label: 'Phone Call' },
                        { value: 'video', label: 'Video Call' }
                    ]
                },
                { name: 'bestTimeToContact', label: 'Best Time to Contact', type: 'select', required: true, options: [
                    { value: '', label: 'Select Time' },
                    { value: 'morning', label: 'Morning (8am-12pm)' },
                    { value: 'afternoon', label: 'Afternoon (12pm-5pm)' },
                    { value: 'evening', label: 'Evening (5pm-8pm)' }
                ]}
            ]
        }
    ]
};

// ========================================
// Form State Management
// ========================================
const enrollmentForm = document.getElementById('enrollmentForm');

// Populate California schools datalist
if (typeof californiaSchools !== 'undefined') {
    const datalist = document.getElementById('schools-list');
    if (datalist) {
        californiaSchools.forEach(school => {
            const option = document.createElement('option');
            option.value = school.name;
            option.textContent = `${school.name} - ${school.district}`;
            datalist.appendChild(option);
        });
    }
}

// ========================================
// Form Submission
// ========================================
if (enrollmentForm) {
    enrollmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!enrollmentForm.checkValidity()) {
            enrollmentForm.reportValidity();
            return;
        }
        
        // Get form data
        const formData = new FormData(enrollmentForm);
        const data = Object.fromEntries(formData);
        
        console.log('Form submitted:', data);
        
        // Redirect to thank you page
        window.location.href = 'thank-you.html';
    });
}

// ========================================
// Tab Navigation
// ========================================
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.dataset.tab;
        
        // Update buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update panels
        tabPanels.forEach(panel => panel.classList.remove('active'));
        document.getElementById(`${tabName}-tab`).classList.add('active');
    });
});

// ========================================
// Testimonial Slider
// ========================================
const testimonialTrack = document.getElementById('testimonialTrack');
const prevTestimonial = document.getElementById('prevTestimonial');
const nextTestimonial = document.getElementById('nextTestimonial');

if (testimonialTrack) {
    let currentTestimonial = 0;
    const testimonialCards = testimonialTrack.querySelectorAll('.testimonial-card');
    
    if (nextTestimonial) {
        nextTestimonial.addEventListener('click', () => {
            if (currentTestimonial < testimonialCards.length - 1) {
                currentTestimonial++;
                updateTestimonialPosition();
            }
        });
    }
    
    if (prevTestimonial) {
        prevTestimonial.addEventListener('click', () => {
            if (currentTestimonial > 0) {
                currentTestimonial--;
                updateTestimonialPosition();
            }
        });
    }
    
    function updateTestimonialPosition() {
        testimonialTrack.scrollTo({
            left: testimonialCards[currentTestimonial].offsetLeft,
            behavior: 'smooth'
        });
    }
}

// ========================================
// Smooth Scrolling
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        }
    });
});

// ========================================
// Navbar Scroll Effect
// ========================================
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
        navbar.style.boxShadow = 'var(--shadow-sm)';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// Dark Mode Toggle
// ========================================
const darkModeToggle = document.getElementById('darkModeToggle');
const htmlElement = document.documentElement;
const bodyElement = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);
bodyElement.setAttribute('data-theme', currentTheme);

// Update icon based on current theme
function updateDarkModeIcon() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const icon = darkModeToggle.querySelector('svg');
    
    if (currentTheme === 'dark') {
        // Sun icon for switching to light mode
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />';
    } else {
        // Moon icon for switching to dark mode
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />';
    }
}

updateDarkModeIcon();

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        bodyElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateDarkModeIcon();
    });
}