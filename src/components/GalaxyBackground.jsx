// src/components/GalaxyBackground.jsx
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const GalaxyParticles = ({ count = 5000, color = "#ffffff" }) => {
  const ref = useRef();

  // Generate random positions in 3D space
  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 80;
    }
    return arr;
  }, [count]);

  useFrame(() => {
    ref.current.rotation.y += 0.0005;
    ref.current.rotation.x += 0.0002;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={0.3}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
};

const GalaxyBackground = ({ mode = "light" }) => {
  const galaxyColor = mode === "dark" ? "#cce6ff" : "#334477";

  return (
    <Canvas
      className="galaxy-canvas"
      camera={{ position: [0, 0, 10], fov: 75 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        background: "transparent",
      }}
    >
      <ambientLight intensity={0.4} />
      <GalaxyParticles color={galaxyColor} />
    </Canvas>
  );
};

export default GalaxyBackground;
