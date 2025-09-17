# Concierge - Premium AI Travel Landing Page

A sophisticated, minimalist 3D landing page for Concierge AI travel concierge service featuring an interactive butler and tray animation.

## Features

- **3D Butler Animation**: Classic butler holding silver tray with micro-sway idle animation
- **Scroll-Driven Animation**: Seamless loop where tray flips toward camera and resets
- **Dark Luxury Theme**: Nighttime hotel aesthetic with premium color palette
- **Email Capture**: Minimalist waitlist signup with validation
- **Performance Optimized**: 60fps target with efficient 3D rendering
- **Responsive Design**: Works across devices and screen sizes
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation

## Tech Stack

- **Framework**: Next.js 15.4.6 with React 19
- **3D Graphics**: Three.js with React Three Fiber
- **Animation**: GSAP with ScrollTrigger
- **Styling**: Tailwind CSS with custom luxury theme
- **TypeScript**: Fully typed for better development experience

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles and luxury theme
│   ├── layout.tsx      # Root layout with fonts
│   └── page.tsx        # Main page component
├── components/         # React components
│   ├── EmailCapture.tsx    # Waitlist signup form
│   ├── LoadingScreen.tsx   # Loading animation
│   ├── Scene.tsx          # 3D butler and tray models
│   └── ThreeScene.tsx     # Three.js canvas setup
├── public/models/      # 3D model files
│   ├── butler.glb     # Butler character model
│   └── tray.glb       # Silver tray model
└── types/             # TypeScript definitions
```

## Animation Sequence

The scroll animation follows a precise timeline:

- **0-15%**: Tray approaches camera (z: 0.6→0.4, scale: 1.0→1.1)
- **25-45%**: UI text fades out, tray tilts slightly
- **40-65%**: Dramatic flip revealing tray underside (243° rotation)
- **65-80%**: Tray fills entire frame
- **80-100%**: Seamless reset for infinite loop

## Design System

### Colors
- **Background**: `#0B0B0D` (Near-black)
- **Charcoal Layers**: `#111217`, `#14151A`
- **Text**: `#EDEDED` at 85% opacity
- **Silver Accents**: `#C0C0C0` for tray and interactions

### Typography
- **Title**: Dancing Script (cursive) with custom kerning
- **UI Text**: Inter (sans-serif) in light and regular weights
- **Responsive**: Scales from mobile to desktop

### Materials
- **Butler**: Matte finish (roughness: 0.8, metalness: 0)
- **Tray**: PBR with clearcoat (roughness: 0.3, metalness: 0.8, clearcoat: 0.25)

## Performance

- **Target**: 60fps on modern devices
- **Bundle Size**: Optimized with code splitting
- **Loading**: Progressive enhancement with fallbacks
- **Memory**: Efficient 3D object management

## Browser Support

- **Chrome/Edge**: Full support
- **Firefox**: Full support  
- **Safari**: Full support (iOS tested)
- **Mobile**: Responsive design with touch optimization

## Accessibility

- **WCAG 2.1 AA**: Compliant contrast ratios
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: Semantic HTML with ARIA labels
- **Reduced Motion**: Respects user preferences

## Development

### Build Commands
```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # Code linting
```

### Environment Variables
- `NODE_ENV`: Set to 'production' for builds
- `NEXT_PUBLIC_*`: Public environment variables

## Email Integration

The email capture form is ready for backend integration:

1. Replace the mock API call in `EmailCapture.tsx`
2. Add your email service endpoint
3. Implement proper validation and error handling
4. Add GDPR compliance as needed

## Deployment

Optimized for deployment on:
- **Vercel**: Zero-config deployment
- **Netlify**: Static site generation
- **Any Node.js host**: Supports SSR/SSG

## Customization

### Changing Colors
Update `tailwind.config.js` and `globals.css` for new color schemes.

### Modifying Animation
Adjust timing and easing in `Scene.tsx` - all values are in normalized percentages.

### Adding Models
Place `.glb` files in `public/models/` and update component imports.

## License

MIT License - see LICENSE file for details.

## Credits

- **3D Models**: Butler and tray models from original Concierge site
- **Fonts**: Google Fonts (Dancing Script, Inter)
- **Inspiration**: Luxury hotel aesthetics and premium web design

---

Built with ❤️ for premium AI travel experiences.