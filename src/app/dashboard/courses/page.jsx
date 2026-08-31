// app/dashboard/courses/page.jsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdVisibility,
  MdBook,
  MdPeople,
  MdAttachMoney,
  MdAccessTime
} from "react-icons/md";
import toast from "react-hot-toast";
import DeleteButton from "@/components/shared/DeleteButton";

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
        toast.error("কোর্স লোড করতে সমস্যা হয়েছে");
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-10">
      {/* ===== হেডার ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            কোর্সসমূহ
          </h1>
          <span className="text-sm font-medium text-muted bg-card px-3 py-1 rounded-full border border-border">
            {courses.length} টি
          </span>
        </div>
        <Link href="/dashboard/courses/add">
          <button className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-heading font-semibold px-5 py-2.5 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-primary/25">
            <MdAdd className="size-5" />
            নতুন কোর্স যোগ করুন
          </button>
        </Link>
      </div>

      {/* ===== কোর্স গ্রিড ===== */}
      {courses.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-2xl border border-border">
          <MdBook className="size-16 text-muted mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground">কোন কোর্স নেই</h3>
          <p className="text-muted mt-1">প্রথম কোর্স যোগ করুন</p>
          <Link href="/dashboard/courses/add">
            <button className="mt-4 bg-primary hover:bg-primary-light text-white font-semibold px-6 py-2.5 rounded-xl transition">
              কোর্স যোগ করুন
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {courses.map((course) => (
            <div
              key={course._id || course.id}
              className="group bg-card border border-border rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* ===== আইকন ও টাইটেল ===== */}
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <MdBook className="size-6" />
                </div>
                <h3 className="font-heading font-semibold text-foreground text-lg truncate flex-1">
                  {course.title}
                </h3>
              </div>

              {/* ===== লেভেল ব্যাজ ===== */}
              {course.level && (
                <div className="mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/20 text-accent">
                    {course.level}
                  </span>
                </div>
              )}

              {/* ===== বিবরণ ===== */}
              <p className="text-sm text-foreground/70 line-clamp-2">
                {course.description || "বিবরণ নেই"}
              </p>

              {/* ===== স্ট্যাটাস ও অন্যান্য তথ্য ===== */}
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <MdAccessTime className="size-4 text-accent" />
                  {course.duration || "নির্ধারিত নয়"}
                </span>
                <span className="flex items-center gap-1">
                  <MdPeople className="size-4 text-primary" />
                  {course.students || 0} শিক্ষার্থী
                </span>
                {course.fee && (
                  <span className="flex items-center gap-1">
                    <MdAttachMoney className="size-4 text-success" />
                    {course.fee}
                  </span>
                )}
              </div>

              {/* ===== স্ট্যাটাস ব্যাজ ===== */}
              <div className="mt-2">
                <span className={`
                  px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${course.status === "active" 
                    ? "bg-success/20 text-success" 
                    : "bg-error/20 text-error"
                  }
                `}>
                  {course.status === "active" ? "সক্রিয়" : "নিষ্ক্রিয়"}
                </span>
              </div>

              {/* ===== অ্যাকশন বাটন ===== */}
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-end gap-2">
                
                {/* এডিট */}
                <Link href={`/dashboard/courses/${course._id}`}>
                  <button
                    className="p-2 rounded-lg text-muted hover:text-primary hover:bg-primary/10 transition-all"
                    title="সম্পাদনা করুন"
                  >
                    <MdEdit className="size-5" />
                  </button>
                </Link>

                {/* ডিলিট */}
                <DeleteButton 
                  name={course.title} 
                  id={course._id || course.id} 
                  endpoint="courses" 
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}