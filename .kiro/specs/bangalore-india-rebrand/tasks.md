# Implementation Plan: Bangalore India Rebrand

## Overview

This implementation plan transforms the Winstone Projects website from UAE/Middle East focused to Indian (Bangalore) focused. The transformation is primarily data-driven: update data files first, then make minimal component modifications for India-specific features, and finally verify through comprehensive testing. The existing React component architecture, styling, and responsive design are preserved.

## Tasks

- [ ] 1. Update company constants and core data
  - Update src/data/constants.js with all India-focused information
  - Change companyInfo.name from "Winstone Projects UAE" to "Winstone Projects"
  - Change companyInfo.tagline to "Building Luxury Living in Bangalore"
  - Change companyInfo.location to "Bangalore, Karnataka, India"
  - Update companyInfo.mission to reference India instead of UAE
  - Update companyInfo.description to reference Bangalore and India operations
  - Update companyInfo.vision to reference India market leadership
  - Change contactInfo.phone to Indian format: "+91 [number]"
  - Change contactInfo.email to use .in domain: "info@winstoneprojects.in"
  - Change contactInfo.address to "Bangalore, Karnataka, India"
  - Update contactInfo.whatsapp to Indian number format
  - Update contactInfo.whatsappMessage to reference Bangalore properties
  - Update founderInfo.bio to reference Bangalore and India instead of UAE
  - Replace all 5 items in whyChooseUs array with India-focused reasons (Bangalore market expertise, Premium quality construction, Transparent process, Modern architecture, Customer-first approach)
  - _Requirements: 1.1, 1.3, 1.4, 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 3.4, 3.5, 6.1, 6.2, 6.3, 6.4, 6.5, 8.2, 8.3, 8.4, 8.5_

- [ ]* 1.1 Write unit tests for constants.js
  - Test companyInfo.name equals "Winstone Projects" (no UAE suffix)
  - Test companyInfo.tagline equals "Building Luxury Living in Bangalore"
  - Test companyInfo.location equals "Bangalore, Karnataka, India"
  - Test contactInfo.phone starts with "+91"
  - Test contactInfo.email ends with ".in" or ".com" (not ".ae")
  - Test founderInfo.name equals "Nayaz Faiyaz Ahmed"
  - Test whyChooseUs array has exactly 5 items
  - Test no UAE references in any constant values
  - _Requirements: 1.1, 1.3, 1.4, 2.1, 2.2, 3.1, 6.1_

- [ ] 2. Transform projects data file
  - Update src/data/projects.js with India-based projects
  - Replace all existing UAE projects with India-based projects
  - Update all project locations to Bangalore areas: Whitefield, Sarjapur Road, Electronic City, Hennur Road, Koramangala, Indiranagar, etc.
  - Convert all prices from AED to Indian Rupees (₹) using lakh/crore format (e.g., "₹2,50,00,000" for 2.5 crores)
  - Ensure project categories include: "Luxury Villas", "Residential Projects", "Land Development", "Commercial Spaces", "Township Development"
  - Create at least 3 featured projects with these titles: "Luxury Villas Bangalore", "Winstone Farms", "Premium Residential Homes"
  - Remove all UAE location references from project descriptions
  - _Requirements: 1.5, 1.6, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

- [ ]* 2.1 Write property test for projects - UAE reference removal
  - **Property 1: Complete UAE Reference Removal**
  - **Validates: Requirements 1.2, 4.6**
  - For any project in projects array, verify it does NOT contain: UAE, Dubai, Abu Dhabi, Middle East, Palm Jumeirah, Downtown Dubai, Emirates Hills, Dubai Marina, Business Bay, Arabian Ranches, DIFC, Bluewaters
  - Configure test to run 100 iterations

- [ ]* 2.2 Write property test for projects - currency format
  - **Property 2: Indian Currency Format Consistency**
  - **Validates: Requirements 1.6, 4.3**
  - For any project price value, verify it uses ₹ symbol and does NOT contain "AED"
  - Configure test to run 100 iterations

- [ ]* 2.3 Write property test for projects - location validation
  - **Property 5: India-Based Location References**
  - **Validates: Requirements 1.5, 4.1, 4.2**
  - For any project location, verify it references Indian cities/states/neighborhoods and does NOT reference UAE cities
  - Configure test to run 100 iterations

- [ ]* 2.4 Write unit tests for projects.js
  - Test that project with title "Luxury Villas Bangalore" exists
  - Test that project with title "Winstone Farms" exists
  - Test that project with title "Premium Residential Homes" exists
  - Test that at least one project has category "Luxury Villas"
  - Test that at least one project has category "Residential Projects"
  - Test that at least one project has category "Land Development"
  - _Requirements: 4.4, 4.5_

- [ ] 3. Update services data file
  - Update src/data/services.js with India-focused services
  - Replace existing services with exactly 5 services: "Luxury Villa Development", "Residential Projects", "Land Development", "Commercial Spaces", "Township Development"
  - Update all service descriptions to reference Bangalore and Indian market context
  - Remove any references to "international investment consultation" or "UAE market"
  - Ensure service features emphasize local Bangalore expertise and quality
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_

- [ ]* 3.1 Write property test for services - India context
  - **Property 6: Service Content India Context**
  - **Validates: Requirements 5.6, 5.7**
  - For all services, verify at least one service description mentions "India" or "Bangalore"
  - For any service, verify it does NOT reference "UAE", "Dubai", or "international investment consultation"
  - Configure test to run 100 iterations

- [ ]* 3.2 Write unit tests for services.js
  - Test that service with title "Luxury Villa Development" exists
  - Test that service with title "Residential Projects" exists
  - Test that service with title "Land Development" exists
  - Test that service with title "Commercial Spaces" exists
  - Test that service with title "Township Development" exists
  - Test that services array has exactly 5 items
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 4. Update testimonials data file
  - Update src/data/testimonials.js with India-appropriate testimonials
  - Replace existing testimonials with India-focused client testimonials
  - Update testimonial text to emphasize: quality construction, timely delivery, professionalism, transparency
  - Remove all references to UAE locations: Palm Jumeirah, Emirates Hills, Dubai Marina, etc.
  - Remove references to "international buyers"
  - Update client names to Indian names or keep generic professional names
  - Update country field to "India" or specific Indian states
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ]* 4.1 Write property test for testimonials - content appropriateness
  - **Property 7: Testimonial Content Appropriateness**
  - **Validates: Requirements 7.2, 7.3, 7.4**
  - For any testimonial, verify it does NOT reference: Palm Jumeirah, Emirates Hills, Dubai Marina, international buyers, UAE locations
  - For any testimonial, verify it emphasizes themes: quality, construction, delivery, professionalism, transparency
  - Configure test to run 100 iterations

- [ ]* 4.2 Write unit tests for testimonials.js
  - Test that testimonials array has at least 3 items
  - Test that no testimonial contains "UAE" or "Dubai"
  - Test that at least one testimonial mentions quality or construction
  - _Requirements: 7.1, 7.2_

- [ ] 5. Checkpoint - Verify data layer transformation
  - Run all data file unit tests and verify they pass
  - Manually review constants.js, projects.js, services.js, testimonials.js for any remaining UAE references
  - Use grep/search to scan data files for forbidden terms: UAE, Dubai, AED, .ae
  - Ensure all tests pass, ask the user if questions arise

- [ ] 6. Update Hero component
  - Update src/components/Hero.jsx heading text to "Redefining Luxury Living in Bangalore"
  - Update subheading text to "Premium villas, residential and commercial developments crafted with excellence"
  - Verify CTA buttons display "Explore Projects" and "Contact Us"
  - Remove any hardcoded UAE or Dubai references
  - _Requirements: 9.1, 9.2, 9.3, 9.5_

- [ ]* 6.1 Write unit test for Hero component
  - Test that rendered heading equals "Redefining Luxury Living in Bangalore"
  - Test that rendered subheading equals "Premium villas, residential and commercial developments crafted with excellence"
  - Test that "Explore Projects" button exists
  - Test that "Contact Us" button exists
  - _Requirements: 9.1, 9.2, 9.3_

- [ ] 7. Update Contact and ContactForm components
  - Update src/components/Contact.jsx to display "Bangalore, Karnataka, India" as location
  - Update src/components/ContactForm.jsx phone validation to accept Indian format: +91 followed by 10 digits
  - Update phone input placeholder to show Indian format example: "+91 98765 43210"
  - Verify form has fields: Name, Email, Phone, Message
  - Update any hardcoded contact text to reference Bangalore
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ]* 7.1 Write unit test for Contact components
  - Test that Contact component displays "Bangalore, Karnataka, India"
  - Test that ContactForm has Name field
  - Test that ContactForm has Email field
  - Test that ContactForm has Phone field
  - Test that ContactForm has Message field
  - _Requirements: 8.1, 8.2_

- [ ] 8. Update WhatsAppButton component
  - Update src/components/WhatsAppButton.jsx to use Indian phone number with +91 country code
  - Update default WhatsApp message to reference "Bangalore properties" instead of Dubai
  - Ensure WhatsApp link format is correct: https://wa.me/91XXXXXXXXXX
  - _Requirements: 8.5_

- [ ]* 8.1 Write unit test for WhatsAppButton component
  - Test that WhatsApp number starts with "+91" or "91"
  - Test that default message references Bangalore or India
  - _Requirements: 8.5_

- [ ] 9. Update Footer component
  - Update src/components/Footer.jsx copyright text to "© 2026 Winstone Projects. All rights reserved."
  - Verify quick links section includes: Home, About Us, Projects, Services, Why Choose Us, Contact
  - Verify social media icons are present
  - Remove any hardcoded UAE references
  - _Requirements: 10.1, 10.2, 10.3_

- [ ]* 9.1 Write unit test for Footer component
  - Test that copyright text equals "© 2026 Winstone Projects. All rights reserved."
  - Test that quick links exist for all main pages
  - Test that social media icons are rendered
  - _Requirements: 10.1, 10.2, 10.3_

- [ ] 10. Update About page and component
  - Update src/pages/About.jsx and/or src/components/About.jsx
  - Update company description to reference Bangalore operations and India market
  - Update founder section to reference India vision and Bangalore expertise
  - Remove any hardcoded UAE or Middle East references
  - Ensure content emphasizes: established 2018, world-class infrastructure in India, innovation, trust, long-term value
  - _Requirements: 2.3, 2.4, 2.5, 3.2, 3.3, 3.4, 3.5_

- [ ]* 10.1 Write unit test for About component
  - Test that founder name "Nayaz Faiyaz Ahmed" is displayed
  - Test that no UAE references appear in rendered content
  - Test that "India" or "Bangalore" appears in company description
  - _Requirements: 3.1, 3.2, 3.5_

- [ ] 11. Review and update remaining components
  - Review src/components/Navbar.jsx for any hardcoded UAE text
  - Review src/components/ProjectCard.jsx to ensure it displays data correctly
  - Review src/components/TestimonialCard.jsx to ensure it displays data correctly
  - Review src/components/Stats.jsx (if exists) and update any UAE-specific statistics
  - Review src/components/Awards.jsx (if exists) - remove if UAE-specific, or update for India
  - Review src/components/Partners.jsx (if exists) - remove UAE partner logos or update with Indian partners
  - Verify all components properly consume updated data from data files
  - _Requirements: 10.4, 10.5_

- [ ]* 11.1 Write unit test for Navbar component
  - Test that navigation links include: Home, About Us, Projects, Services, Why Choose Us, Contact
  - Test that no UAE references appear in navigation
  - _Requirements: 10.4_

- [ ] 12. Checkpoint - Verify component layer transformation
  - Run all component unit tests and verify they pass
  - Start development server and manually test each page in browser
  - Verify no UAE references appear in any rendered content
  - Test navigation between all pages
  - Ensure all tests pass, ask the user if questions arise

- [ ] 13. Update asset files
  - Review public/ directory for UAE-specific images
  - Remove UAE partner logos: Emaar, Nakheel, Aldar, etc.
  - Replace hero background images with India-appropriate luxury property images
  - Replace project images with Bangalore/India property images
  - Keep Winstone logo (winstonelogo.jpg) if brand-agnostic
  - Keep founder portrait image
  - Update any image references in components if file names changed
  - Ensure all images maintain luxury aesthetic
  - _Requirements: 9.4_

- [ ] 14. Write comprehensive property-based tests
  - [ ] 14.1 Write property test for complete UAE reference removal across all content
    - **Property 1: Complete UAE Reference Removal**
    - **Validates: Requirements 1.2, 3.5, 4.6, 5.7, 6.6, 7.4, 9.5, 10.5**
    - Test all data files (constants, projects, services, testimonials) for UAE terms
    - Test rendered components for UAE terms
    - Forbidden terms: UAE, Dubai, Abu Dhabi, Middle East, Palm Jumeirah, Downtown Dubai, Emirates Hills, Dubai Marina, Business Bay, Arabian Ranches, DIFC, Bluewaters
    - Configure test to run 100 iterations
  
  - [ ]* 14.2 Write property test for phone number format consistency
    - **Property 3: Indian Phone Number Format**
    - **Validates: Requirements 1.3, 8.3, 8.5**
    - Test all phone numbers in constants.js and rendered components
    - Verify all phone numbers start with "+91"
    - Verify no phone numbers start with "+971" (UAE code)
    - Configure test to run 100 iterations
  
  - [ ]* 14.3 Write property test for email domain validation
    - **Property 4: Email Domain Validation**
    - **Validates: Requirements 1.4, 8.4**
    - Test all email addresses in constants.js and rendered components
    - Verify all emails end with ".in" or ".com"
    - Verify no emails end with ".ae"
    - Configure test to run 100 iterations
  
  - [ ]* 14.4 Write property test for responsive layout integrity
    - **Property 8: Responsive Layout Integrity**
    - **Validates: Requirements 12.1, 12.2, 12.3, 12.4**
    - Test website rendering at mobile viewport (320-767px)
    - Test website rendering at tablet viewport (768-1023px)
    - Test website rendering at desktop viewport (1024px+)
    - Verify no horizontal scrolling (except intentional)
    - Verify no overlapping elements
    - Verify all interactive elements remain accessible
    - Configure test to run 100 iterations

- [ ] 15. Final integration testing and verification
  - Run complete test suite: all unit tests and all property tests
  - Verify 100% test pass rate
  - Perform manual testing on all pages: Home, About, Projects, Services, Why Choose Us, Contact
  - Test responsive design on actual mobile device or browser dev tools
  - Test form submission with valid and invalid data
  - Test WhatsApp button click with Indian number
  - Verify all navigation links work correctly
  - Check browser console for any errors or warnings
  - Verify luxury aesthetic is maintained: black/white/gold colors, modern fonts, clean spacing
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 12.1, 12.2, 12.3, 12.4, 12.5_

- [ ] 16. Final checkpoint - Complete transformation verification
  - Run grep search across entire codebase for UAE terms (should return zero results in src/ directory)
  - Run grep search for "+971" phone code (should return zero results)
  - Run grep search for ".ae" email domain (should return zero results)
  - Run grep search for "AED" currency (should return zero results)
  - Verify all property tests pass with 100 iterations each
  - Verify all unit tests pass
  - Perform final visual review: check luxury aesthetic, professional tone, India focus
  - Ensure all tests pass, ask the user if questions arise

## Notes

- Tasks marked with `*` are optional testing tasks and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation and catch issues early
- Property tests validate universal correctness properties across all content (minimum 100 iterations each)
- Unit tests validate specific examples, required elements, and edge cases
- The transformation is primarily data-driven, minimizing component changes to reduce risk
- Maintain luxury aesthetic throughout: black, white, gold color scheme with modern sans-serif fonts
- Indian Rupee format uses lakh/crore notation: ₹50,00,000 (50 lakhs), ₹2,50,00,000 (2.5 crores)
- Indian phone format: +91 XXXXX XXXXX (country code + 10 digits)
- Use fast-check library for property-based testing in JavaScript/React
- Tag each property test with: **Feature: bangalore-india-rebrand, Property {number}: {property_text}**
