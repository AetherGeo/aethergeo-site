"use client";

import { useState, FormEvent } from "react";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState(""); // still collected for future API use
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const to = "aethergeoofficial@gmail.com";

        // Subject: "Name - Subject" (with sensible fallbacks)
        const namePart = name.trim() || "Anonymous";
        const subjectPart = subject.trim() || "AetherGeo contact";
        const finalSubject = `${namePart} - ${subjectPart}`;

        // Body: only the message content
        const body = message;

        const mailtoUrl = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
            finalSubject,
        )}&body=${encodeURIComponent(body)}`;

        // Open default email client
        window.location.href = mailtoUrl;

        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-lg mx-4 rounded-2xl bg-zinc-950 border border-white/[.08] shadow-2xl">
                {/* Close button */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-3 right-3 p-2 rounded-full hover:bg-white/[.08] text-zinc-300"
                    aria-label="Close contact form"
                >
                    <span className="sr-only">Close</span>
                    ×
                </button>

                <div className="px-6 pt-6 pb-5 sm:px-8 sm:pt-8 sm:pb-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                        Contact AetherGeo
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-400 mb-6">
                        Have questions, feedback, or want to join the project? Fill in the details and we&apos;ll get back to you.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded-lg border border-white/[.15] bg-zinc-900 px-3 py-2 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-blue-500/70"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1">
                                Subject
                            </label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Collaboration, bug report, question..."
                                className="w-full rounded-lg border border-white/[.15] bg-zinc-900 px-3 py-2 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-blue-500/70"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1">
                                Message
                            </label>
                            <textarea
                                required
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full rounded-lg border border-white/[.15] bg-zinc-900 px-3 py-2 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-blue-500/70"
                            />
                        </div>

                        <div className="mt-3 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 rounded-full border border-white/[.2] text-sm sm:text-base text-zinc-300 bg-zinc-900 hover:bg-zinc-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm sm:text-base font-semibold hover:bg-blue-500 transition-colors"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}