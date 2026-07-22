"use client";

type Point3D = { x: number; y: number; z: number };

const RADIUS = 168;
const RINGS = 9; // latitude bands between the two poles
const COLS = 14; // points per full ring

function sphereGrid(): Point3D[][] {
  const rings: Point3D[][] = [];

  // North pole
  rings.push([{ x: 0, y: -RADIUS, z: 0 }]);

  for (let i = 1; i < RINGS; i++) {
    const phi = (Math.PI * i) / RINGS - Math.PI / 2;
    const ringRadius = Math.cos(phi) * RADIUS;
    const y = Math.sin(phi) * RADIUS;
    const ring: Point3D[] = [];
    for (let j = 0; j < COLS; j++) {
      const theta = (2 * Math.PI * j) / COLS;
      ring.push({
        x: Math.cos(theta) * ringRadius,
        y,
        z: Math.sin(theta) * ringRadius,
      });
    }
    rings.push(ring);
  }

  // South pole
  rings.push([{ x: 0, y: RADIUS, z: 0 }]);

  return rings;
}

const RINGS_DATA = sphereGrid();

type Edge = { a: Point3D; b: Point3D };

function buildEdges(): Edge[] {
  const edges: Edge[] = [];

  for (let r = 0; r < RINGS_DATA.length; r++) {
    const ring = RINGS_DATA[r];
    const next = RINGS_DATA[r + 1];

    // connect points within the same ring
    if (ring.length > 1) {
      for (let j = 0; j < ring.length; j++) {
        edges.push({ a: ring[j], b: ring[(j + 1) % ring.length] });
      }
    }

    if (!next) continue;

    // connect this ring to the next one (triangulated mesh)
    if (ring.length === 1) {
      for (let j = 0; j < next.length; j++) {
        edges.push({ a: ring[0], b: next[j] });
      }
    } else if (next.length === 1) {
      for (let j = 0; j < ring.length; j++) {
        edges.push({ a: ring[j], b: next[0] });
      }
    } else {
      for (let j = 0; j < ring.length; j++) {
        edges.push({ a: ring[j], b: next[j] });
        edges.push({ a: ring[j], b: next[(j + 1) % next.length] });
      }
    }
  }

  return edges;
}

const EDGES = buildEdges();
const NODES = RINGS_DATA.flat();
// A handful of nodes rendered larger/brighter, evenly spread through the array.
const HIGHLIGHT_STEP = 11;

export function HeroSphere() {
  const size = 400;
  const c = size / 2;

  return (
    <div className="hero-sphere-spin mx-auto aspect-square w-full max-w-[520px]">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="h-full w-full overflow-visible"
        role="img"
        aria-label="Ilustração de uma rede esférica de pontos conectados"
      >
        <g stroke="#3b7ce0" strokeWidth="0.6" opacity="0.55">
          {EDGES.map((e, i) => (
            <line
              key={i}
              x1={c + e.a.x}
              y1={c + e.a.y}
              x2={c + e.b.x}
              y2={c + e.b.y}
            />
          ))}
        </g>
        <g fill="#1e60d1">
          {NODES.map((p, i) => {
            const highlighted = i % HIGHLIGHT_STEP === 0;
            return (
              <circle
                key={i}
                cx={c + p.x}
                cy={c + p.y}
                r={highlighted ? 4.2 : 2.2}
                fill={highlighted ? "#8fb8f2" : "#1e60d1"}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}
