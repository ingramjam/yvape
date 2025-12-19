# YVAPE Website with HubSpot Integration - Development Workspace

## Project Overview
Static HTML/CSS/JS website for YVAPE (youth vaping prevention education) with HubSpot Forms API integration for enrollment forms.

## Project Structure
- HTML pages (index.html, about.html, videos.html, resources.html, contact.html, etc.)
- CSS styling in `/css` directory
- JavaScript in `/js` directory
- Spanish translations in `/es` directory
- Images and videos in respective directories

## HubSpot Integration
- **Integration Guide**: See `HUBSPOT_INTEGRATION.md`
- **Config File**: `js/hubspot-config.js`
- **Form Types**: School Personnel, Parent/Guardian, Student enrollment forms
- **API**: HubSpot Forms API for CRM submissions

## Development Guidelines

### Working with HTML
- Maintain responsive design for mobile devices
- Preserve existing hyperlinks to external resources
- Keep multi-step form functionality intact
- Test forms in browser with Developer Console open

### Brand Colors
- Primary Blue: #00A6CE
- Orange: #F7941D
- Green: #8DC63F
- Pink: #E91E63
- Pink Light: #F48FB1

### HubSpot Configuration
- Portal ID and Form GUID stored in `js/hubspot-config.js`
- Field mappings connect form fields to HubSpot properties
- Debug mode available for testing (set `debug: true` in config)
- Graceful fallback if HubSpot is unavailable

### Testing
1. Use Live Server or similar tool to test locally
2. Open browser Developer Console (F12) for HubSpot debug messages
3. Test all form types (School, Parent, Student)
4. Verify form submissions appear in HubSpot CRM

### Git Workflow
- Repository: https://github.com/ingramjam/yvape
- Branch: main
- Commit changes with descriptive messages
- Test before pushing to production

## Common Tasks

### Test the website locally
Use Live Server extension or Python's HTTP server

### Update HubSpot credentials
Edit `js/hubspot-config.js` with Portal ID and Form GUID

### Add new form fields
1. Add HTML field to form
2. Add field mapping in `hubspot-config.js`
3. Create corresponding property in HubSpot form
4. Test submission

### Translate content
Add Spanish translations to files in `/es` directory

## Security Notes
- Keep HubSpot Portal ID and Form GUID secure
- Do not commit sensitive API keys to repository
- Use environment-specific configs for production vs development

## Resources
- HubSpot Forms API: https://developers.hubspot.com/docs/api/marketing/forms
- Kick It California: https://www.kickitca.org
- YVAPE: https://yvape.org
