# 🗄️ Database Setup Guide

## 📋 Overview

Your wedding template can work in two modes:
1. **Demo Mode** - No database needed, perfect for testing
2. **Production Mode** - Requires database for saving real data

## 🎯 Do You Need a Database?

### Skip Database If:
- ✅ Just testing the template
- ✅ Using demo admin panel only
- ✅ Not collecting real RSVP responses
- ✅ Don't need to save changes permanently

### Setup Database If:
- ✅ Going live with real wedding website
- ✅ Collecting actual RSVP responses
- ✅ Want to save admin panel changes
- ✅ Need to export guest data

## 🚀 Quick Database Setup (Recommended)

### Option 1: Vercel Postgres (Easiest)

#### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub, Google, or email
3. Create new project or connect existing

#### Step 2: Add Database
1. In Vercel dashboard, go to your project
2. Click **"Storage"** tab
3. Click **"Create Database"**
4. Select **"Postgres"**
5. Choose database name (e.g., "wedding-db")
6. Click **"Create"**

#### Step 3: Get Connection String
1. Go to database settings
2. Copy the **"DATABASE_URL"**
3. It looks like: `postgresql://username:password@host:port/database`

#### Step 4: Configure Your Project
Create `.env.local` file in your project root:
\`\`\`env
DATABASE_URL="your-database-url-here"
\`\`\`

#### Step 5: Setup Database Schema
1. In your project, run:
\`\`\`bash
# This creates all necessary tables
npm run setup-database
\`\`\`

### Option 2: Supabase (Free Tier Available)

#### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up and create new project
3. Choose region closest to your users
4. Set database password (save this!)

#### Step 2: Get Database URL
1. Go to **Settings** → **Database**
2. Copy **Connection string**
3. Replace `[YOUR-PASSWORD]` with your actual password

#### Step 3: Configure Project
Add to `.env.local`:
\`\`\`env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
\`\`\`

#### Step 4: Run Database Setup
\`\`\`bash
npm run setup-database
\`\`\`

### Option 3: PlanetScale (Serverless MySQL)

#### Step 1: Create PlanetScale Account
1. Go to [planetscale.com](https://planetscale.com)
2. Sign up with GitHub
3. Create new database

#### Step 2: Create Branch
1. Create "main" branch
2. Get connection string from dashboard

#### Step 3: Configure Project
\`\`\`env
DATABASE_URL="mysql://username:password@host/database?sslaccept=strict"
\`\`\`

## 🛠️ Manual Database Setup

### If Automatic Setup Fails

#### Step 1: Access Database Console
- **Vercel**: Use Vercel dashboard SQL console
- **Supabase**: Use SQL Editor in dashboard
- **PlanetScale**: Use PlanetScale console
- **Other**: Use your database management tool

#### Step 2: Run SQL Script
Copy and execute the contents of `scripts/01-create-wedding-database.sql`:

\`\`\`sql
-- Creates all necessary tables for wedding website
-- Copy the entire contents of the file and run in your database
\`\`\`

#### Step 3: Verify Tables Created
Check that these tables exist:
- `couples`
- `events` 
- `rsvp_responses`
- `site_settings`
- `photo_gallery`
- `admins`

## 🔧 Environment Variables

### Required Variables
Create `.env.local` file in project root:

\`\`\`env
# Database connection
DATABASE_URL="your-database-connection-string"

# Admin authentication (change these!)
ADMIN_EMAIL="your-secure-email@domain.com"
ADMIN_PASSWORD="your-very-secure-password"

# Optional: Email service (for RSVP notifications)
SENDGRID_API_KEY="your-sendgrid-key"
EMAIL_FROM="noreply@yourwedding.com"
\`\`\`

### Security Notes
- ⚠️ **Never commit `.env.local` to version control**
- ✅ Use strong, unique passwords
- ✅ Use different credentials for production vs development
- ✅ Regularly rotate passwords

## 🎯 Testing Database Connection

### Step 1: Start Development Server
\`\`\`bash
npm run dev
\`\`\`

### Step 2: Test Admin Login
1. Go to `/admin/login`
2. Use your configured admin credentials
3. If successful, you'll see the admin dashboard

### Step 3: Test Data Saving
1. In admin panel, edit couple information
2. Save changes
3. Refresh page - changes should persist
4. Check main website - updates should appear

### Step 4: Test RSVP System
1. Go to main website
2. Fill out RSVP form
3. Submit response
4. Check admin panel - response should appear in RSVP list

## 🚨 Troubleshooting

### Connection Issues

**"Database connection failed"**
- Verify DATABASE_URL is correct
- Check database is running and accessible
- Ensure firewall allows connections
- Try connecting from database provider's console

**"Tables don't exist"**
- Run the SQL setup script manually
- Check database name is correct
- Verify you have create table permissions

**"Authentication failed"**
- Double-check username and password
- Ensure database user has necessary permissions
- Try connecting with database provider's tools first

### Admin Panel Issues

**"Invalid credentials"**
- Check ADMIN_EMAIL and ADMIN_PASSWORD in `.env.local`
- Ensure admin user exists in database
- Verify password hashing is working

**"Changes not saving"**
- Check database write permissions
- Verify all required tables exist
- Look for error messages in browser console

### RSVP Form Issues

**"RSVP submission failed"**
- Check database connection
- Verify `rsvp_responses` table exists
- Test with simple data first

## 📊 Database Management

### Viewing Data
- **Vercel**: Use Vercel dashboard data browser
- **Supabase**: Use table editor in dashboard
- **PlanetScale**: Use PlanetScale console
- **Other**: Use database management tools (phpMyAdmin, pgAdmin, etc.)

### Backing Up Data
\`\`\`bash
# For PostgreSQL
pg_dump your-database-url > wedding-backup.sql

# For MySQL
mysqldump -h host -u user -p database > wedding-backup.sql
\`\`\`

### Exporting RSVP Data
Use the admin panel's built-in export feature:
1. Go to **RSVP List** tab
2. Click **"Export CSV"**
3. Download spreadsheet with all responses

## 🌐 Production Deployment

### Environment Variables on Hosting
Set these in your hosting platform:
- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Environment Variables  
- **Railway**: Variables tab
- **Heroku**: Config Vars

### Database Security
- ✅ Use SSL connections (usually default)
- ✅ Restrict database access to your application only
- ✅ Regular security updates
- ✅ Monitor for unusual activity

## ✅ Database Setup Checklist

### Initial Setup
- [ ] Database provider chosen and account created
- [ ] Database created with appropriate name
- [ ] Connection string obtained
- [ ] `.env.local` file created with DATABASE_URL
- [ ] Admin credentials configured

### Schema Setup
- [ ] SQL script executed successfully
- [ ] All required tables created
- [ ] Database connection tested
- [ ] Admin login works
- [ ] Data saving and loading works

### Testing
- [ ] RSVP form submissions work
- [ ] Admin panel shows submitted responses
- [ ] Changes in admin panel persist after refresh
- [ ] Export functionality works
- [ ] Main website reflects admin changes

### Production Ready
- [ ] Environment variables set on hosting platform
- [ ] Database accessible from production server
- [ ] SSL/security configured
- [ ] Backup strategy in place
- [ ] Monitoring set up

**Ready to deploy? Check the [Deployment Guide](DEPLOYMENT-GUIDE.md)!**
