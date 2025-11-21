"use client";

import Link from "next/link";

export default function DocsPage() {
    const pdfUrl = "https://aethergeo.org/UserGuide%20v1.0.pdf";

    const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(pdfUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = "UserGuide v1.0.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed", error);
            window.open(pdfUrl, '_blank');
        }
    };

    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-black pt-20 pb-28 sm:pb-16">
            <div className="max-w-4xl mx-auto px-6">
                {/* Intro */}
                <section className="mb-10">
                    <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
                        Documentation
                    </h1>
                    <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-3">
                        This page will host detailed documentation for AetherGeo, workflow examples, and in-depth user guides for each major feature.
                    </p>
                    <p className="text-base text-zinc-600 dark:text-zinc-400">
                        As the project evolves, you&apos;ll find updated guides, best practices, and version-specific
                        notes here to help you get the most out of AetherGeo.
                    </p>
                </section>

                {/* User guide / versions block */}
                <section className="rounded-2xl border border-black/[.08] dark:border-white/[.12] bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-sm">
                    <h2 className="text-2xl font-semibold text-black dark:text-white mb-3">
                        User Guides &amp; Version Notes
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                        This section contains the legacy AetherGeo user guides and will be expanded over time to
                        include updated documentation for future releases.
                    </p>
                    <div className="mt-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-dashed border-black/[.06] dark:border-white/[.1] p-4">
                        <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                            Available now:
                        </h3>
                        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mb-4">
                            The first official user guide for AetherGeo (version v1.0) is available as a PDF. It covers
                            the core concepts, basic usage, and initial setup required to get started.
                        </p>

                        <div className="flex flex-wrap items-center gap-3">
                            <Link
                                href={pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm sm:text-base font-semibold hover:bg-blue-500 transition-colors"
                            >
                                View User Guide v1.0 (PDF)
                            </Link>
                            <a
                                href={pdfUrl}
                                onClick={handleDownload}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/[.08] dark:border-white/[.2] text-sm sm:text-base text-black dark:text-white bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                            >
                                Download PDF
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}