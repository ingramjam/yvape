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
                { name: 'personnelFirstName', label: 'First Name', type: 'text', required: true, placeholder: 'First Name*', autocomplete: 'given-name' },
                { name: 'personnelLastName', label: 'Last Name', type: 'text', required: true, placeholder: 'Last Name*', autocomplete: 'family-name' },
                { name: 'personnelEmail', label: 'Email', type: 'email', required: true, placeholder: 'Email*', autocomplete: 'email' },
                { name: 'personnelPhone', label: 'Phone Number', type: 'tel', required: true, placeholder: 'Phone Number*', autocomplete: 'tel' },
                { name: 'personnelPhoneExt', label: 'Phone Extension (optional)', type: 'text', required: false, placeholder: 'Phone Extension (optional)', autocomplete: 'tel-extension' }
            ]
        },
        {
            title: 'Search for your school:',
            fields: [
                { name: 'schoolName', label: 'School Name', type: 'text', required: true, placeholder: 'School Name*', autocomplete: 'organization' }
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
                { name: 'parentFirstName', label: 'First Name', type: 'text', required: true, autocomplete: 'given-name' },
                { name: 'parentLastName', label: 'Last Name', type: 'text', required: true, autocomplete: 'family-name' },
                { name: 'parentEmail', label: 'Email', type: 'email', required: true, autocomplete: 'email' },
                { name: 'parentPhone', label: 'Phone Number', type: 'tel', required: true, pattern: '[0-9]{10}', autocomplete: 'tel' },
                { name: 'relationshipToStudent', label: 'Relationship to Student', type: 'text', required: true, autocomplete: 'off' }
            ]
        },
        {
            title: 'Student Information',
            fields: [
                { name: 'studentFirstName', label: 'Student First Name', type: 'text', required: true, autocomplete: 'off' },
                { name: 'studentLastName', label: 'Student Last Name', type: 'text', required: true, autocomplete: 'off' },
                { name: 'studentAge', label: 'Student Age', type: 'number', required: true, min: 12, max: 19, autocomplete: 'off' },
                { name: 'schoolName', label: 'School Name', type: 'text', required: true, autocomplete: 'organization' }
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
                { name: 'studentFirstName', label: 'First Name', type: 'text', required: true, autocomplete: 'given-name' },
                { name: 'studentLastName', label: 'Last Name', type: 'text', required: true, autocomplete: 'family-name' },
                { name: 'studentEmail', label: 'Email (optional)', type: 'email', required: false, autocomplete: 'email' },
                { name: 'studentPhone', label: 'Phone Number', type: 'tel', required: true, pattern: '[0-9]{10}', autocomplete: 'tel' },
                { name: 'studentAge', label: 'Age', type: 'number', required: true, min: 12, max: 19, autocomplete: 'off' }
            ]
        },
        {
            title: 'School Information',
            fields: [
                { name: 'schoolName', label: 'School Name', type: 'text', required: true, autocomplete: 'organization' },
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
let currentUserType = null;
let currentStep = 0;
let formData = {};

const userTypeSelector = document.getElementById('userTypeSelector');
const formContainer = document.getElementById('formContainer');
const enrollmentForm = document.getElementById('enrollmentForm');
const progressFill = document.getElementById('progressFill');
const progressSteps = document.getElementById('progressSteps');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');

// ========================================
// User Type Selection
// ========================================
if (userTypeSelector) {
    const userTypeCards = userTypeSelector.querySelectorAll('.user-type-card');
    
    userTypeCards.forEach(card => {
        card.addEventListener('click', () => {
            const userType = card.dataset.type;
            initializeForm(userType);
        });
    });
}

// ========================================
// Form Initialization
// ========================================
function initializeForm(userType) {
    currentUserType = userType;
    currentStep = 0;
    formData = { userType: userType };
    
    userTypeSelector.style.display = 'none';
    formContainer.style.display = 'block';
    
    renderProgressSteps();
    renderFormStep();
    updateProgress();
}

function renderProgressSteps() {
    const steps = formSteps[currentUserType];
    progressSteps.innerHTML = '';
    
    steps.forEach((step, index) => {
        const stepEl = document.createElement('div');
        stepEl.className = 'progress-step';
        stepEl.textContent = step.title;
        if (index === 0) stepEl.classList.add('active');
        progressSteps.appendChild(stepEl);
    });
}

function renderFormStep() {
    const steps = formSteps[currentUserType];
    const step = steps[currentStep];
    
    enrollmentForm.innerHTML = '';
    
    const stepTitle = document.createElement('h3');
    stepTitle.textContent = step.title;
    stepTitle.style.marginBottom = 'var(--spacing-lg)';
    enrollmentForm.appendChild(stepTitle);
    
    const stepDiv = document.createElement('div');
    stepDiv.className = 'form-step active';
    
    step.fields.forEach(field => {
        const formGroup = createFormField(field);
        stepDiv.appendChild(formGroup);
    });
    
    enrollmentForm.appendChild(stepDiv);
}

function createFormField(field) {
    const formGroup = document.createElement('div');
    formGroup.className = 'form-group';
    
    const label = document.createElement('label');
    label.htmlFor = field.name;
    label.textContent = field.label;
    if (field.required) label.innerHTML += ' <span style="color: var(--error-color);">*</span>';
    formGroup.appendChild(label);
    
    let input;
    
    switch (field.type) {
        case 'textarea':
            input = document.createElement('textarea');
            input.id = field.name;
            input.name = field.name;
            input.placeholder = field.placeholder || '';
            break;
            
        case 'select':
            input = document.createElement('select');
            input.id = field.name;
            input.name = field.name;
            field.options.forEach(option => {
                const opt = document.createElement('option');
                opt.value = option.value;
                opt.textContent = option.label;
                input.appendChild(opt);
            });
            break;
            
        case 'radio':
            const radioGroup = document.createElement('div');
            radioGroup.style.display = 'flex';
            radioGroup.style.flexDirection = 'column';
            radioGroup.style.gap = 'var(--spacing-sm)';
            
            field.options.forEach(option => {
                const radioLabel = document.createElement('label');
                radioLabel.style.display = 'flex';
                radioLabel.style.alignItems = 'center';
                radioLabel.style.cursor = 'pointer';
                
                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.name = field.name;
                radioInput.value = option.value;
                radioInput.style.marginRight = 'var(--spacing-xs)';
                
                radioLabel.appendChild(radioInput);
                radioLabel.appendChild(document.createTextNode(option.label));
                radioGroup.appendChild(radioLabel);
            });
            
            formGroup.appendChild(radioGroup);
            return formGroup;
            
        case 'checkbox':
            const checkboxLabel = document.createElement('label');
            checkboxLabel.style.display = 'flex';
            checkboxLabel.style.alignItems = 'center';
            checkboxLabel.style.cursor = 'pointer';
            
            input = document.createElement('input');
            input.type = 'checkbox';
            input.id = field.name;
            input.name = field.name;
            input.style.marginRight = 'var(--spacing-sm)';
            input.style.width = 'auto';
            
            checkboxLabel.appendChild(input);
            checkboxLabel.appendChild(document.createTextNode(field.label));
            formGroup.innerHTML = '';
            formGroup.appendChild(checkboxLabel);
            
            const error = document.createElement('div');
            error.className = 'error';
            error.textContent = 'This field is required';
            formGroup.appendChild(error);
            
            return formGroup;
            
        default:
            input = document.createElement('input');
            input.type = field.type;
            input.id = field.name;
            input.name = field.name;
            input.placeholder = field.placeholder || '';
            if (field.pattern) input.pattern = field.pattern;
            if (field.min) input.min = field.min;
            if (field.max) input.max = field.max;
            if (field.autocomplete) input.autocomplete = field.autocomplete;
            
            // Add datalist for school name field
            if (field.name === 'schoolName' && typeof californiaSchools !== 'undefined') {
                const datalist = document.createElement('datalist');
                datalist.id = 'schools-list';
                
                californiaSchools.forEach(school => {
                    const option = document.createElement('option');
                    option.value = school.name;
                    option.textContent = `${school.name} - ${school.district}`;
                    datalist.appendChild(option);
                });
                
                input.setAttribute('list', 'schools-list');
                formGroup.appendChild(datalist);
                
                // Auto-fill district, city, zip when school is selected
                input.addEventListener('change', (e) => {
                    const selectedSchool = californiaSchools.find(s => s.name === e.target.value);
                    if (selectedSchool) {
                        const districtField = document.getElementById('schoolDistrict');
                        const cityField = document.getElementById('schoolCity');
                        const zipField = document.getElementById('schoolZip');
                        
                        if (districtField) districtField.value = selectedSchool.district;
                        if (cityField) cityField.value = selectedSchool.city;
                        if (zipField) zipField.value = selectedSchool.zip;
                    }
                });
            }
    }
    
    if (field.required && field.type !== 'checkbox') {
        input.required = true;
    }
    
    // Restore saved value if exists
    if (formData[field.name]) {
        input.value = formData[field.name];
    }
    
    formGroup.appendChild(input);
    
    const error = document.createElement('div');
    error.className = 'error';
    error.textContent = 'This field is required';
    formGroup.appendChild(error);
    
    return formGroup;
}

// ========================================
// Form Navigation
// ========================================
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            saveCurrentStepData();
            currentStep--;
            renderFormStep();
            updateProgress();
        }
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        if (validateCurrentStep()) {
            saveCurrentStepData();
            const steps = formSteps[currentUserType];
            
            if (currentStep < steps.length - 1) {
                currentStep++;
                renderFormStep();
                updateProgress();
            }
        }
    });
}

if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (validateCurrentStep()) {
            saveCurrentStepData();
            submitForm();
        }
    });
}

function saveCurrentStepData() {
    const inputs = enrollmentForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            formData[input.name] = input.checked;
        } else if (input.type === 'radio') {
            if (input.checked) {
                formData[input.name] = input.value;
            }
        } else {
            formData[input.name] = input.value;
        }
    });
}

function validateCurrentStep() {
    let isValid = true;
    const inputs = enrollmentForm.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        const formGroup = input.closest('.form-group');
        
        if (input.type === 'checkbox') {
            if (!input.checked) {
                formGroup.classList.add('has-error');
                isValid = false;
            } else {
                formGroup.classList.remove('has-error');
            }
        } else if (input.type === 'radio') {
            const radioGroup = input.closest('.form-group');
            const checkedRadio = radioGroup.querySelector('input[type="radio"]:checked');
            if (!checkedRadio) {
                radioGroup.classList.add('has-error');
                isValid = false;
            } else {
                radioGroup.classList.remove('has-error');
            }
        } else {
            if (!input.value.trim()) {
                formGroup.classList.add('has-error');
                isValid = false;
            } else {
                formGroup.classList.remove('has-error');
            }
        }
    });
    
    return isValid;
}

function updateProgress() {
    const steps = formSteps[currentUserType];
    const progress = ((currentStep + 1) / steps.length) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Update progress step indicators
    const stepElements = progressSteps.querySelectorAll('.progress-step');
    stepElements.forEach((el, index) => {
        el.classList.remove('active', 'completed');
        if (index < currentStep) {
            el.classList.add('completed');
        } else if (index === currentStep) {
            el.classList.add('active');
        }
    });
    
    // Update button visibility
    prevBtn.style.display = currentStep > 0 ? 'block' : 'none';
    
    if (currentStep === steps.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
}

function submitForm() {
    console.log('Form submitted:', formData);
    
    // Send data to HubSpot
    submitToHubSpot(formData);
    
    // Redirect to thank you page
    window.location.href = 'thank-you.html';
}

// ========================================
// HubSpot Integration
// ========================================
// Configuration can be set in js/hubspot-config.js or directly here
let HUBSPOT_CONFIG = {
    portalId: 'YOUR_PORTAL_ID',
    formGuid: 'YOUR_FORM_GUID',
    debug: true,
    fieldMappings: {}
};

// Load external config if available
if (typeof window.HUBSPOT_CONFIG !== 'undefined') {
    HUBSPOT_CONFIG = { ...HUBSPOT_CONFIG, ...window.HUBSPOT_CONFIG };
}

async function submitToHubSpot(data) {
    // If HubSpot credentials are not configured, skip submission
    if (HUBSPOT_CONFIG.portalId === 'YOUR_PORTAL_ID' || HUBSPOT_CONFIG.formGuid === 'YOUR_FORM_GUID') {
        if (HUBSPOT_CONFIG.debug) {
            console.log('⚠️ HubSpot integration not configured. Form data:', data);
            console.log('To configure HubSpot:');
            console.log('1. Open js/hubspot-config.js');
            console.log('2. Replace YOUR_PORTAL_ID with your HubSpot Portal ID');
            console.log('3. Replace YOUR_FORM_GUID with your HubSpot Form GUID');
        }
        return;
    }
    
    try {
        const hubspotUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_CONFIG.portalId}/${HUBSPOT_CONFIG.formGuid}`;
        
        // Map form fields to HubSpot properties using field mappings if provided
        const fields = Object.keys(data).map(key => {
            const mappedName = HUBSPOT_CONFIG.fieldMappings[key] || key;
            return {
                name: mappedName,
                value: String(data[key])
            };
        });
        
        const hubspotData = {
            fields: fields,
            context: {
                pageUri: window.location.href,
                pageName: document.title,
                hutk: getCookie('hubspotutk') // HubSpot tracking cookie
            },
            legalConsentOptions: {
                consent: {
                    consentToProcess: true,
                    text: "I agree to allow YVAPE to store and process my personal data.",
                    communications: [
                        {
                            value: true,
                            subscriptionTypeId: 999,
                            text: "I agree to receive marketing communications from YVAPE."
                        }
                    ]
                }
            }
        };
        
        if (HUBSPOT_CONFIG.debug) {
            console.log('📤 Submitting to HubSpot:', hubspotData);
        }
        
        const response = await fetch(hubspotUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(hubspotData)
        });
        
        if (response.ok) {
            const result = await response.json();
            if (HUBSPOT_CONFIG.debug) {
                console.log('✅ Successfully submitted to HubSpot:', result);
            }
            
            // Fire custom event for tracking
            if (typeof window.dataLayer !== 'undefined') {
                window.dataLayer.push({
                    event: 'formSubmission',
                    formType: data.userType,
                    formName: 'YVAPE Enrollment'
                });
            }
        } else {
            const errorText = await response.text();
            console.error('❌ HubSpot submission failed:', errorText);
            
            // Still allow form to redirect even if HubSpot fails
            if (HUBSPOT_CONFIG.debug) {
                console.log('Continuing to thank you page despite HubSpot error');
            }
        }
    } catch (error) {
        console.error('❌ Error submitting to HubSpot:', error);
        
        // Still allow form to redirect even if HubSpot fails
        if (HUBSPOT_CONFIG.debug) {
            console.log('Continuing to thank you page despite error');
        }
    }
}

// Helper function to get cookies
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
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