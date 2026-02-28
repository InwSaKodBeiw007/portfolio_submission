# Portfolio UI Redesign Prompt — GAME'S SITE

## Goal
Redesign the portfolio into a **clean, spacious, dark space-themed landing page** that feels premium and minimal — not cluttered. The layout should alternate breathing space depending on what content is being shown.

---

## Layout Philosophy

### Alternating Whitespace Rule
- **Video/project sections** → Content sits on the **right side**, generous empty space on the **left** (creates cinematic framing)
- **Skills/bio sections** → Content sits on the **left side**, generous empty space on the **right** (creates a "reading room" feel)
- This alternating rhythm gives the page a dynamic, editorial quality without being busy

---

## Visual Style

- **Color palette:** Deep space blacks (`#050508`, `#0a0a0f`), dark navy (`#0d0d1a`), with subtle star/nebula texture or noise grain overlay
- **Accent:** Single color only — cool electric blue (`#4f8ef7`) or soft cyan (`#00d4ff`) for highlights, links, and hover states
- **Typography:** Clean sans-serif (e.g., Inter, Space Grotesk, or Syne). Large, confident headings. Light body text in `#a0a8b8`
- **No cards, no boxes** — let content breathe directly on the dark background
- **Subtle animations:** Fade-in on scroll, slow parallax star background, cursor glow effect optional

---

## Section-by-Section Layout

### 1. Hero Section
```
[Empty left 40%]   [Text right 60%]
                   "Welcome to my web portfolio"
                   Subtitle / tagline
                   CTA button (subtle, outlined)
```
- Full viewport height
- Animated floating text or subtle glitch effect on name

### 2. Projects / Video Section
```
[Empty left space]   [Video embed + title right]
                     Project title
                     Short description
                     YouTube link
```
- Each project: left whitespace ~35–40%, content ~60%
- Soft vignette or glow behind video thumbnail

### 3. Profile / About Section
```
[Photo + name left]   [Empty right space]
Skills tagline
```
- Photo: circular or minimal crop, subtle glowing border
- Transition to skills section with a horizontal rule or faint line

### 4. Skills & Expertise Section
```
[Skills content left 60%]   [Empty right 40%]
Website Dev / Game Dev / ML
```
- Skills shown as clean text lists, **no skill bars or progress bars**
- Icons optional (simple, monochrome)
- GitHub links styled as minimal inline tags

### 5. Contact / Footer
```
[Empty left]   [CTA centered or right-anchored]
               "Let's Connect"
               GitHub button
```
- Minimal, no form clutter

---

## Navigation
- Fixed top navbar, fully transparent with blur backdrop
- Links: minimal, no background, just text + underline on hover
- Logo/name left, links right

---

## Things to Remove / Simplify
- Remove "EXPLORE TECH STACK" marquee or make it a subtle background element
- No heavy card borders or box shadows
- Reduce font size variety — max 3 sizes (hero, section title, body)
- Remove redundant repeated nav links at the top

---

## Tech Stack (Next.js)
- Use `framer-motion` for scroll-triggered fade-ins
- Tailwind CSS for spacing and layout
- `react-intersection-observer` for section entry animations
- Optional: `tsparticles` or CSS-only starfield for background

---

## Mood Reference
> Think: **Vercel.com** meets **Linear.app** — but darker, more cosmic.  
> Spacious. Confident. Every element has room to exist.

---

## Mobile Design (< 768px)

### Core Mobile Philosophy
- **No alternating whitespace on mobile** — screen is too narrow, everything goes **full-width centered**
- Keep the same dark space aesthetic, just stacked vertically
- More padding top/bottom per section (`py-16` minimum) to preserve breathing room
- Touch targets minimum 44px height

---

### Mobile Navigation
```
[GAME]                    [☰ hamburger]
```
- Hamburger menu slides in from right as a **full-screen overlay** (dark bg, centered links)
- Links large, well-spaced, easy to tap
- Close button top-right corner
- Backdrop blur or subtle grain texture on menu overlay

---

### Mobile Section Layouts

#### 1. Hero
```
[Full width centered]
   "Welcome to"
   my web portfolio
   [CTA button — full width or wide pill]
```
- Heading font size: `text-4xl` or `text-5xl` (big and bold, not cramped)
- Starfield background still active
- Subtle fade-in animation on load

#### 2. Projects / Video Section
```
[Full width]
Project Title
Short description
[Video embed — 16:9, full width]
[YouTube link button]
```
- Videos stretch to full container width
- Stack title above video (not beside)
- Each project separated by generous vertical spacing (`mb-20`)

#### 3. Profile / About
```
[Centered photo — smaller, ~120px circle]
Name
Tagline
```
- Photo centered with glow border
- No side-by-side layout

#### 4. Skills & Expertise
```
[Full width, left-aligned text]
## Website Development
  HTML, CSS, JS, React...

## Game Development
  Unity, C#, Blender...

## Machine Learning
  Python, Docker...
```
- Each skill group stacked vertically
- Subtle `border-l-2` left accent line in blue/cyan per group
- GitHub links as pill tags below relevant section

#### 5. Contact / Footer
```
[Centered]
Let's Connect
[GitHub button — full width pill]
[Contact button]
```
- Buttons full-width or wide, easy to tap

---

### Mobile Typography Scale
| Element       | Size         |
|---------------|--------------|
| Hero heading  | `text-4xl` (36px) |
| Section title | `text-2xl` (24px) |
| Body text     | `text-base` (16px) |
| Small/labels  | `text-sm` (14px)  |

---

### Mobile-Specific Details
- **Scroll behavior:** `scroll-smooth`, sections snap softly into view
- **Animations:** Keep fade-in on scroll, but reduce parallax (can cause jank on mobile)
- **Star background:** Use CSS-only version on mobile (no heavy JS particles)
- **Images:** Lazy load with `loading="lazy"`, use `next/image` with proper `sizes` prop
- **No hover states** relying on `:hover` only — add `:active` tap states with slight scale or color shift
- **Safe area insets:** Use `env(safe-area-inset-*)` padding for notch/home bar on iOS

---

### Responsive Breakpoint Strategy (Tailwind)
```
mobile-first default  →  full width, stacked, centered
md: (768px+)          →  alternating whitespace layout kicks in
lg: (1024px+)         →  wider gutters, larger type
```

```jsx
// Example pattern
<section className="
  flex flex-col items-center px-6 py-16       // mobile
  md:flex-row md:items-start md:px-20 md:py-24 // desktop
">
```
