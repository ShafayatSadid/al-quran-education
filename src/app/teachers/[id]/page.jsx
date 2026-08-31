
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button, Spinner } from "@heroui/react";
import {
    MdArrowBack,
    MdStar,
    MdPeople,
    MdSchool,
    MdEmail,
    MdPhone,
    MdCalendarToday,
    MdVerified
} from "react-icons/md";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import toast from "react-hot-toast";


export default function TeacherDetailsPage() {
    const router = useRouter();
    const { id } = useParams();
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/teachers/${id}`
                );

                if (!res.ok) {
                    throw new Error("শিক্ষক খুঁজে পাওয়া যায়নি");
                }

                const result = await res.json();
                setTeacher(result);
            } catch (error) {
                console.error("Fetch error:", error);
                toast.error("শিক্ষক লোড করতে সমস্যা হয়েছে");
                router.push("/teachers");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchTeacher();
        }
    }, [id, router]);

    // লোডিং স্টেট
    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Spinner className="text-primary" size="lg" />
            </div>
        );
    }

    if (!teacher) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center mt-20">
                <div className="text-center">
                    <MdSchool className="size-16 text-muted mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground">শিক্ষক খুঁজে পাওয়া যায়নি</h3>
                    <Link href="/teachers">
                        <button className="mt-4 bg-primary hover:bg-primary-light text-white font-semibold px-6 py-2.5 rounded-xl transition">
                            শিক্ষকদের তালিকায় ফিরে যান
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-8 md:py-12 my-20">
            <div className="container mx-auto max-w-5xl px-4 md:px-8">

                {/* ===== হেডার ===== */}
                <div className="flex items-center gap-4 mb-6">
                    <Link
                        href="/teachers"
                        className="p-2 rounded-lg text-muted hover:text-primary hover:bg-primary/10 transition-all"
                    >
                        <MdArrowBack className="size-6" />
                    </Link>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                            শিক্ষকের প্রোফাইল
                        </h1>
                        <p className="text-sm text-muted mt-1">বিস্তারিত তথ্য ও পরিচয়</p>
                    </div>
                </div>

                {/* ===== প্রোফাইল কার্ড ===== */}
                <div className="bg-card border border-border rounded-2xl overflow-hidden">

                    {/* ===== কভার ইমেজ (ঐচ্ছিক) ===== */}
                    <div className="relative h-32 md:h-48 bg-gradient-to-r from-primary/20 to-accent/20" />

                    {/* ===== প্রোফাইল সেকশন ===== */}
                    <div className="relative px-6 pb-6 md:px-8 md:pb-8">

                        {/* অ্যাভাটার (কভারের উপর ওভারল্যাপ) */}
                        <div className="relative -mt-16 md:-mt-20 mb-4">
                            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-card bg-primary/10 overflow-hidden shadow-xl">
                                {teacher.image ? (
                                    <Image
                                        src={teacher.image}
                                        alt={teacher.name}
                                        width={144}
                                        height={144}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-primary">
                                        {teacher.name?.charAt(0) || "?"}
                                    </div>
                                )}
                            </div>
                            {/* স্ট্যাটাস ব্যাজ */}
                            <span className={`
                absolute bottom-2 right-2 md:bottom-4 md:right-4 px-3 py-1 rounded-full text-xs font-semibold text-white
                ${teacher.status === "active" ? "bg-success" : "bg-error"}
              `}>
                                {teacher.status === "active" ? "সক্রিয়" : "নিষ্ক্রিয়"}
                            </span>
                        </div>

                        {/* নাম ও পদবি */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-extrabold text-foreground flex items-center gap-2">
                                    {teacher.name}
                                    {teacher.status === "active" && (
                                        <MdVerified className="text-primary size-6" />
                                    )}
                                </h2>
                                <p className="text-lg font-medium text-accent">
                                    {teacher.title || teacher.expertise}
                                </p>
                            </div>

                            {/* রেটিং */}
                            <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-xl">
                                <MdStar className="size-5 text-accent" />
                                <span className="text-lg font-bold text-foreground">{teacher.rating || "৪.৮"}</span>
                                <span className="text-sm text-muted">/ 5.0</span>
                            </div>
                        </div>

                        {/* ===== বিস্তারিত তথ্য ===== */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

                            {/* বাম পাশ: বায়ো */}
                            <div>
                                <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-2">
                                    পরিচয়
                                </h3>
                                <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                                    {teacher.bio || "শিক্ষকের কোনো পরিচয় দেওয়া হয়নি।"}
                                </p>
                            </div>

                            {/* ডান পাশ: পরিসংখ্যান */}
                            <div>
                                <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-2">
                                    পরিসংখ্যান
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-secondary/10 rounded-xl p-3 text-center">
                                        <FaUserGraduate className="size-5 text-primary mx-auto mb-1" />
                                        <p className="text-xl font-bold text-foreground">{teacher.students || 0}</p>
                                        <p className="text-xs text-muted">শিক্ষার্থী</p>
                                    </div>
                                    <div className="bg-secondary/10 rounded-xl p-3 text-center">
                                        <FaChalkboardTeacher className="size-5 text-accent mx-auto mb-1" />
                                        <p className="text-xl font-bold text-foreground">{teacher.expertise || "বিশেষজ্ঞ"}</p>
                                        <p className="text-xs text-muted">বিশেষত্ব</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ===== যোগাযোগ ও অন্যান্য তথ্য ===== */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
                            {teacher.email && (
                                <div className="flex items-center gap-3 text-sm text-foreground/70">
                                    <MdEmail className="size-5 text-primary" />
                                    <span>{teacher.email}</span>
                                </div>
                            )}
                            {teacher.phone && (
                                <div className="flex items-center gap-3 text-sm text-foreground/70">
                                    <MdPhone className="size-5 text-accent" />
                                    <span>{teacher.phone}</span>
                                </div>
                            )}
                            {teacher.joined && (
                                <div className="flex items-center gap-3 text-sm text-foreground/70">
                                    <MdCalendarToday className="size-5 text-muted" />
                                    <span>যোগদান: {teacher.joined}</span>
                                </div>
                            )}
                        </div>

                        {/* ===== অ্যাকশন বাটন ===== */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-border">
                            <Link href="/teachers" className="flex-1">
                                <button className="w-full px-6 py-2.5 text-sm font-medium text-foreground border border-border hover:bg-primary/5 rounded-xl transition">
                                    শিক্ষকদের তালিকায় ফিরে যান
                                </button>
                            </Link>
                            <div className="w-full sm:w-auto">
                                <Link href={'/free-class'}>
                                    <Button className="bg-primary hover:bg-primary-hover text-white font-heading font-semibold px-5 py-2.5 rounded-full shadow-md transition-all duration-200 hover:scale-105">
                                        ফ্রি ক্লাস নিন
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}