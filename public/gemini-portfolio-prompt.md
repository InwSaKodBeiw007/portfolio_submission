# Gemini CLI Prompt — Portfolio Readability & Skills Redesign

## How to use
```bash
gemini "$(cat gemini-portfolio-prompt.md)"
```
Or paste the content below directly into Gemini CLI.

---

## Prompt

You are an expert Next.js / React developer and UI designer.
I need you to improve the readability and structure of my portfolio website.
The site uses Next.js, Tailwind CSS, Framer Motion, and React Three Fiber.

Below are the exact changes I want. Follow each instruction carefully.

---

### CHANGE 1 — Hide 3D Model During Skills Section

The `Moving-Snuff.glb` (the jar/snuff bottle 3D model) must be **hidden** when the user scrolls into the Skills / Technical Stack section, and **re-appear** when they scroll out of it.

Implementation:
- Use `IntersectionObserver` or Framer Motion's `useInView` on the Skills section wrapper
- When Skills section enters viewport → set model opacity/visibility to 0 (fade out smoothly, ~0.4s)
- When Skills section leaves viewport → fade model back in
- The `Background-Infinite.glb` should continue playing regardless — do NOT hide it

```jsx
// Pattern
const { ref, inView } = useInView({ threshold: 0.2 })

// Pass inView to Canvas/model component
// In model component:
useFrame(() => {
  meshRef.current.visible = !inView
  // or lerp opacity if material supports it
})
```

---

### CHANGE 2 — Rebuild Skills Section as Accordion

Replace the current 2x2 grid Skills layout with a **full-width Accordion** component.

#### Accordion Behavior
- Each skill category is a **collapsible row**
- Default state: **all closed** on page load
- Only **one accordion open at a time** (clicking another closes the current one)
- Smooth expand/collapse animation using Framer Motion `AnimatePresence`
- Clicking the header row toggles open/close
- Show a `+` / `−` or chevron icon on the right side of each header

#### Accordion Visual Style
- Background: fully transparent (no cards, no boxes — content lives on dark bg)
- Header row: `border-b border-white/10` divider line
- Header text: `text-xl font-semibold text-white`
- Category label (small tag above title): `text-xs text-blue-400 uppercase tracking-widest`
- Content area: `text-sm text-[#a0a8b8]` for skill items
- Skill items: plain text list, **no bullets, no icons** — just clean left-aligned text
- GitHub links: displayed as small pill tags `border border-white/20 rounded-full px-3 py-1 text-xs` below the skill list in that accordion
- Hover state on header: subtle `text-white` brightness increase

#### Accordion Structure (4 items)

```
▼ WEBSITE DEVELOPMENT                                         [+]
────────────────────────────────────────────────────────────────
  React / Next.js
  TypeScript / JavaScript
  Python / Node.js
  Auth (JWT, OAuth)
  Databases (SQL, NoSQL)
  [GitHub: Ecommerce Project ↗]

▼ GAME DEVELOPMENT                                            [+]
────────────────────────────────────────────────────────────────
  Unity / C#
  Godot / GDScript
  Blender (3D Modeling)
  Game Systems Design
  Shader Programming

▼ MACHINE LEARNING & AUTOMATION                               [+]
────────────────────────────────────────────────────────────────
  Python (NumPy, Pandas)
  Scikit-Learn
  Computer Vision (CVzone)
  Workflow Automation (n8n)
  [GitHub: Titanic ML ↗]
  [GitHub: Rasterio ML ↗]

▼ INFRASTRUCTURE                                              [+]
────────────────────────────────────────────────────────────────
  Linux (Ubuntu)
  Docker / Docker Compose
  CI/CD Pipelines
  Git / Version Control
```

> Note: "Open-World Logic" has been renamed to "Game Systems Design" — update the content accordingly.
> Note: "Workflow Automation (n8n)" stays in Machine Learning section, not Infrastructure.
> Note: The ML section title should be "Machine Learning & Automation" to reflect n8n inclusion.

#### Framer Motion Accordion pattern:
```jsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      style={{ overflow: 'hidden' }}
    >
      {/* skill list content */}
    </motion.div>
  )}
</AnimatePresence>
```

---

### CHANGE 3 — General Readability Fixes

Apply these fixes across the whole page:

1. **Text contrast:** All body text must be minimum `#a0a8b8`. No gray text lighter than this on dark backgrounds.

2. **Z-index layering:** Ensure all HTML text content has `z-index` higher than the Three.js Canvas. Canvas should be `z-index: 0`, all page sections `z-index: 10` or higher.

3. **Text shadow on hero text:** Add subtle text shadow to the hero heading and about section text so it's readable even when 3D objects float behind it:
   ```css
   text-shadow: 0 2px 20px rgba(0,0,0,0.8);
   ```

4. **Section spacing:** Each major section (`About`, `Projects`, `Skills`, `Contact`) must have minimum `padding-top: 6rem` and `padding-bottom: 6rem` on desktop, `4rem` on mobile.

5. **Skills section header:** Add a small label above "Technical Stack" title:
   ```
   EXPERTISE          ← text-xs text-blue-400 tracking-widest uppercase
   Technical Stack    ← text-4xl font-bold text-white
   ```

---

### CHANGE 4 — Mobile Accordion Adjustments

On screens `< 768px`:
- Accordion headers: `text-lg` (slightly smaller)
- Content padding: `px-4 py-3`
- GitHub pill tags: stack vertically (`flex-col`) instead of row
- Touch tap area for accordion header: minimum `48px` height (`min-h-[48px]`)

---

## Summary of Content Changes

| Before | After |
|--------|-------|
| Open-World Logic | Game Systems Design |
| n8n in ML section | ✅ Keep in ML (rename section to "Machine Learning & Automation") |
| 2x2 Grid layout | Accordion (one open at a time) |
| 3D model visible in Skills | Hidden when Skills section is in viewport |
| Mixed text contrast | Uniform `#a0a8b8` minimum for body text |
