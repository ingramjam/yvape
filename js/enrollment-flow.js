// ========================================
// YVAPE School Enrollment Form Flow
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Form state
    let schoolPersonnelData = {};
    let currentStudentData = {};
    
    // Populate schools datalist
    if (typeof californiaSchools !== 'undefined') {
        const datalist = document.getElementById('schools-list');
        californiaSchools.forEach(school => {
            const option = document.createElement('option');
            option.value = school.name;
            option.textContent = `${school.name} - ${school.district}`;
            datalist.appendChild(option);
        });
    }

    // Set max date for DOB (today)
    const studentDOB = document.getElementById('studentDOB');
    if (studentDOB) {
        const today = new Date().toISOString().split('T')[0];
        studentDOB.setAttribute('max', today);
    }

    // Set today's date as default for referral date
    const referralDate = document.getElementById('referralDate');
    if (referralDate) {
        const today = new Date().toISOString().split('T')[0];
        referralDate.value = today;
    }

    // ========================================
    // STEP 1: School Personnel Form
    // ========================================
    const personnelForm = document.getElementById('personnelForm');
    if (personnelForm) {
        personnelForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Save personnel data
            schoolPersonnelData = {
                firstName: document.getElementById('personnelFirstName').value,
                lastName: document.getElementById('personnelLastName').value,
                email: document.getElementById('personnelEmail').value,
                phone: document.getElementById('personnelPhone').value,
                extension: document.getElementById('personnelExtension').value,
                schoolName: document.getElementById('schoolName').value,
                postalCode: document.getElementById('postalCode').value,
                purpose: document.querySelector('input[name="purpose"]:checked').value
            };

            // Check purpose
            if (schoolPersonnelData.purpose === 'info') {
                // Send to HubSpot for "receive more info"
                sendInfoRequestToHubSpot(schoolPersonnelData);
                
                // Show thank you message
                showStep('step2Info');
            } else {
                // Proceed to consent form
                showStep('step2Consent');
            }
        });
    }

    // ========================================
    // STEP 2: Consent Form
    // ========================================
    const consentForm = document.getElementById('consentForm');
    if (consentForm) {
        consentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const consentCheckbox = document.getElementById('consentCheckbox');
            if (!consentCheckbox.checked) {
                alert('You must check the consent box to proceed.');
                return;
            }
            
            // Proceed to student information form
            showStep('step3Student');
        });
    }

    // ========================================
    // STEP 3: Student Information Form
    // ========================================
    const studentForm = document.getElementById('studentForm');
    if (studentForm) {
        // Monitor DOB to show/hide parent section
        studentDOB.addEventListener('change', () => {
            const dob = new Date(studentDOB.value);
            const today = new Date();
            const age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
            
            const parentSection = document.getElementById('parentSection');
            const parentInputs = parentSection.querySelectorAll('input, select');
            
            if (age < 18) {
                parentSection.style.display = 'block';
                // Make parent fields required
                parentInputs.forEach(input => {
                    if (input.id !== 'parentLanguage') {
                        input.setAttribute('required', 'required');
                    }
                });
            } else {
                parentSection.style.display = 'none';
                // Remove required from parent fields
                parentInputs.forEach(input => {
                    input.removeAttribute('required');
                    input.value = '';
                });
            }
        });

        // Validate products checkboxes
        function validateProducts() {
            const checkboxes = document.querySelectorAll('input[name="products"]:checked');
            const productsError = document.getElementById('productsError');
            
            if (checkboxes.length === 0) {
                productsError.style.display = 'block';
                return false;
            } else {
                productsError.style.display = 'none';
                return true;
            }
        }

        // Enroll Another Student button
        document.getElementById('enrollAnotherBtn').addEventListener('click', () => {
            if (!validateProducts()) {
                return;
            }
            
            if (studentForm.checkValidity()) {
                // Collect and submit student data
                collectAndSubmitStudentData(false);
                
                // Reset student form
                studentForm.reset();
                document.getElementById('parentSection').style.display = 'none';
                
                // Set today's date again
                const today = new Date().toISOString().split('T')[0];
                document.getElementById('referralDate').value = today;
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                studentForm.reportValidity();
            }
        });

        // Submit form
        studentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!validateProducts()) {
                return;
            }
            
            // Collect and submit student data
            collectAndSubmitStudentData(true);
            
            // Show confirmation
            showStep('step4Confirmation');
        });
    }

    // ========================================
    // Helper Functions
    // ========================================
    
    function showStep(stepId) {
        // Hide all steps
        document.querySelectorAll('.form-step').forEach(step => {
            step.classList.remove('active');
        });
        
        // Show target step
        document.getElementById(stepId).classList.add('active');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function collectAndSubmitStudentData(isFinalSubmit) {
        // Collect products
        const products = Array.from(document.querySelectorAll('input[name="products"]:checked'))
            .map(cb => cb.value);

        // Collect parent data if shown
        const parentSection = document.getElementById('parentSection');
        const includeParent = parentSection.style.display !== 'none';

        currentStudentData = {
            firstName: document.getElementById('studentFirstName').value,
            lastName: document.getElementById('studentLastName').value,
            preferredName: document.getElementById('studentPreferredName').value,
            dob: document.getElementById('studentDOB').value,
            grade: document.getElementById('studentGrade').value,
            email: document.getElementById('studentEmail').value,
            phone: document.getElementById('studentPhone').value,
            language: document.getElementById('studentLanguage').value,
            products: products,
            referralReason: document.getElementById('referralReason').value,
            referralDate: document.getElementById('referralDate').value,
            parent: includeParent ? {
                firstName: document.getElementById('parentFirstName').value,
                lastName: document.getElementById('parentLastName').value,
                email: document.getElementById('parentEmail').value,
                phone: document.getElementById('parentPhone').value,
                language: document.getElementById('parentLanguage').value
            } : null
        };

        // Combine with personnel data
        const fullSubmission = {
            schoolPersonnel: schoolPersonnelData,
            student: currentStudentData,
            timestamp: new Date().toISOString()
        };

        // Send to HubSpot
        sendEnrollmentToHubSpot(fullSubmission);

        console.log('Student enrolled:', fullSubmission);
    }

    function sendInfoRequestToHubSpot(data) {
        console.log('Sending info request to HubSpot:', data);
        
        // TODO: Implement actual HubSpot API call
        // This would trigger:
        // 1. Add contact to HubSpot database
        // 2. Send automated welcome email
        // 3. Send notification email to Conley
        
        // Example HubSpot tracking
        if (typeof _hsq !== 'undefined') {
            _hsq.push(['identify', {
                email: data.email,
                firstname: data.firstName,
                lastname: data.lastName,
                phone: data.phone,
                school_name: data.schoolName,
                postal_code: data.postalCode
            }]);
            
            _hsq.push(['trackEvent', {
                id: 'Info Request Submitted',
                value: data.schoolName
            }]);
        }
    }

    function sendEnrollmentToHubSpot(data) {
        console.log('Sending enrollment to HubSpot:', data);
        
        // TODO: Implement actual HubSpot API call
        // This would trigger:
        // 1. Create/update student contact in HubSpot
        // 2. Create/update parent contact (if applicable)
        // 3. Send confirmation email to school staff
        // 4. Send enrollment notification to student
        // 5. Send text to student
        // 6. Send notification to parent (if student 12-17)
        // 7. Send notification to Brianna and Conley
        
        // Example HubSpot tracking
        if (typeof _hsq !== 'undefined') {
            _hsq.push(['identify', {
                email: data.student.email,
                firstname: data.student.firstName,
                lastname: data.student.lastName,
                phone: data.student.phone
            }]);
            
            _hsq.push(['trackEvent', {
                id: 'Student Enrolled',
                value: data.schoolPersonnel.schoolName
            }]);
        }
    }
});
