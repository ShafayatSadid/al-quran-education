// app/admin/page.jsx
"use client";

import Link from "next/link";
import { MdBook, MdPeople, MdStar } from "react-icons/md";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";

export default function AdminDashboardHome() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    document.title = "ড্যাশবোর্ড | Al-Quran Education";
  }, []);

  const quickActions = [
    {
      title: "শিক্ষকবৃন্দ",
      description: "শিক্ষক যোগ, সম্পাদনা ও পরিচালনা করুন",
      icon: MdPeople,
      href: "/dashboard/teachers",
      bg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      title: "কোর্সসমূহ",
      description: "কোর্স যোগ, সম্পাদনা ও পরিচালনা করুন",
      icon: MdBook,
      href: "/dashboard/courses",
      bg: "bg-accent/20",
      iconColor: "text-accent",
    },
    {
      title: "মতামত",
      description: "শিক্ষার্থীদের মতামত পরিচালনা করুন",
      icon: MdStar,
      href: "/dashboard/reviews",
      bg: "bg-secondary/10",
      iconColor: "text-secondary",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* 👋 স্বাগতম */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          স্বাগতম, <span className="text-primary">{user?.name || "অ্যাডমিন"}!</span>
        </h1>
        <p className="text-muted mt-1">
          আপনার ড্যাশবোর্ডে স্বাগতম। নিচের অপশন থেকে শুরু করুন।
        </p>
      </div>

      {/* 🚀 কুইক অ্যাকশন */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.title} href={action.href}>
              <div className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg transition hover:-translate-y-1 cursor-pointer group">
                <div className={`w-12 h-12 rounded-full ${action.bg} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition`}>
                  <Icon className={`text-2xl ${action.iconColor}`} />
                </div>
                <h3 className="font-heading font-semibold text-foreground">{action.title}</h3>
                <p className="text-sm text-muted mt-1">{action.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}