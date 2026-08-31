// app/dashboard/courses/[id]/edit/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  Form,
  Button,
  Input,
  Label,
  FieldError,
  TextField,
  TextArea,
  Spinner,
} from "@heroui/react";
import {
  MdArrowBack,
  MdSave
} from "react-icons/md";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function EditCoursePage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    students: "",
    level: "শিক্ষানবিস",
    features: "",
    status: "active",
    popular: false,
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/${id}`);
        if (!res.ok) throw new Error("কোর্স খুঁজে পাওয়া যায়নি");
        const data = await res.json();

        const featuresString = data.features ? data.features.join("\n") : "";

        setFormData({
          title: data.title || "",
          description: data.description || "",
          duration: data.duration || "",
          students: data.students?.toString() || "",
          level: data.level || "শিক্ষানবিস",
          features: featuresString,
          status: data.status || "active",
          popular: data.popular || false,
        });
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("কোর্স লোড করতে সমস্যা হয়েছে");
        router.push("/dashboard/courses");
      } finally {
        setFetching(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const featuresArray = formData.features
      .split("\n")
      .filter((item) => item.trim() !== "");

    const courseData = {
      title: formData.title,
      description: formData.description,
      duration: formData.duration,
      students: parseInt(formData.students) || 0,
      level: formData.level,
      features: featuresArray,
      status: formData.status,
      popular: formData.popular,
    };

    setLoading(true);

    try {
      const { data, error } = await authClient.token();
      if (error) {
        toast.error("অথেনটিকেশন সমস্যা: লগইন করুন");
        setLoading(false);
        return;
      }
      const token = data?.token;

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(courseData),
      });

      const result = await res.json();

      if (result.modifiedCount > 0) {
        toast.success("কোর্স আপডেট করা হয়েছে!");
        router.push("/dashboard/courses");
      } else {
        toast.error("কোর্স আপডেট করতে সমস্যা হয়েছে");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("কিছু একটা সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner className="text-primary" size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">

      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/dashboard/courses"
          className="p-2 rounded-lg text-muted hover:text-primary hover:bg-primary/10 transition-all"
        >
          <MdArrowBack className="size-6" />
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          কোর্স সম্পাদনা করুন
        </h1>
      </div>

      <Form
        onSubmit={handleSubmit}
        className="bg-card/50 border border-border rounded-2xl p-6 md:p-8 space-y-6"
      >
        <div className="space-y-4">
          {/* title */}
          <TextField
            isRequired
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            validate={(value) => {
              if (!value || value.trim().length === 0) return "শিরোনাম আবশ্যক";
              if (value.trim().length < 3) return "শিরোনাম কমপক্ষে ৩ অক্ষর হতে হবে";
              return null;
            }}
          >
            <Label className="text-sm font-medium text-foreground">কোর্সের শিরোনাম</Label>
            <Input
              placeholder="যেমন: নুরানী কায়দা ও তাজবিদ"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
            />
            <FieldError className="text-xs text-error mt-1" />
          </TextField>

          {/* description */}
          <TextField
            isRequired
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            validate={(value) => {
              if (!value || value.trim().length === 0) return "বিবরণ আবশ্যক";
              if (value.trim().length < 10) return "বিবরণ কমপক্ষে ১০ অক্ষর হতে হবে";
              return null;
            }}
          >
            <Label className="text-sm font-medium text-foreground">বিবরণ</Label>
            <TextArea
              placeholder="কোর্সটি সম্পর্কে সংক্ষিপ্ত বিবরণ"
              minRows={2}
              maxRows={4}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition resize-none"
            />
            <FieldError className="text-xs text-error mt-1" />
          </TextField>

          {/* duration, students, level */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <TextField
              isRequired
              name="duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              validate={(value) => {
                if (!value || value.trim().length === 0) return "সময়কাল আবশ্যক";
                return null;
              }}
            >
              <Label className="text-sm font-medium text-foreground">সময়কাল</Label>
              <Input
                placeholder="যেমন: ৩ মাস"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
              />
              <FieldError className="text-xs text-error mt-1" />
            </TextField>

            <TextField
              isRequired
              name="students"
              value={formData.students}
              onChange={(e) => setFormData({ ...formData, students: e.target.value })}
              validate={(value) => {
                if (!value) return "শিক্ষার্থী সংখ্যা আবশ্যক";
                const num = parseInt(value);
                if (isNaN(num) || num < 0) return "সঠিক সংখ্যা দিন";
                return null;
              }}
            >
              <Label className="text-sm font-medium text-foreground">শিক্ষার্থী সংখ্যা</Label>
              <Input
                type="number"
                placeholder="যেমন: ১২০"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
              />
              <FieldError className="text-xs text-error mt-1" />
            </TextField>

            <div>
              <Label className="block text-sm font-medium text-foreground mb-1.5">
                স্তর
              </Label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
              >
                <option value="শিক্ষানবিস">শিক্ষানবিস</option>
                <option value="মাধ্যমিক">মাধ্যমিক</option>
                <option value="উচ্চতর">উচ্চতর</option>
                <option value="সব স্তরের জন্য">সব স্তরের জন্য</option>
              </select>
            </div>
          </div>

          {/* features */}
          <TextField
            name="features"
          >
            <Label className="text-sm font-medium text-foreground">
              ফিচার সমূহ <span className="text-muted font-normal">(প্রতি লাইনে একটি করে)</span>
            </Label>
            <TextArea
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              placeholder="মাখরাজ&#10;তাজবিদ&#10;সিফাত&#10;নাজরানা&#10;মাসনুন দোয়া"
              minRows={4}
              maxRows={8}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition resize-none"
            />
          </TextField>

          {/* status + popular */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm font-medium text-foreground mb-1.5">
                স্ট্যাটাস
              </Label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={formData.status === "active"}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-4 h-4 text-primary focus:ring-primary/20 accent-primary"
                  />
                  <span className="text-sm text-foreground">সক্রিয়</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="inactive"
                    checked={formData.status === "inactive"}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-4 h-4 text-error focus:ring-error/20 accent-error"
                  />
                  <span className="text-sm text-foreground">নিষ্ক্রিয়</span>
                </label>
              </div>
            </div>

            <div>
              <Label className="block text-sm font-medium text-foreground mb-1.5">
                জনপ্রিয় হিসেবে চিহ্নিত করুন
              </Label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.popular}
                  onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                  className="w-4 h-4 text-accent focus:ring-accent/20 accent-accent rounded"
                />
                <span className="text-sm text-foreground">
                  এই কোর্সটি জনপ্রিয় হিসেবে দেখান
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-border">
          <Link
            href="/dashboard/courses"
            className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-foreground hover:bg-primary/5 rounded-xl transition text-center"
          >
            বাতিল
          </Link>
          <Button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-primary hover:bg-primary-light text-white font-heading font-semibold py-2.5 rounded-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
          >
            <MdSave className="size-5" />
            {loading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
          </Button>
        </div>
      </Form>
    </div>
  );
}