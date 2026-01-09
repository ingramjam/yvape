# YVAPE Program Portals 🦄

A comprehensive full-stack application for managing the YVAPE (Youth Vaping Prevention and Education) program with separate portals for administrators and students.

## 🎯 Features

### Admin Portal
- **Dashboard**: Overview of all enrolled students and program statistics
- **Student Management**: Track individual student progress
- **School Management**: Manage multiple schools and administrators
- **Automated Reports**: Generate and send progress reports
- **Magic Link Authentication**: Secure, passwordless login

### Student Portal
- **Personalized Dashboard**: View program progress and next steps
- **Interactive Modules**: Self-paced learning with videos and surveys
- **Progress Tracking**: Real-time advancement through program steps
- **Resource Access**: Videos, documents, and educational materials
- **Appointment Scheduling**: Book one-on-one support sessions

### Email Automation
- **Admin Confirmation**: Notifies school admins when students enroll
- **Student Welcome**: Sends magic link and program overview
- **Parent Welcome**: Informs parents about program (if under 18)
- **Progress Updates**: Automated milestone notifications
- **Reminders**: Keep students engaged with timely reminders

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with magic link (email)
- **Email**: React Email + Resend
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Resend account (for email delivery)

## 🚀 Getting Started

### 1. Clone and Install

\`\`\`bash
cd program-portals
npm install
\`\`\`

### 2. Environment Setup

Copy the example environment file and fill in your values:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Required environment variables:

\`\`\`env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/yvape_portals"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"  # Generate with: openssl rand -base64 32

# Email (Resend)
RESEND_API_KEY="your-resend-api-key"
EMAIL_FROM="noreply@yvape.org"

# Optional
HUBSPOT_API_KEY=""  # For HubSpot integration
\`\`\`

### 3. Database Setup

\`\`\`bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (for development)
npm run db:push

# Or run migrations (for production)
npx prisma migrate dev --name init
\`\`\`

### 4. Seed Initial Data (Optional)

Create an initial admin user and test data:

\`\`\`bash
npx prisma db seed
\`\`\`

### 5. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit:
- **Homepage**: http://localhost:3000
- **Admin Portal**: http://localhost:3000/admin
- **Student Portal**: http://localhost:3000/student

## 📁 Project Structure

\`\`\`
program-portals/
├── app/                      # Next.js App Router
│   ├── admin/               # Admin portal pages
│   │   ├── login/          # Admin authentication
│   │   ├── students/       # Student management
│   │   └── page.tsx        # Admin dashboard
│   ├── student/            # Student portal pages
│   │   ├── login/          # Student authentication
│   │   └── page.tsx        # Student dashboard
│   ├── api/                # API routes
│   │   └── auth/           # NextAuth.js endpoints
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── prisma/                 # Database
│   └── schema.prisma       # Database schema
├── emails/                 # React Email templates
│   ├── admin-confirmation.tsx
│   ├── student-welcome.tsx
│   └── parent-welcome.tsx
├── components/             # Shared React components
├── lib/                    # Utility functions
│   ├── auth.ts            # NextAuth configuration
│   ├── prisma.ts          # Prisma client
│   └── utils.ts           # Helper functions
└── public/                # Static assets
\`\`\`

## 🗄️ Database Schema

Key models:
- **User**: Authentication (admins & students)
- **School**: Organizations/schools
- **Student**: Student profiles and enrollment
- **ProgramStep**: Program curriculum steps
- **ProgramProgress**: Student progress tracking
- **ActivityLog**: Student activity tracking
- **VideoProgress**: Video watching analytics
- **SurveyResponse**: Survey answers
- **EmailLog**: Email delivery tracking

## 🔐 Authentication Flow

1. User enters email address
2. Magic link sent via email
3. User clicks link (valid for 24 hours)
4. Automatic sign-in and redirect to appropriate portal
5. Session persists for 30 days

## 📧 Email Templates

All emails use React Email for consistent, beautiful design:

- **Admin Confirmation**: Sent when student enrolls
- **Student Welcome**: Includes magic link and program overview
- **Parent Welcome**: Sent if student is under 18
- **Progress Updates**: Milestone achievements
- **Reminders**: Re-engagement notifications

## 🔧 Available Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma Client
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio (database GUI)
\`\`\`

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Database Hosting

- **Vercel Postgres**: Easiest for Vercel deployments
- **Supabase**: Great free tier with PostgreSQL
- **Railway**: Simple PostgreSQL hosting
- **Neon**: Serverless PostgreSQL

## 🎨 Customization

### Branding

Update colors in `tailwind.config.ts`:

\`\`\`typescript
colors: {
  yvape: {
    purple: "#7C3AED",  // Primary brand color
    blue: "#3B82F6",    // Secondary brand color
    orange: "#F97316",  // Accent color
    dark: "#1E293B",    // Dark text
  },
}
\`\`\`

### Email Templates

Edit files in `/emails` directory. Preview with:

\`\`\`bash
npm run email:dev
\`\`\`

## 🔗 Integrations

### HubSpot
- Track enrollments as contacts
- Sync progress data
- Automated workflows

### Amazon Connect (Optional)
- AI-powered phone calls in student's language
- Scheduled appointment reminders

## 📊 Reports

Admins can generate:
- Individual student progress reports
- School-wide statistics
- Completion rates and timelines
- Activity logs and engagement metrics

## 🆘 Support

For issues or questions:
1. Check the documentation
2. Review Prisma schema
3. Check environment variables
4. Review logs in development

## 📄 License

Proprietary - YVAPE Program

## 🤝 Contributing

This is a closed-source project for YVAPE. For contributions, contact the development team.

---

**Built with ❤️ for YVAPE**
