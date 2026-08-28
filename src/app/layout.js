import { Geist, Geist_Mono } from "next/font/google";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/shared/NavBar";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import { Footer } from "@/components/shared/Footer";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-bengali",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Al-Quran Education",
  description: "শিখুন কুরআন, বুঝে নিন জীবন",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} ${hindSiliguri.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Toaster />
          <NavBar />
          <main>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
