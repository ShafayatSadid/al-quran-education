// components/sections/WhyUsSection.tsx
import { 
  FaQuran, 
  FaChalkboardTeacher, 
  FaVideo, 
  FaCertificate 
} from "react-icons/fa";

const features = [
  {
    icon: FaQuran,
    title: "প্রামাণ্য তাজবিদ ও তাফসীর",
    description: "কুরআনের প্রতিটি আয়াত সঠিক উচ্চারণ ও অর্থসহ শিখুন।",
  },
  {
    icon: FaChalkboardTeacher,
    title: "অভিজ্ঞ আলেমদের হাতছানি",
    description: "ইজাযাতপ্রাপ্ত শিক্ষকদের কাছ থেকে সরাসরি শিক্ষা গ্রহণ করুন।",
  },
  {
    icon: FaVideo,
    title: "লাইভ ইন্টারঅ্যাকটিভ ক্লাস",
    description: "ঘরে বসেই প্রশ্ন করুন, আলোচনা করুন, শিক্ষকের সাথে যুক্ত থাকুন।",
  },
  {
    icon: FaCertificate,
    title: "স্বীকৃত সনদপত্র",
    description: "কোর্স শেষে অংশগ্রহণ ও দক্ষতার স্বীকৃতি পাবেন।",
  },
];

export function WhyUsSection() {
  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-24">
      
      {/* ===== ব্যাকগ্রাউন্ডের ডেকোরেশন (থিমের সঙ্গে মানানসই) ===== */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        
        {/* ===== সেকশনের হেডার (শিরোনাম) ===== */}
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          {/* ব্যাজ (ছোট্ট পরিচয়) */}
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary">
            কেন আমরা?
          </span>
          
          {/* প্রধান শিরোনাম */}
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
            কেন আমাদের <span className="text-primary">বেছে নেবেন</span>?
          </h2>
          
          {/* ডেকোরেটিভ সোনালি লাইন */}
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-accent" />
          
          {/* সাব-শিরোনাম */}
          <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/60 md:text-lg">
            আমরা বিশ্বাস করি, সঠিক শিক্ষাই পারে জীবন বদলে দিতে। 
            আমাদের বিশেষ বৈশিষ্ট্যগুলো জেনে নিন।
          </p>
        </div>

        {/* ===== ৪টি ফিচার কার্ডের গ্রিড ===== */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-border bg-card/80 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 lg:p-8"
            >
              {/* ডেকোরেটিভ গোল্ডেন ডট (ডান কোণায়) */}
              <div className="absolute right-4 top-4 h-12 w-12 rounded-full border border-accent/10 transition-colors group-hover:border-accent/30" />
              
              <div className="relative flex flex-col items-start">
                {/* আইকন কন্টেইনার */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-2xl text-primary shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                  <feature.icon />
                </div>
                
                {/* টাইটেল */}
                <h3 className="mt-5 text-xl font-bold text-foreground transition-colors group-hover:text-primary md:text-2xl">
                  {feature.title}
                </h3>
                
                {/* বর্ণনা */}
                <p className="mt-2 text-sm leading-relaxed text-foreground/70 md:text-base">
                  {feature.description}
                </p>

                {/* হোভার ইফেক্টের জন্য সোনালি আন্ডারলাইন */}
                <div className="mt-3 h-0.5 w-0 rounded-full bg-accent transition-all duration-500 group-hover:w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}