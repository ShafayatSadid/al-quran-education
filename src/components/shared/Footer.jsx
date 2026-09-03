// components/sections/Footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import {
    FaFacebook,
    FaYoutube,
    FaInstagram,
    FaTwitter,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaArrowRight
} from "react-icons/fa";

export function Footer() {
    return (
        <footer className="relative overflow-hidden bg-background border-t border-border">

            {/* ডেকোরেটিভ গ্লো */}
            <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

            <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-8">

                {/* ===== ফুটারের মূল কন্টেন্ট ===== */}
                <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4 lg:py-16">

                    {/* ১ম কলাম: ব্র্যান্ড পরিচয় */}
                    <div className="space-y-4">
                        <Link href="/">
                            <h2 className="text-2xl font-extrabold tracking-tight">
                                <span className="text-primary">Al Quran</span>{" "}
                                <span className="text-accent">Education</span>
                            </h2>
                        </Link>
                        <p className="text-sm leading-relaxed text-foreground/70">
                            কুরআন শিক্ষার একটি অনলাইন প্ল্যাটফর্ম। সঠিক তাজবিদ, অর্থ ও তাফসীর—
                            ঘরে বসেই অভিজ্ঞ আলেমদের সাথে।
                        </p>
                        {/* সোশ্যাল মিডিয়া লিংক */}
                        <div className="flex gap-3 pt-2">
                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground/60 transition-all hover:bg-primary hover:text-white hover:border-primary"
                                aria-label="Facebook"
                            >
                                <FaFacebook className="size-4" />
                            </a>
                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground/60 transition-all hover:bg-primary hover:text-white hover:border-primary"
                                aria-label="YouTube"
                            >
                                <FaYoutube className="size-4" />
                            </a>
                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground/60 transition-all hover:bg-primary hover:text-white hover:border-primary"
                                aria-label="Instagram"
                            >
                                <FaInstagram className="size-4" />
                            </a>
                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground/60 transition-all hover:bg-primary hover:text-white hover:border-primary"
                                aria-label="Twitter"
                            >
                                <FaTwitter className="size-4" />
                            </a>
                        </div>
                    </div>

                    {/* ২য় কলাম: দ্রুত লিংক */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-foreground">দ্রুত লিংক</h3>
                        <ul className="space-y-2.5">
                            <li>
                                <Link
                                    href="/"
                                    className="text-sm text-foreground/70 transition-all hover:text-primary hover:translate-x-1 inline-block"
                                >
                                    হোম
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/courses"
                                    className="text-sm text-foreground/70 transition-all hover:text-primary hover:translate-x-1 inline-block"
                                >
                                    কোর্সসমূহ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/teachers"
                                    className="text-sm text-foreground/70 transition-all hover:text-primary hover:translate-x-1 inline-block"
                                >
                                    শিক্ষকবৃন্দ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="text-sm text-foreground/70 transition-all hover:text-primary hover:translate-x-1 inline-block"
                                >
                                    আমাদের সম্পর্কে
                                </Link>
                            </li>
                            <li>

                                <a
                                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent('আমি Al-Quran Education সম্পর্কে জানতে চাই।')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-foreground/70 transition-all hover:text-primary hover:translate-x-1 inline-block">
                                    যোগাযোগ
                                </a>
                            </li>
                        </ul>
                    </div>


                    {/* ৩য় কলাম: যোগাযোগ */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-foreground">যোগাযোগ</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-foreground/70">
                                <FaMapMarkerAlt className="mt-1 size-4 text-accent shrink-0" />
                                <span>ঢাকা, বাংলাদেশ</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-foreground/70">
                                <FaEnvelope className="size-4 text-accent shrink-0" />
                                <a href="mailto:info@alquraneducation.com" className="hover:text-primary transition">
                                    info@alquraneducation.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-foreground/70">
                                <FaPhoneAlt className="size-4 text-accent shrink-0" />
                                <a href="tel:+8801234567890" className="hover:text-primary transition">
                                    +৮৮০ ১২৩৪ ৫৬৭৮৯০
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* ৪র্থ কলাম: নিউজলেটার */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-foreground">আপডেট পান</h3>
                        <p className="text-sm text-foreground/70">
                            নতুন কোর্স, অফার ও আপডেট পেতে আপনার ইমেইল দিন।
                        </p>
                        <form className="flex flex-col gap-3 sm:flex-row">
                            <input
                                type="email"
                                placeholder="আপনার ইমেইল"
                                className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                required
                            />
                            <button
                                type="submit"
                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:scale-105"
                            >
                                সাবস্ক্রাইব
                                <FaArrowRight className="size-3" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* ===== কপিরাইট বার ===== */}
                <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 md:flex-row">
                    <p className="text-sm text-foreground/60">
                        <Link href={'/login'}>
                            &copy; {new Date().getFullYear()} Al Quran Education. সর্বস্বত্ব সংরক্ষিত।
                        </Link>
                    </p>
                    <p className="text-sm text-foreground/40">
                        Design & Development by <Link href="https://github.com/ShafayatSadid" target="_blank" className="hover:text-primary transition">Shafayat Hossain</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}