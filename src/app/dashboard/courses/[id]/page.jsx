// app/dashboard/courses/[id]/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Button,
  Spinner,
} from "@heroui/react";
import {
  MdArrowBack,
  MdEdit,
  MdBook,
  MdAccessTime,
  MdPeople,
  MdCheckCircle,
  MdStar,
  MdDelete
} from "react-icons/md";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import DeleteButton from "@/components/shared/DeleteButton";

export default function CourseDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/${id}`);
        if (!res.ok) throw new Error("কোর্স খুঁজে পাওয়া যায়নি");
        const data = await res.json();
        setCourse(data);
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("কোর্স লোড করতে সমস্যা হয়েছে");
        router.push("/dashboard/courses");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner className="text-primary" size="lg" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <MdBook className="size-16 text-muted mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground">কোর্স খুঁজে পাওয়া যায়নি</h3>
          <Link href="/dashboard/courses">
            <button className="mt-4 bg-primary hover:bg-primary-light text-white font-semibold px-6 py-2.5 rounded-xl transition">
              কোর্সের তালিকায় ফিরে যান
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* ===== হেডার ===== */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/courses"
            className="p-2 rounded-lg text-muted hover:text-primary hover:bg-primary/10 transition-all"
          >
            <MdArrowBack className="size-6" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              কোর্সের বিবরণ
            </h1>
            <p className="text-sm text-muted mt-1">{course.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/courses/${id}/edit`}>
            <Button
              className="bg-primary hover:bg-primary-light text-white font-heading font-semibold px-4 py-2.5 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-primary/25"
            >
              <MdEdit className="size-5" />
            </Button>
          </Link>
          <DeleteButton name={course.title} id={id} endpoint="courses" />
        </div>
      </div>

      {/* ===== কোর্স কার্ড ===== */}
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
        {/* টাইটেল ও স্ট্যাটাস */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-2xl font-extrabold text-foreground">
            {course.title}
          </h2>
          <span className={`
            px-3 py-1 rounded-full text-xs font-semibold w-fit
            ${course.status === "active" 
              ? "bg-success/20 text-success" 
              : "bg-error/20 text-error"
            }
          `}>
            {course.status === "active" ? "সক্রিয়" : "নিষ্ক্রিয়"}
          </span>
        </div>

        {/* লেভেল ও জনপ্রিয় ব্যাজ */}
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {course.level && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/20 text-accent">
              {course.level}
            </span>
          )}
          {course.popular && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/20 text-accent flex items-center gap-1">
              <MdStar className="size-3" />
              জনপ্রিয়
            </span>
          )}
        </div>

        {/* বিবরণ */}
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-muted uppercase tracking-wider">বিবরণ</h3>
          <p className="mt-1 text-sm md:text-base text-foreground/80 leading-relaxed">
            {course.description || "বিবরণ নেই"}
          </p>
        </div>

        {/* ডিভাইডার */}
        <div className="my-6 h-px bg-border" />

        {/* পরিসংখ্যান */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 text-sm">
            <MdAccessTime className="size-5 text-accent" />
            <span className="text-foreground/70">সময়কাল: <span className="font-medium text-foreground">{course.duration || "নির্ধারিত নয়"}</span></span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MdPeople className="size-5 text-primary" />
            <span className="text-foreground/70">শিক্ষার্থী: <span className="font-medium text-foreground">{course.students || 0}</span></span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MdBook className="size-5 text-muted" />
            <span className="text-foreground/70">ফিচার: <span className="font-medium text-foreground">{course.features?.length || 0}টি</span></span>
          </div>
        </div>

        {/* ডিভাইডার */}
        <div className="my-6 h-px bg-border" />

        {/* ফিচার লিস্ট */}
        <div>
          <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">
            ফিচার সমূহ
          </h3>
          {course.features && course.features.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {course.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2.5 text-sm text-foreground/80">
                  <MdCheckCircle className="size-4 text-accent shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">কোনো ফিচার যোগ করা হয়নি</p>
          )}
        </div>
      </div>
    </div>
  );
}