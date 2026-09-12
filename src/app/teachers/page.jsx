// app/teachers/page.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaStar, FaUserGraduate, FaChalkboardTeacher, FaUserTie, FaUserNinja } from "react-icons/fa";
import { Spinner } from "@heroui/react";
import toast from "react-hot-toast";

// ✅ কার্ড কম্পোনেন্ট — মূল কম্পোনেন্টের বাইরে
const TeacherCard = ({ teacher }) => (
  <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5">
    {/* শিক্ষকের ছবি */}
    <div className="relative h-56 w-full overflow-hidden bg-accent/5">
      {teacher.image ? (
        <Image
          src={teacher.image}
          alt={teacher.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
          <span className="text-6xl font-extrabold text-primary/30">
            {teacher.name?.charAt(0) || "?"}
          </span>
        </div>
      )}
      {teacher.expertise && (
        <span className="absolute left-3 top-3 rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {teacher.expertise}
        </span>
      )}
      {teacher.rating && (
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          <FaStar className="size-3 text-yellow-400" />
          {teacher.rating}
        </span>
      )}
    </div>

    {/* কন্টেন্ট */}
    <div className="flex flex-1 flex-col p-5">
      <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary md:text-xl">
        {teacher.name}
      </h3>
      <p className="mt-1 text-sm font-medium text-accent">
        {teacher.title}
      </p>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/70 line-clamp-3">
        {teacher.bio}
      </p>

      <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-sm text-foreground/60">
        <span className="flex items-center gap-1">
          <FaUserGraduate className="text-primary" />
          {teacher.students || 0} শিক্ষার্থী
        </span>
        <span className="flex items-center gap-1">
          <FaChalkboardTeacher className="text-accent" />
          বিশেষজ্ঞ
        </span>
      </div>

      <Link href={`/teachers/${teacher._id}`}>
        <button className="mt-4 w-full rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white">
          প্রোফাইল দেখুন →
        </button>
      </Link>
    </div>
  </div>
);

// ✅ সেকশন টাইটেল কম্পোনেন্ট — মূল কম্পোনেন্টের বাইরে
const SectionTitle = ({ title, highlight, subtitle, icon: Icon }) => (
  <div className="mb-10 text-center">
    <div className="inline-flex items-center justify-center gap-3 mb-4">
      {Icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="size-6" />
        </div>
      )}
      <h2 className="text-2xl font-extrabold text-foreground md:text-3xl lg:text-4xl">
        {title} <span className="text-primary">{highlight}</span>
      </h2>
    </div>
    <div className="mx-auto h-1 w-20 rounded-full bg-accent" />
    {subtitle && (
      <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/60 md:text-lg">
        {subtitle}
      </p>
    )}
  </div>
);

// ✅ মূল পেজ কম্পোনেন্ট
export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/teachers`);
        if (!res.ok) throw new Error("শিক্ষক খুঁজে পাওয়া যায়নি");
        const result = await res.json();
        setTeachers(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("শিক্ষক লোড করতে সমস্যা হয়েছে");
        setTeachers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, []);

  const maleTeachers = teachers.filter((t) => t.gender === "male" || !t.gender);
  const femaleTeachers = teachers.filter((t) => t.gender === "female");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background mt-20">
        <Spinner className="text-primary" size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16 md:py-24 mt-20">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">

        {/* ===== পেজ হেডার ===== */}
        <div className="mb-16 text-center">
          <h1 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
            আমাদের <span className="text-primary">শিক্ষকবৃন্দ</span>
          </h1>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-accent" />
          <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/60 md:text-lg">
            ইজাযাতপ্রাপ্ত ও অভিজ্ঞ আলেমদের কাছ থেকে সরাসরি শিক্ষা গ্রহণ করুন।
          </p>
        </div>

        {/* ===== পুরুষ শিক্ষকবৃন্দ ===== */}
        {maleTeachers.length > 0 && (
          <section className="my-20">
            <SectionTitle
              title="আমাদের"
              highlight="পুরুষ শিক্ষকবৃন্দ"
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {maleTeachers.map((teacher) => (
                <TeacherCard key={teacher._id} teacher={teacher} />
              ))}
            </div>
          </section>
        )}

        {/* ===== মহিলা শিক্ষকবৃন্দ ===== */}
        {femaleTeachers.length > 0 && (
          <section className="mb-20">
            <SectionTitle
              title="আমাদের"
              highlight="মহিলা শিক্ষিকাবৃন্দ"
              
             
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {femaleTeachers.map((teacher) => (
                <TeacherCard key={teacher._id} teacher={teacher} />
              ))}
            </div>
          </section>
        )}

        {/* ===== কোন শিক্ষক না থাকলে ===== */}
        {teachers.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted text-lg">কোনো শিক্ষক পাওয়া যায়নি</p>
          </div>
        )}
      </div>
    </div>
  );
}