"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function Field({
  scrollRef,
  isMobile,
}: {
  scrollRef: React.MutableRefObject<number>;
  isMobile: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const { camera } = useThree();

  const { positions, colors } = useMemo(() => {
    const count = isMobile ? 480 : 1800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const bright = new THREE.Color("#93c5fd");
    const deep = new THREE.Color("#3b82f6");
    const tmp = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const r = 3.5 + Math.random() * 11;
      const theta = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = Math.sin(theta) * r;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 130;

      tmp.copy(bright).lerp(deep, Math.random() * 0.7);
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
    }
    return { positions, colors };
  }, [isMobile]);

  useFrame((_state, delta) => {
    if (!pointsRef.current) return;
    // Drive camera Z by scroll: 30 (top) → -50 (bottom). Smoothed with damping.
    const targetZ = 30 - scrollRef.current * 80;
    camera.position.z += (targetZ - camera.position.z) * 0.06;

    // Subtle ambient rotation so the field feels alive
    pointsRef.current.rotation.y += delta * 0.015;
    pointsRef.current.rotation.x += delta * 0.005;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.05 : 0.06}
        sizeAttenuation
        vertexColors
        transparent
        opacity={isMobile ? 0.55 : 0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ScrollParticleField() {
  const scrollRef = useRef(0);
  const [enabled, setEnabled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const phone = window.innerWidth < 768;
    setIsMobile(phone);
    setEnabled(!reduceMotion);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
        }}
        style={{ background: "transparent" }}
      >
        <Field scrollRef={scrollRef} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
