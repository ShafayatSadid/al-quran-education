// app/dashboard/teachers/page.jsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MdAdd,
  MdEdit,

  MdVisibility,
  MdSchool,
  MdPeople
} from "react-icons/md";
import { Avatar } from "@heroui/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import DeleteButton from "@/components/shared/DeleteButton";


export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getTeachers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/teachers`);

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        setTeachers(Array.isArray(data) ? data : []);
      } catch (error) {

        toast.error("শিক্ষক লোড করতে সমস্যা হয়েছে");
        setTeachers([]);
      } finally {
        setLoading(false);
      }
    };

    getTeachers();
  }, []);

  // ডিলিট ফাংশন
  // const handleDelete = async (id) => {
  //   const { data, error } = await authClient.token();
  //   const token = data?.token;
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/teachers/${id}`, {
  //     method: 'DELETE',
  //     headers:{
  //       Authorization: `Bearer ${token}`
  //     }
  //   })
  //   const result = await res.json()

  //   console.log('result:', result);

  //   if (result.deletedCount > 0) {
  //     toast.success('delete success')
  //     router.refresh();
  //   }
  // };

  // লোডিং স্টেট
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">

      {/* ===== হেডার ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            শিক্ষকবৃন্দ
          </h1>
          <span className="text-sm font-medium text-muted bg-card px-3 py-1 rounded-full border border-border">
            {teachers.length} জন
          </span>
        </div>
        <Link href="/dashboard/teachers/add">
          <button className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-heading font-semibold px-5 py-2.5 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-primary/25">
            <MdAdd className="size-5" />
            নতুন শিক্ষক যোগ করুন
          </button>
        </Link>
      </div>

      {/* ===== শিক্ষকদের গ্রিড (কার্ড ভিউ) ===== */}
      {teachers.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-2xl border border-border">
          <MdSchool className="size-16 text-muted mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground">কোন শিক্ষক নেই</h3>
          <p className="text-muted mt-1">প্রথম শিক্ষক যোগ করুন</p>
          <Link href="/dashboard/teachers/add">
            <button className="mt-4 bg-primary hover:bg-primary-light text-white font-semibold px-6 py-2.5 rounded-xl transition">
              শিক্ষক যোগ করুন
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {teachers.map((teacher) => (
            <div
              key={teacher._id || teacher.id}
              className="group bg-card border border-border rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* ===== শিক্ষকের প্রোফাইল ===== */}
              <div className="flex items-center gap-4">
                {/* ✅ HeroUI Avatar */}
                <Avatar>
                  <Avatar.Image
                    alt={teacher.name}
                    src={teacher.image || undefined}
                  />
                  <Avatar.Fallback className="bg-primary/10 text-primary font-heading font-bold text-xl">
                    {teacher.name?.charAt(0) || "?"}
                  </Avatar.Fallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-semibold text-foreground truncate">
                    {teacher.name}
                  </h3>
                  <p className="text-sm text-accent font-medium truncate">
                    {teacher.expertise}
                  </p>
                </div>
              </div>

              {/* ===== বায়ো ===== */}
              <p className="mt-3 text-sm text-foreground/70 line-clamp-2">
                {teacher.bio || "বায়ো নেই"}
              </p>

              {/* ===== স্ট্যাটাস ===== */}
              <div className="mt-3 flex items-center gap-4 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <MdPeople className="size-4 text-primary" />
                  {teacher.students || 0} শিক্ষার্থী
                </span>
                <span className={`
                  px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${teacher.status === "active"
                    ? "bg-success/20 text-success"
                    : "bg-error/20 text-error"
                  }
                `}>
                  {teacher.status === "active" ? "সক্রিয়" : "নিষ্ক্রিয়"}
                </span>
              </div>

              {/* ===== অ্যাকশন বাটন ===== */}
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-end gap-2">
                {/* বিস্তারিত (Details) */}
                <Link href={`/teachers/${teacher._id}`}>
                  <button
                    className="p-2 rounded-lg text-muted hover:text-accent hover:bg-accent/10 transition-all"
                    title="বিস্তারিত দেখুন"
                  >
                    <MdVisibility className="size-5" />
                  </button>
                </Link>

                {/* এডিট */}
                <Link href={`/dashboard/teachers/${teacher._id}/edit`}>
                  <button
                    className="p-2 rounded-lg text-muted hover:text-primary hover:bg-primary/10 transition-all"
                    title="সম্পাদনা করুন"
                  >
                    <MdEdit className="size-5" />
                  </button>
                </Link>

                {/* ডিলিট */}
                <DeleteButton name={teacher.name} id={teacher._id} endpoint={"teachers"}/>
                {/* <button
                  onClick={() => handleDelete(teacher._id)}
                  className="p-2 rounded-lg text-muted hover:text-error hover:bg-error/10 transition-all"
                  title="ডিলিট করুন"
                >
                  <MdDelete className="size-5" />
                </button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}