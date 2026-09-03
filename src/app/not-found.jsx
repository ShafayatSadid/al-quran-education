
"use client";

import Link from "next/link";
import { useEffect } from "react";
import { MdHome, MdSearch, MdArrowBack, MdMenuBook } from "react-icons/md";

export default function NotFound() {
  useEffect(() => {
    document.title = "পেজ খুঁজে পাওয়া যায়নি | Al-Quran Education";
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-20 mt-20">
      <div className="relative max-w-2xl w-full text-center">
        
        {/* ডেকোরেটিভ গ্লো */}
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative z-10">
          {/* 404 নাম্বার */}
          <div className="mb-6">
            <h1 className="text-8xl md:text-9xl font-extrabold text-primary tracking-tighter">
              404
            </h1>
            <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-accent" />
          </div>

          {/* আইকন */}
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-primary/10 text-primary">
              <MdMenuBook className="size-12 md:size-16" />
            </div>
          </div>

          {/* হেডিং */}
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            পেজটি খুঁজে পাওয়া যায়নি
          </h2>
          
          {/* বিবরণ */}
          <p className="text-base md:text-lg text-foreground/60 max-w-md mx-auto mb-8">
            দুঃখিত, আপনি যে পেজটি খুঁজছেন তা আমাদের সাইটে নেই। 
            হয়তো ঠিকানা ভুল হয়েছে, অথবা পেজটি সরিয়ে দেওয়া হয়েছে।
          </p>

          {/* বাটন গ্রুপ */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <button className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-heading font-semibold px-6 py-3 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-primary/25">
                <MdHome className="size-5" />
                হোমপেজে ফিরে যান
              </button>
            </Link>
            <Link href="/courses">
              <button className="flex items-center gap-2 border-2 border-border hover:border-primary text-foreground hover:text-primary font-heading font-semibold px-6 py-3 rounded-xl transition-all">
                <MdSearch className="size-5" />
                কোর্স ব্রাউজ করুন
              </button>
            </Link>
          </div>

          {/* ফ্রি ট্রায়াল লিংক */}
          <div className="mt-8">
            <Link href="/free-class" className="text-sm text-accent hover:underline transition">
              <MdArrowBack className="size-4 inline mr-1" />
              ফ্রি ট্রায়াল ক্লাস নিতে চান?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}