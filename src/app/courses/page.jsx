// app/courses/page.jsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MdCheckBox, MdStar } from "react-icons/md";
import { Spinner } from "@heroui/react";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses`);
        if (!res.ok) throw new Error("কোর্স লোড করতে সমস্যা");
        const data = await res.json();
        setCourses(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Fetch error:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  
  
  const displayCourses = courses

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-background">
        <Spinner className="text-primary" size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16 md:py-24 mt-20">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        
        {/* ===== পেজ টাইটেল ===== */}
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary">
            আমাদের কোর্সসমূহ
          </span>
          <h1 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
            কুরআন শিক্ষার <span className="text-primary">পূর্ণাঙ্গ কোর্স</span>
          </h1>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-accent" />
          <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/60 md:text-lg">
            সঠিক তাজবিদ, অর্থ ও তাফসীর—ঘরে বসেই অভিজ্ঞ আলেমদের সাথে।
          </p>
        </div>

        {/* ===== কোর্স গ্রিড ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {displayCourses.map((course, index) => {
            const isPopular = course.popular || index === 1;
            return (
              <div
                key={course._id || course.id}
                className={`
                  relative bg-card/50 border rounded-2xl p-6 transition-all duration-300 
                  ${isPopular 
                    ? 'border-accent shadow-xl shadow-accent/10 scale-105 md:scale-100 md:-translate-y-4' 
                    : 'border-border hover:shadow-xl hover:-translate-y-1'
                  }
                `}
              >
                {/* জনপ্রিয় ব্যাজ */}
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-accent/30">
                    
                    অধিক জনপ্রিয়
                  </div>
                )}

                {/* টাইটেল */}
                <h3 className={`text-xl font-extrabold text-center ${isPopular ? 'text-primary' : 'text-foreground'}`}>
                  {course.title}
                </h3>
                
                {/* বিবরণ */}
                <p className="mt-2 text-sm text-foreground/60 text-center leading-relaxed">
                  {course.description}
                </p>

                {/* ডিভাইডার */}
                <div className="my-4 h-px bg-border" />

                {/* ফিচার লিস্ট (চেকবক্স স্টাইলে) */}
                <ul className="space-y-4">
                  {course.features && course.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <MdCheckBox className="size-4 text-accent shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* শুরু করুন বাটন */}
                <div className="mt-6">
                  <Link href="/free-class">
                    <button className={`
                      w-full rounded-full font-heading font-semibold py-2.5 transition-all hover:scale-[1.02] shadow-lg
                      ${isPopular 
                        ? 'bg-accent hover:bg-accent/90 text-white shadow-accent/30' 
                        : 'bg-primary hover:bg-primary-light text-white shadow-primary/25'
                      }
                    `}>
                      শুরু করুন
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* কোর্স না থাকলে মেসেজ */}
        {displayCourses.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted">কোন কোর্স পাওয়া যায়নি</p>
          </div>
        )}
      </div>
    </div>
  );
}