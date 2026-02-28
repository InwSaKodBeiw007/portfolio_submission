# Portfolio 3D Models Integration Prompt — GAME'S SITE

## Context
The portfolio already has a clean dark space-themed UI (see previous design prompt).
This prompt covers **adding 3D models back** into the site with scroll-driven motion and interactive animations.

---

## 3D Model Files
All models are located in `@public/3D_Models/`

| File | Role |
|------|------|
| `Moving-Snuff.glb` | Hero character / mascot — plays animation on interaction |
| `Background-Infinite.glb` | Ambient background object — loops forever |

---

## Setup & Libraries

```bash
npm install @react-three/fiber @react-three/drei three
npm install @react-three/rapier          # optional physics
npm install framer-motion                # for scroll sync
```

Use:
- `@react-three/fiber` — React renderer for Three.js
- `@react-three/drei` — helpers: `useGLTF`, `useAnimations`, `ScrollControls`, `Float`
- `useScroll` from `@react-three/drei` for scroll-offset reading inside Canvas

---

## Behavior Specifications

### 1. Background-Infinite.glb — Always Looping
- Load model and **immediately play all animations on loop**
- Never pauses, never stops — ambient living background
- Position: behind everything, centered or slightly offset
- Scale: large enough to fill visual background without clipping UI

```jsx
// Pattern
const { scene, animations } = useGLTF('/3D_Models/Background-Infinite.glb')
const { actions } = useAnimations(animations, scene)

useEffect(() => {
  // Play every animation clip on loop
  Object.values(actions).forEach(action => {
    action.reset().setLoop(THREE.LoopRepeat, Infinity).play()
  })
}, [actions])
```

---

### 2. Moving-Snuff.glb — Scroll-Driven Left/Right Motion

#### Scroll Parallax Movement
- As the user scrolls **down**, the model drifts **left**
- As the user scrolls **up** (back to top), it drifts back **right**
- Motion should feel smooth and slightly delayed (lerp/damping)
- Vertical bobbing (Float) adds life while scrolling

```jsx
// Pattern using useScroll + useFrame
const { offset } = useScroll()  // 0 (top) → 1 (bottom)

useFrame((state, delta) => {
  const targetX = offset * -4  // scroll down = move left
  meshRef.current.position.x = THREE.MathUtils.lerp(
    meshRef.current.position.x,
    targetX,
    0.05  // damping — lower = more lag/smoothness
  )
})
```

Wrap in `<ScrollControls pages={5}>` to match page length.

#### On "Explore Tech Stack" Button Click — Trigger Animation
- When user clicks the **Explore Tech Stack** button:
  1. Play the named animation clip(s) from `Moving-Snuff.glb` (one-shot, not loop)
  2. After animation finishes → **3D tech icons float and orbit** around the model
  3. Button state changes (e.g., text becomes "Close" or icon rotates)

```jsx
// Pattern
const [exploreActive, setExploreActive] = useState(false)

const handleExplore = () => {
  setExploreActive(true)
  const action = actions['YourAnimationName']  // replace with actual clip name
  action.reset().setLoop(THREE.LoopOnce, 1).clampWhenFinished = true
  action.play()

  // Listen for animation finish
  const mixer = action.getMixer()
  mixer.addEventListener('finished', () => {
    // trigger floating icons
    setShowIcons(true)
  })
}
```

---

### 3. Floating 3D Tech Icons (after Explore trigger)

- Icons appear one by one with staggered fade-in
- Each icon **orbits or floats** around Moving-Snuff using `<Float>` from drei
- Icons represent tech stack: React, Unity, Python, Docker, Blender, etc.
- Use simple `.glb` icon models or substitute with `<Text3D>` / flat sprites if no icon models exist
- Icons slowly rotate on their own axis while floating

```jsx
// Pattern per icon
<Float
  speed={1.5}
  rotationIntensity={0.5}
  floatIntensity={0.8}
  floatingRange={[-0.2, 0.2]}
>
  <mesh position={[orbitX, orbitY, orbitZ]}>
    <primitive object={iconScene} />
  </mesh>
</Float>
```

Distribute icons in a circular/elliptical pattern around the model's position.

---

## Canvas Setup

```jsx
<Canvas
  camera={{ position: [0, 0, 8], fov: 50 }}
  style={{
    position: 'fixed',   // or 'absolute' inside hero container
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    zIndex: 0,           // behind UI content
    pointerEvents: 'none'
  }}
>
  <ScrollControls pages={5} damping={0.3}>
    <ambientLight intensity={0.4} />
    <pointLight position={[5, 5, 5]} intensity={1.2} color="#4f8ef7" />

    <BackgroundInfinite />   {/* always looping */}
    <MovingSnuff
      exploreActive={exploreActive}
      showIcons={showIcons}
    />
  </ScrollControls>
</Canvas>

{/* UI layer on top */}
<div style={{ position: 'relative', zIndex: 1 }}>
  {/* All HTML/JSX page content */}
</div>
```

---

## File Structure Suggestion

```
components/
  three/
    BackgroundInfinite.jsx   ← loads Background-Infinite.glb, loops
    MovingSnuff.jsx          ← loads Moving-Snuff.glb, scroll + explore logic
    TechIcons.jsx            ← floating icons shown after explore trigger
    Scene.jsx                ← Canvas wrapper with ScrollControls
```

---

## Performance Notes

- Use `useGLTF.preload('/3D_Models/Moving-Snuff.glb')` and same for Background at the bottom of each component file
- Enable `<Suspense fallback={null}>` around each model to avoid blocking render
- On **mobile**: disable scroll-driven X movement (too distracting on small screen), keep Float bobbing only
- Reduce `pixelRatio` on mobile: `<Canvas dpr={[1, 1.5]}>` instead of full device pixel ratio
- Avoid animating both models with `useFrame` at the same time without delta-time clamping

---

## How to Find Animation Clip Names

Run this once to log available clips from a model:

```jsx
useEffect(() => {
  console.log('Moving-Snuff clips:', animations.map(a => a.name))
}, [animations])
```

Replace `'YourAnimationName'` in the trigger code with the actual clip name logged here.

---

## Summary of Behaviors

| Model | Default State | On Scroll | On Button Click |
|-------|--------------|-----------|-----------------|
| `Background-Infinite.glb` | Loop animation forever | No change | No change |
| `Moving-Snuff.glb` | Idle float (Float component) | Drift left/right on X axis | Play one-shot animation → spawn floating icons |
| Tech Icons | Hidden | Hidden | Float & orbit around Snuff |
