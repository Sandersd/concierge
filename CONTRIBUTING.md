# Contributing to Concierge AI Landing Page

Thank you for your interest in contributing to this premium 3D landing page project!

## Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/concierge-final.git
   cd concierge-final
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js 15 app directory
│   ├── globals.css        # Global styles and luxury theme
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Main landing page
├── components/            # React components
│   ├── Scene.tsx          # 3D butler and tray models
│   ├── ThreeScene.tsx     # Three.js canvas setup
│   ├── EmailCapture.tsx   # Waitlist signup form
│   ├── LoadingScreen.tsx  # Loading animation
│   └── ErrorBoundary.tsx  # Error handling
├── hooks/                 # Custom React hooks
│   └── usePerformanceMonitor.ts  # Performance tracking
├── public/models/         # 3D model assets
│   ├── butler.glb        # Butler character model
│   └── tray.glb          # Silver tray model
└── docs/                 # Documentation
    ├── concierge-prd.md  # Product Requirements
    ├── concierge-tasks.md # Development tasks
    └── concierge-landing-design-spec.md # Design system
```

## Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow React/Next.js best practices
- Maintain accessibility standards (WCAG 2.1 AA)
- Use semantic HTML and proper ARIA labels

### 3D Development
- Keep model files under 5MB
- Test performance on mobile devices
- Use efficient materials and lighting
- Maintain 60fps target

### Animation Guidelines
- Use GSAP for smooth animations
- Follow easing conventions (power2.out, expo.inOut)
- Test scroll animations across browsers
- Ensure seamless loop transitions

### Styling
- Use Tailwind CSS classes
- Maintain dark luxury theme consistency
- Follow responsive design patterns
- Test across screen sizes

## Making Changes

### For Animation Tweaks
1. Modify timing values in `components/Scene.tsx`
2. Test scroll behavior thoroughly
3. Ensure loop remains seamless

### For Styling Updates
1. Update design tokens in `tailwind.config.js`
2. Maintain color palette consistency
3. Test in light/dark mode preferences

### For New Features
1. Create feature branch: `git checkout -b feature/name`
2. Implement with proper TypeScript types
3. Add error handling and loading states
4. Test accessibility compliance
5. Update documentation

## Testing

### Manual Testing Checklist
- [ ] Scroll animation works smoothly
- [ ] Email validation functions correctly
- [ ] 3D models load without errors
- [ ] Responsive design looks good
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility

### Performance Testing
- [ ] Lighthouse score > 90
- [ ] 60fps maintained during animation
- [ ] Memory usage stays reasonable
- [ ] Models load within 3 seconds

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Submitting Changes

1. **Create descriptive commit messages:**
   ```bash
   git commit -m "✨ Add: Email validation with proper error states"
   ```

2. **Push to feature branch:**
   ```bash
   git push origin feature/name
   ```

3. **Create Pull Request:**
   - Use descriptive title
   - Include screenshots/videos for visual changes
   - List testing completed
   - Reference any related issues

## Performance Guidelines

### 3D Optimization
- Use LOD (Level of Detail) for complex models
- Optimize textures for web (KTX2, WebP)
- Minimize draw calls
- Use efficient materials

### Bundle Size
- Lazy load heavy components
- Code split by route
- Optimize imports from Three.js
- Monitor bundle analyzer

### Loading Performance
- Preload critical 3D assets
- Use progressive enhancement
- Implement loading states
- Optimize font loading

## Common Issues

### 3D Models Not Loading
- Check file paths in `public/models/`
- Verify GLB file integrity
- Test CORS headers in production

### Animation Performance
- Reduce animation complexity on mobile
- Use `will-change` CSS property sparingly
- Monitor frame rates in DevTools

### Build Errors
- Clear `.next` directory
- Check TypeScript errors
- Verify all imports

## Getting Help

- Check existing issues on GitHub
- Review documentation in `/docs/`
- Test on the live development server
- Ask questions in discussions

## Code of Conduct

- Be respectful and constructive
- Focus on improving the user experience
- Maintain the premium quality standard
- Help others learn and contribute

Thank you for contributing to this sophisticated 3D web experience! 🎨✨