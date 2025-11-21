"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamic import for 3D viewer
const Model3DViewer = dynamic(() => import("./Model3DViewer"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center">
            <div className="animate-pulse text-zinc-400">Loading 3D model...</div>
        </div>
    ),
});

type MethodCategory = {
    id: string;
    title: string;
    icon: string;
    description: string;
    details: string;
};

const methods: MethodCategory[] = [
    {
        id: "clustering",
        title: "Clustering & Dimensionality Reduction",
        icon: "📊",
        description: "Advanced algorithms for pattern recognition and data simplification",
        details: "Utilize different data mining techniques to identify patterns and reduce complexity while preserving essential information.",
    },
    {
        id: "spectral",
        title: "Spectral Unmixing",
        icon: "💎",
        description: "Decompose mixed pixels into constituent materials",
        details: "Apply unmixing techniques to identify the different materials based on their spectral signature.",
    },
    {
        id: "prospectivity",
        title: "Mineral Prospectivity Mapping",
        icon: "⛏️",
        description: "Identify potential mineral deposit locations",
        details: "Combine geological, remote sensing, and geophysical data to generate probability maps for mineral exploration targets.",
    },
    {
        id: "sar",
        title: "SAR Processing (for the future)",
        icon: "📡",
        description: "Synthetic Aperture Radar analysis and visualization",
        details: "SAR data can be used to perform analysis on terrain deformation, surface roughness, and geological structure identification.",
    },
];

export default function MethodsShowcase() {
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

    const currentMethod = selectedMethod
        ? methods.find((m) => m.id === selectedMethod)
        : null;

    const handleMethodClick = (methodId: string) => {
        // Toggle: if clicking the same method, deselect it
        setSelectedMethod(prev => prev === methodId ? null : methodId);
    };

    return (
        <section className="relative w-full -mt-6 sm:-mt-8 py-10 sm:py-16 bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Section Title */}
                <div className="text-center mb-6 sm:mb-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-2 sm:mb-3">
                        Processing Methods
                    </h2>
                    <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto px-4">
                        Explore our advanced geospatial processing capabilities clicking on the different buttons inside the 3D model.
                    </p>
                </div>

                {/* Main Content Container */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-black/[.08] dark:border-white/[.08] shadow-xl overflow-hidden">
                    {/* 3D Viewer with Overlay Controls */}
                    <div className="relative bg-zinc-900 min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
                        {/* 3D Model */}
                        <Model3DViewer methodId={selectedMethod} />

                        {/* Floating Icon Buttons */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2 sm:gap-3 z-10">
                            {methods.map((method) => (
                                <button
                                    key={method.id}
                                    onClick={() => handleMethodClick(method.id)}
                                    className={`group relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl transition-all duration-300 flex items-center justify-center ${
                                        selectedMethod === method.id
                                            ? "bg-blue-500 shadow-lg shadow-blue-500/50 scale-110"
                                            : "bg-white/90 dark:bg-zinc-800/90 hover:bg-white dark:hover:bg-zinc-700 hover:scale-105"
                                    } backdrop-blur-sm`}
                                    title={method.title}
                                >
                                    <span className="text-xl sm:text-2xl">{method.icon}</span>

                                    {/* Tooltip on hover (hidden on mobile) */}
                                    <div className="hidden md:block absolute right-full mr-3 px-3 py-2 bg-black/90 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                        {method.title}
                                    </div>

                                    {/* Selection indicator ring */}
                                    {selectedMethod === method.id && (
                                        <div className="absolute inset-0 rounded-xl border-2 border-blue-300 animate-pulse" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Method Details Panel (appears when method selected) */}
                    {currentMethod && (
                        <div className="p-4 sm:p-6 bg-white dark:bg-zinc-900 border-t border-black/[.08] dark:border-white/[.08] animate-in slide-in-from-bottom duration-300">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <span className="text-2xl sm:text-3xl flex-shrink-0">{currentMethod.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-2">
                                        {currentMethod.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        {currentMethod.details}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Instructions when nothing selected */}
                    {!currentMethod && (
                        <div className="p-4 sm:p-6 bg-zinc-50 dark:bg-zinc-950 border-t border-black/[.08] dark:border-white/[.08]">
                            <p className="text-sm sm:text-base text-center text-zinc-600 dark:text-zinc-400">
                                Select a processing method from the icons on the right to visualize data overlays
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}