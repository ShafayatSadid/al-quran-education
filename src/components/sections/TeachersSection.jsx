// components/sections/TeachersSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaStar, FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";



export function TeachersSection() {

  const [teachers, setTeachers] = useState([])
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/teachers`
        );

        if (!res.ok) {
          throw new Error("শিক্ষক খুঁজে পাওয়া যায়নি");
        }

        const result = await res.json();
        const featuredTeachers = result.slice(0, 2);
        setTeachers(featuredTeachers);
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("শিক্ষক লোড করতে সমস্যা হয়েছে");

      } finally {
        setLoading(false);
      }
    };


    fetchTeacher();

  }, []);
  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-24">

      {/* ডেকোরেটিভ গ্লো */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-8">

        {/* সেকশন হেডার */}
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary">
            আমাদের শিক্ষকবৃন্দ
          </span>
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
            অভিজ্ঞ <span className="text-primary">শিক্ষকবৃন্দ</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-accent" />
          <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/60 md:text-lg">
            ইজাযাতপ্রাপ্ত ও অভিজ্ঞ আলেমদের কাছ থেকে সরাসরি শিক্ষা গ্রহণ করুন।
          </p>
        </div>

        {/* শিক্ষক গ্রিড */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">

          {teachers.map((teacher) => (
            <div
              key={teacher._id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5"
            >
              {/* শিক্ষকের ছবি */}
              <div className="relative h-56 w-full overflow-hidden bg-accent/5">
                <Image
                  src={teacher.image}
                  alt={teacher.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* এক্সপার্টাইজ ব্যাজ */}
                <span className="absolute left-3 top-3 rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  {teacher.expertise}
                </span>
                {/* রেটিং ব্যাজ */}
                <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  <FaStar className="size-3 text-yellow-400" />
                  {teacher.rating}
                </span>
              </div>

              {/* কন্টেন্ট */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary md:text-xl">
                  {teacher.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent">
                  {teacher.title}
                </p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/70">
                  {teacher.bio}
                </p>

                {/* শিক্ষার্থী সংখ্যা */}
                <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-sm text-foreground/60">
                  <span className="flex items-center gap-1">
                    <FaUserGraduate className="text-primary" />
                    {teacher.students} শিক্ষার্থী
                  </span>
                  <span className="flex items-center gap-1">
                    <FaChalkboardTeacher className="text-accent" />
                    বিশেষজ্ঞ
                  </span>
                </div>

                {/* প্রোফাইল দেখুন বাটন */}
                <Link href={`/teachers/${teacher._id}`}>
                  <button className="mt-4 w-full rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white">
                    প্রোফাইল দেখুন →
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* সব শিক্ষক দেখুন */}
        <div className="mt-12 text-center">
          <Link href="/teachers">
            <button className="rounded-full border-2 border-accent px-8 py-3 font-semibold text-accent transition-all hover:bg-accent hover:text-white">
              সব শিক্ষক দেখুন →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}