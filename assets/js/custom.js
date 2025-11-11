// /* =========================================================
//    White-ish Gradient Mesh (Canvas 2D)
//    - Subtle, clean background; more visible motion
//    - Robust cursor mapping (rect + scale compensation)
//    - No dots; optional faint wireframe lines
//    Requires: <canvas id="bg-mesh"> right after <body>
//    ========================================================= */

// (function () {
//   const fine   = matchMedia('(hover: hover) and (pointer: fine)').matches;
//   const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
//   if (!fine || reduce) return;

//   const canvas = document.getElementById('bg-mesh');
//   if (!canvas) return;
//   const ctx = canvas.getContext('2d', { alpha: true });

//   // ---------- Tuning ----------
//   const SPACING       = 70;     // smaller -> denser mesh (more visible)
//   const SPRING        = 0.065;  // pull-back to rest
//   const DAMPING       = 0.90;   // velocity damping
//   const WOBBLE        = 0.10;   // ambient jitter (slightly higher for visibility)
//   const CURSOR_FORCE  = 1400;   // stronger response for clearer interaction
//   const RADIUS        = 220;    // bigger influence area
//   const ATTRACT       = false;  // false = repel, true = attract

//   // Palette: near-white grayscale
//   const LIGHT_BASE    = 92;     // overall brightness (white-ish)
//   const LIGHT_RANGE   = 6;      // gentle variation
//   const GLOBAL_ALPHA  = 0.9;    // keep fills mostly opaque to read on white

//   // Optional super-light wireframe to outline triangles
//   const WIREFRAME_ENABLED = true;
//   const LINE_COLOR        = 'rgba(0,0,0,0.03)'; // whisper-faint gray
//   const LINE_WIDTH        = 0.5;

//   // Debug helper
//   const DEBUG_CURSOR_DOT = false;

//   // ---------- Size / DPR ----------
//   let w, h, dpr;
//   function resize() {
//     dpr = Math.min(window.devicePixelRatio || 1, 2);
//     w = canvas.clientWidth  = window.innerWidth;
//     h = canvas.clientHeight = window.innerHeight;
//     canvas.width  = Math.floor(w * dpr);
//     canvas.height = Math.floor(h * dpr);
//     ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // draw in CSS pixels
//     buildGrid();
//   }
//   window.addEventListener('resize', resize, { passive: true });

//   // ---------- Grid / Triangles ----------
//   let cols, rows, points, tris;
//   function buildGrid() {
//     cols = Math.ceil(w / SPACING) + 2;
//     rows = Math.ceil(h / SPACING) + 2;

//     points = [];
//     const jitter = SPACING * 0.10; // slight organic offset
//     for (let j = 0; j < rows; j++) {
//       for (let i = 0; i < cols; i++) {
//         const x0 = (i - 1) * SPACING;
//         const y0 = (j - 1) * SPACING;
//         points.push({
//           x:  x0 + (Math.random() - 0.5) * jitter,
//           y:  y0 + (Math.random() - 0.5) * jitter,
//           x0, y0,
//           vx: 0, vy: 0
//         });
//       }
//     }

//     // two triangles per cell; alternate diagonal to avoid striping
//     tris = [];
//     const alt = (i, j) => ((i + j) & 1);
//     for (let j = 0; j < rows - 1; j++) {
//       for (let i = 0; i < cols - 1; i++) {
//         const a = i + j * cols;
//         const b = (i + 1) + j * cols;
//         const c = i + (j + 1) * cols;
//         const d = (i + 1) + (j + 1) * cols;
//         if (alt(i, j)) {
//           tris.push([a, b, c], [b, d, c]);
//         } else {
//           tris.push([a, b, d], [a, d, c]);
//         }
//       }
//     }
//   }

//   // ---------- Pointer (viewport coords; mapped each frame) ----------
//   let mx = window.innerWidth / 2;
//   let my = window.innerHeight / 2;
//   let inside = false;

//   function onPointerMove(e) { mx = e.clientX; my = e.clientY; inside = true; }
//   function onPointerLeave() { inside = false; }
//   window.addEventListener('pointermove', onPointerMove, { passive: true });
//   window.addEventListener('pointerleave', onPointerLeave, { passive: true });

//   // ---------- Grayscale color field (white-ish) ----------
//   function colorAt(x, y, t, cx, cy, R2) {
//     const wave =
//       Math.sin(x * 0.0019 + t * 0.35) * 0.5 +
//       Math.sin(y * 0.0023 - t * 0.28) * 0.5;

//     let light = LIGHT_BASE + LIGHT_RANGE * wave;

//     // gentle brightening near cursor (white spotlight)
//     if (inside) {
//       const dx = x - cx, dy = y - cy;
//       const d2 = dx * dx + dy * dy;
//       const k  = Math.max(0, 1 - d2 / (R2 * 1.25));
//       light += 5 * k;
//     }

//     light = Math.max(85, Math.min(99, light)); // clamp to white-ish band
//     return `hsl(0 0% ${Math.round(light)}%)`;   // grayscale
//   }

//   // ---------- Loop ----------
//   let last = performance.now();

//   function step(now) {
//     const dt = Math.min(0.033, (now - last) / 1000);
//     last = now;

//     // Robust pointer mapping (handles headers, transforms & CSS scaling)
//     let cx = mx, cy = my;
//     if (inside) {
//       const rect = canvas.getBoundingClientRect();
//       const scaleX = rect.width  ? (rect.width  / w) : 1;
//       const scaleY = rect.height ? (rect.height / h) : 1;
//       cx = (mx - rect.left) / scaleX;
//       cy = (my - rect.top)  / scaleY;
//     }

//     // Physics
//     const R2 = RADIUS * RADIUS;
//     for (const p of points) {
//       p.vx += (p.x0 - p.x) * SPRING;
//       p.vy += (p.y0 - p.y) * SPRING;

//       p.vx += (Math.random() - 0.5) * WOBBLE;
//       p.vy += (Math.random() - 0.5) * WOBBLE;

//       if (inside) {
//         const dx = p.x - cx, dy = p.y - cy;
//         const d2 = dx * dx + dy * dy;
//         if (d2 < R2) {
//           const inv = 1 / Math.max(64, d2);
//           const s   = (1 - d2 / R2) * CURSOR_FORCE * dt;
//           const fx  = dx * inv * s, fy = dy * inv * s;
//           if (ATTRACT) { p.vx -= fx; p.vy -= fy; } else { p.vx += fx; p.vy += fy; }
//         }
//       }

//       p.vx *= DAMPING; p.vy *= DAMPING;
//       p.x  += p.vx;    p.y  += p.vy;
//     }

//     // Draw
//     ctx.clearRect(0, 0, w, h);
//     ctx.globalAlpha = GLOBAL_ALPHA;
//     const t = now * 0.001;

//     // filled triangles (white-ish)
//     for (let k = 0; k < tris.length; k++) {
//       const [i1, i2, i3] = tris[k];
//       const p1 = points[i1], p2 = points[i2], p3 = points[i3];
//       const gx = (p1.x + p2.x + p3.x) / 3;
//       const gy = (p1.y + p2.y + p3.y) / 3;

//       ctx.fillStyle = colorAt(gx, gy, t, cx, cy, R2);
//       ctx.beginPath();
//       ctx.moveTo(p1.x, p1.y);
//       ctx.lineTo(p2.x, p2.y);
//       ctx.lineTo(p3.x, p3.y);
//       ctx.closePath();
//       ctx.fill();
//     }
//     ctx.globalAlpha = 1;

//     // faint wireframe (helps the mesh read while staying minimal)
//     if (WIREFRAME_ENABLED) {
//       ctx.strokeStyle = LINE_COLOR;
//       ctx.lineWidth   = LINE_WIDTH;
//       // horizontal lines
//       for (let j = 0; j < rows; j++) {
//         ctx.beginPath();
//         for (let i = 0; i < cols; i++) {
//           const p = points[i + j * cols];
//           if (i === 0) ctx.moveTo(p.x, p.y);
//           else ctx.lineTo(p.x, p.y);
//         }
//         ctx.stroke();
//       }
//       // vertical lines
//       for (let i = 0; i < cols; i++) {
//         ctx.beginPath();
//         for (let j = 0; j < rows; j++) {
//           const p = points[i + j * cols];
//           if (j === 0) ctx.moveTo(p.x, p.y);
//           else ctx.lineTo(p.x, p.y);
//         }
//         ctx.stroke();
//       }
//     }

//     if (DEBUG_CURSOR_DOT && inside) {
//       ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2);
//       ctx.fillStyle = 'rgba(0,0,0,0.4)'; ctx.fill();
//       ctx.beginPath(); ctx.arc(cx, cy, 2, 0, Math.PI * 2);
//       ctx.fillStyle = '#fff'; ctx.fill();
//     }

//     requestAnimationFrame(step);
//   }

//   // Init
//   resize();
//   requestAnimationFrame(step);
// })();


/* =========================================================
   Floating Dots + Connecting Lines (Canvas 2D)
   - Click anywhere to add a dot
   - Particles preserved & rescaled on resize (no reset)
   - Cursor node: a dot at the pointer that connects to others
   - DPR-aware, robust cursor mapping
   Requires: <canvas id="bg-mesh"> right after <body>
   ========================================================= */

// Particle mesh background with live dark-mode support (via <html data-theme>)

(function () {
  const fine   = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || reduce) return;

  const canvas = document.getElementById('bg-mesh');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });

  // ---------- TUNING ----------
  const BASE_DENSITY   = 7000;   // initial population: area / density
  const MAX_PARTICLES  = 200;    // hard cap (clicks won't exceed)
  const DOT_MIN_R      = 1.1;
  const DOT_MAX_R      = 2.2;

  const LINK_DIST      = 150;    // distance threshold for connections
  const LINK_WIDTH     = 1.0;

  const SPEED          = 24;     // px/sec baseline
  const DAMPING        = 1.00;   // 1 = free float
  const BOUNCE         = false;  // false = wrap around edges

  const CURSOR_FORCE   = 1600;   // push/pull strength
  const CURSOR_RADIUS  = 400;    // influence radius in px
  const ATTRACT        = false;  // false = repel, true = attract

  // Global white veil (tones everything down). Drawn AFTER dots/lines.
  // const BACKDROP_ALPHA = 0.0;  // 0..1 (e.g., 0.3 subtle, 0.7 strong)

  // ---------- Cursor node (the new part) ----------
  const CURSOR_NODE_ENABLED     = true;               // show cursor dot + links
  const CURSOR_NODE_ALWAYS_SHOW = false;              // show even when pointer leaves
  const CURSOR_NODE_R           = 2.4;                // cursor dot radius
  const CURSOR_LINK_ALPHA_BOOST = 1.25;               // make cursor links a bit stronger

  // ---------- THEME-AWARE COLORS (hooks into <html data-theme>) ----------
  let DOT_COLOR, LINE_RGB, CURSOR_NODE_COLOR;

  function readIsDark() {
    // Prefer your site's explicit theme flag (set by theme.js)
    const root = document.documentElement;
    const dataTheme = root.getAttribute('data-theme');
    if (dataTheme === 'dark') return true;
    if (dataTheme === 'light') return false;
    // Fallback to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyThemeColors() {
    const dark = readIsDark();
    DOT_COLOR         = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.03)'; // dots
    LINE_RGB          = dark ? '255,255,255'            : '0,0,0';             // lines (used as `rgba(${LINE_RGB}, alpha)`)
    CURSOR_NODE_COLOR = dark ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.28)'; // cursor node
  }

  applyThemeColors();

  // React instantly when your site's theme toggles (theme.js updates data-theme)
  new MutationObserver(applyThemeColors)
    .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // Optional: if your site doesn't set data-theme, also react to OS flips
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  darkQuery.addEventListener?.('change', applyThemeColors);

  // ---------- STATE ----------
  let w = 0, h = 0, dpr = 1;
  let P = []; // particles

  function makeParticle(x, y) {
    const ang = Math.random() * Math.PI * 2;
    const spd = SPEED * (0.5 + Math.random());
    return {
      x, y,
      vx: Math.cos(ang) * spd,
      vy: Math.sin(ang) * spd,
      r: DOT_MIN_R + Math.random() * (DOT_MAX_R - DOT_MIN_R)
    };
  }

  function initParticles() {
    const n = Math.min(MAX_PARTICLES, Math.round((w * h) / BASE_DENSITY));
    P = new Array(n).fill(0).map(() => makeParticle(Math.random() * w, Math.random() * h));
  }

  // --- Resize WITHOUT resetting particles ---
  function resizeKeep() {
    const prevW = w || window.innerWidth;
    const prevH = h || window.innerHeight;

    const newDpr = Math.min(window.devicePixelRatio || 1, 2);
    const newW = window.innerWidth;
    const newH = window.innerHeight;

    const sx = prevW ? (newW / prevW) : 1;
    const sy = prevH ? (newH / prevH) : 1;

    dpr = newDpr;
    w = canvas.clientWidth  = newW;
    h = canvas.clientHeight = newH;
    canvas.width  = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // draw in CSS pixels

    if (P.length) {
      for (const p of P) {
        p.x  *= sx;
        p.y  *= sy;
        p.vx *= sx;
        p.vy *= sy;
      }
    } else {
      initParticles();
    }
  }
  window.addEventListener('resize', resizeKeep, { passive: true });

  // ---------- Pointer (robust mapping) ----------
  let mx = w / 2, my = h / 2, inside = false;
  window.addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; inside = true; }, { passive: true });
  window.addEventListener('pointerleave', () => { inside = false; }, { passive: true });

  function mapPointerToCanvas(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = rect.width  ? rect.width  / w : 1;
    const scaleY = rect.height ? rect.height / h : 1;
    return {
      cx: (clientX - rect.left) / scaleX,
      cy: (clientY - rect.top)  / scaleY
    };
  }

  // ---------- CLICK to add a dot (window listener) ----------
  // Canvas is behind everything; listen on window and map click to canvas coords
  window.addEventListener('click', (e) => {
    if (e.target.closest('a, button, input, textarea, select, [role="button"]')) return;
    if (P.length >= MAX_PARTICLES) return;

    const { cx, cy } = mapPointerToCanvas(e.clientX, e.clientY);
    const p = makeParticle(cx, cy);
    // small outward burst so it moves immediately
    const ang = Math.random() * Math.PI * 2;
    p.vx = Math.cos(ang) * 1;
    p.vy = Math.sin(ang) * 1;
    P.push(p);
  }, { passive: true });

  // ---------- Main loop ----------
  let last = performance.now();
  function step(now) {
    const dt = Math.min(0.033, (now - last) / 1000);
    last = now;

    // Clear frame
    ctx.clearRect(0, 0, w, h);

    // Current cursor (canvas coords)
    const { cx, cy } = inside ? mapPointerToCanvas(mx, my) : { cx: -9999, cy: -9999 };
    const R2 = CURSOR_RADIUS * CURSOR_RADIUS;

    // Update physics
    for (const p of P) {
      if (inside) {
        const dx = p.x - cx, dy = p.y - cy;
        const d2 = dx * dx + dy * dy;
        if (d2 < R2) {
          const inv = 1 / Math.max(64, d2);
          const s   = (1 - d2 / R2) * CURSOR_FORCE * dt;
          const fx  = dx * inv * s, fy = dy * inv * s;
          if (ATTRACT) { p.vx -= fx; p.vy -= fy; } else { p.vx += fx; p.vy += fy; }
        }
      }
      p.vx *= DAMPING; p.vy *= DAMPING;
      p.x  += p.vx * dt;
      p.y  += p.vy * dt;

      if (BOUNCE) {
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > w) { p.x = w; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > h) { p.y = h; p.vx *= -1; }
      } else {
        if (p.x < -5) p.x = w + 5; else if (p.x > w + 5) p.x = -5;
        if (p.y < -5) p.y = h + 5; else if (p.y > h + 5) p.y = -5;
      }
    }

    // Draw inter-particle lines first
    ctx.lineWidth = LINK_WIDTH;
    for (let i = 0; i < P.length; i++) {
      const a = P[i];
      for (let j = i + 1; j < P.length; j++) {
        const b = P[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < LINK_DIST * LINK_DIST) {
          const t = 1 - d2 / (LINK_DIST * LINK_DIST); // 0..1
          const alpha = Math.max(0, Math.min(1, 0.15 * t)) / 3;
          ctx.strokeStyle = `rgba(${LINE_RGB},${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Cursor node lines (optional)
    if (CURSOR_NODE_ENABLED && (inside || CURSOR_NODE_ALWAYS_SHOW)) {
      for (const a of P) {
        const dx = a.x - cx, dy = a.y - cy;
        const d2 = dx * dx + dy * dy;
        if (d2 < LINK_DIST * LINK_DIST) {
          const t = 1 - d2 / (LINK_DIST * LINK_DIST); // 0..1
          const alpha = Math.max(0, Math.min(1, 0.15 * t)) * CURSOR_LINK_ALPHA_BOOST;
          ctx.strokeStyle = `rgba(${LINE_RGB},${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(cx, cy);
          ctx.stroke();
        }
      }
    }

    // Draw dots
    ctx.fillStyle = DOT_COLOR;
    for (const p of P) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw cursor node dot on top
    if (CURSOR_NODE_ENABLED && (inside || CURSOR_NODE_ALWAYS_SHOW)) {
      ctx.fillStyle = CURSOR_NODE_COLOR;
      ctx.beginPath();
      ctx.arc(cx, cy, CURSOR_NODE_R, 0, Math.PI * 2);
      ctx.fill();
    }

    // Global white veil LAST (if enabled)
    // if (BACKDROP_ALPHA > 0) {
    //   ctx.fillStyle = `rgba(255,255,255,${BACKDROP_ALPHA})`;
    //   ctx.fillRect(0, 0, w, h);
    // }

    requestAnimationFrame(step);
  }

  // Init once, keep on resize
  resizeKeep();
  requestAnimationFrame(step);
})();

