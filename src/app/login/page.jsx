// app/(auth)/login/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, Button, Input, Label, FieldError, TextField } from "@heroui/react";
import toast from "react-hot-toast";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      });

      if (data) {
        toast.success("স্বাগতম!");
        router.push("/dashboard");
        return;
      }

      toast.error(error?.message || "লগইন ব্যর্থ হয়েছে");
    } catch (err) {
      toast.error(err.message || "কিছু একটা সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-5 py-12 my-20 overflow-hidden bg-background">
      
      {/* ডেকোরেটিভ গ্লো */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-2xl shadow-primary/5 dark:shadow-primary/10">
          
          {/* লোগো ও হেডার */}
          <div className="text-center mb-8">
            <div className="inline-block mb-3">
              <h1 className="text-2xl font-extrabold tracking-tight">
                <span className="text-primary">Al Quran</span>{" "}
                <span className="text-accent">Education</span>
              </h1>
            </div>
            <h2 className="text-2xl font-extrabold text-foreground">অ্যাডমিন লগইন</h2>
            <p className="text-sm text-muted mt-1.5">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
            
            {/* ডেকোরেটিভ লাইন */}
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-accent" />
          </div>

          {/* ফর্ম */}
          <Form className="space-y-5" onSubmit={onSubmit}>
            
            {/* ইমেইল */}
            <TextField
              isRequired
              name="email"
              validate={(value) => {
                if (!value) return "ইমেইল আবশ্যক";
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "সঠিক ইমেইল ঠিকানা দিন";
                }
                return null;
              }}
            >
              <Label className="text-sm font-medium text-foreground">ইমেইল</Label>
              <Input
                name="email"
                type="email"
                placeholder="admin@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-transparent text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
              />
              <FieldError className="text-xs text-error mt-1" />
            </TextField>

            {/* পাসওয়ার্ড */}
            <TextField
              isRequired
              name="password"
              type={isShowPassword ? "text" : "password"}
              validate={(value) => {
                if (!value || value.length === 0) return "পাসওয়ার্ড আবশ্যক";
                return null;
              }}
            >
              <Label className="text-sm font-medium text-foreground">পাসওয়ার্ড</Label>
              <div className="relative">
                <Input
                  name="password"
                  type={isShowPassword ? "text" : "password"}
                  placeholder=""
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-transparent text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition pr-12"
                />
                <button
                  type="button"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition"
                >
                  {isShowPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                </button>
              </div>
              <FieldError className="text-xs text-error mt-1" />
            </TextField>

            {/* সাবমিট বাটন */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-light text-primary-foreground font-heading font-semibold py-2.5 rounded-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? "লগইন হচ্ছে..." : "লগইন করুন"}
            </Button>
          </Form>

          {/* রেজিস্টার লিংক */}
          <p className="text-center text-sm text-muted mt-6">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/register" className="text-primary hover:underline font-semibold transition">
              অ্যাকাউন্ট তৈরি করুন
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}