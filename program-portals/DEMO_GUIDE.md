# 🎬 YVAPE Program Portals - Demo Guide

## Quick Demo Setup (5 minutes)

### Prerequisites
- PostgreSQL database running
- Environment variables configured in `.env.local`

### Setup Steps

1. **Install dependencies** (if not done):
   ```bash
   npm install
   ```

2. **Set up database**:
   ```bash
   # Push schema to database
   npm run db:push
   
   # Seed with demo data
   npm run db:seed
   ```

3. **Start the application**:
   ```bash
   npm run dev
   ```

4. **Open in browser**: http://localhost:3000

---

## 🎭 Demo Scenarios

### Scenario 1: Admin Portal Tour (5 min)

**Login**: Use magic link with `admin@lincolnhs.edu`

**What to show**:
- ✅ **Dashboard Overview**
  - Student enrollment stats
  - Program completion rates
  - Recent activity feed

- ✅ **Student Management**
  - View all enrolled students
  - See individual progress (Alex at 40%, Jordan just started, Taylor completed)
  - Export student data

- ✅ **Reporting**
  - Generate completion reports
  - Track engagement metrics
  - Email history

**Key talking points**:
- "Admins can monitor all students in real-time"
- "Easy to identify students who need support"
- "One-click enrollment process with automatic parent notifications"

---

### Scenario 2: Student Portal Tour (5 min)

**Login**: Use magic link with `alex.rivera@student.com`

**What to show**:
- ✅ **Welcome Dashboard**
  - Personalized greeting
  - Progress visualization (2 of 5 steps complete)
  - Next step highlighted

- ✅ **Program Modules**
  - Interactive step-by-step curriculum
  - Video content integration
  - Progress tracking

- ✅ **Profile & Settings**
  - Student information
  - Contact preferences
  - Language options

**Key talking points**:
- "Students see their progress clearly"
- "Mobile-friendly design for access anywhere"
- "Educational content delivered in digestible modules"

---

### Scenario 3: End-to-End Workflow (10 min)

**Show complete student journey**:

1. **Enrollment** (Admin Portal)
   - Admin adds new student
   - System sends welcome emails to student & parent
   - Student account created automatically

2. **Student Onboarding** (Student Portal)
   - Student receives magic link email
   - Clicks link, no password needed
   - Lands on personalized dashboard

3. **Progress Through Program**
   - Complete Step 1: Orientation
   - Watch educational video
   - Activity logged automatically

4. **Admin Monitoring**
   - Admin sees real-time update
   - Views completion percentage
   - Accesses detailed activity log

5. **Completion & Reporting**
   - Student finishes final assessment
   - Certificate generated
   - Reports exported for records

---

## 📊 Demo Data Overview

### Schools
- **Lincoln High School** (San Francisco, CA)
- **Washington Academy** (Oakland, CA)

### Admin Accounts
| Name | Email | School |
|------|-------|--------|
| Sarah Johnson | admin@lincolnhs.edu | Lincoln High |
| Michael Chen | admin@washingtonacademy.edu | Washington Academy |

### Student Accounts
| Name | Email | Progress | Status |
|------|-------|----------|--------|
| Alex Rivera | alex.rivera@student.com | 40% | In Progress |
| Jordan Lee | jordan.lee@student.com | 20% | Just Started |
| Taylor Smith | taylor.smith@student.com | 100% | Completed |

### Program Steps
1. Welcome & Orientation
2. Health Impact Education
3. Coping Strategies
4. Peer Pressure & Social Skills
5. Final Assessment & Commitment

---

## 💡 Key Features to Highlight

### For Administrators
- ✅ **Zero-friction onboarding** - Magic link authentication
- ✅ **Real-time dashboards** - Monitor all students instantly
- ✅ **Automated communications** - Email notifications to students & parents
- ✅ **Comprehensive reporting** - Export data for compliance
- ✅ **Multi-school support** - Manage multiple institutions

### For Students
- ✅ **Mobile-first design** - Access on any device
- ✅ **No password hassles** - Magic link login
- ✅ **Clear progress tracking** - Know exactly where you stand
- ✅ **Engaging content** - Videos, quizzes, interactive modules
- ✅ **Bilingual support** - English and Spanish options

### Technical Highlights
- ✅ **Modern tech stack** - Next.js 14, React, TypeScript
- ✅ **Secure & scalable** - PostgreSQL, Prisma ORM
- ✅ **Cloud-ready** - Deploy to Vercel in minutes
- ✅ **Email integration** - Resend for reliable delivery
- ✅ **Responsive design** - Tailwind CSS

---

## 🎯 Demo Tips

### Before the Demo
- [ ] Clear browser cache
- [ ] Have all login emails ready
- [ ] Open demo in incognito window
- [ ] Test magic links work
- [ ] Prepare 2-3 talking points per screen

### During the Demo
- Keep it high-level first, dive into details if asked
- Show real student data (Alex at 40% completion)
- Emphasize ease of use ("no passwords!")
- Highlight automation (emails, reporting)
- Have backup plan if internet fails

### After the Demo
- Share login credentials for team to explore
- Offer to answer technical questions
- Discuss customization options
- Provide timeline for production deployment

---

## 🚀 Next Steps After Demo

1. **Gather Feedback**
   - What features are most important?
   - Any missing functionality?
   - Design preferences?

2. **Customization**
   - Add YVAPE branding/colors
   - Custom email templates
   - Additional program modules
   - Integration with existing systems

3. **Production Setup**
   - Deploy to Vercel
   - Configure production database
   - Set up custom domain
   - Enable SSL/security features

4. **Training & Launch**
   - Admin user training
   - Pilot with small group
   - Gather feedback
   - Full rollout

---

## 🔧 Troubleshooting

### Magic Links Not Working
```bash
# Check environment variables
cat .env.local | grep RESEND

# Test email configuration
npm run test:email
```

### Database Connection Issues
```bash
# Verify database is running
psql $DATABASE_URL

# Reset and reseed
npm run db:push
npm run db:seed
```

### Can't See Demo Data
```bash
# Reseed database
npm run db:seed

# Open Prisma Studio to verify
npm run db:studio
```

---

## 📞 Support

Need help? Contact the development team or refer to:
- `README.md` - Installation guide
- `SETUP.md` - Detailed setup instructions
- `PROJECT_SUMMARY.md` - Technical overview

---

**Last Updated**: January 2026
**Demo Version**: 1.0.0
