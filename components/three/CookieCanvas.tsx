"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import CookieMesh from "@/components/three/CookieMesh";
import SprinkleField from "@/components/three/SprinkleField";
import CanvasErrorBoundary from "@/components/three/CanvasErrorBoundary";
import { palette } from "@/lib/brand";

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function CookieCanvas() {
  // Client-only component (dynamic import with ssr: false), so window is here.
  const [enabled] = useState(supportsWebGL);
  const [dpr] = useState(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    return Math.min(window.devicePixelRatio, mobile ? 1 : 1.5);
  });

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[1]">
      <CanvasErrorBoundary>
        <Canvas
          dpr={dpr}
          shadows={false}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
          }}
          camera={{ fov: 42, position: [0, 0.35, 5.6] }}
          onCreated={({ gl }) => {
            gl.setClearColor(palette.cream, 0);
          }}
        >
          <hemisphereLight
            intensity={0.9}
            color={palette.white}
            groundColor={palette.blush}
          />
          <directionalLight position={[4, 6, 4]} intensity={1.5} />
          <directionalLight
            position={[-4, 1.5, -2]}
            intensity={0.6}
            color={palette.rose}
          />
          <CookieMesh />
          <SprinkleField />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
