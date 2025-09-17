# Concierge AI - Luxury Landing Page Design Specification

## Project Overview

Premium minimalist dark landing page for "Concierge" AI travel service featuring a sophisticated nighttime luxury hotel aesthetic with cinematic 3D butler centerpiece and scroll-driven tray flip animation.

## Design System Foundation

### Color Palette

```css
:root {
  /* Primary Background Layers */
  --bg-primary: #0B0B0D;           /* Near-black base */
  --bg-secondary: #111217;         /* Mid-depth layer */
  --bg-tertiary: #14151A;          /* Front layer */
  
  /* Text System */
  --text-primary: rgba(237, 237, 237, 0.85);    /* Soft white 85% opacity */
  --text-secondary: rgba(237, 237, 237, 0.65);  /* Dimmed text */
  --text-accent: rgba(237, 237, 237, 0.95);     /* High emphasis */
  
  /* Interactive Elements */
  --surface-elevated: rgba(255, 255, 255, 0.08); /* Subtle surface lift */
  --border-primary: rgba(255, 255, 255, 0.12);   /* Hairline borders */
  --border-focus: rgba(255, 255, 255, 0.24);     /* Focus states */
  
  /* Tray Materials (3D) */
  --metal-base: #C0C4CC;           /* Brushed silver base */
  --metal-highlight: #E8EBF0;      /* Reflection highlights */
  --metal-shadow: #8A8E96;         /* Shadow areas */
  
  /* Status & Feedback */
  --accent-gold: #D4AF37;          /* Luxury accent */
  --success: rgba(72, 187, 120, 0.9);
  --error: rgba(245, 101, 101, 0.9);
}
```

**Accessibility Compliance:**
- Text contrast ratio: 4.5:1 minimum (WCAG AA)
- Interactive elements: 3:1 minimum
- Focus indicators: High visibility with 2px outline

### Typography Scale

```css
/* Font Stack */
--font-script: 'Playfair Display', 'Libre Baskerville', Georgia, serif;
--font-sans: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', Consolas, monospace;

/* Type Scale */
--text-hero: clamp(3.5rem, 8vw, 7rem);        /* Concierge title */
--text-xl: clamp(1.5rem, 4vw, 2.25rem);       /* Subheadings */
--text-lg: clamp(1.125rem, 2.5vw, 1.5rem);    /* Body large */
--text-base: 1rem;                             /* Base size */
--text-sm: 0.875rem;                           /* Small text */
--text-xs: 0.75rem;                            /* Micro text */

/* Typography Adjustments */
.title-script {
  font-family: var(--font-script);
  font-size: var(--text-hero);
  font-weight: 400;
  letter-spacing: -0.02em;        /* -2% kerning */
  line-height: 0.9;
  font-feature-settings: 'swsh' 1, 'calt' 1;
}

.subtitle-sans {
  font-family: var(--font-sans);
  font-size: var(--text-xl);
  font-weight: 300;
  letter-spacing: -0.01em;        /* -1% kerning */
  line-height: 1.3;
}
```

### Spacing System

```css
/* 8px base unit scaling */
--space-xs: 0.25rem;    /* 4px */
--space-sm: 0.5rem;     /* 8px */
--space-md: 1rem;       /* 16px */
--space-lg: 1.5rem;     /* 24px */
--space-xl: 2rem;       /* 32px */
--space-2xl: 3rem;      /* 48px */
--space-3xl: 4rem;      /* 64px */
--space-4xl: 6rem;      /* 96px */
--space-5xl: 8rem;      /* 128px */

/* Component-specific spacing */
--ui-float-offset: 2rem;    /* 2cm equivalent floating UI */
--tray-interaction-zone: 3rem;
--button-padding: 0.75rem 2rem;
--input-padding: 1rem 1.5rem;
```

### Breakpoints & Grid

```css
/* Responsive breakpoints */
--bp-xs: 320px;
--bp-sm: 640px;
--bp-md: 768px;
--bp-lg: 1024px;
--bp-xl: 1280px;
--bp-2xl: 1536px;

/* Layout grid */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

@media (min-width: 768px) {
  .container { padding: 0 var(--space-2xl); }
}
```

### Shadows & Depth

```css
/* Elevation system */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.25);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.15);
--shadow-tray: 0 15px 35px rgba(0, 0, 0, 0.3), 0 5px 15px rgba(0, 0, 0, 0.2);

/* Glow effects for premium feel */
--glow-subtle: 0 0 20px rgba(255, 255, 255, 0.05);
--glow-focus: 0 0 30px rgba(255, 255, 255, 0.1);
```

### Border Radius

```css
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
--radius-full: 9999px;  /* Pill shape */
```

## Component Architecture

### 1. Hero Section Component

**Purpose**: Primary landing section featuring 3D butler and core messaging

```typescript
interface HeroSectionProps {
  title: string;
  subtitle: string;
  onScrollProgress: (progress: number) => void;
  className?: string;
}
```

**Visual Specifications:**
- Full viewport height (100vh)
- Centered content with 3D scene background
- Text overlay with backdrop blur
- Responsive typography scaling

**Implementation Example:**
```jsx
const HeroSection = ({ title, subtitle, onScrollProgress }) => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="title-script">{title}</h1>
        <p className="subtitle-sans">{subtitle}</p>
      </div>
      <Canvas3D className="hero-canvas" />
    </section>
  );
};

/* CSS */
.hero-section {
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--bg-primary);
}

.hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  backdrop-filter: blur(8px);
  border-radius: var(--radius-lg);
  padding: var(--space-2xl);
  max-width: 800px;
}

.hero-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
```

**Accessibility Requirements:**
- ARIA landmark role="banner"
- Semantic heading hierarchy (h1 for title)
- Reduced motion alternative for 3D scene
- High contrast focus indicators

### 2. 3D Scene Component

**Purpose**: Interactive 3D butler with scroll-driven tray animation

```typescript
interface Scene3DProps {
  scrollProgress: number;
  animationState: 'idle' | 'approaching' | 'flipping' | 'revealing';
  onAnimationComplete?: () => void;
  reduceMotion?: boolean;
}
```

**3D Scene Specifications:**
```javascript
// Camera setup
const cameraConfig = {
  fov: 35,
  position: [0, 1.6, 3.5],
  near: 0.1,
  far: 1000
};

// Butler positioning
const butlerConfig = {
  position: [0, 0, 0],
  scale: 1,
  idleAnimation: {
    sway: { amplitude: 0.005, frequency: 0.8 },
    breathing: { amplitude: 0.002, frequency: 1.2 }
  }
};

// Tray positioning and materials
const trayConfig = {
  position: [0, 1.35, 0.6],
  material: {
    roughness: 0.3,
    metalness: 0.9,
    clearcoat: 0.25,
    clearcoatRoughness: 0.1
  }
};

// Lighting setup
const lightingConfig = {
  keyLight: {
    position: [2, 4, 3],
    intensity: 1.2,
    color: '#FFFFFF'
  },
  rimLight: {
    position: [-3, 2, -2],
    intensity: 0.8,
    color: '#B8C2D9'
  },
  ambientLight: {
    intensity: 0.3,
    color: '#404866'
  }
};
```

**Animation Choreography:**
```javascript
// Scroll-driven animation timeline
const animationTimeline = {
  phases: [
    {
      range: [0, 0.15],
      name: 'approach',
      tray: {
        position: { z: [0.6, 0.4] },
        scale: [1.0, 1.1],
        easing: 'easeOut'
      }
    },
    {
      range: [0.25, 0.45],
      name: 'preparation',
      text: { opacity: [1, 0] },
      tray: { rotation: { x: [0, -5] } }
    },
    {
      range: [0.40, 0.65],
      name: 'flip',
      tray: {
        rotation: { x: [0, 243] },
        easing: 'easeInOutCubic'
      }
    },
    {
      range: [0.65, 0.80],
      name: 'reveal',
      tray: {
        scale: [1.1, 2.5],
        position: { z: [0.4, 0.1] }
      }
    },
    {
      range: [0.80, 1.0],
      name: 'reset',
      tray: {
        opacity: [1, 0],
        easing: 'easeIn'
      }
    }
  ]
};
```

### 3. Floating UI Component

**Purpose**: Email capture form floating above tray surface

```typescript
interface FloatingUIProps {
  position: 'above-tray' | 'screen-center';
  onSubmit: (email: string) => void;
  isVisible: boolean;
  className?: string;
}
```

**Visual Specifications:**
- Glass morphism effect with backdrop blur
- Hairline border (1px)
- Generous padding for touch targets
- Smooth state transitions

**Implementation Example:**
```jsx
const FloatingUI = ({ position, onSubmit, isVisible }) => {
  const [email, setEmail] = useState('');
  
  return (
    <div className={`floating-ui ${position} ${isVisible ? 'visible' : 'hidden'}`}>
      <form onSubmit={(e) => handleSubmit(e, email)} className="waitlist-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="email-input"
          aria-label="Email address for waitlist"
          required
        />
        <button type="submit" className="cta-button">
          Join Waitlist
        </button>
      </form>
    </div>
  );
};

/* CSS */
.floating-ui {
  position: absolute;
  backdrop-filter: blur(20px) saturate(180%);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  box-shadow: var(--shadow-lg);
  transition: all 0.3s ease;
  z-index: 20;
}

.floating-ui.above-tray {
  bottom: calc(50% + var(--ui-float-offset));
  left: 50%;
  transform: translateX(-50%);
}

.floating-ui.hidden {
  opacity: 0;
  transform: translateX(-50%) translateY(1rem);
  pointer-events: none;
}

.floating-ui.visible {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
  pointer-events: auto;
}

.waitlist-form {
  display: flex;
  gap: var(--space-md);
  align-items: center;
  flex-wrap: wrap;
}

@media (max-width: 640px) {
  .waitlist-form {
    flex-direction: column;
    width: 100%;
  }
}

.email-input {
  flex: 1;
  min-width: 280px;
  padding: var(--input-padding);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  transition: all 0.2s ease;
}

.email-input::placeholder {
  color: var(--text-secondary);
}

.email-input:focus {
  outline: none;
  border-color: var(--border-focus);
  box-shadow: var(--glow-focus);
  background: rgba(255, 255, 255, 0.08);
}

.cta-button {
  padding: var(--button-padding);
  background: linear-gradient(135deg, var(--accent-gold), #B8941F);
  border: none;
  border-radius: var(--radius-md);
  color: var(--bg-primary);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 140px;
}

.cta-button:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.cta-button:active {
  transform: translateY(0);
}

.cta-button:focus {
  outline: 2px solid var(--border-focus);
  outline-offset: 2px;
}
```

**Accessibility Requirements:**
- Proper form labeling and validation
- Keyboard navigation support
- Clear focus indicators
- Error message announcements

### 4. Layout Grid System

**Purpose**: Responsive layout foundation for all components

```css
/* CSS Grid layout system */
.grid {
  display: grid;
  gap: var(--space-md);
}

.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }

/* Responsive utilities */
@media (min-width: 640px) {
  .sm\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .sm\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

@media (min-width: 768px) {
  .md\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .md\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .lg\:grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
}

/* Flexbox utilities */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.flex-row { flex-direction: row; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
```

## Micro-Interaction Specifications

### 1. Scroll-Driven Tray Animation

```javascript
// Intersection Observer for performance
const useScrollAnimation = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const progress = calculateScrollProgress(entry);
            setScrollProgress(progress);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    return () => observer.disconnect();
  }, []);
  
  return scrollProgress;
};

// Smooth easing functions
const easing = {
  easeOut: (t) => 1 - Math.pow(1 - t, 3),
  easeInOut: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
};
```

### 2. Butler Idle Animation

```javascript
// Subtle micro-movements for lifelike feel
const butlerIdleAnimation = {
  sway: {
    x: Math.sin(time * 0.8) * 0.005,
    z: Math.cos(time * 0.6) * 0.003
  },
  breathing: {
    scaleY: 1 + Math.sin(time * 1.2) * 0.002
  }
};
```

### 3. UI Hover States

```css
/* Button interactions */
.interactive-element {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.interactive-element:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.interactive-element:active {
  transform: translateY(0);
  transition-duration: 0.1s;
}

/* Focus states for accessibility */
.interactive-element:focus-visible {
  outline: 2px solid var(--border-focus);
  outline-offset: 2px;
}
```

## Accessibility Considerations

### 1. Screen Reader Support

```html
<!-- Semantic HTML structure -->
<main role="main" aria-label="Concierge AI Landing Page">
  <section role="banner" aria-labelledby="hero-title">
    <h1 id="hero-title">Concierge</h1>
    <p id="hero-subtitle">AI-powered luxury travel planning</p>
  </section>
  
  <div role="img" aria-label="3D butler holding silver tray" aria-describedby="scene-description">
    <!-- 3D Canvas -->
    <div id="scene-description" class="sr-only">
      Interactive 3D scene featuring a butler in formal attire presenting a silver serving tray. 
      Scroll to see animation of the tray flipping to reveal travel planning interface.
    </div>
  </div>
  
  <form role="form" aria-label="Join waitlist">
    <label for="email-input" class="sr-only">Email address</label>
    <input id="email-input" type="email" aria-required="true" />
    <button type="submit" aria-describedby="submit-help">Join Waitlist</button>
    <div id="submit-help" class="sr-only">
      Enter your email to join the Concierge AI waitlist and be notified when we launch.
    </div>
  </form>
</main>
```

### 2. Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .scroll-animation {
    transform: none !important;
  }
  
  .tray-flip {
    display: none;
  }
  
  .static-tray {
    display: block;
  }
}
```

### 3. Keyboard Navigation

```javascript
// Keyboard navigation for 3D scene
const handleKeyboardNavigation = (event) => {
  switch (event.key) {
    case 'Enter':
    case ' ':
      // Trigger tray animation
      triggerTrayFlip();
      break;
    case 'Tab':
      // Focus next interactive element
      focusNextElement();
      break;
    case 'Escape':
      // Reset scene to initial state
      resetScene();
      break;
  }
};
```

### 4. High Contrast Mode

```css
@media (prefers-contrast: high) {
  :root {
    --text-primary: #FFFFFF;
    --text-secondary: #CCCCCC;
    --border-primary: #FFFFFF;
    --bg-primary: #000000;
    --bg-secondary: #1A1A1A;
  }
  
  .floating-ui {
    background: rgba(255, 255, 255, 0.15);
    border: 2px solid var(--border-primary);
  }
  
  .cta-button {
    background: #FFFF00;
    color: #000000;
    border: 2px solid #FFFFFF;
  }
}
```

## Performance Optimization Strategies

### 1. 3D Scene Optimization

```javascript
// Level of Detail (LOD) system
const butlerLOD = {
  high: { vertices: 50000, distance: 5 },
  medium: { vertices: 25000, distance: 10 },
  low: { vertices: 10000, distance: 20 }
};

// Frustum culling
const updateLOD = (camera, object) => {
  const distance = camera.position.distanceTo(object.position);
  
  if (distance < 5) {
    object.geometry = highDetailGeometry;
  } else if (distance < 10) {
    object.geometry = mediumDetailGeometry;
  } else {
    object.geometry = lowDetailGeometry;
  }
};

// Texture optimization
const trayTextures = {
  diffuse: { size: 1024, format: 'webp' },
  normal: { size: 512, format: 'webp' },
  roughness: { size: 512, format: 'webp' }
};
```

### 2. Animation Performance

```javascript
// Use RAF for smooth animations
const useAnimationFrame = (callback) => {
  const requestRef = useRef();
  
  const animate = useCallback((time) => {
    callback(time);
    requestRef.current = requestAnimationFrame(animate);
  }, [callback]);
  
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);
};

// Throttle scroll events
const useThrottledScroll = (callback, delay = 16) => {
  const [throttledCallback] = useMemo(
    () => throttle(callback, delay),
    [callback, delay]
  );
  
  useEffect(() => {
    window.addEventListener('scroll', throttledCallback, { passive: true });
    return () => window.removeEventListener('scroll', throttledCallback);
  }, [throttledCallback]);
};
```

### 3. Asset Loading Strategy

```javascript
// Progressive loading
const assetLoadingPriority = {
  critical: [
    'butler-low-poly.glb',
    'tray-base.webp',
    'fonts/playfair-display.woff2'
  ],
  important: [
    'butler-high-poly.glb',
    'tray-normal.webp',
    'tray-roughness.webp'
  ],
  deferred: [
    'environment-hdri.hdr',
    'additional-animations.json'
  ]
};

// Preload critical assets
const preloadAssets = async () => {
  const criticalAssets = assetLoadingPriority.critical.map(asset => 
    loadAsset(asset)
  );
  
  await Promise.all(criticalAssets);
  
  // Load important assets in background
  assetLoadingPriority.important.forEach(asset => 
    loadAsset(asset)
  );
};
```

### 4. Memory Management

```javascript
// Dispose of 3D objects properly
const cleanup3DScene = () => {
  scene.traverse((object) => {
    if (object.geometry) {
      object.geometry.dispose();
    }
    
    if (object.material) {
      if (Array.isArray(object.material)) {
        object.material.forEach(material => material.dispose());
      } else {
        object.material.dispose();
      }
    }
    
    if (object.texture) {
      object.texture.dispose();
    }
  });
  
  renderer.dispose();
};

// Use object pooling for particles
const particlePool = new ObjectPool(() => new Particle(), 100);
```

### 5. Code Splitting & Lazy Loading

```javascript
// Lazy load 3D components
const Scene3D = lazy(() => import('./components/Scene3D'));
const FloatingUI = lazy(() => import('./components/FloatingUI'));

// Route-based code splitting
const LandingPage = lazy(() => import('./pages/LandingPage'));

// Component-based splitting
const Enhanced3DScene = lazy(() => 
  import('./components/Enhanced3DScene').then(module => ({
    default: module.Enhanced3DScene
  }))
);
```

## Implementation Roadmap

### Phase 1: Foundation (Week 1)
- [ ] Set up design tokens and CSS custom properties
- [ ] Implement responsive grid system
- [ ] Create base typography components
- [ ] Set up accessibility foundations (semantic HTML, ARIA)

### Phase 2: Core Components (Week 2)
- [ ] Build Hero section with responsive typography
- [ ] Implement FloatingUI component with form validation
- [ ] Create base 3D scene setup with Three.js
- [ ] Add basic butler model and positioning

### Phase 3: 3D Scene Development (Week 3)
- [ ] Implement tray 3D model with PBR materials
- [ ] Add lighting system (key light, rim light, ambient)
- [ ] Create butler idle animation system
- [ ] Implement basic scroll detection

### Phase 4: Scroll-Driven Animation (Week 4)
- [ ] Build scroll progress tracking system
- [ ] Implement tray flip animation timeline
- [ ] Add easing functions and smooth transitions
- [ ] Create seamless loop logic

### Phase 5: Polish & Optimization (Week 5)
- [ ] Performance optimization (LOD, texture compression)
- [ ] Accessibility testing and refinement
- [ ] Cross-browser testing and fixes
- [ ] Mobile responsiveness optimization

### Phase 6: Final Testing (Week 6)
- [ ] User testing with accessibility tools
- [ ] Performance auditing (Core Web Vitals)
- [ ] Cross-device testing
- [ ] Launch preparation

## Design Tokens Setup

```javascript
// tokens.js - Design system foundation
export const tokens = {
  colors: {
    background: {
      primary: '#0B0B0D',
      secondary: '#111217',
      tertiary: '#14151A'
    },
    text: {
      primary: 'rgba(237, 237, 237, 0.85)',
      secondary: 'rgba(237, 237, 237, 0.65)',
      accent: 'rgba(237, 237, 237, 0.95)'
    },
    interactive: {
      surface: 'rgba(255, 255, 255, 0.08)',
      border: 'rgba(255, 255, 255, 0.12)',
      focus: 'rgba(255, 255, 255, 0.24)'
    },
    material: {
      metalBase: '#C0C4CC',
      metalHighlight: '#E8EBF0',
      metalShadow: '#8A8E96'
    },
    accent: {
      gold: '#D4AF37',
      success: 'rgba(72, 187, 120, 0.9)',
      error: 'rgba(245, 101, 101, 0.9)'
    }
  },
  
  typography: {
    fontFamilies: {
      script: "'Playfair Display', Georgia, serif",
      sans: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      mono: "'JetBrains Mono', Consolas, monospace"
    },
    sizes: {
      hero: 'clamp(3.5rem, 8vw, 7rem)',
      xl: 'clamp(1.5rem, 4vw, 2.25rem)',
      lg: 'clamp(1.125rem, 2.5vw, 1.5rem)',
      base: '1rem',
      sm: '0.875rem',
      xs: '0.75rem'
    },
    letterSpacing: {
      tight: '-0.02em',
      normal: '-0.01em',
      wide: '0.025em'
    }
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem'
  },
  
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  
  animation: {
    duration: {
      fast: '0.1s',
      normal: '0.2s',
      slow: '0.3s',
      slower: '0.5s'
    },
    easing: {
      linear: 'linear',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }
};
```

## Feedback & Iteration Notes

### User Testing Checklist
- [ ] Navigation accessibility with keyboard only
- [ ] Screen reader announcement accuracy
- [ ] Color contrast in various lighting conditions
- [ ] Performance on lower-end devices
- [ ] Animation smoothness across browsers
- [ ] Form submission and validation UX
- [ ] Mobile touch interaction quality
- [ ] Loading state and error handling

### Browser Support Matrix
- Chrome 90+ (Primary)
- Firefox 88+ (Secondary)
- Safari 14+ (Secondary)
- Edge 90+ (Tertiary)

### Performance Targets
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms
- 3D Scene 60fps on mid-range devices

### Accessibility Compliance
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Reduced motion preferences

---

*This specification serves as a living document that should be updated based on user feedback, technical constraints, and design iterations throughout the development process.*