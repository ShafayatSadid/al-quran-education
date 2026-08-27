// app/admin/layout.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { 
  MdBook, 
  MdPeople, 
  MdStar, 
  MdMenu,
  MdClose
} from "react-icons/md";
import { FaUser } from "react-icons/fa";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const navItems = [
    { id: "courses", label: "কোর্সসমূহ", icon: MdBook, href: "/dashboard/courses" },
    { id: "teachers", label: "শিক্ষকবৃন্দ", icon: MdPeople, href: "/dashboard/teachers" },
    { id: "reviews", label: "মতামত", icon: MdStar, href: "/dashboard/reviews" },
  ];

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background mt-23">

      {/* মোবাইল হেডার */}
      <div className="md:hidden flex items-center justify-between px-5 py-3 bg-background border-b border-border">
        <h2 className="font-heading text-lg font-bold text-foreground">ড্যাশবোর্ড</h2>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-foreground hover:text-primary transition"
        >
          {isSidebarOpen ? <MdClose size={22} /> : <MdMenu size={22} />}
        </button>
      </div>

      {/* সাইডবার */}
      <aside
        className={`
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0
          fixed md:relative
          top-0 left-0
          w-72 h-screen md:h-auto
          bg-card
          border-r border-border
          p-6
          z-40
          transition-transform duration-300
          flex flex-col
          shadow-2xl md:shadow-none
        `}
      >
        {/* মোবাইল ক্লোজ বাটন */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden absolute top-4 right-4 text-foreground hover:text-primary transition"
        >
          <MdClose size={24} />
        </button>

        {/* শিরোনাম */}
        <div className="mb-6">
          <h2 className="font-heading text-xl font-bold text-foreground">ড্যাশবোর্ড</h2>
          <p className="font-body text-sm text-muted">সবকিছু এখান থেকে ম্যানেজ করুন</p>
        </div>

        {/* ইউজার প্রোফাইল */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-heading font-bold text-sm">
            {user?.name?.charAt(0)?.toUpperCase() || <FaUser className="text-primary" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-body text-sm font-medium text-foreground truncate">
              {user?.name || "অ্যাডমিন"}
            </p>
            <p className="font-body text-xs text-muted truncate">
              {user?.email || "admin@example.com"}
            </p>
          </div>
        </div>

        {/* নেভিগেশন */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition duration-200
                  ${isActive 
                    ? "bg-primary/10 text-primary font-semibold" 
                    : "text-foreground hover:bg-primary/5"
                  }
                `}
              >
                <Icon className={`size-5 ${isActive ? "text-primary" : "text-muted"}`} />
                <span className="font-body text-sm">{item.label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-6 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* কন্টেন্ট এরিয়া */}
      <main className="flex-1 p-5 lg:p-8 overflow-y-auto bg-background min-h-screen">
        {children}
      </main>

      {/* ওভারলে */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}