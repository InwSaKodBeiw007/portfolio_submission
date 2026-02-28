# Gemini CLI Prompt — Mobile Hero Center + Moving-Snuff Positioning

## Context
The desktop view looks good. These changes are **mobile-only** (< 768px).
Two issues to fix:
1. Hero section is not centered on mobile
2. Moving-Snuff 3D model should float left↔right in front of text, without covering other text

---

## CHANGE 1 — Center Hero Section on Mobile

**File:** `app/page.tsx`

The Hero section currently pushes content up due to `pt-80` on mobile, and the two headings
sit side-by-side (flex-row on all sizes) causing misalignment.

### Fix the Hero section wrapper div:

```tsx
// BEFORE
<div
  id="home"
  className="relative h-[100vh] flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-20 lg:px-40 text-white snap-start snap-always text-center md:text-left gap-4 md:gap-0 pt-80 md:pt-0"
>

// AFTER
<div
  id="home"
  className="relative h-[100vh] flex flex-col items-center justify-center md:flex-row md:justify-between px-6 md:px-20 lg:px-40 text-white snap-start snap-always text-center md:text-left gap-2 md:gap-0"
>
```

Key changes:
- Remove `pt-80` entirely — this was pushing content down on mobile
- Force `flex-col items-center justify-center` on mobile (centered both axes)
- Keep `md:flex-row md:justify-between` for desktop

### Fix the Hero headings:

```tsx
// BEFORE
<h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter hover:text-gray-300 transition-colors cursor-default whitespace-nowrap mt-20 md:mt-0">
  <ScrambleText text="Welcome to" autoStart delay={500} />
</h1>
<h2 className="text-xl md:text-4xl lg:text-6xl font-medium tracking-tight hover:text-gray-300 transition-colors cursor-default whitespace-nowrap">
  <ScrambleText text="my web portfolio" autoStart delay={1200} />
</h2>

// AFTER
<h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter hover:text-gray-300 transition-colors cursor-default md:whitespace-nowrap">
  <ScrambleText text="Welcome to" autoStart delay={500} />
</h1>
<h2 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-medium tracking-tight hover:text-gray-300 transition-colors cursor-default md:whitespace-nowrap">
  <ScrambleText text="my web portfolio" autoStart delay={1200} />
</h2>
```

Key changes:
- Remove `mt-20` from h1 — was pushing text down on mobile
- Remove `whitespace-nowrap` on mobile (use `md:whitespace-nowrap` only)
- Slightly reduce font sizes on mobile for better fit

---

## CHANGE 2 — Moving-Snuff: Float Left↔Right on Mobile Without Covering Text

**File:** `components/canvas/Animation.tsx`

### Goal behavior on mobile:
- Model floats in front of the text (z-index / z-position closer to camera than background)
- Slowly drifts left and right using a sine wave (not scroll-driven on mobile)
- Stays in the **lower half** of the screen so it doesn't cover the hero headings
- Doesn't overlap with project cards, skills text, or any other sections

### Replace the mobile position logic inside `useFrame`:

```tsx
// Inside useFrame callback, replace the mobile branch:

const t = state.clock.getElapsedTime()
const isMobile = size.width < 768

if (isMobile) {
  // Slow left-right sine drift — period ~8 seconds
  const driftX = Math.sin(t * 0.4) * 2.2  // range: -2.2 to +2.2
  
  // Keep model in lower portion of screen (below text)
  const targetY = -1.5

  modelRef.current.position.x = MathUtils.lerp(
    modelRef.current.position.x,
    driftX,
    0.03  // very smooth, slow follow
  )
  modelRef.current.position.y = MathUtils.lerp(
    modelRef.current.position.y,
    targetY,
    0.05
  )
  modelRef.current.position.z = 1.5  // in front of background, behind UI text

  // Gentle idle rotation
  modelRef.current.rotation.y += delta * 0.3
  modelRef.current.rotation.x = MathUtils.lerp(modelRef.current.rotation.x, -0.1, 0.05)
  modelRef.current.rotation.z = MathUtils.lerp(modelRef.current.rotation.z, Math.sin(t * 0.3) * 0.05, 0.05)

} else {
  // ---- DESKTOP LOGIC UNCHANGED ----
  const breathingX = Math.sin(t / 4) / 20
  const breathingZ = Math.cos(t / 4) / 20

  const p = scrollProgress.current
  let targetX = 0
  let targetRx = 0

  if (p < 0.08) {
    targetX = 0
    targetRx = 0
  } else if (p < 0.6) {
    targetX = -6.65
    targetRx = -Math.PI / 12
  } else if (p < 0.9) {
    targetX = 6.5
    targetRx = -Math.PI / 12
  } else {
    targetX = 0
    targetRx = 0
  }

  modelRef.current.position.x = MathUtils.lerp(modelRef.current.position.x, targetX, 0.05)
  modelRef.current.rotation.y = MathUtils.lerp(modelRef.current.rotation.y, p * Math.PI * 1, 0.05)
  modelRef.current.position.z = 0.95
  modelRef.current.position.y = 1
  modelRef.current.rotation.x = MathUtils.lerp(modelRef.current.rotation.x, targetRx + breathingX, 0.05)
  modelRef.current.rotation.z = MathUtils.lerp(modelRef.current.rotation.z, breathingZ, 0.05)
}
```

### Also reduce mobile model scale in `Model.tsx`:

```tsx
// BEFORE
return isMobile ? [50, 52, 48] : [95, 100, 90]

// AFTER — smaller on mobile so it doesn't dominate the screen
return isMobile ? [30, 32, 28] : [95, 100, 90]
```

---

## CHANGE 3 — Fix Canvas Background Color on Mobile

**File:** `components/canvas/Scene.tsx`

From the screenshot, the background turns **orange** because `currentTheme.background` was
changed by a TechStack click and persists. On mobile, reset theme to black on mount:

```tsx
// In page.tsx, update the useState for currentTheme:

// BEFORE
const [currentTheme, setCurrentTheme] = useState({
  background: '#000000',
  lightColor: '#ffffff',
})

// AFTER — same default, but also add a reset when TechStack closes
const handleBack = () => {
  setIsTechStackVisible(false)
  // Reset theme back to default black when closing tech stack
  setCurrentTheme({
    background: '#000000',
    lightColor: '#ffffff',
  })
}
```

This ensures the background resets to black when the user closes the TechStack view,
instead of staying orange/colored from whatever icon was last clicked.

---

## Summary

| File | Change | Why |
|------|--------|-----|
| `app/page.tsx` | Remove `pt-80`, force `flex-col items-center justify-center` on mobile | Hero text not centered |
| `app/page.tsx` | Remove `mt-20` from h1, remove `whitespace-nowrap` on mobile | Text pushed down, overflows |
| `app/page.tsx` | Reset `currentTheme` to black in `handleBack()` | Background stays orange after TechStack |
| `components/canvas/Animation.tsx` | Sine-wave left↔right drift on mobile, park at `y: -1.5` | Model floats nicely without covering headings |
| `components/canvas/Model.tsx` | Scale `[30,32,28]` on mobile | Model too large, dominates screen |

**Do NOT change:** desktop layout, scroll animation logic, GSAP timeline, TechStack component.
