# Personal Portfolio

interactive portfolio website showcasing software engineering and game development work.

> Built with **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, and **Three.js** for immersive 3D experiences.

---

##  Website Overview

**portfoliosuper-v001** is a modern, fully responsive portfolio website featuring:

-  **Interactive 3D Scene** - Real-time 3D rendering with Three.js // (3D mascot/animation)
-  **Smooth Animations** - Framer Motion & GSAP for fluid transitions // (Entrance, scroll effects)
-  **Mobile Responsive** - Optimized for all screen sizes // (Mobile-first design)
-  **Project Showcase** - Display your best work with videos // (YouTube embeds)
-  **Skills Section** - Expandable accordion with tech stack details // (Interactive accordion)
-  **Contact Form** - Integrated Formspree for inquiries // (Modal-based form)
-  **Performance Optimized** - Vercel Analytics & Speed Insights // (Built-in monitoring)

---

##  Tech Stack

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

##  Project Structure

```
portfolio_submission/
├── app/
│   ├── page.tsx              // Main portfolio page (hero, projects, skills)
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

## Key Features & Sections

### **Hero Section** (`id="home"`)
```typescript
// Animated welcome text with ScrambleText effect
// Mobile: Centered layout
// Desktop: Right-aligned with buttons
```
- Animated "Welcome to" and "my web portfolio" text
- "View My Work" CTA button
- Responsive breakpoints for all devices
- Text shadow effects for readability over 3D

### **Projects Section** (`id="projects"` & `id="more-projects"`)
```typescript
// YouTube embedded videos with descriptions
// CVzone to n8n with Python (Computer Vision automation)
// First Game with Unity (Game Development)
```
- Aspect-ratio maintained iframes
- Project descriptions
- External links to full videos
- Mobile & desktop card layouts

### **About/Profile Section** (`id="about"`)
```typescript
// Personal bio and developer profile
// Circular profile image (IMG_20251212_172409.jpg)
// Quote about game development philosophy
```
- Profile image with border & shadow
- Bio text with developer info
- Inspirational quote
- Location badge (Thailand)

### **Skills Section** (`id="skills"`)
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

### **Contact Section** (`id="contact"`)
```typescript
// Call-to-action section with contact methods
// "Get In Touch" button → opens ContactModal
// GitHub Profile link
```
- Hero text with accent color
- Contact description
- Modal form integration
- External GitHub link

###  **Footer**
```typescript
// Copyright year (auto-updated)
// Built with Next.js & Framer Motion credit
```

---

##  Contact & Support

Need help?

-  **Use the portfolio contact form** → Fill out "Get In Touch"
-  **Open a GitHub Issue** → Report bugs or suggest features
-  **Check Documentation** → Use links in Learn More section

---

##  License

This project is open source. Use it as a template for your own portfolio!

---

##  Built by GAME

*"I love the immense soul and atmosphere the developers breathed into Skyrim. My goal is to craft immersive, living experiences that resonate with that same creative fire."*

 **Links:**
- [Portfolio Live](https://gameportfoliosite.vercel.app/)
- Thailand 🇹🇭

---

**Last Updated**: 2026-09-02  
**Framework Version**: Next.js 16.1.6  
**Built with ❤️ using TypeScript**  
