// components/sections/TestimonialsSection.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FaStar, FaQuoteLeft, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "মোইদুল ইসলাম মন্ডল",
    role: "শিক্ষার্থী, শিক্ষক এবং নাগরিক পরিচয়",
    text: "শিক্ষক হানাশির পরিচয় কোর্সটি সত্যিই অসাধারণ ছিল। আন্নাহের দরবারে লাখ কোটি শুকরিয়া যে আমাকে আরবী শেখার জন্য এরকম একটি একাডেমির সন্ধান দিয়েছেন। প্রাথমিক ভাবিনি এত সহজভাবে আরবী শিখতে পারব। জীবনে যত্নকৃত বেল পাড় করে দিব এত আনন্দ আগে হয়নি বা এত ভালোও লাগেনি।",
    rating: 5,
  },
  {
    id: 2,
    name: "আশিমা বেগম",
    role: "ছাত্রী, আরবীয় অধিকার শিক্ষক কার্য",
    text: "আরবি লেখায় নিয়ম কর্তৃক কোর্স থেকে অনেক নতুন জিনিস শিখলাম যা আরবীয়ভাবে যোগাযোগ করতে চায়। তারপর এই নিয়মগুলি না জানলে আরবীয়ভাবে বলার সময় অনেক সমস্যা হয়।",
    rating: 5,
  },
  {
    id: 3,
    name: "আশিমা",
    role: "শিক্ষার্থী, আরবীয় অধিকার শিক্ষক কার্য",
    text: "আলোচনা করছে আরবিকে লেখা পরিবেশের সাথে বাদ দিতে পারি না। এই কোর্সটি আমার জীবনে একটি নতুন দিগন্ত উন্মোচন করেছে।",
    rating: 4,
  },
  {
    id: 4,
    name: "আব্দুল্লাহ আল মামুন",
    role: "শিক্ষার্থী, তাজবিদ কোর্স",
    text: "তাজবিদ কোর্সটি আমার কুরআন পড়ার ভুলগুলো শুধরে দিয়েছে। শিক্ষকের প্রতি কৃতজ্ঞতা জানাই। এখন আমি আত্মবিশ্বাসের সাথে কুরআন তিলাওয়াত করতে পারি।",
    rating: 5,
  },
  {
    id: 5,
    name: "মারিয়াম খাতুন",
    role: "শিক্ষার্থী, তাফসীর কোর্স",
    text: "তাফসীর কোর্সটি আমার কুরআন বোঝার দৃষ্টিভঙ্গি বদলে দিয়েছে। প্রতিটি আয়াতের গভীরতা উপলব্ধি করতে পেরে আমি ধন্য।",
    rating: 5,
  },
  {
    id: 6,
    name: "মুহাম্মাদ সাদিক",
    role: "শিক্ষার্থী, নামাজ ও দুআ কোর্স",
    text: "নামাজের সঠিক নিয়ম ও দুআগুলো খুব সুন্দরভাবে শিখিয়েছেন শিক্ষক। এখন আমার নামাজে আরও বেশি প্রশান্তি অনুভব করি।",
    rating: 4,
  },
];

export function TestimonialsSection() {
  // ১. Embla কনফিগারেশন
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

  // ২. স্ক্রল স্ন্যাপ ও ইন্ডেক্স ট্র্যাক করা
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

  // ৩. অ্যারো বাটনের ফাংশন
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
                key={review.id}
                className="min-w-0 flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-3"
              >
                {/* ===== কার্ড ডিজাইন (পুরোপুরি আগের মতো) ===== */}
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
                    {review.text.length > 120
                      ? `${review.text.substring(0, 120)}...`
                      : review.text}
                  </p>

                  {/* ব্যক্তির তথ্য */}
                  <div className="mt-6 flex items-center gap-4 border-t border-border/50 pt-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-primary md:text-base">
                        {review.name}
                      </h4>
                      <p className="text-xs text-muted md:text-sm">
                        {review.role}
                      </p>
                    </div>
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