"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ThreeGlobe from "three-globe";
import * as THREE from "three";

// Extend Three.js with ThreeGlobe
extend({ ThreeGlobe });

function Globe() {
    const globeRef = useRef<any>(null);

    useEffect(() => {
        if (globeRef.current) {
            // Configure the globe
            globeRef.current.globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg");
            globeRef.current.bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png");

            // Set atmosphere with enhanced glow
            globeRef.current.atmosphereColor("#60a5fa");
            globeRef.current.atmosphereAltitude(0.2);
        }
    }, []);

    useFrame(() => {
        if (globeRef.current) {
            globeRef.current.rotation.y += 0.002;
        }
    });

    return (
        <primitive
            ref={globeRef}
            object={useMemo(() => new ThreeGlobe(), [])}
            scale={1}
        />
    );
}

function Stars() {
    const starsRef = useRef<THREE.Points>(null);

    const [positions, geometry] = useMemo(() => {
        const positions = new Float32Array(5000 * 3);
        for (let i = 0; i < 5000; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            const radius = 50 + Math.random() * 50;

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        return [positions, geo];
    }, []);

    useFrame(() => {
        if (starsRef.current) {
            starsRef.current.rotation.y += 0.0001;
        }
    });

    return (
        <points ref={starsRef} geometry={geometry}>
            <pointsMaterial
                size={0.2}
                color="#ffffff"
                transparent
                opacity={0.9}
                sizeAttenuation
            />
        </points>
    );
}

function FloatingStars() {
    const floatingStarsRef = useRef<THREE.Points>(null);

    const [positions, sizes, geometry] = useMemo(() => {
        const count = 200;
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            // Position stars around the globe area with some randomness
            const angle = Math.random() * Math.PI * 2;
            const distance = 120 + Math.random() * 150;
            const height = (Math.random() - 0.5) * 200;

            positions[i * 3] = Math.cos(angle) * distance;
            positions[i * 3 + 1] = height;
            positions[i * 3 + 2] = Math.sin(angle) * distance;

            sizes[i] = Math.random() * 2 + 1;
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        return [positions, sizes, geo];
    }, []);

    useFrame(({ clock }) => {
        if (floatingStarsRef.current) {
            floatingStarsRef.current.rotation.y += 0.0003;
            // Subtle vertical movement
            floatingStarsRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 2;
        }
    });

    return (
        <points ref={floatingStarsRef} geometry={geometry}>
            <pointsMaterial
                size={1.5}
                color="#93c5fd"
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default function Globe3D() {
    return (
        <div className="w-full h-[600px] relative">
            <Canvas
                camera={{ position: [0, 0, 300], fov: 45 }}
                className="bg-transparent"
            >
                {/* Enhanced lighting for brighter globe */}
                <ambientLight intensity={1.0} />
                <directionalLight position={[100, 100, 100]} intensity={2.0} />
                <pointLight position={[100, 100, 100]} intensity={2.5} color="#ffffff" />
                <pointLight position={[-100, -100, -100]} intensity={1.0} color="#60a5fa" />
                <pointLight position={[0, 100, 0]} intensity={1.2} color="#93c5fd" />
                <hemisphereLight intensity={0.8} color="#ffffff" groundColor="#3b82f6" />

                <Stars />
                <FloatingStars />
                <Globe />

                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    minDistance={150}
                    maxDistance={400}
                    autoRotate
                    autoRotateSpeed={0.5}
                    rotateSpeed={0.5}
                />
            </Canvas>
        </div>
    );
}