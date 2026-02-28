# Gemini CLI Prompt — Mobile View Redesign
## Repository: https://github.com/InwSaKodBeiw007/portfolio_submission (branch: redesigned)

You are an expert Next.js + Tailwind CSS developer.
I need you to fix the **mobile experience** (screens < 768px) of my portfolio.
The project uses: Next.js 16, React 19, Tailwind CSS v4, React Three Fiber, GSAP, @react-three/drei.

Read the existing code carefully before making changes. Here are the 4 problem areas:

---

## PROBLEM 1 — 3D Model Overlaps Content on Mobile

**File:** `components/canvas/Animation.tsx`

The 3D model (snuff bottle) floats on top of text content on mobile screens because its Y position
is too high (`isMobile ? 4.0 : 1`) and its X offset isn't large enough to avoid text areas.

**Fix:**

In `Animation.tsx`, inside the `useFrame` callback, update the mobile position logic:

```tsx
// BEFORE
modelRef.current.position.y = isMobile ? 4.0 : 1

// AFTER — push model to top-right corner on mobile, away from text
const p = scrollProgress.current

if (isMobile) {
  // On mobile: park model in top-right corner, small and out of the way
  modelRef.current.position.x = MathUtils.lerp(modelRef.current.position.x, 2.8, 0.05)
  modelRef.current.position.y = MathUtils.lerp(modelRef.current.position.y, 5.5, 0.05)
} else {
  // Desktop logic remains unchanged
  let targetX = 0
  if (p < 0.08) {
    targetX = 0
  } else if (p < 0.6) {
    targetX = -6.65
  } else if (p < 0.9) {
    targetX = 6.5
  } else {
    targetX = 0
  }
  modelRef.current.position.x = MathUtils.lerp(modelRef.current.position.x, targetX, 0.05)
  modelRef.current.position.y = 1
}
```

Also in `Model.tsx`, reduce mobile scale so the model is visually smaller and less intrusive:

```tsx
// BEFORE
return isMobile ? [50, 52, 48] : [95, 100, 90]

// AFTER
return isMobile ? [32, 34, 30] : [95, 100, 90]
```

---

## PROBLEM 2 — Hero Section Text Too Large on Mobile

**File:** `app/page.tsx`

The hero heading uses `text-4xl md:text-6xl lg:text-8xl` — on mobile `text-4xl` (36px) is fine
but `whitespace-nowrap` breaks layout on very small screens.

**Fix — Hero section div and headings:**

```tsx
// BEFORE
<div id="home" className="relative h-[100vh] flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-20 lg:px-40 text-white snap-start snap-always text-center md:text-left gap-4 md:gap-0 pt-80 md:pt-0">
  <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter hover:text-gray-300 transition-colors cursor-default whitespace-nowrap mt-20 md:mt-0">
  <h2 className="text-xl md:text-4xl lg:text-6xl font-medium tracking-tight hover:text-gray-300 transition-colors cursor-default whitespace-nowrap">

// AFTER
<div id="home" className="relative h-[100vh] flex flex-col items-center justify-center md:flex-row md:justify-between px-6 md:px-20 lg:px-40 text-white snap-start snap-always text-center md:text-left gap-2 md:gap-0 pt-0">
  <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter hover:text-gray-300 transition-colors cursor-default md:whitespace-nowrap">
  <h2 className="text-lg sm:text-xl md:text-4xl lg:text-6xl font-medium tracking-tight hover:text-gray-300 transition-colors cursor-default md:whitespace-nowrap">
```

The `pt-80` on mobile is causing the text to be pushed down too far and collide with the 3D model.
Removing it and letting flexbox center the content naturally fixes the overlap.

---

## PROBLEM 3 — Project Video Cards Too Wide / Padding Issues on Mobile

**File:** `app/page.tsx` — Section 1 (CVzone project) and Section 2 (Unity project)

The cards use `md:pr-15` for desktop right-alignment but have no proper mobile padding/sizing.

**Fix — both project section divs:**

```tsx
// BEFORE
<div id="projects" className="relative h-[100vh] flex items-center justify-center md:justify-end px-4 md:pr-15 text-white snap-start snap-always">
  <div className="max-w-6xl w-full bg-black/50 p-6 md:p-12 rounded-2xl border border-white/20 backdrop-blur-md pointer-events-auto">

// AFTER
<div id="projects" className="relative h-[100vh] flex items-center justify-center md:justify-end px-3 md:pr-15 text-white snap-start snap-always">
  <div className="max-w-6xl w-full bg-black/60 p-4 sm:p-6 md:p-12 rounded-xl md:rounded-2xl border border-white/20 backdrop-blur-md pointer-events-auto">
```

Also reduce the project title and description font on mobile:

```tsx
// BEFORE
<h1 className="text-2xl md:text-4xl font-bold mb-4">CVzone to n8n with Python</h1>
<p className="text-lg mb-6 text-gray-300">

// AFTER
<h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-3">CVzone to n8n with Python</h1>
<p className="text-sm sm:text-base md:text-lg mb-4 text-gray-300">
```

Apply the same changes to the Unity project section (Section 2).

---

## PROBLEM 4 — Skills Section Unreadable on Mobile

**File:** `app/page.tsx` — Section 3 (Skills & Expertise)

The 2-column grid `grid-cols-1 md:grid-cols-2` is fine, but the text is too small and the card
has too much padding being eaten by `md:pl-40`.

**Fix — Skills section outer div:**

```tsx
// BEFORE
<div className="relative h-auto md:h-[100vh] py-20 md:py-0 flex items-center justify-center md:justify-start px-4 md:pl-40 text-white snap-start snap-always">
  <div className="max-w-6xl w-full bg-black/50 p-6 md:p-12 rounded-2xl border border-white/20 backdrop-blur-md pointer-events-auto">

// AFTER
<div className="relative h-auto md:h-[100vh] py-16 md:py-0 flex items-center justify-center md:justify-start px-3 md:pl-40 text-white snap-start snap-always">
  <div className="max-w-6xl w-full bg-black/70 p-5 sm:p-6 md:p-12 rounded-xl md:rounded-2xl border border-white/20 backdrop-blur-md pointer-events-auto">
```

**Fix — Profile header row inside Skills:**

```tsx
// BEFORE
<div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 mb-6 md:mb-10 border-b border-white/10 pb-6 md:pb-8">
  <div className="relative w-20 h-20 md:w-32 md:h-32 ...">
  <h1 className="text-3xl md:text-4xl font-bold ...">Skills & Expertise</h1>
  <p className="text-gray-400 font-mono text-xs md:text-sm ...">Master of the Artifact</p>

// AFTER — make header row horizontal even on mobile (smaller photo)
<div className="flex flex-row items-center gap-3 md:gap-8 mb-5 md:mb-10 border-b border-white/10 pb-5 md:pb-8">
  <div className="relative w-14 h-14 md:w-32 md:h-32 rounded-full overflow-hidden border-2 md:border-4 border-white/20 shadow-2xl flex-shrink-0">
  <h1 className="text-2xl md:text-4xl font-bold tracking-tighter text-white">Skills & Expertise</h1>
  <p className="text-gray-400 font-mono text-[10px] md:text-sm mt-0.5 uppercase tracking-widest">Master of the Artifact</p>
```

**Fix — Skills grid section headers and text:**

```tsx
// BEFORE
<h2 className="text-xl md:text-2xl font-semibold text-blue-400">Website Development</h2>
<p className="text-base md:text-lg text-gray-200">

// AFTER — slightly smaller on mobile, add left accent border per category
<h2 className="text-base sm:text-xl md:text-2xl font-semibold text-blue-400 border-l-2 border-blue-400 pl-3">Website Development</h2>
<p className="text-sm sm:text-base md:text-lg text-gray-200">
```

Apply the same `border-l-2 pl-3` pattern to Game Development (`border-purple-400`),
Machine Learning (`border-green-400`), and Infrastructure (`border-orange-400`) section headers.

**Fix — Footer tags inside Skills card:**

```tsx
// BEFORE
<div className="flex flex-wrap gap-2 md:gap-4">
  <span className="bg-white/5 border border-white/10 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs ...">Docker container</span>

// AFTER
<div className="flex flex-wrap gap-1.5 md:gap-4">
  <span className="bg-white/5 border border-white/10 px-2.5 py-1 md:px-4 md:py-1.5 rounded-full text-[9px] sm:text-[10px] md:text-xs font-mono text-gray-300">Docker container</span>
```

---

## BONUS — Add Infrastructure Section to Skills

The current Skills card is missing an **Infrastructure** section. Add it inside the grid
after the Machine Learning section:

```tsx
{/* Infrastructure */}
<div className="space-y-3 md:space-y-4">
  <h2 className="text-base sm:text-xl md:text-2xl font-semibold text-orange-400 border-l-2 border-orange-400 pl-3">Infrastructure</h2>
  <p className="text-sm sm:text-base md:text-lg text-gray-200">
    Linux (Ubuntu) · Docker / Docker Compose
  </p>
  <p className="text-xs md:text-sm text-gray-400 font-mono italic">
    CI/CD Pipelines · Git / Version Control · Workflow Automation (n8n)
  </p>
</div>
```

Also rename the Machine Learning section header to **Machine Learning & Automation** and
remove n8n from it (it now lives in Infrastructure).

Wait — correction per user preference: **keep n8n inside Machine Learning**, and the ML section
title should be **"Machine Learning & Automation"**. Do NOT add n8n to Infrastructure.

---

## Summary Table

| File | Section | Change |
|------|---------|--------|
| `components/canvas/Animation.tsx` | 3D model position | Park model top-right on mobile, don't overlap text |
| `components/canvas/Model.tsx` | Model scale | Reduce mobile scale from `[50,52,48]` → `[32,34,30]` |
| `app/page.tsx` | Hero | Remove `pt-80`, remove `whitespace-nowrap` on mobile, reduce font sizes |
| `app/page.tsx` | Project cards (x2) | Reduce padding, reduce font sizes on mobile |
| `app/page.tsx` | Skills card header | Make photo+title row horizontal (smaller photo), reduce title size |
| `app/page.tsx` | Skills grid text | Reduce font sizes, add `border-l-2 pl-3` accent per category |
| `app/page.tsx` | Skills grid | Add Infrastructure section, rename ML → "Machine Learning & Automation" |
| `app/page.tsx` | Skills footer tags | Tighten gap and padding on mobile |

**Do NOT change:** desktop layout, 3D canvas logic, GSAP animations, TechStack component, contact section.
After making changes, run `npm run build` to verify no TypeScript errors.
