import { ShowcasePage, ShowcaseGroup } from "../ShowcasePage";
import { PulseGrid } from "@/components/animations/PulseGrid";
import { OrbitDots } from "@/components/animations/OrbitDots";
import { MorphingShape } from "@/components/animations/MorphingShape";
import { TypingDots } from "@/components/animations/TypingDots";
import { DNAHelix } from "@/components/animations/DNAHelix";
import { StackingBlocks } from "@/components/animations/StackingBlocks";
import { SignalRings } from "@/components/animations/SignalRings";
import { FlipCards } from "@/components/animations/FlipCards";
import { ProgressSnake } from "@/components/animations/ProgressSnake";
import { MatrixRain } from "@/components/animations/MatrixRain";
import { GearMesh } from "@/components/animations/GearMesh";
import { BouncingBars } from "@/components/animations/BouncingBars";
import { HourglassFlip } from "@/components/animations/HourglassFlip";
import { ParticleSwirl } from "@/components/animations/ParticleSwirl";
import { DominoCascade } from "@/components/animations/DominoCascade";

const animCenter: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: 140,
};

export function AnimationsPage() {
  return (
    <ShowcasePage
      title="Busy Animations"
      description="Pure CSS loading and busy-state animations — no JavaScript animation loops."
    >
      <ShowcaseGroup title="Pulse Grid" componentName="PulseGrid" description="3×3 grid of squares lighting up in a staggered wave pattern.">
        <div style={animCenter}>
          <PulseGrid />
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup title="Orbit Dots" componentName="OrbitDots" description="Dots orbiting a center point at different radii and speeds.">
        <div style={animCenter}>
          <OrbitDots />
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup title="Morphing Shape" componentName="MorphingShape" description="A single element morphing between circle, square, diamond, and blob via border-radius.">
        <div style={animCenter}>
          <MorphingShape />
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup title="Typing Dots" componentName="TypingDots" description="Classic chat-style bouncing dots with shadow trails.">
        <div style={animCenter}>
          <TypingDots />
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup title="DNA Helix" componentName="DNAHelix" description="Double-helix sine waves with depth scaling — dots grow when 'in front' and shrink when 'behind'.">
        <div style={animCenter}>
          <DNAHelix />
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup title="Stacking Blocks" componentName="StackingBlocks" description="Colored blocks drop and stack up, then dissolve and repeat.">
        <div style={animCenter}>
          <StackingBlocks />
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup title="Signal Rings" componentName="SignalRings" description="Concentric rings expanding outward like a radar ping with a pulsing center dot.">
        <div style={animCenter}>
          <SignalRings />
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup title="Flip Cards" componentName="FlipCards" description="Cards flip over in sequence with 3D perspective, revealing accent color on the back face.">
        <div style={animCenter}>
          <FlipCards />
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup title="Progress Snake" componentName="ProgressSnake" description="A glowing segment slithers around a rectangular SVG track.">
        <div style={animCenter}>
          <ProgressSnake />
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup title="Matrix Rain" componentName="MatrixRain" description="Falling katakana and binary characters in columns — mini Matrix rain effect.">
        <div style={animCenter}>
          <MatrixRain />
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup title="Gear Mesh" componentName="GearMesh" description="Two interlocking gear outlines rotating in opposite directions.">
        <div style={animCenter}>
          <GearMesh />
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup title="Bouncing Bars" componentName="BouncingBars" description="Audio-level style bars bouncing to staggered heights.">
        <div style={animCenter}>
          <BouncingBars />
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup title="Hourglass Flip" componentName="HourglassFlip" description="An hourglass with flowing sand that flips when empty.">
        <div style={animCenter}>
          <HourglassFlip />
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup title="Particle Swirl" componentName="ParticleSwirl" description="Dots spiral inward, burst outward, and repeat in a vortex pattern.">
        <div style={animCenter}>
          <ParticleSwirl />
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup title="Domino Cascade" componentName="DominoCascade" description="Rectangles tilt and fall in sequence like dominoes, then reset.">
        <div style={animCenter}>
          <DominoCascade />
        </div>
      </ShowcaseGroup>
    </ShowcasePage>
  );
}
