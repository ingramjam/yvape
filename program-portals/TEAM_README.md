# 🎬 Demo Ready for Your Team!

Hi Team! The YVAPE Program Portals demo is ready for you to explore. Here's everything you need to know:

## 🚀 Quick Start (5 minutes)

### 1. Clone & Setup
```bash
git clone https://github.com/ingramjam/yvape.git
cd yvape/program-portals
```

### 2. Configure Environment
```bash
cp .env.example .env.local
```

Then edit `.env.local` and add:
- Your PostgreSQL database URL
- A secret key (generate with: `openssl rand -base64 32`)
- Your Resend API key (for emails)

### 3. Run Demo Setup
```bash
./setup-demo.sh
npm run dev
```

### 4. Open Browser
Visit: **http://localhost:3000**

## 🎭 Demo Accounts

**Admin Portal:**
- Email: `admin@lincolnhs.edu`
- Access: http://localhost:3000/admin/login

**Student Portal:**
- Email: `alex.rivera@student.com` (40% complete)
- Email: `jordan.lee@student.com` (just started)
- Email: `taylor.smith@student.com` (100% complete)
- Access: http://localhost:3000/student/login

> 💡 **Note**: Uses magic link authentication - check your email for login links!

## 📖 Full Demo Guide

Check out **[DEMO_GUIDE.md](./DEMO_GUIDE.md)** for:
- Detailed walkthrough scenarios
- Key features to highlight
- Talking points for presentations
- Troubleshooting tips

## 🌟 Key Features to Show

### Admin Portal
- ✅ Real-time student dashboard
- ✅ Progress tracking & reporting
- ✅ Multi-school management
- ✅ Automated email notifications

### Student Portal
- ✅ Interactive learning modules
- ✅ Progress visualization
- ✅ Mobile-friendly design
- ✅ Bilingual support ready

## 💻 Tech Stack

- **Framework**: Next.js 14 (React)
- **Language**: TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js (magic links)
- **Email**: Resend
- **Styling**: Tailwind CSS

## 🎯 What's Next?

After exploring the demo:

1. **Provide Feedback**: What features do you love? What's missing?
2. **Customization**: We can adjust branding, add features, etc.
3. **Deployment**: Ready to deploy to production (Vercel + hosted database)
4. **Integration**: Can connect to existing systems (HubSpot, etc.)

## 📊 Demo Data

The demo includes:
- **2 Schools**: Lincoln High School & Washington Academy
- **2 Admins**: Sarah Johnson & Michael Chen
- **3 Students**: At different completion stages (0%, 40%, 100%)
- **5 Program Steps**: Complete curriculum workflow
- **Activity Logs**: Sample engagement data
- **Email History**: Automated communication examples

## 🆘 Need Help?

- **Setup Issues**: Check [SETUP.md](./SETUP.md)
- **Technical Details**: See [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
- **General Info**: Read [README.md](./README.md)

## 🚀 Deploy Live

Want to see it live on the internet?

1. **Deploy to Vercel** (Free):
   - Go to [vercel.com](https://vercel.com)
   - Connect GitHub repo: `ingramjam/yvape`
   - Add environment variables
   - Deploy!

2. **Database Options** (Free tier available):
   - [Neon](https://neon.tech) - Serverless Postgres
   - [Supabase](https://supabase.com) - Full backend platform
   - [Railway](https://railway.app) - Easy deployment

3. **Email Service**:
   - [Resend](https://resend.com) - Modern email API
   - Free tier: 100 emails/day

---

## 📸 Screenshots Preview

Once running, you'll see:

- **Admin Dashboard**: Overview of all students, progress charts
- **Student Dashboard**: Personalized learning path, next steps
- **Progress Tracking**: Visual completion indicators
- **Email Templates**: Professional, branded communications

---

**Questions?** Drop a message in Slack or open an issue on GitHub!

**Excited to hear your feedback!** 🎉

---

*Last Updated: January 2026*
