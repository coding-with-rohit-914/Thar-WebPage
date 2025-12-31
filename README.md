# Mahindra THAR 🚗

-- Interactive Car Configurator 🚗

🌟 Project Overview:

-- A fully responsive, interactive car configuration web application for Mahindra THAR, featuring a modern UI with dark/light theme support, 360° car viewer, configuration wizard, test drive booking system, & performance analytics.

✨ Features:

# Demo: https://mahindra-thar.netlify.app/

🎨 Visual & UI Features:

-- Dual Theme System: Light & Dark modes with smooth transitions
-- 360° Car Viewer: Interactive 360-degree car rotation with zoom controls
-- Interactive Gallery: Multiple view angles (Exterior, Interior, Dashboard, Night Mode)
-- Real-time Updates: Live price calculation during configuration
-- Responsive Design: Fully optimized for mobile, tablet, and desktop
-- Smooth Animations: CSS animations and transitions throughout

🔧 Configuration System:

# 5-Step Configuration Wizard:

-- Variant Selection: AX Optional vs LX models
-- Engine Options: 2.0L Turbo Petrol vs 2.2L mHawk Diesel
-- Transmission: 6-Speed Manual vs Automatic
-- Appearance: Color, Wheels, and Roof customization
-- Accessories: LED Lights, Premium Audio, 360° Camera

# Color Customization:
-- Red Rage, 
-- Nautical Blue, 
-- Mystic Black, 
-- Pearl White
-- Real-time car color updates with gradient backgrounds

📊 Interactive Tools:

-- Comparison Tool: Detailed feature comparison between variants
-- Performance Analytics: Charts for Power/Torque, Fuel Efficiency
-- Off-road Capabilities: Visual display of technical specifications
-- Safety Features: Comprehensive safety system overview

📅 Booking System

-- Interactive Calendar: Date selection for test drives
-- Time Slot Booking: Available time slot management
-- Form Validation: Real-time form validation with error handling
-- Booking Summary: Live summary of selected options

🛠️ Technical Stack:

# Frontend:

-- HTML5: Semantic markup structure
-- CSS3: Modern CSS with CSS Variables, Flexbox, Grid, Animations
-- JavaScript (ES6+): Interactive functionality
-- Chart.js: Performance analytics visualization
-- Font Awesome: Icon library
-- Google Fonts: Typography (Poppins, Montserrat, Times New Roman)

# Design System:

-- CSS Variables: Themed color scheme with dark/light mode support
-- Component-Based: Modular CSS architecture
-- Responsive Breakpoints:
-- Mobile: < 576px
-- Tablet: 576px - 992px
-- Desktop: > 992px

📁 Project Structure

# mahindra-thar-configurator/
    │
    ├── index.html                      # Main HTML file
    ├── style.css                       # Complete CSS styles
    ├── script.js                       # Main JavaScript file
    ├── Thar logo.png                   # Car images and assets
    ├── Thar Red.png
    ├── Thar-Blue.jpg
    ├── Mystic Black Thar.png
    ├── Pearl White Thar.png
    ├── AX Optional Thar.png
    ├── LX Thar.png
    ├── Thar Exterior View.png
    ├── Thar Interior View.png
    ├── Thar Dashboard.png
    ├── Thar Night Mode.png
    ├── Thar Night View.png
    └── README.md                       # This documentation file

🚀 Setup & Installation

# Quick Start:
-- Download the project files
-- Open index.html in any modern web browser
-- No additional setup required - All dependencies are CDN-based

# For Development:

# Clone or download the project:
-- git clone [repository-url]

# Open in code editor:
-- code mahindra-thar-configurator/

# Start live server (optional):

# Using VS Code Live Server extension or similar:

📱 Responsive Design:

# Mobile Optimizations:
-- Touch Gestures: Pinch-to-zoom, swipe navigation
-- Mobile Menu: Hamburger menu with smooth transitions
-- Form Optimization: Mobile-friendly form inputs
-- Performance: Image lazy loading for faster loading

# Breakpoints:

-- Extra Small (≤ 576px): Mobile-first design
-- Small (576px - 768px): Tablet portrait
-- Medium (768px - 992px): Tablet landscape
-- Large (≥ 992px): Desktop

🎯 Key JavaScript Functions:

-- Configuration System
-- javascript
-- initCarConfig()          // Main configuration wizard
-- initColorSelector()      // Color customization
-- updateSummary()          // Real-time price calculation
-- showStep()               // Step navigation
-- Interactive Features
-- javascript
-- init360Viewer()          // 360° car rotation with touch support
-- initGallery()            // Image gallery with navigation
-- initPerformanceCharts()  // Performance analytics
-- initTestDriveBooking()   // Booking system
-- UI/UX Features
-- javascript
-- initTheme()              // Theme switching
-- initMobileMenu()         // Mobile navigation
-- initSmoothScrolling()    // Smooth anchor links
-- initModals()             // Popup modals

🎨 Design Features:

# Color Scheme:
# CSS:
--main-color: #6C63FF      /* Primary purple */
--secondary-color: #36D1DC  /* Cyan accent */
--accent-color: #FF6B8B     /* Pink accent */
--dark-bg: #1a1a2e          /* Dark theme background */

# Animations & Transitions:
-- Hover Effects: Interactive button and card hover states
-- Page Transitions: Smooth section transitions
-- Loading Animations: Content loading animations
-- Modal Animations: Slide-in modal effects

📊 Data Management:

# Local Storage:

-- Theme Preference: Remembers user's theme choice
-- Configuration: Saves car configuration for later
-- Test Drive: Stores booking information
-- Form Data Validation
-- Real-time Validation: Input validation as user types
-- Error Messages: Clear error feedback
-- Success States: Visual confirmation of successful actions

🔧 Troubleshooting:

-- Common Issues
-- Images Not Loading
-- Ensure all image files are in the images/ folder
-- Check image file names match the code references
-- Verify image paths are correct
-- JavaScript Errors
-- Check browser console for errors
-- Ensure all CDN links are accessible
-- Verify internet connection for CDN resources
-- Mobile Display Issues
-- Clear browser cache
-- Check responsive meta tags
-- Test on different devices

# Browser Compatibility:
✅ Chrome 80+
✅ Firefox 75+
✅ Safari 13+
✅ Edge 80+
✅ Mobile browsers (iOS Safari, Chrome for Android)

📈 Performance Optimizations:

# Loading Performance:
-- Lazy Loading: Images load as needed
-- CDN Resources: External libraries from CDN
-- Optimized Images: Properly sized images
-- Minimal Dependencies: Lightweight library usage
-- Runtime Performance
-- Efficient DOM Manipulation: Minimal reflows
-- Event Delegation: Optimized event handling
-- Debounced Functions: Performance-intensive operations
-- Memory Management: Proper cleanup of event listeners

🤝 Contributing:

# Guidelines:
-- Fork the repository
-- Create a feature branch (git checkout -b feature/AmazingFeature)
-- Commit changes (git commit -m 'Add some AmazingFeature')
-- Push to branch (git push origin feature/AmazingFeature)
-- Open a Pull Request

# Code Style:
-- HTML: Semantic markup with proper indentation
-- CSS: BEM-like naming convention with CSS variables
-- JavaScript: ES6+ with descriptive variable names
-- Comments: Clear, concise comments for complex logic

📄 License:
-- This project is created for educational and demonstration purposes. 
-- All Mahindra Thar branding, logos, and images are property of Mahindra & Mahindra Ltd.

🙏 Acknowledgments:
-- Mahindra & Mahindra Ltd. for the Thar brand and inspiration
-- Unsplash for placeholder images (in original concept)
-- Font Awesome for the icon library
-- Chart.js for data visualization
-- Google Fonts for typography

📧 Contact & Support
-- For questions, issues, or feedback:
-- Report Issues: Use GitHub Issues
-- Feature Requests: Submit via Issues with enhancement label
-- Questions: Check existing issues or create new one

# Note: 
-- This is a front-end demonstration project. All data is simulated for demonstration purposes. 
-- The actual Mahindra Thar specifications, prices, and features may vary. 
-- Always refer to official Mahindra sources for accurate information.

# Happy Customizing....! 🚗✨

# Built with ❤️ for CAR | SUV enthusiasts & WEB Developers.
