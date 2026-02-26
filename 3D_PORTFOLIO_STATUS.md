# 3D Scrollytelling Portfolio - Project Status

This document summarizes the current state of the 3D portfolio project as of February 25, 2026.

## 🚀 Tech Stack
- **Framework**: Next.js 16 (App Router, Turbopack)
- **3D Engine**: React Three Fiber (R3F)
- **Helpers**: @react-three/drei
- **Animation**: GSAP (ScrollTrigger for progress tracking, `useFrame` for smooth lerping)
- **Styling**: Tailwind CSS 4

## 🏗 Implemented Components

### 1. `components/canvas/Scene.tsx`
- The core R3F `<Canvas>` container.
- Handles responsive camera FOV (Mobile: 90, Desktop: 60).
- Dynamically reacts to `currentTheme` for background and light colors.
- Includes `OrbitControls` (zoom disabled) and `Environment` (city preset).

### 2. `components/canvas/Model.tsx`
- Loads the `public/snuff_with_european.glb` model.
- Uses `forwardRef` for animation control.

### 3. `components/canvas/Animation.tsx`
- **Hybrid Animation**: Combines `ScrollTrigger` for progress tracking with `useFrame` for ultra-smooth lerping (damping: 0.05).
- **Multi-Section Logic**:
    - **Hero**: Centered.
    - **Sections 1-2**: Glides to the left (`x: -7.6`).
    - **Section 3**: Glides to the right (`x: 8.2`).
    - **Section 4**: Returns to center.
- **Tech Stack Transition**: Animates camera to a side view (`x: 1.44, y: 6, z: 5`) with a 90-degree rotation.

### 4. `components/canvas/TechIcon3D.tsx`
- Dynamically loads 3D models for tech stacks (e.g., `TypeScript.glb`, `Python.glb`).
- Features:
    - Smooth hover scaling (1.2x).
    - Pulse light effect on hover.
    - Delayed theme switching (1.8s hover trigger).
    - Unit-height normalization using `<Resize height />`.

### 5. `components/ui/TechStack.tsx`
- Spawns `TechIcon3D` components in a circular formation (`radius: 2.2`).
- Uses pseudo-random Y-offsets for a organic "floating" look.
- Synchronized with paintbrush animation (600ms entry delay).

### 6. `components/ui/ScrambleText.tsx`
- Text effect that "scrambles" characters on hover, resolving back to the original text.
- Used in the Hero section for "Welcome to my portfolio".

### 7. `components/ui/Overlay.tsx`
- Fixed UI layer for "View Tech Stack" and "Back" buttons.

## 🎞 Content Sections
- **Hero**: Scramble text intro.
- **Project 1**: "CVzone to n8n with Python" (YouTube embed).
- **Project 2**: "First Game with Unity" (YouTube embed).
- **Skills**: Detailed grid of expertise (Web Dev, ML & Systems).
- **Contact**: GitHub and Email links.

## 🛠 Commands
- `npm run dev`: Start development server.
- `npm run build`: Production build.
- `npm run lint`: Linting (ESLint 9+).

---
*Updated by Yuki (Tsk... I hope you're happy with this, Master).*
// You can add more sections or refine the animation parameters here, Master.
