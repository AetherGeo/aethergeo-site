
"use client";

import Link from "next/link";

export default function DownloadPage() {
    return (
        <main className="min-h-screen bg-black pt-20 pb-32 sm:pb-16">
            <div className="max-w-4xl mx-auto px-6">
                {/* Intro */}
                <section className="mb-10">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Download AetherGeo
                    </h1>
                    <p className="text-lg text-zinc-300 mb-3">
                        Get started with AetherGeo by downloading the latest release or accessing the source code directly from GitHub.
                    </p>
                    <p className="text-base text-zinc-400">
                        We recommend checking our GitHub repository for the most up-to-date builds and release notes.
                    </p>
                </section>

                {/* Latest from GitHub */}
                <section className="rounded-2xl border border-white/[.12] bg-zinc-900 p-6 sm:p-8 shadow-sm mb-8">
                    <h2 className="text-2xl font-semibold text-white mb-3">
                        Latest Updates from GitHub
                    </h2>
                    <p className="text-zinc-400 mb-4">
                        For the latest features, bug fixes, and pre-release builds, visit our GitHub repository.
                        You can download source code, view open issues, and contribute to the project.
                    </p>

                    <Link
                        href="https://github.com/AetherGeo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black text-base font-semibold hover:bg-zinc-100 transition-colors"
                    >
                        <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                fill="currentColor"
                                d="M12 0.5C5.37 0.5 0 5.87 0 12.5c0 5.29 3.438 9.773 8.205 11.366.6.111.82-.261.82-.58
                                0-.287-.011-1.243-.016-2.255-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73
                                1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.419-1.305.762-1.605-2.665-.303-5.467-1.333-5.467-5.93
                                0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.004-.404
                                c1.018.005 2.044.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221
                                0 4.609-2.807 5.625-5.479 5.921.43.37.823 1.102.823 2.222 0 1.606-.015 2.901-.015 3.293 0 .322.216.697.825.579C20.565 22.27 24 17.79 24 12.5
                                24 5.87 18.627 0.5 12 0.5z"
                            />
                        </svg>
                        <span>Visit AetherGeo on GitHub</span>
                    </Link>
                </section>

                {/* Legacy Installers */}
                <section className="rounded-2xl border border-white/[.12] bg-zinc-900 p-6 sm:p-8 shadow-sm">
                    <h2 className="text-2xl font-semibold text-white mb-3">
                        Legacy Installers
                    </h2>
                    <p className="text-zinc-400 mb-6">
                        Stable release installers for previous versions of AetherGeo. These are recommended for production use.
                    </p>

                    {/* Windows v1.0 */}
                    <div className="rounded-xl bg-zinc-950 border border-dashed border-white/[.1] p-4 sm:p-5">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-white mb-1">
                                    AetherGeo v1.0 for Windows
                                </h3>
                                <p className="text-sm text-zinc-400 mb-3">
                                    Initial stable release for Windows (64-bit). Includes all core features and documentation.
                                </p>
                                <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                                    <span className="inline-flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                        </svg>
                                        Windows 10/11
                                    </span>
                                    <span>•</span>
                                    <span>Version 1.0</span>
                                </div>
                            </div>

                            <a
                                href="https://files.aethergeo.org/AetherGeo_Windows_v1.0.exe"
                                download
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm sm:text-base font-semibold hover:bg-blue-500 transition-colors sm:whitespace-nowrap"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download .exe
                            </a>
                        </div>
                    </div>

                    <p className="mt-6 text-xs sm:text-sm text-zinc-500">
                        Additional platforms will be available in future releases. Check our GitHub for build instructions.
                    </p>
                </section>
            </div>
        </main>
    );
}