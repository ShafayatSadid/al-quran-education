// components/sections/TestimonialsSection.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FaStar, FaQuoteLeft, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Spinner } from "@heroui/react";

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reviews from server
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews`);
        if (!res.ok) throw new Error("রিভিউ লোড করতে সমস্যা");
        const data = await res.json();
        setTestimonials(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // Embla Carousel configuration
  const options = {
    slidesToScroll: 1,
    containScroll: "trimSnaps",
    breakpoints: {
      "(min-width: 768px)": { slidesPerView: 2 },
      "(min-width: 1024px)": { slidesPerView: 3 },
    },
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  // Loading state
  if (loading) {
    return (
      <section className="relative overflow-hidden bg-background py-16 md:py-24">
        <div className="flex items-center justify-center min-h-[200px]">
          <Spinner className="text-primary" size="lg" />
        </div>
      </section>
    );
  }

  // No data state
  if (testimonials.length === 0) {
    return (
      <section className="relative overflow-hidden bg-background py-16 md:py-24">
        <div className="container mx-auto text-center">
          <p className="text-muted">কোনো মতামত পাওয়া যায়নি</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-24">
      
      {/* ডেকোরেটিভ গ্লো */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        
        {/* সেকশন হেডার */}
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary">
            শিক্ষার্থীদের মতামত
          </span>
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
            আমাদের শিক্ষার্থীরা <span className="text-primary">কী বলছে</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-accent" />
          <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/60 md:text-lg">
            তাদের অভিজ্ঞতা থেকে জেনে নিন আমাদের কোর্স কেমন।
          </p>
        </div>

        {/* ===== Embla Carousel ===== */}
        <div className="relative overflow-hidden rounded-2xl" ref={emblaRef}>
          <div className="flex -mx-3">
            {testimonials.map((review) => (
              <div
                key={review._id || review.id}
                className="min-w-0 flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-3"
              >
                <div className="group relative h-full rounded-2xl border border-border bg-card p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-8">
                  
                  {/* বাম পাশে সোনালি বর্ডার (হভারে) */}
                  <div className="absolute bottom-0 left-0 top-0 w-1 rounded-l-2xl bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* কোটেশন মার্ক */}
                  <div className="absolute -right-2 -top-2 text-6xl text-accent/10 md:-right-4 md:-top-4 md:text-7xl">
                    <FaQuoteLeft />
                  </div>

                  {/* রেটিং স্টার */}
                  <div className="mb-4 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`size-4 ${
                          i < review.rating
                            ? "text-accent"
                            : "text-accent/20"
                        }`}
                      />
                    ))}
                  </div>

                  {/* রিভিউ টেক্সট */}
                  <p className="relative z-10 text-sm leading-relaxed text-foreground/80 md:text-base">
                    {review.comment && review.comment.length > 120
                      ? `${review.comment.substring(0, 120)}...`
                      : review.comment}
                  </p>

                  {/* ব্যক্তির তথ্য + তারিখ */}
                  <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        {review.studentName?.charAt(0) || "?"}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-primary md:text-base">
                          {review.studentName}
                        </h4>
                        <p className="text-xs text-muted md:text-sm">
                          {review.role || "শিক্ষার্থী"}
                        </p>
                      </div>
                    </div>
                    {/* ✅ তারিখ ফিল্ড */}
                    {review.date && (
                      <span className="text-xs text-muted shrink-0 ml-2">
                        {review.date}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* অ্যারো বাটন + ইন্ডিকেটর ডটস */}
        <div className="mt-10 flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <button
              onClick={scrollPrev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-md transition-all hover:bg-primary hover:text-white hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="পূর্ববর্তী"
            >
              <FaArrowLeft className="size-4" />
            </button>
            <button
              onClick={scrollNext}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-md transition-all hover:bg-primary hover:text-white hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="পরবর্তী"
            >
              <FaArrowRight className="size-4" />
            </button>
          </div>

          {/* ইন্ডিকেটর ডটস */}
          <div className="flex items-center gap-2">
            {scrollSnaps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  idx === selectedIndex
                    ? "w-8 bg-accent"
                    : "w-2.5 bg-border hover:bg-primary/50"
                }`}
                aria-label={`স্লাইড ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}