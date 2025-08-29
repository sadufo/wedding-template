# 🚀 Deployment Guide

## 📋 Overview

This guide covers deploying your wedding website to various hosting platforms. Choose the option that best fits your needs and technical comfort level.

## 🎯 Hosting Platform Comparison

| Platform | Difficulty | Cost | Best For |
|----------|------------|------|----------|
| **Vercel** | Easy | Free tier | Beginners, Next.js optimized |
| **Netlify** | Easy | Free tier | Static sites, simple setup |
| **Railway** | Medium | Pay-as-you-go | Full-stack apps |
| **DigitalOcean** | Hard | $5+/month | Advanced users |
| **Shared Hosting** | Medium | $3+/month | Traditional hosting |

## 🚀 Vercel Deployment (Recommended)

### Why Vercel?
- ✅ Built for Next.js applications
- ✅ Automatic deployments from GitHub
- ✅ Free SSL certificates
- ✅ Global CDN included
- ✅ Easy database integration
- ✅ Generous free tier

### Step 1: Prepare Your Code
\`\`\`bash
# Ensure your project builds successfully
npm run build

# Test production build locally
npm start
\`\`\`

### Step 2: Push to GitHub
1. Create GitHub repository
2. Push your wedding template code:
\`\`\`bash
git init
git add .
git commit -m "Initial wedding website"
git remote add origin https://github.com/yourusername/your-wedding.git
git push -u origin main
\`\`\`

### Step 3: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub account
3. Click **"New Project"**
4. Import your GitHub repository
5. Configure project settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
6. Click **"Deploy"**

### Step 4: Configure Environment Variables
1. In Vercel dashboard, go to **Settings** → **Environment Variables**
2. Add your variables:
\`\`\`
DATABASE_URL = your-database-connection-string
ADMIN_EMAIL = your-admin-email@domain.com
ADMIN_PASSWORD = your-secure-password
\`\`\`

### Step 5: Setup Custom Domain (Optional)
1. Purchase domain from registrar (Namecheap, GoDaddy, etc.)
2. In Vercel project settings, go to **Domains**
3. Add your domain name
4. Update DNS records as instructed by Vercel
5. SSL certificate automatically configured

## 🌐 Netlify Deployment

### Step 1: Build for Static Export
Update `next.config.js`:
\`\`\`javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
\`\`\`

### Step 2: Build and Deploy
\`\`\`bash
# Build static version
npm run build

# Upload 'out' folder to Netlify
\`\`\`

### Step 3: Netlify Setup
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your `out` folder
3. Or connect GitHub repository for automatic deployments

**Note**: Netlify works best for static sites. Admin panel functionality requires serverless functions or external backend.

## 🚂 Railway Deployment

### Step 1: Prepare Railway Config
Create `railway.toml`:
\`\`\`toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "npm start"
\`\`\`

### Step 2: Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repository
3. Add environment variables
4. Deploy automatically

## 🌊 DigitalOcean App Platform

### Step 1: Create App Spec
Create `.do/app.yaml`:
\`\`\`yaml
name: wedding-website
services:
- name: web
  source_dir: /
  github:
    repo: yourusername/your-wedding
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: DATABASE_URL
    value: your-database-url
\`\`\`

### Step 2: Deploy
1. Go to DigitalOcean dashboard
2. Create new App
3. Connect GitHub repository
4. Configure environment variables
5. Deploy

## 🏠 Traditional Shared Hosting

### Step 1: Build Static Version
\`\`\`bash
# Create static export
npm run build
npm run export
\`\`\`

### Step 2: Upload Files
1. Use FTP/SFTP client (FileZilla, WinSCP)
2. Upload contents of `out` folder to `public_html`
3. Ensure file permissions are correct (755 for folders, 644 for files)

**Limitations**: Admin panel won't work without Node.js support.

## 🗄️ Database Deployment

### Serverless Databases (Recommended)
- **Vercel Postgres**: Integrated with Vercel hosting
- **Supabase**: Free tier with 500MB storage
- **PlanetScale**: Serverless MySQL with generous free tier

### Traditional Databases
- **PostgreSQL**: Most hosting providers offer this
- **MySQL**: Widely supported, good for shared hosting
- **SQLite**: Simple file-based database (development only)

### Database Migration
\`\`\`bash
# Run your database setup script on production database
# Use your hosting provider's database console or tools like:
# - phpMyAdmin (MySQL)
# - pgAdmin (PostgreSQL)
# - Database provider's web console
\`\`\`

## 🔐 Security Configuration

### Environment Variables
**Never commit sensitive data to version control!**

Set these on your hosting platform:
\`\`\`env
DATABASE_URL=your-production-database-url
ADMIN_EMAIL=your-secure-admin-email
ADMIN_PASSWORD=your-very-secure-password
NEXTAUTH_SECRET=your-random-secret-key
\`\`\`

### SSL Certificate
- **Vercel/Netlify**: Automatic SSL
- **Other platforms**: Usually included or easy to enable
- **Custom domains**: Let's Encrypt certificates (free)

### Admin Security
1. **Change default credentials** before going live
2. **Use strong passwords** (12+ characters, mixed case, numbers, symbols)
3. **Enable HTTPS only** for admin panel access
4. **Regular security updates** for dependencies

## 📊 Performance Optimization

### Before Deployment
\`\`\`bash
# Optimize images
npm install next-optimized-images

# Analyze bundle size
npm install @next/bundle-analyzer
\`\`\`

### Production Optimizations
- ✅ Image optimization enabled
- ✅ CSS and JS minification
- ✅ Gzip compression
- ✅ CDN for static assets
- ✅ Database query optimization

### Monitoring
- **Vercel Analytics**: Built-in performance monitoring
- **Google Analytics**: User behavior tracking
- **Uptime monitoring**: Services like UptimeRobot
- **Error tracking**: Sentry for error monitoring

## 🌍 Custom Domain Setup

### Step 1: Purchase Domain
Popular registrars:
- Namecheap
- GoDaddy
- Google Domains
- Cloudflare

### Step 2: Configure DNS
Point your domain to your hosting:

**For Vercel**:
- Add CNAME record: `www` → `cname.vercel-dns.com`
- Add A record: `@` → `76.76.19.61`

**For Netlify**:
- Add CNAME record: `www` → `your-site.netlify.app`
- Add A record: `@` → `75.2.60.5`

### Step 3: Verify Setup
- DNS changes can take 24-48 hours
- Use tools like `dig` or online DNS checkers
- Test both `yourwedding.com` and `www.yourwedding.com`

## 📧 Email Configuration (Optional)

### RSVP Notifications
To receive email notifications when guests RSVP:

#### Option 1: SendGrid
\`\`\`bash
npm install @sendgrid/mail
\`\`\`

Add to environment variables:
\`\`\`env
SENDGRID_API_KEY=your-sendgrid-api-key
EMAIL_FROM=noreply@yourwedding.com
EMAIL_TO=bride@yourwedding.com,groom@yourwedding.com
\`\`\`

#### Option 2: Nodemailer with Gmail
\`\`\`bash
npm install nodemailer
\`\`\`

Environment variables:
\`\`\`env
GMAIL_USER=your-gmail@gmail.com
GMAIL_PASS=your-app-password
\`\`\`

## 🚨 Troubleshooting Deployment

### Build Errors
\`\`\`bash
# Check for TypeScript errors
npm run type-check

# Check for linting issues
npm run lint

# Test build locally
npm run build
\`\`\`

### Runtime Errors
- Check hosting platform logs
- Verify environment variables are set
- Test database connection
- Check file permissions (shared hosting)

### Domain Issues
- Verify DNS records are correct
- Wait for DNS propagation (up to 48 hours)
- Check SSL certificate status
- Test with online DNS tools

### Database Connection Issues
- Verify DATABASE_URL is correct for production
- Check database server is accessible from hosting platform
- Ensure database user has correct permissions
- Test connection from hosting platform's console

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] Code builds successfully locally
- [ ] All features tested in development
- [ ] Environment variables documented
- [ ] Database schema ready
- [ ] Admin credentials configured
- [ ] Images optimized
- [ ] Performance tested

### Deployment Process
- [ ] Code pushed to version control (GitHub)
- [ ] Hosting platform configured
- [ ] Environment variables set on hosting
- [ ] Database deployed and configured
- [ ] Initial deployment successful
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active

### Post-Deployment Testing
- [ ] Website loads correctly
- [ ] All pages and sections work
- [ ] RSVP form submits successfully
- [ ] Admin panel accessible
- [ ] Admin login works
- [ ] Data saves and loads correctly
- [ ] Mobile responsiveness verified
- [ ] Performance acceptable
- [ ] Email notifications working (if configured)

### Go-Live Checklist
- [ ] Final content review
- [ ] Contact information updated
- [ ] Social media links working
- [ ] Analytics configured
- [ ] Backup strategy in place
- [ ] Monitoring set up
- [ ] Wedding invitations can include website URL

**🎉 Congratulations! Your wedding website is now live!**

## 📞 Post-Deployment Support

### Monitoring Your Site
- Check regularly for uptime
- Monitor RSVP submissions
- Review admin panel functionality
- Keep dependencies updated

### Making Updates
- Update content through admin panel
- Code changes: push to GitHub for automatic deployment
- Database changes: use hosting platform's database tools

### Backup Strategy
- Regular database backups
- Export RSVP data periodically
- Keep local copy of customized code
- Document any custom changes made

**Need help with ongoing maintenance? Consider hiring a developer or using your hosting platform's support resources.**
