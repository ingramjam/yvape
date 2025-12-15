// ========================================
// HubSpot Form Configuration
// ========================================
// Instructions:
// 1. Log in to your HubSpot account
// 2. Navigate to Marketing > Lead Capture > Forms
// 3. Create or select your form
// 4. Click "Share" or "Embed" to get the Form GUID
// 5. Your Portal ID can be found in your HubSpot account settings or in the embed code
// 6. Replace the placeholder values below with your actual credentials

window.HUBSPOT_CONFIG = {
    // Replace with your HubSpot Portal ID (8-digit number)
    portalId: 'YOUR_PORTAL_ID',
    
    // Replace with your HubSpot Form GUID (UUID format)
    formGuid: 'YOUR_FORM_GUID',
    
    // Optional: Enable debug logging
    debug: true,
    
    // Optional: Custom field mappings if your HubSpot field names differ
    // Format: { formFieldName: 'hubspot_field_name' }
    fieldMappings: {
        // Example mappings (customize as needed):
        'personnelFirstName': 'firstname',
        'personnelLastName': 'lastname',
        'personnelEmail': 'email',
        'personnelPhone': 'phone',
        'personnelPhoneExt': 'phone_extension',
        'schoolName': 'company',
        'enrollmentPurpose': 'enrollment_purpose',
        
        'parentFirstName': 'firstname',
        'parentLastName': 'lastname',
        'parentEmail': 'email',
        'parentPhone': 'phone',
        'relationshipToStudent': 'relationship_to_student',
        
        'studentFirstName': 'student_firstname',
        'studentLastName': 'student_lastname',
        'studentEmail': 'student_email',
        'studentPhone': 'student_phone',
        'studentAge': 'student_age',
        'grade': 'grade_level',
        'studentConsent': 'student_consent',
        'preferredContact': 'preferred_contact_method',
        'bestTimeToContact': 'best_time_to_contact',
        
        'parentConsent': 'parent_consent',
        'understandPrivacy': 'understand_privacy'
    }
};
