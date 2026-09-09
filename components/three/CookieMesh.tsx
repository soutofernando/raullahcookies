"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "@/lib/scroll-state";
import { cookieTints } from "@/lib/brand";

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createCookieShape(radius = 1.18) {
  const bite = { x: 0.6 * radius, y: 0.7 * radius, r: 0.4 * radius };
  const shape = new THREE.Shape();
  const outer: THREE.Vector2[] = [];

  for (let i = 0; i <= 96; i += 1) {
    const angle = (i / 96) * Math.PI * 2 - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (Math.hypot(x - bite.x, y - bite.y) >= bite.r) {
      outer.push(new THREE.Vector2(x, y));
    }
  }

  const biteArc: THREE.Vector2[] = [];
  for (let i = 0; i <= 36; i += 1) {
    const angle = Math.PI * 0.15 + (i / 36) * Math.PI * 1.05;
    const x = bite.x + Math.cos(angle) * bite.r;
    const y = bite.y + Math.sin(angle) * bite.r;
    if (Math.hypot(x, y) <= radius + 0.01) {
      biteArc.push(new THREE.Vector2(x, y));
    }
  }

  const points = [...outer.slice(0, -8), ...biteArc, ...outer.slice(-8)];
  shape.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    shape.lineTo(points[i].x, points[i].y);
  }
  shape.closePath();
  return shape;
}

function createCookieGeometry() {
  const geometry = new THREE.ExtrudeGeometry(createCookieShape(), {
    depth: 0.38,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.06,
    bevelSegments: 3,
    curveSegments: 24,
  });
  geometry.center();
  geometry.rotateX(-Math.PI / 2);

  const position = geometry.attributes.position;
  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const y = position.getY(i);
    const z = position.getZ(i);
    const n =
      Math.sin(x * 7.3) * Math.cos(z * 6.1) * 0.035 +
      Math.sin(x * 14 + z * 11) * 0.016;
    position.setXYZ(i, x + n * 0.35, y + Math.abs(n) * 0.45, z + n * 0.35);
  }
  position.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

export default function CookieMesh() {
  const group = useRef<THREE.Group>(null);
  const dough = useRef<THREE.MeshStandardMaterial>(null);
  const color = useMemo(() => new THREE.Color(cookieTints.dough), []);
  const target = useMemo(() => new THREE.Color(cookieTints.dough), []);

  const cookieGeometry = useMemo(() => createCookieGeometry(), []);
  const chipGeometry = useMemo(
    () => new THREE.DodecahedronGeometry(0.09, 0),
    [],
  );
  const chipMaterial = useMemo(
    () => new THREE.MeshLambertMaterial({ color: "#1d120c" }),
    [],
  );

  const chipMatrices = useMemo(() => {
    const rand = mulberry32(42);
    const matrices: THREE.Matrix4[] = [];
    while (matrices.length < 18) {
      const x = (rand() - 0.5) * 1.7;
      const z = (rand() - 0.5) * 1.7;
      if (Math.hypot(x, z) > 0.92 || (x > 0.35 && z < -0.35)) continue;
      const matrix = new THREE.Matrix4();
      const quaternion = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(rand() * 1.2, rand() * Math.PI, rand()),
      );
      matrix.compose(
        new THREE.Vector3(x, 0.22 + rand() * 0.05, z),
        quaternion,
        new THREE.Vector3(1, 0.45 + rand() * 0.3, 1),
      );
      matrices.push(matrix);
    }
    return matrices;
  }, []);

  const chipsRef = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    const mesh = chipsRef.current;
    if (!mesh) return;
    chipMatrices.forEach((matrix, index) => mesh.setMatrixAt(index, matrix));
    mesh.instanceMatrix.needsUpdate = true;
  }, [chipMatrices]);

  useLayoutEffect(() => {
    const doughGeo = cookieGeometry;
    const chipGeo = chipGeometry;
    const chipMat = chipMaterial;
    return () => {
      doughGeo.dispose();
      chipGeo.dispose();
      chipMat.dispose();
    };
  }, [chipGeometry, chipMaterial, cookieGeometry]);

  useFrame((state, delta) => {
    if (!group.current) return;

    // Fit the cookie to the smaller viewport axis so it never floods phones.
    const fit = Math.min(state.viewport.width, state.viewport.height) / 4.3;
    const responsive = THREE.MathUtils.clamp(fit, 0.34, 1);

    const reduced = scrollState.reducedMotion;
    const hero = reduced ? 0.2 : scrollState.hero;
    const manifesto = reduced ? 0 : scrollState.manifesto;
    const flavors = reduced ? 0 : scrollState.flavors;
    const identity = reduced ? 0 : scrollState.identity;
    const cta = reduced ? 0 : scrollState.cta;
    const global = reduced ? 0.12 : scrollState.global;

    // Geometry lies flat on XZ, so a +90deg X rotation turns the face to camera.
    const faceCamera = Math.PI / 2;
    group.current.rotation.y = global * Math.PI * 1.6 + manifesto * 0.4;
    group.current.rotation.x =
      faceCamera - 0.22 - hero * 0.55 + flavors * 0.3 + cta * 0.4;
    group.current.rotation.z =
      -0.12 + Math.sin(manifesto * Math.PI) * 0.18 + flavors * 0.25;

    const portrait = state.viewport.aspect < 0.85;
    // Side drift is measured against the visible width, so it never exits a phone.
    const spread = portrait
      ? Math.min(1, state.viewport.width / 5.9) * 0.6
      : responsive;
    const x =
      (Math.sin(hero * Math.PI) * 0.2 +
        manifesto * 1.9 -
        flavors * 2.6 +
        identity * 2.1 +
        cta * 1.2) *
      spread;
    // Portrait keeps the cookie in the empty top area, clear of the copy below.
    const portraitLift = portrait
      ? state.viewport.height * (0.16 + hero * 0.14)
      : 0;
    const y =
      (0.45 - hero * 0.5 - manifesto * 0.2 - flavors * 0.3 + cta * 0.2) * spread +
      portraitLift;
    const scale =
      (1.35 - hero * 0.35 - flavors * 0.25 + identity * 0.1 - cta * 0.3) *
      responsive;

    group.current.position.x = THREE.MathUtils.damp(
      group.current.position.x,
      x,
      4,
      delta,
    );
    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      y,
      4,
      delta,
    );
    const nextScale = THREE.MathUtils.damp(
      group.current.scale.x,
      Math.max(0.2, scale),
      4,
      delta,
    );
    group.current.scale.setScalar(nextScale);

    target.setHex(scrollState.cookieColor);
    color.lerp(target, 1 - Math.exp(-delta * 4));
    if (dough.current) dough.current.color.copy(color);
  });

  return (
    <group
      ref={group}
      position={[0, 0.45, 0]}
      rotation={[Math.PI / 2 - 0.22, 0, -0.12]}
      scale={1.35}
    >
      <mesh geometry={cookieGeometry}>
        <meshStandardMaterial
          ref={dough}
          color={cookieTints.dough}
          roughness={1}
          metalness={0}
        />
      </mesh>
      <instancedMesh
        ref={chipsRef}
        args={[chipGeometry, chipMaterial, chipMatrices.length]}
      />
    </group>
  );
}
