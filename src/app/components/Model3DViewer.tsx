
"use client";

import { useRef, useEffect, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

interface Model3DViewerProps {
    methodId: string | null;
}

// Define the base URL from environment variables
const R2_URL = process.env.NEXT_PUBLIC_R2_URL;

// Preload the model and textures
useGLTF.preload(`${R2_URL}/terrain_base.glb`);

// Vertical exaggeration factor
const Z_EXAGGERATION = 1.4;

// Texture rotation in radians
const TEXTURE_ROTATION = Math.PI/2;

// Auto-rotation speed (radians per frame)
const AUTO_ROTATION_SPEED = 0.0015;

// Terrain model component that loads your GLB file
function TerrainModel({ methodId }: { methodId: string | null }) {
    const gltf = useGLTF(`${R2_URL}/terrain_base.glb`);
    const baseTexture = useTexture(`${R2_URL}/terrain_base_texture.png`);
    const mpmTexture = useTexture(`${R2_URL}/mpm.png`);
    const pcaTexture = useTexture(`${R2_URL}/pca.png`);
    const unmixingTexture = useTexture(`${R2_URL}/unmixing.png`);

    const modelRef = useRef<THREE.Group>(null);
    const [materials, setMaterials] = useState<THREE.ShaderMaterial[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.y += AUTO_ROTATION_SPEED;
        }
    });

    // Initialize geometry and materials only once
    useEffect(() => {
        if (!gltf.scene) return;

        // Configure textures - Update always to support HMR/dynamic changes
        [baseTexture, mpmTexture, pcaTexture, unmixingTexture].forEach(texture => {
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.minFilter = THREE.LinearMipmapLinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.anisotropy = 16;
            texture.flipY = false;

            // Always apply rotation settings
            texture.center.set(0.5, 0.5);
            texture.rotation = TEXTURE_ROTATION;
        });

        if (isInitialized) return;

        const newMaterials: THREE.ShaderMaterial[] = [];

        gltf.scene.traverse((child) => {
            if (child instanceof THREE.Mesh && child.geometry) {
                const geometry = child.geometry;
                const positionAttribute = geometry.getAttribute('position');
                const uvAttribute = geometry.getAttribute('uv');

                // Apply vertical exaggeration ONLY ONCE (check userData)
                if (positionAttribute && !geometry.userData.hasExaggeration) {
                    const positions = geometry.getAttribute('position') as THREE.BufferAttribute;
                    for (let i = 0; i < positions.count; i++) {
                        const y = positions.getY(i);
                        positions.setY(i, y * Z_EXAGGERATION);
                    }
                    positions.needsUpdate = true;
                    geometry.computeVertexNormals();
                    geometry.userData.hasExaggeration = true;
                }

                // Create UVs if they don't exist
                if (!uvAttribute && positionAttribute) {
                    const uvs = new Float32Array(positionAttribute.count * 2);
                    const bbox = new THREE.Box3().setFromBufferAttribute(positionAttribute);
                    const size = new THREE.Vector3();
                    bbox.getSize(size);
                    const min = bbox.min;

                    for (let i = 0; i < positionAttribute.count; i++) {
                        const x = positionAttribute.getX(i);
                        const z = positionAttribute.getZ(i);
                        uvs[i * 2] = (x - min.x) / size.x;
                        uvs[i * 2 + 1] = (z - min.z) / size.z;
                    }
                    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
                }

                // Create custom shader material with support for multiple overlays
                const material = new THREE.ShaderMaterial({
                    uniforms: {
                        baseTexture: { value: baseTexture },
                        pcaTexture: { value: pcaTexture },
                        mpmTexture: { value: mpmTexture },
                        unmixingTexture: { value: unmixingTexture },
                        methodId: { value: 0 }, // 0=none, 1=clustering, 2=prospectivity, 3=spectral
                        opacity: { value: 1.0 },
                        textureRotation: { value: TEXTURE_ROTATION }
                    },
                    vertexShader: `
                            varying vec2 vUv;
                            uniform float textureRotation;

                            vec2 rotateUV(vec2 uv, float rotation) {
                                float mid = 0.5;
                                float c = cos(rotation);
                                float s = sin(rotation);
                                vec2 centered = uv - mid;
                                vec2 rotated = vec2(
                                    centered.x * c - centered.y * s,
                                    centered.x * s + centered.y * c
                                );
                                return rotated + mid;
                            }

                            void main() {
                                vUv = rotateUV(uv, textureRotation);
                                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                            }
                        `,
                    fragmentShader: `
                        uniform sampler2D baseTexture;
                        uniform sampler2D pcaTexture;
                        uniform sampler2D mpmTexture;
                        uniform sampler2D unmixingTexture;
                        uniform int methodId;
                        uniform float opacity;
                        varying vec2 vUv;
                
                        void main() {
                            vec4 baseColor = texture2D(baseTexture, vUv);
                            vec4 pcaColor = texture2D(pcaTexture, vUv);
                            vec4 mpmColor = texture2D(mpmTexture, vUv);
                            vec4 unmixingColor = texture2D(unmixingTexture, vUv);
                    
                            // Determine which overlay to use
                            if (methodId == 1) {
                                // PCA/Clustering - use where it has alpha > 0.01
                                if (pcaColor.a > 0.01) {
                                    gl_FragColor = pcaColor;
                                } else {
                                    gl_FragColor = baseColor;
                                }
                            } else if (methodId == 2) {
                                // MPM - use where it has alpha > 0.01
                                if (mpmColor.a > 0.01) {
                                    gl_FragColor = mpmColor;
                                } else {
                                    gl_FragColor = baseColor;
                                }
                            } else if (methodId == 3) {
                                // Spectral Unmixing - use where it has alpha > 0.01
                                if (unmixingColor.a > 0.01) {
                                    gl_FragColor = unmixingColor;
                                } else {
                                    gl_FragColor = baseColor;
                                }
                            } else {
                                // No overlay, show base
                                gl_FragColor = baseColor;
                            }
                    
                            gl_FragColor.a = opacity;
                        }
                    `,
                    transparent: true
                });

                child.material = material;
                newMaterials.push(material);
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        // Center and scale (only once)
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.z);
        const scale = 10 / maxDim;

        gltf.scene.position.sub(center);
        gltf.scene.scale.setScalar(scale);

        setMaterials(newMaterials);
        setIsInitialized(true);

        console.log("Model initialized with PCA, MPM, and Unmixing textures");

    }, [gltf.scene, baseTexture, pcaTexture, mpmTexture, unmixingTexture, isInitialized]);

    // Update shader uniforms when methodId changes
    useEffect(() => {
        if (!materials.length) return;

        // Map methodId to shader value
        let shaderMethodId = 0;
        if (methodId === "clustering") {
            shaderMethodId = 1; // PCA
        } else if (methodId === "prospectivity") {
            shaderMethodId = 2; // MPM
        } else if (methodId === "spectral") {
            shaderMethodId = 3; // Unmixing
        }

        materials.forEach(material => {
            material.uniforms.methodId.value = shaderMethodId;
            material.needsUpdate = true;
        });

        console.log("Updated methodId in shader:", methodId, "->", shaderMethodId);

    }, [methodId, materials]);

    return (
        <group ref={modelRef}>
            <primitive object={gltf.scene} />
        </group>
    );
}

function Scene({ methodId }: { methodId: string | null }) {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 10, 15]} />

            {/* Balanced lighting for natural appearance */}
            <ambientLight intensity={0.5} />

            {/* Main directional light (sun) */}
            <directionalLight
                position={[10, 15, 10]}
                intensity={0.8}
                color="#ffffff"
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />

            {/* Fill light from opposite side */}
            <directionalLight
                position={[-10, 8, -10]}
                intensity={0.3}
                color="#ffffff"
            />

            {/* Hemisphere for natural sky/ground lighting */}
            <hemisphereLight
                intensity={0.4}
                color="#ffffff"
                groundColor="#555555"
            />

            <Suspense fallback={null}>
                <TerrainModel methodId={methodId} />
            </Suspense>

            <OrbitControls
                enableZoom={true}
                enablePan={true}
                minDistance={5}
                maxDistance={12}
                maxPolarAngle={Math.PI / 2.1}
                enableDamping
                dampingFactor={0.05}
            />
        </>
    );
}

export default function Model3DViewer({ methodId }: Model3DViewerProps) {
    return (
        <div className="w-full h-full absolute inset-0">
            <Canvas
                shadows
                gl={{
                    antialias: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 0.9,
                    outputColorSpace: THREE.SRGBColorSpace
                }}
            >
                <Scene methodId={methodId} />
            </Canvas>
        </div>
    );
}