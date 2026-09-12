// app/about/page.jsx
import AboutContent from "./AboutContent";

export const metadata = {
  title: "About Us | Al-Quran Education",
  description:
    "Al-Quran Education is an online Quran learning platform — teaching proper Tajweed, Tafseer, and Arabic language from certified scholars.",
};

export default function AboutPage() {
  return <AboutContent />;
}