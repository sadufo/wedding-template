# ❓ Frequently Asked Questions

## 🚀 Getting Started

### Q: Do I need coding experience to use this template?
**A:** No! The template is designed for non-technical users. You can:
- Use the demo admin panel immediately without any setup
- Customize all content through the admin interface
- Upload photos with drag-and-drop
- Change colors, text, and settings without touching code
- Deploy to hosting platforms with simple processes

### Q: What's the difference between demo and production mode?
**A:** 
- **Demo Mode**: Test all features immediately, includes full admin dashboard, changes don't save permanently
- **Production Mode**: Requires database setup, saves real data, fully functional for live wedding with persistent RSVP responses

### Q: Can I use this without a database?
**A:** Yes! The demo mode works perfectly without any database setup and includes all admin features. However, for a live wedding website that saves RSVP responses permanently, you'll need a database.

## 🎨 Customization

### Q: How do I change the couple's names?
**A:** Easy! Use the admin panel:
1. Click "Try Demo Admin" on homepage
2. Go to **Couple Info** tab
3. Edit "Bride Name" and "Groom Name" fields
4. Names update across the entire website including hero section and footer

### Q: Can I change the colors?
**A:** Yes! Multiple options:
1. **Admin Panel** (Recommended): Settings tab → Color customization with color pickers
2. **CSS File**: Edit `app/globals.css` color variables for advanced users
3. **Real-time Preview**: See changes immediately in admin panel

### Q: How do I add my own photos?
**A:** Super easy with the admin panel:
1. Go to **Couple Info** section
2. Use drag-and-drop photo upload areas
3. Upload bride photo, groom photo, and couple photos
4. Photos automatically create a slider on the homepage
5. All images are optimized for web performance

### Q: How do I edit our love story?
**A:** In the admin panel:
1. **Couple Info** tab
2. Edit **"How We Met"** text area
3. Edit **"The Proposal"** text area  
4. Both stories appear in the "Our Love Story" section
5. Save to update the website immediately

### Q: Can I add wedding venue addresses?
**A:** Yes! The admin panel includes:
1. **Events** tab for ceremony and reception details
2. **"Select on Map"** buttons that open Google Maps
3. Addresses automatically enable "Get Directions" buttons on the website
4. Guests can get directions with one click

## 🗄️ Database & Admin Panel

### Q: How do I access the admin panel?
**A:** Two ways:
1. **Demo Mode**: Click "Try Demo Admin" button on homepage (no login required)
2. **Production Mode**: Go to `/admin/login` and use your configured credentials

### Q: What can I do in the admin panel?
**A:** Full website management:
- **Dashboard**: View wedding countdown and RSVP statistics
- **Couple Info**: Edit names, upload photos, write love stories
- **Events**: Manage ceremony/reception details with map integration
- **RSVP List**: View all guest responses in organized table
- **Settings**: Customize colors, contact info, footer content

### Q: My changes in the admin panel aren't saving. Why?
**A:** 
- **Demo Mode**: Changes are temporary by design - this is for testing only
- **Production Mode**: Check database connection and ensure all required fields are filled
- **Browser Issues**: Try refreshing the page or clearing cache

### Q: How does the wedding countdown work?
**A:** Automatic countdown timer:
1. Set your wedding date in **Events** section of admin panel
2. Countdown appears on homepage hero section
3. Also shows in admin dashboard as "Days Until Wedding"
4. Updates in real-time showing days, hours, minutes, seconds

### Q: How do I export RSVP responses?
**A:** In the admin panel:
1. Go to **RSVP List** tab
2. Click **"Export CSV"** button
3. Download spreadsheet with all guest data including names, attendance, meal preferences

### Q: Can I customize the RSVP form questions?
**A:** Yes! In admin panel **Settings** tab:
- Edit RSVP form questions
- Customize meal preference options
- Add/remove fields as needed
- Changes appear immediately on the website

## 🎯 Wedding-Specific Questions

### Q: How do I handle the photo slider on the homepage?
**A:** Automatic photo management:
- Upload multiple photos in admin panel **Couple Info** section
- Photos automatically create a slider in "Our Love Story" section
- Slider auto-advances every 4 seconds
- Navigation arrows always visible on mobile devices
- Dot indicators show current photo

### Q: How do guests get directions to our venues?
**A:** Built-in directions feature:
1. Add venue addresses in admin panel **Events** section
2. Use "Select on Map" buttons for precise locations
3. "Get Directions" buttons automatically appear on website
4. Buttons open Google Maps with your venue address
5. Works on all devices and map apps

### Q: Can I customize the footer information?
**A:** Yes! Complete footer customization in admin panel **Settings**:
- Couple names display
- Wedding date format
- Contact information (email, phone)
- Social media links (Instagram, Facebook)
- Wedding hashtag
- Copyright/thank you message

### Q: How do I handle plus-ones in RSVPs?
**A:** The RSVP system includes:
- Multiple guest name fields
- Attendance confirmation for each person
- Meal preferences for each attendee
- Special requests section
- All data visible in admin panel table

## 🔧 Technical Issues

### Q: The countdown timer isn't working. What's wrong?
**A:** Check these items:
1. **Wedding date set**: Ensure date is entered in admin panel Events section
2. **Date format**: Verify date is in correct format and future date
3. **Browser cache**: Clear cache and refresh page
4. **JavaScript enabled**: Ensure JavaScript is enabled in browser

### Q: Photos aren't showing in the slider. Help!
**A:** Troubleshooting steps:
1. **Upload successful**: Check if photos uploaded completely in admin panel
2. **File formats**: Use JPG, PNG, or WebP formats
3. **File size**: Keep images under 5MB for best performance
4. **Browser refresh**: Clear cache and refresh page
5. **Multiple photos**: Upload at least one photo for slider to work

### Q: "Get Directions" buttons aren't working. What should I do?
**A:** Common fixes:
1. **Addresses set**: Ensure venue addresses are entered in admin panel Events section
2. **Address format**: Use complete addresses with city, state, zip
3. **Map selection**: Use "Select on Map" buttons for precise coordinates
4. **Browser popup**: Check if browser is blocking popup windows

## 📱 Mobile & Responsive Design

### Q: How does the admin panel work on mobile?
**A:** Mobile-optimized admin features:
- Responsive design adapts to phone screens
- Hamburger menu for easy navigation
- Touch-friendly buttons and forms
- Drag-and-drop photo upload works on mobile
- Landscape orientation recommended for editing

### Q: Are the navigation arrows visible on mobile?
**A:** Yes! The photo slider arrows are:
- Always visible on mobile devices (no hover required)
- Large enough for touch interaction
- Positioned for easy thumb access
- Work with swipe gestures too

## 🔐 Security & Privacy

### Q: Is my data secure?
**A:** Security measures included:
- HTTPS encryption (SSL certificates)
- Secure database connections
- Password-protected admin panel
- No sensitive data stored in code

### Q: How do I change the admin password?
**A:** 
1. Edit `lib/auth.ts` file
2. Update the admin credentials
3. Use a strong, unique password
4. Redeploy your website

### Q: Can guests see other people's RSVP responses?
**A:** No! RSVP responses are only visible to:
- The admin panel (bride/groom)
- Database administrators
- Guests can only see their own submissions

## 💰 Cost & Licensing

### Q: Are there any ongoing costs?
**A:** Potential costs:
- **Hosting**: $0-15/month (many free options available)
- **Domain**: $10-15/year (optional)
- **Database**: Often included with hosting
- **Email service**: Optional for notifications

### Q: Can I use this for multiple weddings?
**A:** Yes! The template license allows:
- Multiple personal projects
- Customization and modification
- Commercial use (wedding planning businesses)

### Q: Do I need to credit the template creator?
**A:** Not required, but appreciated:
- Footer credit link (optional)
- Social media mention (optional)
- Review on purchase platform (helpful for others)

## 🆘 Getting Help

### Q: I'm stuck and need help. What should I do?
**A:** Help resources:
1. **Check documentation**: Read all guides in this folder
2. **Search online**: Look for Next.js and React tutorials
3. **Community forums**: Stack Overflow, Reddit, Discord communities
4. **Hire help**: Consider hiring a developer for complex customizations

### Q: Can I get support from the template creator?
**A:** Support varies by purchase platform:
- **ThemeForest**: Check item support policy
- **Direct purchase**: Contact through provided channels
- **Community**: Often other users can help with common issues

### Q: How do I report bugs or suggest features?
**A:** 
- **Purchase platform**: Use review/comment system
- **Direct contact**: Email or contact form if provided
- **Documentation**: Note any unclear instructions

## 🔄 Updates & Maintenance

### Q: How do I update the template?
**A:** 
- **Minor updates**: Usually automatic through hosting platform
- **Major updates**: May require re-downloading and manual updates
- **Custom changes**: Document your modifications before updating

### Q: What happens after my wedding?
**A:** Options:
- **Keep as memory**: Leave website live as a keepsake
- **Add photos**: Update with wedding photos and thank you messages
- **Archive**: Download all data and take site offline
- **Repurpose**: Use for anniversary celebrations

---

**Still have questions? Check the other documentation files or reach out for support!**
