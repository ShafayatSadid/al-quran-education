// app/free-class/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Form,
  Button,
  Input,
  Label,
  FieldError,
  TextField
} from "@heroui/react";
import {
  MdArrowBack,
  MdCheckCircle,
  MdPerson,
  MdCalendarToday
} from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function FreeClassPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useLocalStorage("freeClassFormData", {
    name: "",
    age: "",
    whatsapp: "",
  });

  // শুধু নাম্বার ও '+' অনুমোদিত
  const validateWhatsApp = (value) => {
    const regex = /^[0-9+]*$/;
    return regex.test(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // WhatsApp ফিল্ডের জন্য ভ্যালিডেশন
    if (name === "whatsapp" && !validateWhatsApp(value)) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData(e.currentTarget);
    const data = Object.fromEntries(formDataObj.entries());

    // বেসিক ভ্যালিডেশন
    if (!data.name?.trim()) {
      toast.error("নাম আবশ্যক");
      return;
    }
    if (!data.age?.trim()) {
      toast.error("বয়স আবশ্যক");
      return;
    }
    if (!data.whatsapp?.trim()) {
      toast.error("হোয়াটসঅ্যাপ নম্বর আবশ্যক");
      return;
    }
    if (!/^[0-9+]+$/.test(data.whatsapp)) {
      toast.error("শুধুমাত্র সংখ্যা ও + চিহ্ন ব্যবহার করুন");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
        name: data.name,
        age: data.age,
        whatsapp: data.whatsapp,
        subject: "নতুন ফ্রি ট্রায়াল ক্লাস রিকোয়েস্ট",
        from_name: "Al-Quran Education",
        botcheck: "",
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("আপনার অনুরোধ গ্রহণ করা হয়েছে! আমরা скоро যোগাযোগ করব।");
        localStorage.removeItem("freeClassFormData");
        setFormData({ name: "", age: "", whatsapp: "" });
      } else {
        toast.error(result.message || "কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("নেটওয়ার্ক সমস্যা, আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 md:py-12 my-20">

      {/* ===== হেডার ===== */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/"
          className="p-2 rounded-lg text-muted hover:text-primary hover:bg-primary/10 transition-all"
        >
          <MdArrowBack className="size-6" />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            ফ্রি ট্রায়াল ক্লাস
          </h1>
          <p className="text-sm text-muted mt-1">আপনার তথ্য দিন, আমরা ২৪ ঘণ্টার মধ্যে যোগাযোগ করব</p>
        </div>
      </div>

      {/* ===== ফর্ম কার্ড ===== */}
      <div className="bg-card/50 border border-border rounded-2xl p-6 md:p-8">

        {/* সুবিধা পয়েন্ট */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 pb-6 border-b border-border">
          <div className="flex items-center gap-3 text-sm text-foreground/70">
            <MdCheckCircle className="size-5 text-accent shrink-0" />
            <span>বিনামূল্যে ট্রায়াল ক্লাস</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-foreground/70">
            <FaWhatsapp className="size-5 text-success shrink-0" />
            <span>WhatsApp এ ক্লাস</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-foreground/70">
            <MdCalendarToday className="size-5 text-primary shrink-0" />
            <span>আপনার সুবিধামতো সময়</span>
          </div>
        </div>

        {/* ===== ফর্ম ===== */}
        <Form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* নাম */}
          <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (!value || value.trim().length === 0) return "নাম আবশ্যক";
              return null;
            }}
          >
            <Label className="text-sm font-medium text-foreground">পূর্ণ নাম</Label>
            <Input
              defaultValue={formData.name}
              onChange={handleChange}
              placeholder="আপনার পূর্ণ নাম"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
            />
            <FieldError className="text-xs text-error mt-1" />
          </TextField>

          {/* বয়স */}
          <TextField
            isRequired
            name="age"
            validate={(value) => {
              if (!value || value.trim().length === 0) return "বয়স আবশ্যক";
              if (isNaN(parseInt(value)) || parseInt(value) < 1 || parseInt(value) > 150) {
                return "সঠিক বয়স দিন";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium text-foreground">বয়স</Label>
            <Input
              type="number"
              min="1"
              max="150"
              defaultValue={formData.age}
              onChange={handleChange}
              placeholder="আপনার বয়স (যেমন: ২৫)"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
            />
            <FieldError className="text-xs text-error mt-1" />
          </TextField>

          {/* হোয়াটসঅ্যাপ */}
          <TextField
            isRequired
            name="whatsapp"
            validate={(value) => {
              if (!value || value.trim().length === 0) return "হোয়াটসঅ্যাপ নম্বর আবশ্যক";
              if (!/^[0-9+]+$/.test(value)) return "শুধুমাত্র সংখ্যা ও + চিহ্ন ব্যবহার করুন";
              return null;
            }}
          >
            <Label className="text-sm font-medium text-foreground">
              হোয়াটসঅ্যাপ নম্বর <span className="text-muted font-normal text-xs ml-1">(কান্ট্রি কোড সহ)</span>
            </Label>
            <Input
              defaultValue={formData.whatsapp}
              onChange={handleChange}
              placeholder="+88017xxxxxxxx"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
            />
            <FieldError className="text-xs text-error mt-1" />
            <p className="text-xs text-muted mt-1.5">
              ⚠️ শুধুমাত্র নাম্বার ও + চিহ্ন ব্যবহার করুন (যেমন: +88017xxxxxxxx)
            </p>
          </TextField>

          {/* সাবমিট বাটন */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-light text-white font-heading font-semibold py-2.5 rounded-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-primary/25 mt-4"
          >
            {loading ? "প্রেরণ হচ্ছে..." : "ফ্রি ট্রায়াল বুক করুন"}
          </Button>
        </Form>

        {/* নিচের তথ্য */}
        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted">
            সাবমিট করার পর আমরা আপনার WhatsApp নম্বরে যোগাযোগ করব।
            <br />
            আপনার তথ্য নিরাপদে সংরক্ষণ করা হবে।
          </p>
        </div>
      </div>
    </div>
  );
}