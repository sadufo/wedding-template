# 🔐 Admin Panel Guide

## 📋 Overview

The admin panel allows you to manage all aspects of your wedding website without touching code. There are two modes available:

1. **Demo Mode** - Test functionality without database setup
2. **Production Mode** - Full functionality with database storage

## 🎯 Demo Admin Panel

### Accessing Demo Mode
1. Go to your wedding website homepage
2. Click the **"Try Demo Admin"** button (floating button)
3. You'll be taken to `/demo/admin`
4. No login required - immediate access to all features

### Demo Features
- ✅ Dashboard with live wedding countdown
- ✅ Edit couple information, photos, love story, and proposal story
- ✅ Manage wedding event details with map address selection
- ✅ View sample RSVP responses in organized table
- ✅ Customize site settings, colors, and contact information
- ✅ Upload multiple photos with drag-and-drop interface
- ✅ Edit footer content (names, date, social links, copyright)
- ✅ Test all admin functionality with real-time preview
- ⚠️ Changes are temporary (not saved permanently)

### Demo Navigation
- **Dashboard**: Overview with wedding countdown and quick stats
- **Couple Info**: Names, photos, love story, proposal story
- **Events**: Ceremony and reception details with address selection
- **RSVP List**: Guest responses in table format
- **Settings**: Colors, messages, contact info, footer customization

### Exiting Demo Mode
Click **"Exit Demo"** button in the demo admin panel to return to the main website.

## 🔒 Production Admin Panel

### Setting Up Production Admin

#### Step 1: Database Setup
First, you need a database. See [DATABASE-SETUP.md](DATABASE-SETUP.md) for detailed instructions.

#### Step 2: Configure Admin Credentials
Edit `lib/auth.ts` to set your admin login:

\`\`\`typescript
// IMPORTANT: Change these credentials!
const adminUser = {
  email: "your-secure-email@domain.com", 
  password: "your-very-secure-password"
}
\`\`\`

#### Step 3: Access Production Admin
1. Go to `/admin/login`
2. Enter your configured email and password
3. Access full admin panel at `/admin`

### Production Admin Features

#### 📊 Dashboard
- **Live Wedding Countdown**: Automatically calculates days until ceremony
- **RSVP Statistics**: Total responses, attending, not attending
- **Quick Actions**: Direct links to edit couple info, events, settings
- **Recent Activity**: Latest RSVP submissions and changes

#### 👫 Couple Information Management
- **Edit Names**: Change bride and groom names (updates entire site)
- **Upload Photos**: Multiple photo upload with drag-and-drop
  - Bride photo
  - Groom photo  
  - Couple photo
  - Engagement photos
- **Love Story**: Write and edit "How We Met" story
- **Proposal Story**: Add "The Proposal" narrative
- **Photo Slider**: Uploaded photos automatically appear in site slider

#### 🎉 Event Management
- **Ceremony Details**: Date, time, venue, address
- **Reception Details**: Location, timing, dress code
- **Address Selection**: "Select on Map" buttons open Google Maps for precise location
- **Get Directions**: Addresses automatically work with "Get Directions" buttons on site
- **Additional Events**: Rehearsal dinner, after-party details
- **Venue Information**: Directions, parking, accessibility notes

#### 📝 RSVP Management
- **View Responses**: See all guest responses in organized table
- **Guest Details**: Names, attendance, meal preferences, special requests
- **Response Statistics**: Track attendance numbers and meal counts
- **Export Data**: Download guest list as CSV for catering/planning
- **Search & Filter**: Find specific guests or responses

#### ⚙️ Site Settings & Customization
- **Color Scheme**: Customize website colors with color pickers
- **Welcome Messages**: Edit homepage text and messages
- **Contact Information**: Update phone, email, social media links
- **Footer Content**: 
  - Couple names in footer
  - Wedding date display
  - Copyright/thank you text
  - Social media links (Instagram, Facebook)
  - Wedding hashtag
- **RSVP Form**: Customize form questions and options

## 🎨 Detailed Customization Guide

### Updating Website Content

#### Change Couple Names
1. Go to **Couple Info** tab
2. Edit "Bride Name" and "Groom Name" fields
3. Click **"Save Changes"**
4. Names update across entire website including:
   - Hero section title
   - Footer display
   - Meta tags and SEO

#### Upload and Manage Photos
1. Navigate to **Couple Info** section
2. Use drag-and-drop photo upload areas:
   - **Bride Photo**: Individual portrait
   - **Groom Photo**: Individual portrait
   - **Couple Photo**: Together photo
3. Photos automatically:
   - Optimize for web performance
   - Create responsive versions
   - Update photo slider on homepage
   - Replace placeholder images

#### Edit Love Stories
1. In **Couple Info** section, find story text areas:
   - **"How We Met"**: Your meeting story
   - **"The Proposal"**: Proposal story
2. Write engaging narratives (supports paragraphs)
3. Stories appear in "Our Love Story" section on homepage
4. Save to update website immediately

#### Manage Wedding Events
1. Go to **Events** tab
2. Update ceremony information:
   - **Date & Time**: Automatically updates countdown timer
   - **Venue Name**: Displays on homepage
   - **Address**: Click "Select on Map" for precise location
3. Update reception details similarly
4. Addresses enable "Get Directions" buttons on site

#### Customize Site Appearance
1. Access **Settings** tab
2. **Color Customization**:
   - Primary color (main accents, buttons)
   - Secondary color (links, highlights)
   - Background colors
   - Preview changes in real-time
3. **Contact Information**:
   - Email address
   - Phone number
   - Instagram handle
   - Facebook page
   - Wedding hashtag
4. **Footer Content**:
   - Couple names display
   - Wedding date format
   - Copyright/thank you message

### Advanced Features

#### RSVP Form Customization
1. In **Settings** section, customize:
   - Attendance questions
   - Meal preference options
   - Plus-one handling
   - Special request fields
   - Dietary restriction options
2. Form updates reflect immediately on homepage

#### Photo Slider Management
- Upload multiple photos in **Couple Info**
- Photos automatically create homepage slider
- Slider features:
  - Auto-advance every 4 seconds
  - Navigation arrows (always visible on mobile)
  - Dot indicators
  - Smooth transitions

## 📊 RSVP Management Details

### Viewing Guest Responses
1. Go to **RSVP List** tab
2. Table shows all submissions:
   - **Guest Names**: Primary and plus-one names
   - **Attendance**: Yes/No status with counts
   - **Meal Preferences**: Dietary choices
   - **Special Requests**: Allergies, accessibility needs
   - **Response Date**: When RSVP was submitted
   - **Contact Info**: Email/phone if provided

### Exporting Guest Data
1. In **RSVP List** section
2. Click **"Export CSV"** button
3. Download includes:
   - All guest information
   - Attendance counts
   - Meal preferences
   - Special requests
   - Contact details
4. Use for:
   - Catering final counts
   - Seating chart planning
   - Vendor coordination
   - Thank you card lists

### Response Analytics
Dashboard provides:
- **Total Responses**: Number of submitted RSVPs
- **Attending Count**: Confirmed guests
- **Not Attending**: Declined invitations
- **Meal Breakdown**: Dietary preference counts
- **Response Rate**: Percentage of expected responses

## 🔐 Security & Best Practices

### Admin Credentials Security
- **Strong Password**: Minimum 12 characters, mixed case, numbers, symbols
- **Unique Email**: Use dedicated email for admin access
- **Regular Updates**: Change password periodically
- **Secure Storage**: Don't share credentials via email/text

### Database Security
- **Environment Variables**: Store credentials securely
- **SSL Connections**: Use encrypted database connections
- **Regular Backups**: Backup data before major changes
- **Access Monitoring**: Review admin access logs

### Content Security
- **Image Optimization**: Uploaded photos automatically optimized
- **Input Validation**: All form inputs validated and sanitized
- **XSS Protection**: Content filtered for security
- **CSRF Protection**: Forms protected against cross-site attacks

## 🚨 Troubleshooting

### Common Admin Panel Issues

**Demo Admin Not Loading**
- Check URL: should be `/demo/admin`
- Clear browser cache and cookies
- Try incognito/private browsing mode
- Verify JavaScript is enabled

**Production Admin Login Failed**
- Verify credentials in `lib/auth.ts` match exactly
- Check database connection is working
- Ensure admin user exists in database
- Try password reset if available

**Changes Not Saving (Production)**
- Check database connection status
- Verify write permissions on database
- Look for error messages in browser console
- Ensure all required fields are filled

**Photos Not Uploading**
- Check file size (recommended max 5MB)
- Verify file format (JPG, PNG, WebP supported)
- Ensure sufficient storage space
- Check upload folder permissions

**Countdown Timer Not Updating**
- Verify wedding date is set in Events section
- Check date format is correct
- Ensure date is in the future
- Refresh page to see updates

### Mobile Admin Issues

**Interface Too Small on Phone**
- Use landscape orientation
- Zoom in for detailed editing
- Consider using tablet for extensive changes
- Desktop recommended for initial setup

**Touch Interactions Not Working**
- Ensure touch events are enabled
- Try different mobile browser
- Clear mobile browser cache
- Update to latest browser version

## 📱 Mobile Admin Experience

### Mobile-Optimized Features
- **Responsive Design**: Adapts to all screen sizes
- **Touch-Friendly**: Large buttons and touch targets
- **Swipe Navigation**: Swipe between admin sections
- **Mobile Photo Upload**: Camera integration for direct photo capture
- **Hamburger Menu**: Collapsible navigation for small screens

### Mobile Admin Tips
- **Landscape Mode**: Better for form editing
- **Zoom Gestures**: Pinch to zoom for detailed work
- **Voice Input**: Use voice-to-text for story writing
- **Save Frequently**: Mobile connections can be unstable

## ✅ Admin Panel Setup Checklist

### Initial Configuration
- [ ] Database setup completed (production only)
- [ ] Admin credentials configured and tested
- [ ] Can access admin panel successfully
- [ ] All admin sections load without errors
- [ ] Demo mode tested and working

### Content Setup
- [ ] Couple names updated throughout site
- [ ] Wedding date set (countdown timer working)
- [ ] Ceremony and reception details complete
- [ ] Venue addresses set with map integration
- [ ] Love story and proposal story written
- [ ] Photos uploaded and displaying correctly

### Customization Complete
- [ ] Color scheme customized to preferences
- [ ] Contact information updated
- [ ] Social media links added
- [ ] Footer content personalized
- [ ] RSVP form questions customized

### Testing & Launch
- [ ] RSVP form tested with sample submission
- [ ] Admin panel changes reflect on main website
- [ ] Mobile responsiveness verified
- [ ] All "Get Directions" buttons working
- [ ] Photo slider functioning properly
- [ ] Export functionality tested

**Ready for production? Check the [Deployment Guide](DEPLOYMENT-GUIDE.md) for going live!**
