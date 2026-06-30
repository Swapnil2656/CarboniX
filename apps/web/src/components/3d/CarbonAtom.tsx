"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles, Trail, MeshTransmissionMaterial, Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';

// An individual electron that orbits the nucleus
function Electron({ radius = 1, speed = 1, angleOffset = 0, color = '#f59e0b', rotationAxis = [0, 1, 0] }) {
  const ref = useRef<THREE.Group>(null);
  const axis = useMemo(() => new THREE.Vector3(...rotationAxis).normalize(), [rotationAxis]);
  
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * speed + angleOffset;
    
    // Position the electron on the circle
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.y = Math.sin(t) * radius;
    ref.current.position.z = 0;

    // Orient the orbit
    ref.current.position.applyAxisAngle(axis, Math.PI / 4);
  });

  return (
    <group>
      <Trail width={3} length={20} color={color} attenuation={(t) => t * t}>
        <mesh ref={ref}>
          <sphereGeometry args={[0.06, 32, 32]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
      </Trail>
    </group>
  );
}

function Nucleus() {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.x = state.clock.getElapsedTime() * 0.4;
    group.current.rotation.y = state.clock.getElapsedTime() * 0.5;
  });

  // A stunning, glass-like central nucleus with inner glowing spheres
  return (
    <group ref={group}>
      {/* Outer Glass Sphere */}
      <Sphere args={[0.8, 64, 64]}>
        <MeshTransmissionMaterial 
          backside 
          thickness={0.5} 
          roughness={0} 
          transmission={1} 
          ior={1.5} 
          chromaticAberration={0.06} 
          anisotropy={0.1} 
          color="#14b8a6" 
        />
      </Sphere>
      
      {/* Inner Glowing Core */}
      <Sphere args={[0.4, 32, 32]}>
        <meshBasicMaterial color="#0f766e" toneMapped={false} />
      </Sphere>
      
      <pointLight color="#10b981" intensity={5} distance={10} />
      <pointLight color="#14b8a6" intensity={2} distance={5} position={[0, 2, 0]} />
    </group>
  );
}

export default function CarbonAtom() {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={1} />
        
        {/* Galaxy Background Effect */}
        <Stars radius={15} depth={50} count={3000} factor={6} saturation={0.5} fade speed={1.5} />
        
        <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
          <Nucleus />
          
          {/* Inner shell: 2 electrons */}
          <Electron radius={3.0} speed={1.5} angleOffset={0} color="#10b981" rotationAxis={[1, 1, 0]} />
          <Electron radius={3.0} speed={1.5} angleOffset={Math.PI} color="#10b981" rotationAxis={[1, 1, 0]} />
          
          {/* Outer shell: 4 electrons */}
          <Electron radius={6.5} speed={0.8} angleOffset={0} color="#14b8a6" rotationAxis={[0, 1, 1]} />
          <Electron radius={6.5} speed={0.8} angleOffset={Math.PI / 2} color="#14b8a6" rotationAxis={[1, -1, 0]} />
          <Electron radius={6.5} speed={0.8} angleOffset={Math.PI} color="#14b8a6" rotationAxis={[0, 1, 1]} />
          <Electron radius={6.5} speed={0.8} angleOffset={(3 * Math.PI) / 2} color="#14b8a6" rotationAxis={[1, -1, 0]} />
        </Float>

        <Sparkles count={400} scale={15} size={3} speed={0.4} opacity={0.5} color="#14b8a6" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
