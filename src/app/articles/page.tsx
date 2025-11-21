"use client";

import { useState } from "react";
import ContactModal from "../components/ContactModal";

export default function ArticlesPage() {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const R2_URL = process.env.NEXT_PUBLIC_R2_URL;
    const downloadUrl = R2_URL ? `${R2_URL}/AetherGeo_citation.ris` : "/AetherGeo_citation.ris";

    const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(downloadUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = "AetherGeo_citation.ris";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed", error);
            // Fallback to standard behavior if fetch fails
            window.open(downloadUrl, '_blank');
        }
    };

    return (
        <>
            <div className="min-h-screen bg-zinc-50 dark:bg-black pt-24 pb-28 sm:pb-12 px-4 sm:px-6">
                <div className="max-w-5xl mx-auto space-y-8">

                    {/* Container 1: Cite our Work */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-black/[.08] dark:border-white/[.08] shadow-xl p-8 sm:p-10">
                        <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
                            Cite our Work
                        </h1>

                        <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
                            If you used our software and want to cite our work please refer to the following article:
                        </p>

                        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between bg-zinc-50 dark:bg-black/50 border border-black/[.05] dark:border-white/[.05] rounded-xl p-6">
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                                    AetherGeo: A Spectral Analysis Interface for Geologic Mapping
                                </h3>
                                <div className="text-zinc-500 dark:text-zinc-400 text-sm">
                                    Published in Algorithms (2025)
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 w-full lg:w-auto flex-shrink-0">
                                <a
                                    href="https://doi.org/10.3390/a18070378"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 lg:flex-none inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-black/[.1] dark:border-white/[.2] text-black dark:text-white font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors gap-2"
                                >
                                    Link
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>

                                <a
                                    href={downloadUrl}
                                    onClick={handleDownload}
                                    className="flex-1 lg:flex-none inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition-colors gap-2 cursor-pointer"
                                >
                                    Citation
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Container 2: Submit Article */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-black/[.08] dark:border-white/[.08] shadow-xl p-8 sm:p-10">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="text-center md:text-left">
                                <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
                                    Repository for AetherGeo related works
                                </h2>
                                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                                    If you used our work consider contacting us and we will share your article here.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsContactOpen(true)}
                                className="flex-shrink-0 inline-flex items-center justify-center px-8 py-3 rounded-full border border-black/[.08] dark:border-white/[.2] text-lg font-semibold text-black dark:text-white bg-zinc-50 dark:bg-black hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            >
                                Contact Us
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <ContactModal
                isOpen={isContactOpen}
                onClose={() => setIsContactOpen(false)}
            />
        </>
    );
}