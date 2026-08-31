// app/dashboard/reviews/page.jsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  MdStar,
  MdStarOutline,
  MdEdit,
  MdRateReview,
  MdAdd
} from "react-icons/md";
import { Avatar, Spinner } from "@heroui/react";
import toast from "react-hot-toast";
import DeleteButton from "@/components/shared/DeleteButton";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews`);
        if (!res.ok) throw new Error("রিভিউ লোড করতে সমস্যা");
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("রিভিউ লোড করতে সমস্যা হয়েছে");
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // ডামি ডেটা (status বাদ)
  const demoReviews = [
    {
      _id: 1,
      studentName: "মোইদুল ইসলাম মন্ডল",
      role: "শিক্ষার্থী, শিক্ষক এবং নাগরিক পরিচয়",
      rating: 5,
      comment: "শিক্ষক হানাশির পরিচয় কোর্সটি সত্যিই অসাধারণ ছিল। আন্নাহের দরবারে লাখ কোটি শুকরিয়া যে আমাকে আরবী শেখার জন্য এরকম একটি একাডেমির সন্ধান দিয়েছেন।",
      date: "২০২৬-০৮-১৫"
    },
    {
      _id: 2,
      studentName: "আশিমা বেগম",
      role: "ছাত্রী, আরবীয় অধিকার শিক্ষক কার্য",
      rating: 5,
      comment: "আরবি লেখায় নিয়ম কর্তৃক কোর্স থেকে অনেক নতুন জিনিস শিখলাম যা আরবীয়ভাবে যোগাযোগ করতে চায়।",
      date: "২০২৬-০৮-২০"
    },
    {
      _id: 3,
      studentName: "আশিমা",
      role: "শিক্ষার্থী, আরবীয় অধিকার শিক্ষক কার্য",
      rating: 4,
      comment: "আলোচনা করছে আরবিকে লেখা পরিবেশের সাথে বাদ দিতে পারি না। এই কোর্সটি আমার জীবনে একটি নতুন দিগন্ত উন্মোচন করেছে।",
      date: "২০২৬-০৮-২৫"
    }
  ];

  const displayReviews = reviews.length > 0 ? reviews : demoReviews;

  const getRatingStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span key={i}>
            {i < rating ? (
              <MdStar className="size-4 text-accent fill-accent" />
            ) : (
              <MdStarOutline className="size-4 text-muted" />
            )}
          </span>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner className="text-primary" size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* ===== হেডার ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            শিক্ষার্থীদের মতামত
          </h1>
          <span className="text-sm font-medium text-muted bg-card px-3 py-1 rounded-full border border-border">
            {displayReviews.length} টি
          </span>
        </div>
        <Link href="/dashboard/reviews/add">
          <button className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-heading font-semibold px-5 py-2.5 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-primary/25">
            <MdAdd className="size-5" />
            নতুন রিভিউ যোগ করুন
          </button>
        </Link>
      </div>

      {/* ===== রিভিউ গ্রিড ===== */}
      {displayReviews.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-2xl border border-border">
          <MdRateReview className="size-16 text-muted mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground">কোন রিভিউ নেই</h3>
          <p className="text-muted mt-1">প্রথম রিভিউ যোগ করুন</p>
          <Link href="/dashboard/reviews/add">
            <button className="mt-4 bg-primary hover:bg-primary-light text-white font-semibold px-6 py-2.5 rounded-xl transition">
              রিভিউ যোগ করুন
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {displayReviews.map((review) => (
            <div
              key={review._id || review.id}
              className="group bg-card border border-border rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* ===== হেডার: নাম + রেটিং ===== */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar size="md">
                    <Avatar.Fallback className="bg-primary/10 text-primary font-heading font-bold">
                      {review.studentName?.charAt(0) || "?"}
                    </Avatar.Fallback>
                  </Avatar>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">
                      {review.studentName}
                    </h3>
                    <p className="text-xs text-muted">{review.role || "শিক্ষার্থী"}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  {getRatingStars(review.rating)}
                  <span className="text-[10px] text-muted">{review.date}</span>
                </div>
              </div>

              {/* ===== মন্তব্য ===== */}
              <p className="mt-3 text-sm text-foreground/70 leading-relaxed line-clamp-3">
                {review.comment}
              </p>

              {/* ===== অ্যাকশন বাটন ===== */}
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-end gap-2">
                {/* এডিট */}
                <Link href={`/dashboard/reviews/${review._id || review.id}/edit`}>
                  <button
                    className="p-2 rounded-lg text-muted hover:text-primary hover:bg-primary/10 transition-all"
                    title="সম্পাদনা করুন"
                  >
                    <MdEdit className="size-5" />
                  </button>
                </Link>

                {/* ডিলিট */}
                <DeleteButton
                  name={review.studentName}
                  id={review._id || review.id}
                  endpoint="reviews"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}