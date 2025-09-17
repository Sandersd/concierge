# Deployment Guide

## GitHub Repository Setup

1. **Create GitHub Repository:**
   - Go to [GitHub.com](https://github.com/new)
   - Repository name: `concierge-final`
   - Description: `Premium AI travel concierge landing page with 3D butler animation`
   - Set to Public or Private as desired
   - DO NOT initialize with README (we already have one)

2. **Connect Local Repository:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/concierge-final.git
   git branch -M main
   git push -u origin main
   ```

## Vercel Deployment (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

3. **Custom Domain (Optional):**
   - Add domain in Vercel dashboard
   - Update DNS records as instructed

## Netlify Deployment

1. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Environment Variables:**
   - `NODE_ENV=production`

## Environment Variables

For production deployment, ensure these are set:

```bash
NODE_ENV=production
NEXT_PUBLIC_GA_TRACKING_ID=your_ga_id_here  # Optional
```

## Performance Checklist

- [ ] 3D models under 5MB each ✅
- [ ] Images optimized for web ✅
- [ ] Bundle size analyzed ✅
- [ ] Lighthouse score > 90 🔄
- [ ] Cross-browser tested 🔄

## Post-Deployment

1. Test scroll animation on live site
2. Verify email capture functionality
3. Check 3D performance on various devices
4. Monitor Core Web Vitals

## Analytics Integration

Add Google Analytics 4:

```javascript
// In app/layout.tsx
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
<Script id="google-analytics">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `}
</Script>
```

## Email Backend Integration

Replace mock API in `components/EmailCapture.tsx`:

```typescript
const response = await fetch('/api/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email })
});
```

## SEO Optimization

- [ ] Update meta descriptions
- [ ] Add structured data
- [ ] Generate sitemap
- [ ] Submit to search consoles