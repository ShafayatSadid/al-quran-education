import { CoursesSection } from "@/components/sections/CoursesSection";
import { Hero } from "@/components/sections/Hero";
import { TeachersSection } from "@/components/sections/TeachersSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";

export const metadata = {
  title: "Al-Quran Education | Learn Quran Online with Tajweed & Tafseer",
  description:
    "Learn Quran online with certified scholars — Tajweed, Tafseer, and Arabic language. Free trial class available. Join Al-Quran Education today.",
};

export default function Home() {
  return (
    <section className="my-20">
      <Hero />

      <section>
        <WhyUsSection />
      </section>

      <section>
        <CoursesSection />
      </section>

      <section>
        <TeachersSection />
      </section>
      
      <section>
        <TestimonialsSection />
      </section>
    </section>
  );
}
