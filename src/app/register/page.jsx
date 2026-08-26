// app/(auth)/register/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, Button, Input, Label, FieldError, Description, TextField } from "@heroui/react";
import toast from "react-hot-toast";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
    const router = useRouter();

    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [passwordValue, setPasswordValue] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());
        console.log('user:', user);
        setLoading(true);

        try {
            const { data, error } = await authClient.signUp.email({
                name: user.name,
                email: user.email,
                password: user.password,
                image: user.photoURL,
            });

            if (data) {
                toast.success("অ্যাকাউন্ট তৈরি হয়েছে!");
                router.push("/");
                return;
            }

            toast.error(error?.message || "নিবন্ধন ব্যর্থ হয়েছে");
            console.log('error:', error);
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
                        <h2 className="text-2xl font-extrabold text-foreground">অ্যাডমিন অ্যাকাউন্ট তৈরি করুন</h2>
                        <p className="text-sm text-muted mt-1.5">আপনার ডিজিটাল ক্লাসরুমে স্বাগতম</p>

                        {/* ডেকোরেটিভ লাইন */}
                        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-accent" />
                    </div>

                    {/* ফর্ম */}
                    <Form className="space-y-4" onSubmit={onSubmit}>

                        {/* নাম */}
                        <TextField
                            isRequired
                            name="name"
                            validate={(value) => {
                                if (!value || value.trim().length === 0) return "নাম আবশ্যক";
                                if (value.trim().length < 2) return "নাম কমপক্ষে ২ অক্ষর হতে হবে";
                                return null;
                            }}
                        >
                            <Label className="text-sm font-medium text-foreground">পূর্ণ নাম</Label>
                            <Input
                                name="name"
                                placeholder="আপনার নাম"
                                className="w-full px-4 py-2.5 rounded-xl border border-border bg-transparent text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                            />
                            <FieldError className="text-xs text-error mt-1" />
                        </TextField>

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

                        {/* ফটো ইউআরএল (ঐচ্ছিক) */}
                        <TextField name="photoURL">
                            <Label className="text-sm font-medium text-foreground">
                                ফটো ইউআরএল <span className="text-muted font-normal">(ঐচ্ছিক)</span>
                            </Label>
                            <Input
                                name="photoURL"
                                type="url"
                                placeholder="https://example.com/photo.jpg"
                                className="w-full px-4 py-2.5 rounded-xl border border-border bg-transparent text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                            />
                        </TextField>

                        {/* পাসওয়ার্ড */}
                        <TextField
                            isRequired
                            name="password"
                            type={isShowPassword ? "text" : "password"}
                            validate={(value) => {
                                if (!value) return "পাসওয়ার্ড আবশ্যক";
                                if (value.length < 6) return "পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে";
                                if (!/[A-Z]/.test(value)) return "কমপক্ষে ১টি বড় হাতের অক্ষর থাকতে হবে";
                                if (!/[a-z]/.test(value)) return "কমপক্ষে ১টি ছোট হাতের অক্ষর থাকতে হবে";
                                return null;
                            }}
                        >
                            <Label className="text-sm font-medium text-foreground">পাসওয়ার্ড</Label>
                            <div className="relative">
                                <Input
                                    name="password"
                                    type={isShowPassword ? "text" : "password"}
                                    placeholder=""
                                    onChange={(e) => setPasswordValue(e.target.value)}
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
                            <Description className="text-xs text-muted mt-1">
                                ন্যূনতম ৬ অক্ষর, ১টি বড় ও ১টি ছোট হাতের অক্ষর
                            </Description>
                            <FieldError className="text-xs text-error mt-1" />
                        </TextField>

                        {/* কনফর্ম পাসওয়ার্ড */}
                        <TextField
                            isRequired
                            name="confirmPassword"
                            type={isShowConfirmPassword ? "text" : "password"}
                            validate={(value) => {
                                if (!value) return "পাসওয়ার্ড নিশ্চিত করুন";
                                if (value !== passwordValue) return "পাসওয়ার্ড মিলছে না";
                                return null;
                            }}
                        >
                            <Label className="text-sm font-medium text-foreground">পাসওয়ার্ড নিশ্চিত করুন</Label>
                            <div className="relative">
                                <Input
                                    name="confirmPassword"
                                    type={isShowConfirmPassword ? "text" : "password"}
                                    placeholder=""
                                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-transparent text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition"
                                >
                                    {isShowConfirmPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
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
                            {loading ? "নিবন্ধন হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
                        </Button>
                    </Form>

                    {/* লগইন লিংক */}
                    <p className="text-center text-sm text-muted mt-6">
                        ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
                        <Link href="/login" className="text-primary hover:underline font-semibold transition">
                            লগইন করুন
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}