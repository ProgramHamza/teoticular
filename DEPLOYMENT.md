# Building & Deployment Guide

## 🏗️ Building the Project

### Development Build
```bash
npm run dev
```
- Starts hot-reload server on `http://localhost:3000`
- Best for testing and development
- Shows TypeScript errors in browser

### Production Build
```bash
npm run build
npm run start
```
- Optimizes and bundles the game
- Ready for deployment
- Same as what Vercel will run

---

## 🚀 Deploying to Vercel

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project directory
vercel
```

### Option 2: GitHub Integration

1. Push code to GitHub repository
2. Go to https://vercel.com
3. Import your GitHub repository
4. Vercel automatically deploys on push

### Option 3: Manual Deployment

```bash
# Build the project
npm run build

# Vercel reads from .next directory automatically
# Just push the entire project to Vercel
```

---

## 📋 Environment Setup

### Required
- Node.js 18+
- npm or yarn

### Optional Features (Not yet integrated)
- Phaser.js for animated minigames (installed but not used)
- localStorage for save/load (would require custom implementation)

---

## 🔧 Configuration Files

### tsconfig.json
- **Path Aliases**: `@/*` points to `./src/*`
- **Strict Mode**: Enabled for type safety
- **JSX**: React JSX format

### next.config.ts
- Standard Next.js configuration
- No custom webpack config needed

### tailwind.config.ts
- Default Tailwind setup
- Supports all utility classes used

### postcss.config.mjs
- PostCSS configured for TailwindCSS

### eslint.config.mjs
- NextJS ESLint recommended config
- Enforces code quality

---

## 📦 Dependencies

### Core Dependencies
```json
{
  "next": "16.1.6",        // React framework
  "react": "19.2.3",       // React library
  "react-dom": "19.2.3",   // DOM rendering
  "zustand": "^5.0.11"     // State management
}
```

### Dev Dependencies
```json
{
  "typescript": "^5",           // Type checking
  "tailwindcss": "^4",          // Styling
  "eslint": "^9",              // Linting
  "@types/react": "^19"        // React types
}
```

### Optional (For Future Features)
```json
{
  "phaser": "^3.55.2"  // Game framework (installed, not used yet)
}
```

---

## 🌐 Deployment Checklist

- [ ] All TypeScript compiles without errors
- [ ] No console warnings or errors in development
- [ ] Tested at least one full playthrough
- [ ] Verified responsive design (mobile/desktop)
- [ ] Checked all 8 endings are accessible
- [ ] Mini-games functioning correctly
- [ ] Photo unlocking working
- [ ] State management persisting (or deliberately resetting)

---

## 🎯 Performance Considerations

### Current Optimizations
- Client-side rendering (no server processing)
- Next.js automatic code-splitting
- TailwindCSS purging unused styles
- Zustand for efficient state management

### Potential Future Optimizations
- Add image optimization for photos
- Implement route-based lazy loading
- Compress game data
- Add service worker for offline play

---

## 📱 Mobile Compatibility

The game is fully responsive:
- **Mobile**: Single column layout, touch-friendly buttons
- **Tablet**: Optimized spacing and readability
- **Desktop**: Full multi-column layouts

---

## 🔐 Security Notes

### No Backend = No Security Risks
- All game logic is client-side
- No API calls to external servers
- No authentication needed
- No player data storage (currently)

### Future Considerations
If you add backend features:
- Never trust client-side stats for rankings
- Validate all game logic server-side
- Implement proper authentication
- Sanitize any user input

---

## 📊 Analytics & Tracking (Optional)

To add usage tracking:

```typescript
// Example: Add to /src/app/layout.tsx
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics /> {/* Track page views */}
      </body>
    </html>
  );
}
```

Install: `npm install @vercel/analytics`

---

## 🐛 Debugging

### Development
```bash
# Enable verbose logging
DEBUG=* npm run dev

# Open browser DevTools (F12)
# Check Console for errors
# Check Network for API calls (should be none)
```

### Production
```bash
# Check Vercel deployment logs
vercel logs
```

---

## 🔄 CI/CD Pipeline

Optional: Add automated testing (create `.github/workflows/build.yml`):

```yaml
name: Build & Deploy
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run lint
```

---

## 💾 Backup & Version Control

### Git Setup
```bash
# Initialize if not done
git init

# Add all files
git add .

# Commit
git commit -m "Initial game implementation"

# Push to GitHub
git remote add origin <your-github-repo>
git push -u origin main
```

### .gitignore (Already Configured)
- `node_modules/`
- `.next/`
- `dist/`
- `.env.local`

---

## 📝 Upgrade Instructions

### Updating Dependencies
```bash
# Check for updates
npm outdated

# Update specific package
npm update zustand

# Update all
npm update
```

### Updating Next.js
```bash
npm install next@latest

# May need to adjust code if major version bump
```

---

## 🆘 Common Issues & Solutions

### Issue: "Module not found"
**Solution**: Check path aliases in `tsconfig.json`

### Issue: "Zustand state not updating"
**Solution**: Verify store is called with `useGameStore.getState()` for non-React contexts

### Issue: "TailwindCSS not applying"
**Solution**: Restart dev server and clear cache

### Issue: "Build fails in production"
**Solution**: Remove any client-side logging or console statements

---

## ✅ Ready to Deploy!

Your game is production-ready. To deploy:

```bash
# Build locally first
npm run build

# If successful, push to Vercel
vercel
# or use GitHub integration
```

**Happy deploying!** 🚀

---

For questions or issues, check:
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [React Documentation](https://react.dev)
