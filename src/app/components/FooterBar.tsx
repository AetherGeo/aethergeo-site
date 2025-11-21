import Image from "next/image";
import Link from "next/link";

export default function FooterBar() {
    return (
        <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/[.08] dark:border-white/[.145] bg-white/60 dark:bg-black/60 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Partners */}
                <div className="flex items-center gap-3">
                    <span className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 font-medium">
                        Partners:
                    </span>
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-auto flex items-center">
                            <Image
                                src="https://files.aethergeo.org/uporto.svg"
                                alt="University of Porto"
                                width={80}
                                height={32}
                                className="h-8 w-auto object-contain"
                            />
                        </div>
                        <div className="h-8 w-auto flex items-center">
                            <Image
                                src="https://files.aethergeo.org/s34i.svg"
                                alt="S34I"
                                width={80}
                                height={32}
                                className="h-8 w-auto object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* Text + Social links together */}
                <div className="flex items-center gap-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="whitespace-nowrap">
                        @AetherGeo 2025
                    </span>
                    <Link
                        href="https://github.com/AetherGeo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors"
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
                        <span>GitHub</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
}