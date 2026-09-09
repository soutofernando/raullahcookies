"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "@/lib/scroll-state";
import { palette } from "@/lib/brand";

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const COLORS = [palette.rose, palette.blush, palette.cream, palette.navy];

export default function SprinkleField() {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.InstancedMesh>(null);
  const { size } = useThree();
  const count = size.width < 768 ? 18 : 48;

  const geometry = useMemo(() => new THREE.BoxGeometry(0.05, 0.13, 0.03), []);
  const material = useMemo(
    () => new THREE.MeshLambertMaterial({ toneMapped: false }),
    [],
  );

  const seeds = useMemo(() => {
    const rand = mulberry32(7);
    return Array.from({ length: count }, () => ({
      x: (rand() - 0.5) * 9,
      y: (rand() - 0.5) * 6,
      z: (rand() - 0.5) * 3 - 1,
      rx: rand() * Math.PI,
      ry: rand() * Math.PI,
      color: COLORS[Math.floor(rand() * COLORS.length)],
    }));
  }, [count]);

  // Matrices are written once; per-frame motion animates the parent group only.
  useLayoutEffect(() => {
    const instanced = mesh.current;
    if (!instanced) return;
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    seeds.forEach((seed, index) => {
      dummy.position.set(seed.x, seed.y, seed.z);
      dummy.rotation.set(seed.rx, seed.ry, 0);
      dummy.updateMatrix();
      instanced.setMatrixAt(index, dummy.matrix);
      instanced.setColorAt(index, color.set(seed.color));
    });
    instanced.instanceMatrix.needsUpdate = true;
    if (instanced.instanceColor) instanced.instanceColor.needsUpdate = true;
  }, [seeds]);

  useLayoutEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((state) => {
    const node = group.current;
    if (!node) return;

    // Keep confetti proportional to the viewport, same rule as the cookie.
    const fit = Math.min(state.viewport.width, state.viewport.height) / 4.3;
    const responsive = THREE.MathUtils.clamp(fit, 0.34, 1);
    node.scale.setScalar(responsive);

    if (scrollState.reducedMotion) return;
    const t = state.clock.elapsedTime;
    node.position.y = Math.sin(t * 0.25) * 0.12 - scrollState.global * 1.6;
    node.rotation.z = Math.sin(t * 0.12) * 0.05;
    node.rotation.y = t * 0.05;
  });

  return (
    <group ref={group}>
      <instancedMesh ref={mesh} args={[geometry, material, count]} />
    </group>
  );
}
