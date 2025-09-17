# Concierge Landing Page - Development Task List

## Phase 1: Project Setup & Configuration (Week 1)

### 1.1 Repository & Environment Setup
- [ ] Create new repository `concierge-final`
- [ ] Initialize Next.js 15+ project with TypeScript
- [ ] Configure ESLint and Prettier
- [ ] Set up Git workflow and branch protection
- [ ] Create `.env` files for development/production

### 1.2 Dependencies Installation
- [ ] Install core 3D dependencies: `three`, `@react-three/fiber`, `@react-three/drei`
- [ ] Install animation: `gsap` with ScrollTrigger plugin
- [ ] Install performance tools: `@react-three/postprocessing`, `leva` (dev only)
- [ ] Install utilities: `clsx`, `tailwind-merge`
- [ ] Configure Tailwind CSS with dark theme presets

### 1.3 Project Structure
- [ ] Create folder structure: `/components`, `/hooks`, `/lib`, `/public/models`, `/styles`
- [ ] Set up component architecture for 3D and UI separation
- [ ] Configure absolute imports with `@/` alias
- [ ] Create type definitions for 3D models and animations

## Phase 2: Asset Preparation & 3D Foundation (Week 1-2)

### 2.1 3D Model Integration
- [ ] Copy `butler.glb` and `tray.glb` from `concierge-site` to `public/models`
- [ ] Optimize models with Draco compression
- [ ] Generate TypeScript types using `gltfjsx`
- [ ] Test model loading and initial render

### 2.2 Basic 3D Scene Setup
- [ ] Create `ThreeCanvas` wrapper component with performance settings
- [ ] Implement `SceneLighting` with soft key light and rim light
- [ ] Create `Butler` component with model loader
- [ ] Create `Tray` component with pivot point configuration
- [ ] Set up camera with FOV 35, position (0, 1.6, 3.5)

### 2.3 Material Configuration
- [ ] Configure PBR materials for tray (roughness 0.25-0.35, clearcoat 0.2-0.3)
- [ ] Set up matte materials for butler
- [ ] Implement environment mapping for reflections
- [ ] Add subtle metalness to tray surface

## Phase 3: Animation System (Week 2-3)

### 3.1 GSAP ScrollTrigger Setup
- [ ] Initialize GSAP and register ScrollTrigger plugin
- [ ] Create scroll container with proper pinning
- [ ] Set up normalized scroll progress tracking (0-1)
- [ ] Implement scroll loop wrapping logic

### 3.2 Butler Animations
- [ ] Implement idle micro-sway (0.01-0.015 rad on Y, 4s loop)
- [ ] Create smooth animation curves with easing
- [ ] Test animation performance at 60fps

### 3.3 Tray Animation Sequence
- [ ] p0-p1 (0-15%): Tray approach animation (z: 0.60→0.40, scale: 1.0→1.10)
- [ ] p2 (25-45%): UI opacity fade (1→0) with tray tilt
- [ ] p3 (40-65%): Tray flip animation (rotX: 0.15→243°, z: 0.30→0.18)
- [ ] p4 (65-80%): Full frame cover (z: 0.12-0.15, scale up to 1.40)
- [ ] p5 (80-100%): Seamless reset implementation

### 3.4 Animation Polish
- [ ] Fine-tune easing curves (power2.out, power3.inOut, expo.inOut)
- [ ] Implement vignette effect during cover moment
- [ ] Test and fix animation loop continuity
- [ ] Add performance monitoring for animation frames

## Phase 4: UI Implementation (Week 3-4)

### 4.1 Typography & Branding
- [ ] Implement cursive font for "Concierge" title
- [ ] Configure modern sans for subhead and UI text
- [ ] Set up font loading optimization
- [ ] Apply kerning and tracking adjustments

### 4.2 Email Capture Component
- [ ] Create email input with validation
- [ ] Implement "Join Waitlist" button
- [ ] Add focus states and accessibility attributes
- [ ] Create error/success message display
- [ ] Style with minimal 1px hairline border

### 4.3 UI Overlay System
- [ ] Position UI elements on/above tray
- [ ] Sync UI position with tray movement
- [ ] Implement opacity transitions during scroll
- [ ] Create fallback HTML overlay option

### 4.4 Dark Theme Styling
- [ ] Apply color palette (#0B0B0D background, #111217/#14151A layers)
- [ ] Configure text colors (#EDEDED at 85% opacity)
- [ ] Create subtle gradients and depth layers
- [ ] Implement CSS variables for theme consistency

## Phase 5: Performance & Optimization (Week 4-5)

### 5.1 3D Performance
- [ ] Implement Level of Detail (LOD) for models
- [ ] Optimize draw calls and geometry
- [ ] Configure shadow maps efficiently
- [ ] Add performance monitoring hooks

### 5.2 Loading Optimization
- [ ] Create loading screen with progress indicator
- [ ] Implement model preloading strategy
- [ ] Add lazy loading for non-critical assets
- [ ] Optimize bundle size with code splitting

### 5.3 Mobile Optimization
- [ ] Implement responsive breakpoints
- [ ] Create simplified mobile animation
- [ ] Test touch interactions
- [ ] Add reduced motion preferences support

### 5.4 Cross-browser Compatibility
- [ ] Test WebGL fallback scenarios
- [ ] Implement static fallback for unsupported browsers
- [ ] Test on Safari, Chrome, Firefox, Edge
- [ ] Fix aspect ratio issues (16:9, 16:10, 3:2, mobile)

## Phase 6: Integration & Backend (Week 5)

### 6.1 Email Collection Backend
- [ ] Set up API endpoint for email submission
- [ ] Implement email validation and sanitization
- [ ] Create database schema for waitlist
- [ ] Add rate limiting and spam protection

### 6.2 Analytics Integration
- [ ] Implement Google Analytics 4
- [ ] Set up conversion tracking for email captures
- [ ] Add scroll depth tracking
- [ ] Create custom events for animation milestones

### 6.3 Error Handling
- [ ] Implement error boundaries for 3D components
- [ ] Add fallback UI for failed model loads
- [ ] Create user-friendly error messages
- [ ] Set up error logging service

## Phase 7: Testing & QA (Week 5-6)

### 7.1 Unit Testing
- [ ] Test email validation logic
- [ ] Test scroll progress calculations
- [ ] Test animation state management
- [ ] Test API endpoints

### 7.2 Integration Testing
- [ ] Test complete scroll animation sequence
- [ ] Test email submission flow
- [ ] Test cross-browser functionality
- [ ] Test mobile device interactions

### 7.3 Performance Testing
- [ ] Lighthouse audit optimization
- [ ] Test 60fps target on various devices
- [ ] Memory leak detection
- [ ] Bundle size analysis

### 7.4 Accessibility Testing
- [ ] Screen reader compatibility
- [ ] Keyboard navigation testing
- [ ] Color contrast verification
- [ ] WCAG 2.1 AA compliance check

## Phase 8: Deployment & Launch (Week 6)

### 8.1 Production Preparation
- [ ] Environment variable configuration
- [ ] Build optimization settings
- [ ] CDN configuration for assets
- [ ] SSL certificate setup

### 8.2 Deployment
- [ ] Deploy to Vercel/Netlify
- [ ] Configure custom domain
- [ ] Set up monitoring and alerts
- [ ] Implement A/B testing framework

### 8.3 Post-Launch
- [ ] Monitor conversion metrics
- [ ] Gather user feedback
- [ ] Performance monitoring
- [ ] Iterative improvements based on data

## Dependencies & Prerequisites

### Required Files
- `butler.glb` from `/Users/dyl/dev/concierge-site/public/models/`
- `tray.glb` from `/Users/dyl/dev/concierge-site/public/models/`

### Tech Stack
- Next.js 15+
- React 19+
- Three.js 0.179+
- React Three Fiber 9.3+
- GSAP 3.13+ with ScrollTrigger
- TypeScript 5+
- Tailwind CSS 4+

### Team Requirements
- Frontend Developer with Three.js experience
- UI/UX Developer
- Backend Developer (for email integration)
- QA Tester

## Success Criteria
- [ ] 60fps animation on modern devices
- [ ] < 3 second initial load time
- [ ] 15-20% email conversion rate
- [ ] Zero visible frame jumps in animation loop
- [ ] AA accessibility rating
- [ ] 90+ Lighthouse performance score

## Risk Mitigation
- **Performance Issues**: Have static fallback ready
- **Browser Incompatibility**: Progressive enhancement approach
- **Model Loading Failures**: Implement graceful degradation
- **High Bounce Rate**: A/B test different animation speeds

## Notes
- Keep animation subtle and sophisticated
- Prioritize performance over visual complexity
- Test extensively on real devices, not just desktop
- Consider implementing analytics from day one
- Document all animation timings for future adjustments