"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/50 dark:bg-black/50 backdrop-blur-sm border-b border-black/[.08] dark:border-white/[.145]">
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo/Brand (clickable, goes Home) */}
                        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                            <Image
                                src="https://files.aethergeo.org/AetherGeo.svg"
                                alt="AetherGeo logo"
                                width={36}
                                height={36}
                            />
                            <span className="text-xl font-semibold text-black dark:text-white">
                                AetherGeo
                            </span>
                        </Link>

                        {/* Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg hover:bg-black/[.04] dark:hover:bg-white/[.08] transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="w-6 h-6 text-foreground"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMenuOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Dropdown Menu */}
            {isMenuOpen && (
                <div className="fixed top-16 right-0 z-40 w-64 bg-white/95 dark:bg-black/95 backdrop-blur-md border-l border-b border-black/[.08] dark:border-white/[.145] shadow-lg">
                    <div className="flex flex-col p-4 gap-2">
                        <a
                            href="/"
                            className="px-4 py-3 rounded-lg hover:bg-black/[.04] dark:hover:bg-white/[.08] transition-colors text-black dark:text-white"
                        >
                            Home
                        </a>
                        <a
                            href="/download"
                            className="px-4 py-3 rounded-lg hover:bg-black/[.04] dark:hover:bg-white/[.08] transition-colors text-black dark:text-white"
                        >
                            Download
                        </a>
                        <a
                            href="/docs"
                            className="px-4 py-3 rounded-lg hover:bg-black/[.04] dark:hover:bg-white/[.08] transition-colors text-black dark:text-white"
                        >
                            Documentation
                        </a>
                        <a
                            href="/articles"
                            className="px-4 py-3 rounded-lg hover:bg-black/[.04] dark:hover:bg-white/[.08] transition-colors text-black dark:text-white"
                        >
                            Articles
                        </a>
                    </div>
                </div>
            )}
        </>
    );
}