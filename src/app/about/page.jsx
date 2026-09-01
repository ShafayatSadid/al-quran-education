// app/about/page.jsx
"use client";

import Link from "next/link";
import {
    MdSchool,
    MdPeople,
    MdBook,
    MdVerified,
    MdStar,
    MdMenuBook,
    MdTrendingUp,
    MdEmojiEmotions,
    MdSupportAgent,
    MdCheckCircle
} from "react-icons/md";

export default function AboutPage() {
    const values = [
        {
            icon: MdSchool,
            title: "গুণগত শিক্ষা",
            description: "আমরা কুরআন শিক্ষার প্রতিটি স্তরে গুণগত মান বজায় রাখি।"
        },
        {
            icon: MdPeople,
            title: "অভিজ্ঞ শিক্ষক",
            description: "আমাদের শিক্ষকরা ইজাযাতপ্রাপ্ত ও অভিজ্ঞ আলেম।"
        },
        {
            icon: MdBook,
            title: "আধুনিক পদ্ধতি",
            description: "আধুনিক টেকনোলজি ব্যবহার করে সহজ ও কার্যকর শিক্ষা পদ্ধতি।"
        },
        {
            icon: MdVerified,
            title: "সনদপত্র",
            description: "কোর্স শেষে স্বীকৃত সনদপত্র প্রদান করা হয়।"
        },
        {
            icon: MdStar,
            title: "ছাত্র-কেন্দ্রিক",
            description: "প্রতিটি ছাত্রের প্রয়োজন ও গতির সাথে সামঞ্জস্যপূর্ণ শিক্ষা।"
        },
        {
            icon: MdSupportAgent,
            title: "২৪/৭ সাপোর্ট",
            description: "WhatsApp ও অন্যান্য মাধ্যমে সার্বক্ষণিক সহায়তা।"
        }
    ];

    const features = [
        {
            icon: MdMenuBook,
            title: "তাজবিদ ও তাফসীর",
            description: "সঠিক উচ্চারণ ও অর্থসহ কুরআন শিক্ষা।"
        },
        {
            icon: MdTrendingUp,
            title: "আত্মিক উন্নয়ন",
            description: "কুরআন শিক্ষার মাধ্যমে আত্মিক প্রশান্তি ও উন্নয়ন।"
        },
        {
            icon: MdEmojiEmotions,
            title: "আনন্দময় পরিবেশ",
            description: "শেখার প্রক্রিয়াকে আনন্দময় ও উৎসাহব্যঞ্জক করা।"
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* ===== হিরো সেকশন ===== */}
            <section className="relative overflow-hidden py-20 md:py-28 mt-20">
                <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
                <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

                <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-8 text-center">
                    <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary">
                        আমাদের সম্পর্কে
                    </span>
                    <h1 className="text-4xl font-extrabold text-foreground md:text-5xl lg:text-6xl">
                        আল-কুরআন শিক্ষা <br />
                        <span className="text-primary">প্ল্যাটফর্ম</span>
                    </h1>
                    <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-accent" />
                    <p className="mx-auto mt-6 max-w-3xl text-base text-foreground/70 md:text-lg">
                        আমরা একটি অনলাইন কুরআন শিক্ষা প্ল্যাটফর্ম, যেখানে ইজাযাতপ্রাপ্ত আলেমদের কাছ থেকে
                        সঠিক তাজবিদ, অর্থ ও তাফসীর শিক্ষা দেওয়া হয়। আমাদের লক্ষ্য প্রতিটি মুসলিমের কাছে
                        কুরআনের জ্ঞান পৌঁছে দেওয়া।
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <Link href="/courses">
                            <button className="rounded-full bg-primary hover:bg-primary-light text-white font-heading font-semibold px-6 py-2.5 transition-all hover:scale-[1.02] shadow-lg shadow-primary/25">
                                আমাদের কোর্স দেখুন
                            </button>
                        </Link>
                        <Link href="/free-class">
                            <button className="rounded-full border-2 border-accent text-accent hover:bg-accent hover:text-white font-heading font-semibold px-6 py-2.5 transition-all">
                                ফ্রি ট্রায়াল নিন
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== মিশন ও ভিশন ===== */}
            <section className="py-16 md:py-20 bg-card/30 border-t border-border">
                <div className="container mx-auto max-w-7xl px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 text-center hover:shadow-xl transition-all">
                            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                                <MdSchool className="size-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground">আমাদের লক্ষ্য</h3>
                            <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                                প্রতিটি মুসলিমের জন্য কুরআন শিক্ষাকে সহজ, সুলভ ও কার্যকরী করে তোলা।
                                আমরা চাই কুরআনের আলো প্রতিটি ঘরে পৌঁছুক।
                            </p>
                        </div>
                        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 text-center hover:shadow-xl transition-all">
                            <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4">
                                <MdTrendingUp className="size-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground">আমাদের স্বপ্ন</h3>
                            <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                                একজন সঠিকভাবে কুরআন পড়তে পারে, বুঝতে পারে এবং তার জীবনকে
                                কুরআন অনুযায়ী গঠন করতে পারে—এই স্বপ্ন নিয়ে আমরা কাজ করছি।
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== মূল্যবোধ ===== */}
            <section className="py-16 md:py-20 bg-background">
                <div className="container mx-auto max-w-7xl px-4 md:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
                            আমাদের <span className="text-primary">মূল্যবোধ</span>
                        </h2>
                        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-accent" />
                        <p className="mt-4 max-w-2xl mx-auto text-foreground/60">
                            আমরা যেসব মূল্যবোধের উপর ভিত্তি করে কাজ করি।
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1 group"
                                >
                                    <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all mb-4">
                                        <Icon className="size-7" />
                                    </div>
                                    <h4 className="text-lg font-bold text-foreground">{value.title}</h4>
                                    <p className="mt-1 text-sm text-foreground/70">{value.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===== বৈশিষ্ট্য ===== */}
            <section className="py-16 md:py-20 bg-card/30 border-t border-border">
                <div className="container mx-auto max-w-7xl px-4 md:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
                            কেন আমাদের <span className="text-primary">বেছে নেবেন</span>
                        </h2>
                        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-accent" />
                        <p className="mt-4 max-w-2xl mx-auto text-foreground/60">
                            কিছু বিশেষ বৈশিষ্ট্য যা আমাদের অনন্য করে তোলে।
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-all hover:-translate-y-1"
                                >
                                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4">
                                        <Icon className="size-8" />
                                    </div>
                                    <h4 className="text-lg font-bold text-foreground">{feature.title}</h4>
                                    <p className="mt-1 text-sm text-foreground/70">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===== কল টু অ্যাকশন ===== */}
            <section className="relative overflow-hidden py-20">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
                <div className="container relative z-10 mx-auto max-w-4xl px-4 md:px-8 text-center">
                    <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
                        আজই শুরু করুন আপনার <span className="text-primary">কুরআন শিক্ষার যাত্রা</span>
                    </h2>
                    <p className="mt-4 text-base text-foreground/70 md:text-lg">
                        আমাদের সাথে যোগ দিন এবং কুরআনের জ্ঞান অর্জন করুন। প্রথম ক্লাসটি বিনামূল্যে।
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <Link href="/free-class">
                            <button className="rounded-full bg-primary hover:bg-primary-light text-white font-heading font-semibold px-8 py-3 transition-all hover:scale-[1.02] shadow-lg shadow-primary/25">
                                এখনই শুরু করুন
                            </button>
                        </Link>
                        <a
                            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent('আমি Al-Quran Education সম্পর্কে জানতে চাই।')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border-2 border-border text-foreground hover:bg-primary/10 font-heading font-semibold px-8 py-3 transition-all inline-block"
                        >
                            যোগাযোগ করুন
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}