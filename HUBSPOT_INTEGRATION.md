# YVAPE - HubSpot Form Integration

## Overview
The YVAPE enrollment forms are now integrated with HubSpot Forms API, allowing automatic submission of form data to your HubSpot CRM.

## Features
- ✅ Autofill enabled on all form fields
- ✅ HubSpot Forms API integration
- ✅ Automatic field mapping
- ✅ Debug logging for troubleshooting
- ✅ Graceful fallback if HubSpot is unavailable
- ✅ Tracking cookie support (hutk)
- ✅ Google Analytics/GTM event tracking

## Setup Instructions

### 1. Get Your HubSpot Credentials

1. Log in to your HubSpot account
2. Navigate to **Marketing > Lead Capture > Forms**
3. Create a new form or select an existing form
4. Click **Share** or **Embed** button
5. Look for the embed code which contains:
   - **Portal ID**: An 8-digit number (e.g., `12345678`)
   - **Form GUID**: A UUID format string (e.g., `abcd1234-ef56-7890-ghij-klmnopqrstuv`)

### 2. Configure the Integration

Open `js/hubspot-config.js` and replace the placeholder values:

```javascript
window.HUBSPOT_CONFIG = {
    portalId: '12345678',  // Replace with your Portal ID
    formGuid: 'abcd1234-ef56-7890-ghij-klmnopqrstuv',  // Replace with your Form GUID
    debug: true,  // Set to false in production to reduce console output
    fieldMappings: {
        // Customize field mappings as needed
    }
};
```

### 3. Create HubSpot Form Properties

In your HubSpot form, create the following custom properties to match the enrollment form fields:

#### School Personnel Fields:
- `firstname` - Single-line text
- `lastname` - Single-line text
- `email` - Email
- `phone` - Phone number
- `phone_extension` - Single-line text
- `company` - Single-line text (school name)
- `enrollment_purpose` - Dropdown (enroll, information)

#### Parent/Guardian Fields:
- `relationship_to_student` - Single-line text
- `student_firstname` - Single-line text
- `student_lastname` - Single-line text
- `student_age` - Number
- `parent_consent` - Checkbox
- `understand_privacy` - Checkbox

#### Student Fields:
- `student_email` - Email
- `student_phone` - Phone number
- `grade_level` - Dropdown (6-12)
- `student_consent` - Checkbox
- `preferred_contact_method` - Dropdown (phone, video)
- `best_time_to_contact` - Dropdown (morning, afternoon, evening)

### 4. Test the Integration

1. Open the website in a browser
2. Open the browser's Developer Console (F12)
3. Fill out and submit the enrollment form
4. Look for console messages:
   - ⚠️ Yellow warning if not configured
   - 📤 Blue message showing data being sent
   - ✅ Green success message if submitted successfully
   - ❌ Red error message if submission failed

5. Check your HubSpot account under **Contacts** to verify the submission

## Field Mapping

The `fieldMappings` object in `hubspot-config.js` allows you to map form field names to HubSpot property names. This is useful if your HubSpot property names differ from the form field names.

Example:
```javascript
fieldMappings: {
    'personnelFirstName': 'firstname',  // Form field -> HubSpot property
    'schoolName': 'company'
}
```

## Autofill Support

All form fields now include appropriate `autocomplete` attributes:
- `given-name` - First name
- `family-name` - Last name
- `email` - Email address
- `tel` - Phone number
- `tel-extension` - Phone extension
- `organization` - School name

This allows browsers to automatically fill in previously entered data, improving user experience.

## Troubleshooting

### Form submissions not appearing in HubSpot
1. Verify your Portal ID and Form GUID are correct
2. Check browser console for error messages
3. Ensure your HubSpot form has all required properties created
4. Check that CORS is properly configured in HubSpot (should be automatic)

### Console shows "HubSpot integration not configured"
- You need to replace `YOUR_PORTAL_ID` and `YOUR_FORM_GUID` in `js/hubspot-config.js`

### Fields not mapping correctly
- Update the `fieldMappings` object to match your HubSpot property names
- Check that property names in HubSpot match exactly (case-sensitive)

## Production Deployment

Before deploying to production:

1. Set `debug: false` in `hubspot-config.js` to reduce console logging
2. Test all form types (School Personnel, Parent, Student)
3. Verify data appears correctly in HubSpot
4. Set up HubSpot workflows for follow-up emails
5. Configure HubSpot notifications for new submissions

## Data Flow

1. User fills out multi-step enrollment form
2. Data is collected and validated at each step
3. On final submission:
   - Form data is sent to HubSpot via API
   - User is redirected to thank you page
   - HubSpot creates/updates contact record
   - HubSpot workflows are triggered (if configured)

## Support

For questions about:
- **HubSpot setup**: Contact HubSpot Support or check HubSpot Documentation
- **Form functionality**: Check browser console for errors
- **Field mapping**: Review `js/hubspot-config.js` configuration

## Notes

- Form will still redirect to thank you page even if HubSpot submission fails
- All submissions are logged to console when debug mode is enabled
- The integration uses HubSpot Forms API v3
- CORS is automatically handled by HubSpot's API
