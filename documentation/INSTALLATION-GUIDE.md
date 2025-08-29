# 🛠️ Installation Guide

## 📋 Prerequisites

Before you begin, ensure you have:
- **Node.js 18+** installed on your computer
- **npm** or **yarn** package manager
- **Code editor** (VS Code recommended)
- **Web browser** for testing

## 🚀 Quick Installation

### Step 1: Download & Extract
1. Download the template files from your purchase
2. Extract the ZIP file to your desired location
3. Open the folder in your code editor

### Step 2: Install Dependencies
Open terminal in the project folder and run:

\`\`\`bash
# Install all required packages
npm install

# Or if you prefer yarn
yarn install
\`\`\`

### Step 3: Start Development Server
\`\`\`bash
# Start the development server
npm run dev

# Or with yarn
yarn dev
\`\`\`

### Step 4: View Your Website
Open your browser and go to: `http://localhost:3000`

**🎉 Congratulations! Your wedding website is now running!**

## 🎯 What You'll See

### Homepage Features
- Beautiful hero section with couple names and live countdown timer
- Love story section with photo slider (multiple photos)
- Wedding details with working "Get Directions" buttons
- RSVP form with real-time validation
- Fully customizable contact footer
- "Try Demo Admin" button for testing admin features

### Demo Admin Panel
Click "Try Demo Admin" to test all admin features:
- **Dashboard**: View wedding countdown and quick stats
- **Couple Info**: Edit names, photos, love story, and proposal story
- **Events**: Manage ceremony and reception with map address selection
- **RSVP List**: View guest responses in organized table
- **Settings**: Customize colors, messages, and contact information

## 🔧 Development Setup

### Project Structure
\`\`\`
wedding-template/
├── app/                 # Next.js pages and layouts
├── components/          # Reusable React components
├── lib/                # Utility functions
├── public/             # Images and static files
├── scripts/            # Database setup scripts
└── documentation/      # This guide and others
\`\`\`

### Key Files to Know
- `app/page.tsx` - Homepage content
- `app/globals.css` - Styling and colors
- `components/wedding-*` - Main page sections
- `lib/database.ts` - Data management
- `scripts/01-create-wedding-database.sql` - Database schema

## 🎨 Basic Customization

### Using Admin Panel (Recommended)
1. Click "Try Demo Admin" on homepage
2. Navigate through different sections:
   - **Couple Info**: Update names, photos, stories
   - **Events**: Set dates, times, addresses
   - **Settings**: Change colors, contact info, footer text

### Manual Code Changes (Advanced)
Only needed for major customizations beyond admin panel capabilities.

### Change Couple Names
Edit `components/wedding-hero.tsx`:
\`\`\`tsx
// Find this section and update names
<h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
  Your Names Here
</h1>
\`\`\`

### Update Wedding Date
Edit `components/event-details.tsx`:
\`\`\`tsx
// Update the date
<p className="text-lg text-muted-foreground">
  Your Wedding Date
</p>
\`\`\`

### Change Colors
Edit `app/globals.css` to modify the color scheme:
\`\`\`css
/* Update these color values */
--primary: your-color-here;
--secondary: your-color-here;
\`\`\`

### Replace Photos
1. Add your photos to the `public/` folder
2. Update image paths in components:
\`\`\`tsx
<img src="/your-photo.jpg" alt="Your description" />
\`\`\`

## 🗄️ Database Setup (Optional for Demo)

### For Demo/Testing Only
The template works immediately without database setup. The demo admin panel uses temporary data that doesn't persist.

### For Production Use
To save real data and have a functional admin panel:

1. **Choose Database Provider**:
   - Vercel Postgres (recommended)
   - Supabase
   - PlanetScale
   - Traditional PostgreSQL/MySQL

2. **Follow Database Setup Guide**: See [DATABASE-SETUP.md](DATABASE-SETUP.md)

3. **Configure Admin Access**: See [ADMIN-PANEL-GUIDE.md](ADMIN-PANEL-GUIDE.md)

## 🚨 Troubleshooting

### Common Installation Issues

**"npm install" fails**
\`\`\`bash
# Clear npm cache and try again
npm cache clean --force
npm install
\`\`\`

**Port 3000 already in use**
\`\`\`bash
# Use a different port
npm run dev -- -p 3001
\`\`\`

**Images not loading**
- Check image paths in `public/` folder
- Ensure image names match exactly (case-sensitive)
- Verify image formats are supported (jpg, png, webp)

**Styles not applying**
\`\`\`bash
# Restart development server
npm run dev
\`\`\`

**TypeScript errors**
\`\`\`bash
# Check for syntax errors in .tsx files
npm run build
\`\`\`

### Getting Help

1. **Check FAQ**: See [FAQ.md](FAQ.md) for common solutions
2. **Verify Setup**: Ensure all prerequisites are installed
3. **Check Console**: Look for error messages in browser console
4. **Restart Server**: Stop (Ctrl+C) and restart `npm run dev`

## ✅ Installation Checklist

- [ ] Node.js 18+ installed
- [ ] Project files extracted
- [ ] Dependencies installed (`npm install`)
- [ ] Development server running (`npm run dev`)
- [ ] Website loads at `http://localhost:3000`
- [ ] Hero section shows countdown timer
- [ ] Photo slider works in love story section
- [ ] "Get Directions" buttons work
- [ ] RSVP form submits successfully
- [ ] Demo admin panel accessible and functional
- [ ] All admin sections work (Dashboard, Couple Info, Events, RSVP, Settings)
- [ ] Mobile responsive design works on phone/tablet

## 🎯 Next Steps

After successful installation:

1. **Test Demo Features**: Click "Try Demo Admin" to explore
2. **Customize Content**: Update names, dates, and photos
3. **Setup Database**: For production use (optional for testing)
4. **Deploy Website**: When ready to go live

**Ready for the next step? Check out the [Admin Panel Guide](ADMIN-PANEL-GUIDE.md)!**
