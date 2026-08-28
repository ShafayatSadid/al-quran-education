// app/admin/teachers/page.jsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  MdAdd, 
  MdEdit, 
  MdDelete, 
  MdVisibility,
  MdSchool,
  MdPeople
} from "react-icons/md";
import toast from "react-hot-toast";

// ডামি ডেটা (পরবর্তীতে API থেকে আনা হবে)
const teachersData = [
  {
    id: 1,
    name: "মাওলানা আব্দুল্লাহ",
    expertise: "তাজবিদ ও কিরআত",
    bio: "১৫ বছরের অভিজ্ঞতা, ইজাযাতপ্রাপ্ত ক্বারী। কুরআনের সঠিক উচ্চারণ ও মাখরাজ শিক্ষায় বিশেষজ্ঞ।",
    students: 120,
    image: null,
    status: "active",
    joined: "২০২৩-০১-১৫",
  },
  {
    id: 2,
    name: "ড. মুহাম্মাদ হামিদ",
    expertise: "তাফসীর ও আরবী ভাষা",
    bio: "আজহার বিশ্ববিদ্যালয় থেকে পিএইচডি। কুরআনের অর্থ ও তাফসীর শিক্ষায় ২০ বছরের অভিজ্ঞতা।",
    students: 85,
    image: null,
    status: "active",
    joined: "২০২২-০৬-২০",
  },
  {
    id: 3,
    name: "মাওলানা জাকিরুল ইসলাম",
    expertise: "ফিকহ ও দুআ শিক্ষা",
    bio: "ঢাকা আলিয়া মাদ্রাসার সাবেক শিক্ষক। নামাজ, দুআ ও দৈনন্দিন জীবনের ইসলামী শিক্ষায় দক্ষ।",
    students: 200,
    image: null,
    status: "inactive",
    joined: "২০২৪-০২-১০",
  },
];

export default function TeachersPage() {
  const [teachers, setTeachers] = useState(teachersData);

  // ডিলিট ফাংশন (পরবর্তীতে API কল হবে)
  const handleDelete = (id, name) => {
    if (confirm(`"${name}"-কে ডিলিট করতে চান?`)) {
      setTeachers(teachers.filter((teacher) => teacher.id !== id));
      toast.success(`${name} ডিলিট করা হয়েছে!`);
    }
  };

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
        <Link href="/admin/teachers/add">
          <button className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-heading font-semibold px-3 py-2.5 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-primary/25">
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
          <Link href="/admin/teachers/add">
            <button className="mt-4 bg-primary hover:bg-primary-light text-white font-semibold px-6 py-2.5 rounded-xl transition">
              শিক্ষক যোগ করুন
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="group bg-card border border-border rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* ===== শিক্ষকের প্রোফাইল ===== */}
              <div className="flex items-center gap-4">
                {/* অ্যাভাটার */}
                <div className="w-14 h-14 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary font-heading font-bold text-xl">
                  {teacher.image ? (
                    <img src={teacher.image} alt={teacher.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    teacher.name.charAt(0)
                  )}
                </div>
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
                {teacher.bio}
              </p>

              {/* ===== স্ট্যাটাস ===== */}
              <div className="mt-3 flex items-center gap-4 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <MdPeople className="size-4 text-primary" />
                  {teacher.students} শিক্ষার্থী
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
                <Link href={`/admin/teachers/${teacher.id}`}>
                  <button
                    className="p-2 rounded-lg text-muted hover:text-accent hover:bg-accent/10 transition-all"
                    title="বিস্তারিত দেখুন"
                  >
                    <MdVisibility className="size-5" />
                  </button>
                </Link>

                {/* এডিট */}
                <Link href={`/admin/teachers/${teacher.id}/edit`}>
                  <button
                    className="p-2 rounded-lg text-muted hover:text-primary hover:bg-primary/10 transition-all"
                    title="সম্পাদনা করুন"
                  >
                    <MdEdit className="size-5" />
                  </button>
                </Link>

                {/* ডিলিট */}
                <button
                  onClick={() => handleDelete(teacher.id, teacher.name)}
                  className="p-2 rounded-lg text-muted hover:text-error hover:bg-error/10 transition-all"
                  title="ডিলিট করুন"
                >
                  <MdDelete className="size-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}