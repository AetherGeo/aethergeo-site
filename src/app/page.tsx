"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import ContactModal from "./components/ContactModal";

// Dynamic import to avoid SSR issues with Three.js
const Globe3D = dynamic(() => import("./components/3DEarth"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[600px] flex items-center justify-center">
            <div className="animate-pulse text-zinc-600">
                Loading globe...
            </div>
        </div>
    ),
});

const MethodsShowcase = dynamic(() => import("./components/MethodsShowcase"), {
    ssr: false,
});

export default function Home() {
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <>
            <div className="min-h-screen bg-black pt-16 pb-12 sm:pb-0">
                {/* Hero Section with Globe */}
                <section className="relative w-full min-h-[700px] flex items-end justify-center overflow-hidden bg-black">
                    <div className="absolute inset-0 z-0">
                        <Globe3D />
                    </div>

                    <div className="relative z-10 max-w-3xl mx-auto px-6 text-center pb-20 pointer-events-none">
                        <h1 className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight text-white mb-6 drop-shadow-lg">
                            Welcome to AetherGeo
                        </h1>
                        <p className="text-xl leading-relaxed text-zinc-300 mb-8 max-w-2xl mx-auto drop-shadow-md">
                            A modern software for visualizing a processing geospatial data. Explore state of the art methods
                            in remote sensing and geological applications.
                        </p>
                    </div>
                </section>

                {/* Methods Showcase Section */}
                <MethodsShowcase />

                {/* Content Section */}
                <section className="relative max-w-6xl mx-auto px-6 py-14 -top-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-xl bg-zinc-900 border border-white/[.08]">
                            <h3 className="text-xl font-semibold mb-3 text-white">
                                Interactive Visualization
                            </h3>
                            <p className="text-zinc-400">
                                Explore geographic data with intuitive visualizations and real-time interactions.
                            </p>
                        </div>

                        <div className="p-6 rounded-xl bg-zinc-900 border border-white/[.08]">
                            <h3 className="text-xl font-semibold mb-3 text-white">
                                Advanced Analytics
                            </h3>
                            <p className="text-zinc-400">
                                Powerful tools for analyzing spatial patterns and relationships in your data.
                            </p>
                        </div>

                        <div className="p-6 rounded-xl bg-zinc-900 border border-white/[.08]">
                            <h3 className="text-xl font-semibold mb-3 text-white">
                                Open Source
                            </h3>
                            <p className="text-zinc-400">
                                Built with modern web technologies and open for community contributions.
                            </p>
                        </div>
                    </div>

                    {/* Download Button under content boxes */}
                    <div className="mt-10 flex justify-center">
                        <Link
                            href="/download"
                            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-blue-600 text-white text-lg font-semibold shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition-colors"
                        >
                            Download AetherGeo
                        </Link>
                    </div>

                    {/* Contact section */}
                    <div className="mt-12 text-center">
                        <p className="text-2xl sm:text-3xl font-semibold text-white mb-4">
                            Join our groundbreaking project to redefine what&apos;s possible in geological applications
                        </p>
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                type="button"
                                onClick={() => setIsContactOpen(true)}
                                className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-white/[.2] text-lg font-semibold text-white bg-zinc-900 hover:bg-zinc-800 transition-colors"
                            >
                                Contact Us
                            </button>

                            <Link
                                href="/articles"
                                className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-white/[.2] text-lg font-semibold text-white bg-zinc-900 hover:bg-zinc-800 transition-colors"
                            >
                                Cite our work
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
            {/* Contact modal */}
            <ContactModal
                isOpen={isContactOpen}
                onClose={() => setIsContactOpen(false)}
            />
        </>
    );
}