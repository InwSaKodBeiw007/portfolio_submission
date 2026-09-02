# 🖤 GAME - Personal Portfolio

A dark, interactive portfolio website showcasing software engineering and game development work.

> Built with **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, and **Three.js** for immersive 3D experiences.

---

## 🎨 Website Overview

**portfoliosuper-v001** is a modern, fully responsive portfolio website featuring:

- ✨ **Interactive 3D Scene** - Real-time 3D rendering with Three.js // (3D mascot/animation)
- 🎬 **Smooth Animations** - Framer Motion & GSAP for fluid transitions // (Entrance, scroll effects)
- 📱 **Mobile Responsive** - Optimized for all screen sizes // (Mobile-first design)
- 🎯 **Project Showcase** - Display your best work with videos // (YouTube embeds)
- 💼 **Skills Section** - Expandable accordion with tech stack details // (Interactive accordion)
- 📧 **Contact Form** - Integrated Formspree for inquiries // (Modal-based form)
- 🚀 **Performance Optimized** - Vercel Analytics & Speed Insights // (Built-in monitoring)

---

## 📊 Tech Stack

### Frontend Framework
- **Next.js 16.1.6** - React meta-framework for production // (ssr + static generation)
- **React 19.2.4** - UI library // (Component-based)
- **TypeScript 5** - Type-safe JavaScript // (Static typing)
- **Tailwind CSS 4** - Utility-first CSS framework // (Responsive styling)

### Animation & Graphics
- **Framer Motion 12.34.3** - Component-level animations // (useMotion hooks)
- **GSAP 3.14.2** - Advanced timeline animations // (Smooth tweening)
- **Three.js 0.183.1** - 3D graphics library // (WebGL rendering)
- **React Three Fiber 9.5.0** - React renderer for Three.js // (Declarative 3D)
- **React Three Drei 10.7.7** - Useful Three.js helpers // (Prebuilt components)

### Backend & Forms
- **Formspree 3.0.0** - Serverless form handling // (No backend needed)

### Intersection & Scroll
- **react-intersection-observer 10.0.3** - Viewport detection // (Lazy animations)

### Infrastructure & Monitoring
- **Vercel Analytics 1.6.1** - Website analytics // (Traffic tracking)
- **Vercel Speed Insights 1.3.1** - Performance metrics // (Core Web Vitals)

### Development Tools
- **ESLint 9.18.0** - Code linting // (Quality checks)
- **ESLint Config Next 16.1.6** - Next.js-specific rules
- **Tailwind PostCSS 4** - CSS processing // (Utility generation)

---

## 🚀 Getting Started

### Prerequisites
```bash
- Node.js 16+ 
- npm, yarn, pnpm, or bun
```

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/InwSaKodBeiw007/portfolio_submission.git
cd portfolio_submission

# Install dependencies
npm install  // or: yarn install / pnpm install / bun install
```

### Running Development Server

```bash
# Using npm
npm run dev

# or using yarn
yarn dev

# or using pnpm
pnpm dev

# or using bun
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

> ✨ The page auto-updates as you edit files! Just save and refresh.

---

## 📁 Project Structure

```
portfolio_submission/
├── app/
│   ├── page.tsx              // ⭐ Main portfolio page (hero, projects, skills)
│   ├── layout.tsx            // Root layout wrapper
│   └── globals.css           // Global Tailwind styles
│
├── components/
│   ├── canvas/
│   │   └── Scene.tsx         // 3D Three.js scene component
│   │
│   └── ui/
│       ├── Overlay.tsx       // Navigation overlay menu
│       ├── ScrambleText.tsx  // Animated text scramble effect
│       └── ContactModal.tsx  // Contact form modal
│
├── public/                    // Static assets (images, favicon)
│   └── IMG_20251212_172409.jpg
│
├── package.json              // Dependencies & scripts
├── tsconfig.json             // TypeScript config
├── tailwind.config.ts        // Tailwind configuration
├── next.config.ts            // Next.js configuration
└── README.md                 // This file
```

---

## 🎯 Key Features & Sections

### 1️⃣ **Hero Section** (`id="home"`)
```typescript
// Animated welcome text with ScrambleText effect
// Mobile: Centered layout
// Desktop: Right-aligned with buttons
```
- Animated "Welcome to" and "my web portfolio" text
- "View My Work" CTA button
- Responsive breakpoints for all devices
- Text shadow effects for readability over 3D

### 2️⃣ **Projects Section** (`id="projects"` & `id="more-projects"`)
```typescript
// YouTube embedded videos with descriptions
// CVzone to n8n with Python (Computer Vision automation)
// First Game with Unity (Game Development)
```
- Aspect-ratio maintained iframes
- Project descriptions
- External links to full videos
- Mobile & desktop card layouts

### 3️⃣ **About/Profile Section** (`id="about"`)
```typescript
// Personal bio and developer profile
// Circular profile image (IMG_20251212_172409.jpg)
// Quote about game development philosophy
```
- Profile image with border & shadow
- Bio text with developer info
- Inspirational quote
- Location badge (Thailand)

### 4️⃣ **Skills Section** (`id="skills"`)
```typescript
// Interactive accordion with tech stacks
// 4 categories: Web, Game Dev, ML/Python, Infrastructure
```

**Categories:**
1. **Web Frameworks & CMS**
   - React / Next.js
   - TypeScript / JavaScript
   - Python / Node.js
   - Auth (JWT, OAuth)
   - Databases (SQL, NoSQL, SQLite, MongoDB, Firebase, Prisma)
   - WordPress

2. **Game Development**
   - Unity / C#
   - Roblox studio / Lua
   - Godot / GDScript
   - Blender (3D Modeling)
   - Game Systems Design

3. **Python & Automation**
   - Python (NumPy, Pandas)
   - Scikit-Learn
   - Computer Vision (CVzone)
   - Workflow Automation (n8n)

4. **Infrastructure**
   - Linux (Ubuntu)
   - Docker / Docker Compose
   - Git / Version Control

### 5️⃣ **Contact Section** (`id="contact"`)
```typescript
// Call-to-action section with contact methods
// "Get In Touch" button → opens ContactModal
// GitHub Profile link
```
- Hero text with accent color
- Contact description
- Modal form integration
- External GitHub link

### 📄 **Footer**
```typescript
// Copyright year (auto-updated)
// Built with Next.js & Framer Motion credit
```

---

## 🎨 Design System

### Colors
```typescript
// Dark theme
background: '#050508'        // Deep dark bg
lightColor: '#ffffff'        // White text
accent: 'text-blue-400'      // Blue highlights (CTAs)
muted: '#a0a8b8'            // Gray text for descriptions
```

### Typography
- **Headlines**: Bold, large tracking, white
- **Body**: Regular weight, gray text
- **Labels**: Uppercase, small, blue accent, monospace
- **Descriptions**: Medium size, muted gray

### Effects
- Text shadow: `0_2px_20px_rgba(0,0,0,0.8)` // Readability
- Glassmorphism: `bg-black/70 backdrop-blur-md` // Cards
- Transitions: `duration-700` // Smooth animations
- Hover states: `group-hover:text-white/90` // Interactive

### Responsive Breakpoints
```typescript
md:  // >= 768px (tablet)
lg:  // >= 1024px (desktop)
sm:  // < 640px (small mobile)
```

---

## 🛠️ Customization Guide

### 📝 Edit Main Content
Open `app/page.tsx` and modify:

```typescript
// Hero section (lines 115-120)
<ScrambleText text="Welcome to" />      // Change greeting
<ScrambleText text="my web portfolio" /> // Change tagline

// About section (lines 281-284)
<h2 className="...">GAME</h2>           // Change your name
<p>I am a passionate software developer... // Change bio
```

### 🎨 Change Theme Colors
```typescript
// Line 69-72 in app/page.tsx
const [currentTheme, setCurrentTheme] = useState({
  background: '#050508',    // Modify background
  lightColor: '#ffffff',    // Modify text
})
```

### 🎬 Add Your Projects
Replace YouTube iframes (lines 162, 219):
```typescript
<iframe
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
  title="Your Project Title"
  // ...
/>
```

### 💼 Update Skills
Edit accordion items (lines 325-375):
```typescript
<AccordionItem 
  title="Your Skill Category" 
  label="LABEL"
  // ...
>
  <div>Your skill 1</div>
  <div>Your skill 2</div>
</AccordionItem>
```

### 🖼️ Change Profile Image
Replace the image path (lines 273, 293):
```typescript
<Image 
  src="/IMG_20251212_172409.jpg"  // Change to your image
  alt="Profile" 
  // ...
/>
```

### 📧 Update Contact Form
Edit Formspree integration in `components/ui/ContactModal.tsx`:
```typescript
// Replace with your Formspree form ID
// See: https://formspree.io
```

---

## 🚢 Deployment

### 🔵 Deploy on Vercel (Recommended)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy from project directory
vercel
# Follow the prompts to link your GitHub repo
```

Or connect GitHub directly to Vercel for auto-deploy on every push.

### 🟢 Deploy on Netlify

1. Push your code to GitHub
2. Connect repository at [netlify.com](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `.next`

### 🟡 Deploy on Railway

```bash
railway link
railway up
```

### 🟠 Self-Host

```bash
# Build the project
npm run build

# Start production server
npm start
# Server runs on port 3000
```

---

## 📊 Scripts & Commands

```bash
# Development
npm run dev          // Start dev server (http://localhost:3000)

# Production
npm run build        // Build for production (.next folder)
npm start            // Start production server

# Code Quality
npm run lint         // Run ESLint checks
```

---

## 🧠 Learning Resources for Beginners

Since you're still learning, here are key resources:

### Next.js & React
- [Next.js Learn Course](https://nextjs.org/learn) // Interactive tutorials
- [React Official Docs](https://react.dev) // Hooks, components, state

### TypeScript (Ts conventions used here)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) // Type basics
- [React + TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) // Common patterns

### Tailwind CSS
- [Tailwind Docs](https://tailwindcss.com/docs) // Utility classes
- [Tailwind UI Components](https://tailwindui.com) // Design patterns

### Animations
- [Framer Motion Docs](https://www.framer.com/motion/) // Animation hooks
- [GSAP Tutorial](https://greensock.com/learning/) // Advanced timeline animations

### 3D Graphics
- [Three.js Documentation](https://threejs.org/docs/) // WebGL concepts
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber/) // React 3D

---

## 📚 Learn More About Next.js

- [Next.js Documentation](https://nextjs.org/docs) - features, API, best practices
- [Vercel Blog](https://vercel.com/blog) - latest updates and tutorials
- [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples) - starter templates

---

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
# Use a different port
npm run dev -- -p 3001
```

### TypeScript errors
```bash
# Rebuild TypeScript cache
rm -rf .next
npm run build
```

### Images not loading
- Ensure images are in `/public` folder
- Use relative paths: `/image.jpg` (not `./image.jpg`)

### Animations not working
- Check `motion.section` ref is attached
- Verify `useInView` hook dependencies
- Check Framer Motion version compatibility

---

## 📞 Contact & Support

Need help?

- 📧 **Use the portfolio contact form** → Fill out "Get In Touch"
- 💬 **Open a GitHub Issue** → Report bugs or suggest features
- 🌐 **Check Documentation** → Use links in Learn More section

---

## 📄 License

This project is open source. Use it as a template for your own portfolio!

---

## 👻 Built by GAME

*"I love the immense soul and atmosphere the developers breathed into Skyrim. My goal is to craft immersive, living experiences that resonate with that same creative fire."*

🔗 **Links:**
- [GitHub Profile](https://github.com/InwSaKodBeiw007)
- [Portfolio Live](#) // deployed URL here
- Thailand 🇹🇭

---

## 🎯 Next Steps

1. ✅ Customize the content (name, bio, projects)
2. ✅ Add your own images and videos
3. ✅ Update social links (GitHub, LinkedIn, etc.)
4. ✅ Set up Formspree for contact form
5. ✅ Deploy to Vercel
6. ✅ Share your portfolio! 🚀

---

**Last Updated**: 2026-09-02  
**Framework Version**: Next.js 16.1.6  
**Built with ❤️ using TypeScript**  
**Dark theme aesthetic** 🖤
