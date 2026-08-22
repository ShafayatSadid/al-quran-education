// components/sections/HeroSection.tsx
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-background py-24 md:py-10">
      
      {/* ব্যাকগ্রাউন্ডের ডেকোরেশন (ডাইনামিক গ্লো) */}
      <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-accent/5 blur-3xl dark:bg-accent/10" />
      <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl dark:bg-primary/10" />
      
      {/* কন্টেইনার */}
      <div className="container mx-auto flex min-h-[80vh] max-w-7xl flex-col-reverse items-center justify-center gap-8 px-4 md:px-8 lg:flex-row lg:gap-12">
        
        {/* ====== বাম পাশ: টেক্সট কন্টেন্ট ====== */}
        <div className="flex w-full flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          
          {/* ব্যাজ/চিহ্ন */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary dark:bg-primary/10">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
            </span>
            আল-কুরআন এডুকেশন
          </div>

          {/* হেডলাইন (H1) */}
          <h1 className="font-heading mb-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            শিখুন কুরআন, <br />
            <span className="text-primary">বুঝে নিন</span> জীবন
          </h1>

          {/* সাব-টেক্সট */}
          <p className="mb-6 max-w-lg text-base leading-relaxed text-foreground/70 sm:text-lg">
            সঠিক তাজবিদ, অর্থ ও তাফসীর—ঘরে বসেই অভিজ্ঞ আলেমদের সাথে। 
            আপনার কুরআন শিক্ষার যাত্রা শুরু হোক আজই।
          </p>

          {/* স্ট্যাটাস/পরিসংখ্যান */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">১০০০+</span>
              <span className="text-sm text-foreground/60">শিক্ষার্থী</span>
            </div>
            <div className="h-6 w-px bg-border"></div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-accent">৫০+</span>
              <span className="text-sm text-foreground/60">কোর্স</span>
            </div>
            <div className="h-6 w-px bg-border"></div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">১৫+</span>
              <span className="text-sm text-foreground/60">বিশেষজ্ঞ শিক্ষক</span>
            </div>
          </div>

          {/* বাটন গ্রুপ */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/free-class">
              <button className="w-full rounded-full bg-primary px-8 py-3.5 font-semibold text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 hover:bg-primary-light sm:w-auto">
                📖 ফ্রি ট্রায়াল ক্লাস নিন
              </button>
            </Link>
            <Link href="/courses">
              <button className="w-full rounded-full border-2 border-primary px-8 py-3.5 font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-white sm:w-auto">
                কোর্স ব্রাউজ করুন →
              </button>
            </Link>
          </div>
        </div>

        {/* ====== ডান পাশ: ইমেজ (student.jpg) ====== */}
        <div className="relative flex w-full flex-1 items-center justify-center lg:justify-end">
          {/* ডেকোরেটিভ অ্যাম্বার গ্লো (ইমেজের পেছনে) */}
          <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-accent/10 blur-2xl dark:bg-accent/20" />
          
          {/* ইমেজ কন্টেইনার */}
          <div className="relative z-10 w-full max-w-md rounded-2xl shadow-2xl shadow-primary/10 dark:shadow-primary/5">
            <div className="relative aspect-[4/4] w-full overflow-hidden rounded-2xl border border-border/50 bg-card">
              <Image
                src="/images/student.jpg"
                alt="শিক্ষার্থী কুরআন শিক্ষা গ্রহণ করছেন"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>
            
            {/* ফ্লোটিং ডেকোরেশন (ইমেজের ওপর একটি ছোট সোনালি ফিতে) */}
            <div className="absolute -bottom-4 -left-4 z-20 rounded-lg bg-accent/90 px-4 py-2 shadow-lg backdrop-blur-sm dark:bg-accent">
              <p className="text-sm font-bold text-white">আল-কুরআন</p>
            </div>
            <div className="absolute -right-4 -top-4 z-20 rounded-full bg-background p-2 shadow-lg dark:bg-background">
              <div className="h-10 w-10 rounded-full border-2 border-accent/30 bg-primary/10 backdrop-blur-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}