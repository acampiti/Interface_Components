import { useMemo } from 'react';
import './FractalTree.css';

interface Branch {
  x1: number; y1: number;
  x2: number; y2: number;
  depth: number;
  index: number;
}

function generateBranches(
  x: number, y: number, angle: number, length: number,
  depth: number, maxDepth: number, branches: Branch[], counter: { i: number }
): void {
  if (depth > maxDepth || length < 3) return;

  const x2 = x + Math.cos(angle) * length;
  const y2 = y + Math.sin(angle) * length;

  branches.push({ x1: x, y1: y, x2, y2, depth, index: counter.i++ });

  const shrink = 0.68;
  const spread = 0.45;

  generateBranches(x2, y2, angle - spread, length * shrink, depth + 1, maxDepth, branches, counter);
  generateBranches(x2, y2, angle + spread, length * shrink, depth + 1, maxDepth, branches, counter);
}

export function FractalTree() {
  const branches = useMemo(() => {
    const b: Branch[] = [];
    // Grow upward from bottom center: angle = -PI/2 (straight up)
    generateBranches(80, 150, -Math.PI / 2, 45, 0, 7, b, { i: 0 });
    return b;
  }, []);

  const totalBranches = branches.length;

  return (
    <div className="fractal-tree">
      <svg viewBox="0 0 160 160" width="160" height="160">
        {branches.map((b) => {
          // Stagger draw-in delay based on depth + index
          const delay = (b.index / totalBranches) * 2.0;
          const strokeWidth = Math.max(0.5, 3 - b.depth * 0.35);
          const opacity = 1 - b.depth * 0.08;

          return (
            <line
              key={b.index}
              x1={b.x1} y1={b.y1}
              x2={b.x2} y2={b.y2}
              className="fractal-tree__branch"
              strokeWidth={strokeWidth}
              style={{
                animationDelay: `${delay.toFixed(3)}s`,
                opacity,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
