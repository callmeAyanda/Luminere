// src/app/showrooms/components/ARViewer.js
'use client';

import { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  Float, 
  ContactShadows,
  Html,
  useProgress
} from '@react-three/drei';
import * as THREE from 'three';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-amber-600/30 border-t-amber-600 rounded-full animate-spin mx-auto mb-4" />
        <div className="text-sm text-amber-400">Loading AR Experience...</div>
        <div className="text-xs text-zinc-500 mt-2">{Math.round(progress)}%</div>
      </div>
    </Html>
  );
}

function FurnitureModel({ type }) {
  const meshRef = useRef();
  
  // Placeholder geometries - in production, use actual GLB models
  const getGeometry = () => {
    switch(type) {
      case 'sofa':
        return (
          <>
            <boxGeometry args={[2, 0.8, 1]} />
            <meshStandardMaterial 
              color="#B88B4A"
              metalness={0.4}
              roughness={0.2}
            />
          </>
        );
      case 'table':
        return (
          <>
            <cylinderGeometry args={[0.8, 0.8, 0.05, 32]} />
            <meshStandardMaterial 
              color="#1A1A1A"
              metalness={0.8}
              roughness={0.1}
            />
            <mesh position={[0, -0.4, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
              <meshStandardMaterial 
                color="#C0C0C0"
                metalness={1}
                roughness={0.1}
              />
            </mesh>
          </>
        );
      case 'bed':
        return (
          <>
            <boxGeometry args={[2.2, 0.5, 2]} />
            <meshStandardMaterial 
              color="#2C1810"
              metalness={0.2}
              roughness={0.4}
            />
            <mesh position={[0, 0.5, -0.8]}>
              <boxGeometry args={[2.2, 0.8, 0.1]} />
              <meshStandardMaterial 
                color="#D4AF37"
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          </>
        );
      default:
        return (
          <>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial 
              color="#B88B4A"
              metalness={0.4}
              roughness={0.2}
            />
          </>
        );
    }
  };

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <mesh ref={meshRef} castShadow receiveShadow>
        {getGeometry()}
      </mesh>
      <pointLight position={[10, 10, 10]} intensity={1} color="#FFD700" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4A90E2" />
    </Float>
  );
}

function ShowroomScene({ selectedFurniture, showroom, zoomLevel }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {selectedFurniture ? (
        <FurnitureModel type={selectedFurniture.category.toLowerCase()} />
      ) : (
        <group>
          <FurnitureModel type="sofa" />
          <FurnitureModel type="table" />
          <FurnitureModel type="bed" />
        </group>
      )}
      
      <ContactShadows
        position={[0, -0.5, 0]}
        opacity={0.6}
        scale={10}
        blur={2}
        far={10}
      />
      
      <Environment preset="studio" />
      
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        zoomSpeed={zoomLevel}
        maxPolarAngle={Math.PI / 2}
        minDistance={2}
        maxDistance={20}
      />
    </>
  );
}

export default function ARViewer({ selectedFurniture, zoomLevel, showroom }) {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{ position: [5, 2, 5], fov: 50 }}
        className="rounded-3xl"
      >
        <Suspense fallback={<Loader />}>
          <ShowroomScene 
            selectedFurniture={selectedFurniture}
            showroom={showroom}
            zoomLevel={zoomLevel}
          />
        </Suspense>
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute bottom-6 left-6">
        <div className="bg-black/60 backdrop-blur-sm border border-amber-600/30 rounded-xl p-4">
          <div className="text-sm font-light mb-1">CURRENT SHOWROOM</div>
          <div className="text-lg">{showroom?.name}</div>
          <div className="text-xs text-zinc-400">{showroom?.location}</div>
        </div>
      </div>
      
      <div className="absolute bottom-6 right-6">
        <div className="bg-black/60 backdrop-blur-sm border border-amber-600/30 rounded-xl p-4">
          <div className="text-sm font-light mb-2">CONTROLS</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-amber-400" />
              <span>Drag: Rotate</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-amber-400" />
              <span>Scroll: Zoom</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

