#!/bin/bash

# YVAPE Demo Setup Script
# This script sets up the demo environment with sample data

set -e

echo "🎬 YVAPE Program Portals - Demo Setup"
echo "======================================"
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ Error: .env.local file not found!"
    echo ""
    echo "Please create .env.local from .env.example:"
    echo "  cp .env.example .env.local"
    echo ""
    echo "Then fill in your database and email credentials."
    exit 1
fi

echo "✅ Found .env.local"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

echo "✅ Dependencies installed"
echo ""

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npx prisma generate
echo ""

# Push schema to database
echo "🗄️  Setting up database schema..."
npx prisma db push --skip-generate
echo ""

# Seed database with demo data
echo "🌱 Seeding database with demo data..."
npx prisma db seed
echo ""

echo "🎉 Demo setup complete!"
echo ""
echo "📋 Demo Credentials:"
echo "   👨‍💼 Admin: admin@lincolnhs.edu"
echo "   🎓 Student 1: alex.rivera@student.com (40% complete)"
echo "   🎓 Student 2: jordan.lee@student.com (just started)"
echo "   🎓 Student 3: taylor.smith@student.com (100% complete)"
echo ""
echo "🚀 Start the development server:"
echo "   npm run dev"
echo ""
echo "📖 View demo guide:"
echo "   cat DEMO_GUIDE.md"
echo ""
