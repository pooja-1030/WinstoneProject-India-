# Design Document: Bangalore India Rebrand

## Overview

This design outlines the transformation of the Winstone Projects website from a UAE/Middle East focused platform to an Indian (Bangalore) focused premium real estate developer site. The transformation is primarily a content and data migration effort, updating all references, branding, and messaging while maintaining the existing React component architecture and design system.

The approach focuses on systematic updates to data files, minimal component modifications for India-specific features, and asset replacement where necessary. The existing component structure, styling, and responsive design will be preserved, ensuring a smooth transition with minimal disruption to the user experience.

## Architecture

### Current Architecture (Preserved)

The website follows a standard React single-page application architecture:

```
React App (Vite)
├── Components Layer (UI Components)
├── Pages Layer (Route Components)
├── Data Layer (Static Data Files)
├── Assets Layer (Images, Media)
└── Layouts Layer (Page Templates)
```

### Transformation Strategy

The transformation will be executed through three primary update vectors:

1. **Data Layer Updates**: Modify all data files to replace UAE content with India content
2. **Component Updates**: Minimal changes to components for India-specific formatting (currency, phone numbers)
3. **Asset Updates**: Replace UAE-themed images with India-appropriate imagery

### No Architectural Changes

The existing component hierarchy, routing structure, and state management remain unchanged. This is purely a content transformation, not a structural refactor.

## Components and Interfaces

### Data Files (Primary Update Target)

#### constants.js

**Current Structure:**
```javascript
export const companyInfo = { name, tagline, established, location, mission, description, vision }
export const contactInfo = { phone, email, address, whatsapp, whatsappMessage }
export const socialMedia = { facebook, instagram, linkedin, twitter }
export const founderInfo = { name, title, company, bio, image }
export const whyChooseUs = [{ id, title, description, icon }]
```

**Updates Required:**
- `companyInfo.name`: "Winstone Projects UAE" → "Winstone Projects"
- `companyInfo.tagline`: "Redefining Luxury Living in Dubai" → "Redefining Luxury Living in Bangalore"
- `companyInfo.location`: "Dubai, United Arab Emirates" → "Bangalore, Karnataka, India"
- `companyInfo.mission`: Update to reference India instead of UAE
- `companyInfo.description`: Update to reference Bangalore and India operations
- `companyInfo.vision`: Update to reference India market leadership
- `contactInfo.phone`: "+971 50 123 4567" → "+91 [Indian number]"
- `contactInfo.email`: "info@winstoneprojects.ae" → "info@winstoneprojects.in"
- `contactInfo.address`: "Business Bay, Dubai, UAE" → "Bangalore, Karnataka, India"
- `contactInfo.whatsapp`: Update to Indian number
- `contactInfo.whatsappMessage`: Update to reference Bangalore properties
- `founderInfo.bio`: Update to reference Bangalore and India instead of UAE
- `whyChooseUs`: Replace all 5 items with India-focused reasons

#### projects.js

**Current Structure:**
```javascript
export const projects = [{ 
  id, title, category, location, description, image, 
  price, features, status, bedrooms, bathrooms, area 
}]
```

**Updates Required:**
- Replace all 9 UAE projects with India-based projects
- Update locations: Dubai areas → Bangalore areas (e.g., Whitefield, Sarjapur Road, Electronic City, Hennur Road)
- Update prices: "AED X,XXX,XXX" → "₹X,XX,XX,XXX" (Indian Rupee format with lakhs/crores)
- Update categories: Keep "Luxury Villas", add "Residential Projects", "Land Development", "Township Development"
- Update project names to India-appropriate names
- Ensure at least 3 featured projects: "Luxury Villas Bangalore", "Winstone Farms", "Premium Residential Homes"

#### services.js

**Current Structure:**
```javascript
export const services = [{ id, title, description, icon, features }]
```

**Updates Required:**
- Replace 4 UAE-focused services with 5 India-focused services:
  1. Luxury Villa Development
  2. Residential Projects
  3. Land Development
  4. Commercial Spaces
  5. Township Development
- Update descriptions to reference Bangalore and Indian market
- Remove references to international investment consultation and UAE market

#### testimonials.js

**Current Structure:**
```javascript
export const testimonials = [{ id, name, country, testimonial, avatar, rating, date }]
```

**Updates Required:**
- Replace international client testimonials with India-focused testimonials
- Update names to Indian names or keep generic professional names
- Update testimonial content to reference quality construction, timely delivery, professionalism
- Remove references to specific UAE locations (Palm Jumeirah, Emirates Hills, Dubai Marina)
- Update country field to "India" or remove if using local clients

### Component Files (Minimal Updates)

#### Components Requiring Updates

**Hero.jsx**
- Update heading text to "Redefining Luxury Living in Bangalore"
- Update subheading to "Premium villas, residential and commercial developments crafted with excellence"
- Ensure CTA buttons remain "Explore Projects" and "Contact Us"

**About.jsx**
- Update content to reference Bangalore operations
- Update founder section to reference India vision

**Contact.jsx / ContactForm.jsx**
- Update phone number validation to accept Indian format (+91)
- Update placeholder text for Indian context
- Update location display to "Bangalore, Karnataka, India"

**Footer.jsx**
- Update copyright year to 2026
- Ensure social media links are updated (if hardcoded)

**WhatsAppButton.jsx**
- Update WhatsApp number to Indian format
- Update default message to reference Bangalore properties

#### Components Requiring No Changes

- Navbar.jsx (navigation structure unchanged)
- ProjectCard.jsx (displays data from projects.js)
- TestimonialCard.jsx (displays data from testimonials.js)
- Stats.jsx (if present, may need data updates)
- Awards.jsx (may need data updates or removal)
- Partners.jsx (may need data updates or removal)

### Page Files (Minimal Updates)

All page files (Home.jsx, About.jsx, Projects.jsx, Services.jsx, WhyChooseUs.jsx, Contact.jsx) primarily consume data from data files. Updates will be limited to:

- Ensuring proper data imports
- Updating any hardcoded text references to UAE/Dubai
- Verifying responsive layout works with new content

### Asset Files (Replacement Required)

#### Images to Replace

Based on public/ directory analysis:
- UAE-specific partner logos (Emaar, Nakheel, Aldar, etc.) → Remove or replace with Indian real estate partners
- Hero images should reflect Indian luxury architecture
- Project images should show India-appropriate properties

#### Images to Keep/Update

- Winstone logo (winstonelogo.jpg) - keep if brand-agnostic
- Generic luxury property images - evaluate for India appropriateness
- Founder portrait - keep if same founder

## Data Models

### Company Information Model

```javascript
{
  name: String,              // "Winstone Projects"
  tagline: String,           // "Building Luxury Living in Bangalore"
  established: Number,       // 2018
  location: String,          // "Bangalore, Karnataka, India"
  mission: String,           // India-focused mission statement
  description: String,       // Bangalore operations description
  vision: String            // India market vision
}
```

### Contact Information Model

```javascript
{
  phone: String,            // "+91 XXXXX XXXXX" (Indian format)
  email: String,            // "info@winstoneprojects.in"
  address: String,          // "Bangalore, Karnataka, India"
  whatsapp: String,         // "+91XXXXXXXXXX" (10 digits after country code)
  whatsappMessage: String   // Bangalore-focused message
}
```

### Project Model

```javascript
{
  id: String,               // Unique identifier
  title: String,            // Project name
  category: String,         // "Luxury Villas" | "Residential Projects" | "Land Development" | "Commercial Spaces" | "Township Development"
  location: String,         // Bangalore area (e.g., "Whitefield, Bangalore")
  description: String,      // Project description
  image: String,            // Path to image
  price: String,            // "₹X,XX,XX,XXX" (Indian Rupee format)
  features: Array<String>,  // Key features
  status: String,           // "Available" | "Coming Soon" | "Sold Out"
  bedrooms: Number,         // Number of bedrooms (if applicable)
  bathrooms: Number,        // Number of bathrooms (if applicable)
  area: String             // Area in sq ft
}
```

### Service Model

```javascript
{
  id: String,               // Unique identifier
  title: String,            // Service name
  description: String,      // Service description (India-focused)
  icon: String,             // Icon name (Lucide React icon)
  features: Array<String>   // Key features of service
}
```

### Testimonial Model

```javascript
{
  id: String,               // Unique identifier
  name: String,             // Client name
  country: String,          // "India" or specific state
  testimonial: String,      // Testimonial text (India-focused)
  avatar: String | null,    // Avatar image path
  rating: Number,           // 1-5 rating
  date: String             // Year
}
```

### Why Choose Us Model

```javascript
{
  id: String,               // Unique identifier
  title: String,            // Reason title
  description: String,      // Reason description (India-focused)
  icon: String             // Icon name (Lucide React icon)
}
```

## Currency and Number Formatting

### Indian Rupee Format

Indian currency uses a different grouping system than Western currencies:
- Lakhs: 1,00,000 (one lakh = 100,000)
- Crores: 1,00,00,000 (one crore = 10,000,000)

**Examples:**
- ₹50,00,000 (50 lakhs)
- ₹2,50,00,000 (2.5 crores)
- ₹15,00,00,000 (15 crores)

### Phone Number Format

Indian phone numbers:
- Country code: +91
- Mobile: 10 digits (e.g., +91 98765 43210)
- Format for display: "+91 XXXXX XXXXX" or "+91-XXXXX-XXXXX"

## Content Transformation Guidelines

### Location Mapping

**UAE → India Equivalents:**
- Dubai Hills Estate → Whitefield, Bangalore
- Palm Jumeirah → Waterfront properties near Bangalore lakes
- Downtown Dubai → Central Bangalore / MG Road area
- Business Bay → Electronic City / Outer Ring Road
- Emirates Hills → Prestige areas like Koramangala, Indiranagar
- Arabian Ranches → Gated communities in Sarjapur Road
- Dubai Marina → Lakefront properties
- DIFC → Commercial areas like Whitefield, Manyata Tech Park

### Tone and Messaging

**Maintain:**
- Luxury and premium positioning
- Professional and trustworthy tone
- Emphasis on quality and excellence
- Modern and sophisticated language

**Update:**
- Geographic references (UAE → India)
- Market context (Dubai luxury market → Bangalore premium market)
- Cultural references (appropriate for Indian audience)
- Investment messaging (international → local/NRI investors)

### SEO Keywords Update

**Remove:**
- Dubai, UAE, Emirates-related keywords
- Palm Jumeirah, Downtown Dubai location keywords

**Add:**
- Bangalore luxury real estate
- Premium properties Bangalore
- Luxury villas Bangalore
- Whitefield properties
- Sarjapur Road real estate
- Electronic City commercial spaces
- Bangalore township development
- Premium residential Bangalore


## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

For this content transformation project, properties focus on ensuring complete removal of UAE references, correct India-specific formatting, and presence of required content elements.

### Property 1: Complete UAE Reference Removal

*For any* content rendered by the Content_System (including all data files, component text, and displayed strings), the content should NOT contain any references to UAE, Dubai, Abu Dhabi, Middle East, Palm Jumeirah, Downtown Dubai, Emirates Hills, Dubai Marina, Business Bay, Arabian Ranches, DIFC, Bluewaters, or any other UAE-specific location or market terminology.

**Validates: Requirements 1.2, 3.5, 4.6, 5.7, 6.6, 7.4, 9.5, 10.5**

### Property 2: Indian Currency Format Consistency

*For any* price or currency value displayed by the Content_System, the value should use the Indian Rupee symbol (₹) and should NOT contain "AED" or any other currency code.

**Validates: Requirements 1.6, 4.3**

### Property 3: Indian Phone Number Format

*For any* phone number displayed by the Content_System (including contact phone, WhatsApp number, and any other phone references), the number should start with the Indian country code "+91" and should NOT start with "+971" or any other country code.

**Validates: Requirements 1.3, 8.3, 8.5**

### Property 4: Email Domain Validation

*For any* email address displayed by the Content_System, the email should end with ".in" or ".com" domain and should NOT end with ".ae" domain.

**Validates: Requirements 1.4, 8.4**

### Property 5: India-Based Location References

*For any* location string displayed by the Content_System (including project locations, company address, and geographic references), the location should reference Indian cities, states, or neighborhoods and should NOT reference UAE cities or locations.

**Validates: Requirements 1.5, 4.1, 4.2**

### Property 6: Service Content India Context

*For any* service description in the Content_System, at least one service should mention "India" or "Bangalore" to establish local market context, and no service should reference "UAE", "Dubai", or "international investment consultation".

**Validates: Requirements 5.6, 5.7**

### Property 7: Testimonial Content Appropriateness

*For any* testimonial displayed by the Content_System, the testimonial should NOT reference UAE-specific locations (Palm Jumeirah, Emirates Hills, Dubai Marina, etc.) or "international buyers", and should emphasize themes related to quality, construction, delivery, or professionalism.

**Validates: Requirements 7.2, 7.3, 7.4**

### Property 8: Responsive Layout Integrity

*For any* viewport size (mobile: 320-767px, tablet: 768-1023px, desktop: 1024px+), the Content_System should render all content without horizontal scrolling (except where intentionally designed), without overlapping elements, and with all interactive elements remaining accessible.

**Validates: Requirements 12.1, 12.2, 12.3**

## Error Handling

### Data Validation

**Missing Required Fields:**
- If any data file is missing required fields (e.g., companyInfo.name, contactInfo.phone), the application should fail to build or display a clear error message during development.
- Use TypeScript or PropTypes to enforce data structure validation.

**Invalid Format Detection:**
- Phone numbers that don't match Indian format should be flagged during development.
- Email addresses with .ae domain should be flagged during development.
- Currency values without ₹ symbol should be flagged during development.

### Content Migration Errors

**Incomplete Transformation:**
- If any UAE references remain after transformation, they should be detectable through automated testing.
- Use grep/search tools to scan for forbidden terms before deployment.

**Broken Image Links:**
- If image paths are updated but files don't exist, the application should handle gracefully with placeholder images or clear error messages.
- Verify all image paths during build process.

### Form Validation

**Contact Form:**
- Invalid email format should display user-friendly error message.
- Invalid phone number format should display user-friendly error message.
- Empty required fields should prevent form submission with clear feedback.

## Testing Strategy

### Dual Testing Approach

This project requires both unit tests and property-based tests to ensure comprehensive coverage:

**Unit Tests** focus on:
- Specific content values (exact strings for company name, tagline, hero text)
- Presence of required elements (form fields, navigation links, footer content)
- Individual component rendering with India-focused data
- Edge cases (empty data arrays, missing optional fields)

**Property Tests** focus on:
- Universal content rules (no UAE references anywhere)
- Format consistency (all phone numbers, all currency values, all email addresses)
- Cross-cutting concerns (responsive behavior across all viewport sizes)
- Data integrity across all projects, services, and testimonials

### Property-Based Testing Configuration

**Testing Library:** fast-check (for JavaScript/React)

**Configuration:**
- Minimum 100 iterations per property test
- Each property test must reference its design document property number
- Tag format: **Feature: bangalore-india-rebrand, Property {number}: {property_text}**

**Example Property Test Structure:**
```javascript
// Feature: bangalore-india-rebrand, Property 1: Complete UAE Reference Removal
test('no UAE references in any content', () => {
  fc.assert(
    fc.property(
      fc.constantFrom(...allContentSources),
      (content) => {
        const uaeTerms = ['UAE', 'Dubai', 'Abu Dhabi', 'Middle East', 
                         'Palm Jumeirah', 'Downtown Dubai', 'Emirates Hills'];
        return !uaeTerms.some(term => 
          content.toLowerCase().includes(term.toLowerCase())
        );
      }
    ),
    { numRuns: 100 }
  );
});
```

### Unit Testing Strategy

**Data File Tests:**
- Test that constants.js contains correct company name, tagline, location
- Test that projects.js contains at least 3 required projects
- Test that services.js contains all 5 required services
- Test that testimonials.js contains India-appropriate content
- Test that all data structures match expected models

**Component Tests:**
- Test Hero component renders correct heading and subheading
- Test Contact component displays correct location and contact info
- Test Footer component displays correct copyright text
- Test that form fields exist and have correct labels
- Test that navigation links are correct

**Integration Tests:**
- Test that pages correctly consume and display data from data files
- Test that routing works for all pages
- Test that form submission handles validation correctly

### Manual Testing Checklist

**Visual Review:**
- Verify luxury aesthetic is maintained (black, white, gold color scheme)
- Verify images are appropriate for Indian luxury real estate
- Verify responsive design works smoothly across devices
- Verify typography and spacing maintain premium feel

**Content Review:**
- Read through all content to ensure professional tone
- Verify no UAE references slipped through automated checks
- Verify Indian cultural context is appropriate
- Verify all links and CTAs work correctly

**Cross-Browser Testing:**
- Test on Chrome, Firefox, Safari, Edge
- Test on iOS and Android mobile devices
- Verify consistent rendering across browsers

### Deployment Validation

**Pre-Deployment Checks:**
1. Run all unit tests (must pass 100%)
2. Run all property tests (must pass 100%)
3. Run grep search for UAE terms (must return zero results)
4. Verify all images load correctly
5. Test form submission in staging environment
6. Verify responsive design on real devices

**Post-Deployment Checks:**
1. Verify production site loads correctly
2. Test contact form submission
3. Verify WhatsApp button works with correct Indian number
4. Check Google Search Console for any broken links
5. Verify SEO metadata is updated for India focus
