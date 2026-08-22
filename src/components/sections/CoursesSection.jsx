// components/sections/CoursesSection.tsx
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaUserGraduate, FaClock, FaUsers } from "react-icons/fa";

const courses = [
  {
    id: 1,
    title: "নুরানী কায়দা ও তাজবিদ",
    description: "কুরআন পড়ার সঠিক উচ্চারণ ও মাখরাজ শেখার জন্য প্রাথমিক কোর্স।",
    image: "/images/course-1.jpg",
    teacher: "মাওলানা আব্দুল্লাহ",
    duration: "৩ মাস",
    students: 121,
    rating: 4.9,
    level: "প্রাথমিক",
  },
  {
    id: 2,
    title: "কুরআনের অর্থ ও তাফসীর",
    description: "আল-কুরআনের প্রতিটি শব্দ ও আয়াতের অর্থ, পটভূমি ও তাফসীর।",
    image: "/images/course-2.jpg",
    teacher: "ড. মুহাম্মাদ হামিদ",
    duration: "৬ মাস",
    students: 87,
    rating: 4.8,
    level: "মাধ্যমিক",
  },
  {
    id: 3,
    title: "সঠিক নামাজ ও দুআ শিক্ষা",
    description: "নামাজের সঠিক নিয়ম, আরবি দুআ ও আত্মিক প্রশান্তি অর্জন।",
    image: "/images/course-3.jpg",
    teacher: "মাওলানা জাকিরুল ইসলাম",
    duration: "২ মাস",
    students: 203,
    rating: 4.9,
    level: "সব স্তরের জন্য",
  },
];

export function CoursesSection() {
  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-24">
      
      {/* ডেকোরেটিভ গ্লো */}
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        
        {/* সেকশন হেডার */}
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary">
            আমাদের কোর্সসমূহ
          </span>
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
            জনপ্রিয় <span className="text-primary">কোর্সসমূহ</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-accent" />
          <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/60 md:text-lg">
            কুরআন শিক্ষার প্রতিটি স্তরের জন্য আমাদের বিশেষ কোর্স।
          </p>
        </div>

        {/* কোর্স গ্রিড */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          
          {courses.map((course) => (
            <div
              key={course.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card/70 transition-all duration-300 hover:-translate-y-2 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5"
            >
              {/* ছবি */}
              <div className="relative h-52 w-full overflow-hidden bg-accent/5">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* লেভেল ব্যাজ (বামে) */}
                <span className="absolute left-3 top-3 rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  {course.level}
                </span>
                {/* ✅ শিক্ষার্থী সংখ্যা (ডানে) */}
                <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  <FaUsers className="size-3" />
                  {course.students}+
                </span>
              </div>

              {/* কন্টেন্ট */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary md:text-xl">
                  {course.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-foreground/70">
                  {course.description}
                </p>

                {/* শিক্ষক, সময়, রেটিং */}
                <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-border pt-4 text-sm text-foreground/60">
                  <span className="flex items-center gap-1">
                    <FaUserGraduate className="text-primary" />
                    {course.teacher}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock className="text-accent" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" />
                    {course.rating}
                  </span>
                </div>

                {/* বিস্তারিত বাটন */}
                <Link href={`/courses/${course.id}`}>
                  <button className="mt-4 w-full rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white">
                    বিস্তারিত দেখুন →
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* সব কোর্স দেখুন */}
        <div className="mt-12 text-center">
          <Link href="/courses">
            <button className="rounded-full border-2 border-accent px-8 py-3 font-semibold text-accent transition-all hover:bg-accent hover:text-white">
              সব কোর্স দেখুন →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}