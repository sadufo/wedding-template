-- Wedding Invitation Template Database Schema
-- This script creates all necessary tables for the wedding invitation website

-- Table for storing couple information
CREATE TABLE IF NOT EXISTS couples (
    id SERIAL PRIMARY KEY,
    bride_name VARCHAR(100) NOT NULL,
    groom_name VARCHAR(100) NOT NULL,
    bride_photo_url TEXT,
    groom_photo_url TEXT,
    couple_photo_url TEXT,
    love_story TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for wedding event details
CREATE TABLE IF NOT EXISTS wedding_events (
    id SERIAL PRIMARY KEY,
    couple_id INTEGER REFERENCES couples(id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL, -- 'ceremony', 'reception', 'party'
    event_name VARCHAR(100) NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    venue_name VARCHAR(200) NOT NULL,
    venue_address TEXT NOT NULL,
    venue_map_url TEXT,
    dress_code VARCHAR(100),
    additional_info TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for RSVP responses
CREATE TABLE IF NOT EXISTS rsvp_responses (
    id SERIAL PRIMARY KEY,
    couple_id INTEGER REFERENCES couples(id) ON DELETE CASCADE,
    guest_name VARCHAR(100) NOT NULL,
    guest_email VARCHAR(150),
    guest_phone VARCHAR(20),
    attendance_status VARCHAR(20) NOT NULL CHECK (attendance_status IN ('attending', 'not_attending', 'maybe')),
    number_of_guests INTEGER DEFAULT 1,
    dietary_restrictions TEXT,
    special_requests TEXT,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for website customization settings
CREATE TABLE IF NOT EXISTS site_settings (
    id SERIAL PRIMARY KEY,
    couple_id INTEGER REFERENCES couples(id) ON DELETE CASCADE,
    site_title VARCHAR(200) DEFAULT 'Our Wedding',
    welcome_message TEXT,
    primary_color VARCHAR(7) DEFAULT '#be123c',
    secondary_color VARCHAR(7) DEFAULT '#ec4899',
    font_family VARCHAR(50) DEFAULT 'Geist Sans',
    background_image_url TEXT,
    music_url TEXT,
    contact_email VARCHAR(150),
    contact_phone VARCHAR(20),
    social_instagram VARCHAR(100),
    social_facebook VARCHAR(100),
    wedding_hashtag VARCHAR(100),
    countdown_enabled BOOLEAN DEFAULT true,
    rsvp_enabled BOOLEAN DEFAULT true,
    rsvp_deadline DATE,
    gallery_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for photo gallery
CREATE TABLE IF NOT EXISTS gallery_photos (
    id SERIAL PRIMARY KEY,
    couple_id INTEGER REFERENCES couples(id) ON DELETE CASCADE,
    photo_url TEXT NOT NULL,
    caption TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for admin users (for accessing admin panel)
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    couple_id INTEGER REFERENCES couples(id) ON DELETE CASCADE,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_wedding_events_couple_id ON wedding_events(couple_id);
CREATE INDEX IF NOT EXISTS idx_rsvp_responses_couple_id ON rsvp_responses(couple_id);
CREATE INDEX IF NOT EXISTS idx_gallery_photos_couple_id ON gallery_photos(couple_id);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_couple_id ON admin_users(couple_id);

-- Insert sample data for demonstration
INSERT INTO couples (bride_name, groom_name, love_story) VALUES 
('Emily Johnson', 'Michael Smith', 'We met in college during our first year and have been inseparable ever since. Our love story began in the library where we both reached for the same book - it was meant to be!');

INSERT INTO wedding_events (couple_id, event_type, event_name, event_date, event_time, venue_name, venue_address) VALUES 
(1, 'ceremony', 'Wedding Ceremony', '2024-06-15', '16:00:00', 'St. Mary''s Church', '123 Church Street, Downtown, NY 10001'),
(1, 'reception', 'Wedding Reception', '2024-06-15', '18:30:00', 'Grand Ballroom Hotel', '456 Celebration Ave, Downtown, NY 10001');

INSERT INTO site_settings (couple_id, site_title, welcome_message, contact_email, contact_phone, social_instagram, social_facebook, wedding_hashtag) VALUES 
(1, 'Emily & Michael''s Wedding', 'Join us as we celebrate our love and begin our journey together as husband and wife!', 'emily.michael.wedding@email.com', '(555) 123-4567', '@emilyandmichael2024', 'EmilyAndMichael2024', '#EmilyAndMichael2024');

-- Create admin user (password: 'admin123' - should be changed in production)
INSERT INTO admin_users (couple_id, email, password_hash, name) VALUES 
(1, 'admin@wedding.com', '$2b$10$rQZ8kqVZ8kqVZ8kqVZ8kqO', 'Wedding Admin');
