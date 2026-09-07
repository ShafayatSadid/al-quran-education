// components/shared/WhatsAppButton.jsx
"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const message = encodeURIComponent("আসসালামু আলাইকুম! আমি Al-Quran Education সম্পর্কে জানতে চাই।");

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-all hover:scale-110 duration-300 group"
      aria-label="WhatsApp"
    >
      <FaWhatsapp className="size-7" />
      {/* টুলটিপ (ঐচ্ছিক) */}
      <span className="absolute right-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/80 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap">
        WhatsApp
      </span>
    </a>
  );
}