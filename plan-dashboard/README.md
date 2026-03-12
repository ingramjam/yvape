# YVAPE Project Plan Dashboard

An interactive HTML dashboard for tracking the YVAPE platform build-out, complete with project phases, tasks, team assignments, and California youth substance use research.

## Features

### 📋 Project Plan Tab
- **6 Phases** with detailed task breakdowns
- **23 Total Tasks** with:
  - Task descriptions and owner assignments
  - Duration estimates
  - Completion status tracking
  - Task dependencies visualized
  - Links to relevant documentation and resources
- **Interactive Task Tracking:**
  - Check off tasks as completed (auto-saves to browser)
  - View progress per phase
  - Export progress as JSON for sharing
- **Phase Navigation:**
  - Click to expand/collapse phase details
  - See completed task count per phase
  - View team owner and timeline for each phase

### 📊 Research & Facts Tab
- **California Youth Substance Use Statistics** (12-19 year olds):
  - Nicotine vaping prevalence & trends
  - Marijuana usage rates & trends
  - THC vaping data
  - Health effects information
  - Brain development impacts
  - Evidence-based intervention success rates
  
- **15 Detailed Fact Cards** with:
  - Key statistics
  - Demographics
  - Trend analysis
  - Source citations with links
  
- **5 Primary Research Sources:**
  - CDC Youth Risk Behavior Survey
  - California Healthy Kids Survey
  - SAMHSA National Survey
  - California Department of Public Health
  - NIH Monitoring the Future Survey

## File Structure

```
plan-dashboard/
├── index.html              # Main dashboard page
├── css/
│   └── dashboard.css       # All styling
├── js/
│   └── dashboard.js        # Interactive functionality
├── data/
│   ├── plan-phases.json    # Project phases, tasks, dependencies
│   └── research.json       # California youth substance use data
└── README.md               # This file
```

## Getting Started

1. **Open in Browser:**
   ```bash
   open plan-dashboard/index.html
   ```
   Or open directly: `file:///path/to/yvape/plan-dashboard/index.html`

2. **Navigate Tabs:**
   - Click "📋 Project Plan" to view/track the build-out plan
   - Click "📊 Research & Facts" to view substance use research

3. **Track Progress:**
   - Check off tasks as your team completes them
   - Progress automatically saves to your browser
   - Use "Export Progress" button to share status with team

## Data Files

### plan-phases.json
Contains:
- Project metadata (timeline, team size, status)
- 6 phases with descriptions
- 23 tasks with:
  - Descriptions, owners, durations
  - Dependencies between tasks
  - Links to documentation
  - Approval status
- Team roles and responsibilities
- Risk analysis
- Dependency mapping

### research.json
Contains:
- 15 key facts about California youth vaping/marijuana use
- Demographics and statistics (12-19 year olds)
- Trend data and analysis
- 5+ research sources with links
- Contextual information about California's landscape

## Customization

### Update Project Plan
Edit `data/plan-phases.json` to:
- Add/remove phases or tasks
- Adjust timelines
- Update team assignments
- Add new dependencies
- Change documentation links

### Update Research Data
Edit `data/research.json` to:
- Add new fact cards
- Update statistics
- Add research sources
- Modify trend data

### Styling
Edit `css/dashboard.css` to:
- Change color scheme (currently purple/blue gradient)
- Adjust responsive breakpoints
- Modify card styles
- Update typography

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (v90+)
- Firefox (v88+)
- Safari (v14+)

Local storage is used to persist task completion and tab preferences. No backend required.

## Local Storage

The dashboard saves to browser local storage:
- `completedTasks` — Array of task IDs marked as complete
- `openPhases` — Array of phase IDs currently expanded
- `activeTab` — Currently active tab index

Clear local storage to reset progress:
```javascript
localStorage.clear();
```

Or use the "Reset Progress" button in the dashboard.

## Exporting Progress

Click "Export Progress" to download a JSON file containing:
- Export timestamp
- List of completed task IDs
- List of open phase IDs
- Can be shared with your team or archived

## Team Usage

### For Project Managers
- Share dashboard URL with team
- Track overall progress via phase completion %
- Export weekly/monthly progress reports
- Monitor task dependencies

### For Developers
- Review technical tasks and dependencies
- Check documentation links
- See required duration estimates
- Track which aspects are blocking other work

### For Communications Team
- View creative tasks and timelines
- See milestones for email campaigns
- Understand how their work integrates

## Notes

- All dates are relative to project start (April 2026)
- Tasks marked "approved" indicate sign-off from stakeholders
- Dependencies are listed to help with task sequencing
- Links open in new tabs (external URLs)
- Responsive design works on mobile, tablet, and desktop

## License

Part of the YVAPE project. See main repo README for details.

---

**Questions or updates needed?** Edit the JSON files in the `data/` folder and the page will refresh with your changes.
