// app/dashboard/teachers/[id]/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Button,
  Form,
  Input,
  Label,
  FieldError,
  TextField,
  TextArea,
  Spinner,
} from "@heroui/react";
import { CldUploadWidget } from "next-cloudinary";
import { MdArrowBack, MdSave, MdClose, MdCloudUpload } from "react-icons/md";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function UpdateTeacherPage() {
  const router = useRouter();
  const { id } = useParams(); // ✅ ফোল্ডারের নাম [id] তাই id পাবেন
  const [loading, setLoading] = useState(false);
  const [teacher, setTeacher] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  // শিক্ষকের ডেটা fetch
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/teachers/${id}`);

        if (!res.ok) {
          throw new Error("শিক্ষক খুঁজে পাওয়া যায়নি");
        }

        const result = await res.json();
        setTeacher(result);
        setImageUrl(result?.image || null);
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("শিক্ষক লোড করতে সমস্যা হয়েছে");
        router.push("/dashboard/teachers");
      }
    };

    if (id) {
      fetchTeacher();
    }
  }, [id, router]);

  // ইমেজ আপলোড সফল হলে
  const handleUploadSuccess = (result) => {
    if (result.event === "success") {
      setImageUrl(result.info.secure_url);
      toast.success("ছবি আপলোড সফল হয়েছে!");
    }
  };

  // ফর্ম সাবমিট
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const updatedTeacher = Object.fromEntries(formData.entries());

      updatedTeacher.image = imageUrl || "";
      updatedTeacher.students = parseInt(updatedTeacher.students) || 0;

      const { data, error } = await authClient.token();
      if (error) {
        toast.error("অথেনটিকেশন সমস্যা: লগইন করুন");
        setLoading(false);
        return;
      }
      const token = data?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/teachers/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedTeacher),
        }
      );

      if (!res.ok) {
        throw new Error("শিক্ষক আপডেট করতে সমস্যা হয়েছে");
      }

      const result = await res.json();

      if (result.modifiedCount > 0) {
        toast.success("শিক্ষক সফলভাবে আপডেট করা হয়েছে!");
        router.push("/dashboard/teachers");
      } else {
        toast("কোনো পরিবর্তন করা হয়নি।");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err.message || "কিছু একটা সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  // লোডিং স্টেট
  if (!teacher) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner className="text-primary" size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* ===== হেডার ===== */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/dashboard/teachers"
          className="p-2 rounded-lg text-muted hover:text-primary hover:bg-primary/10 transition-all"
        >
          <MdArrowBack className="size-6" />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            শিক্ষক তথ্য আপডেট করুন
          </h1>
          <p className="text-sm text-muted mt-1">{teacher?.name} এর তথ্য পরিবর্তন করুন</p>
        </div>
      </div>

      {/* ===== ফর্ম ===== */}
      <div className="border border-border rounded-2xl p-6 md:p-8 bg-card/50">

        <Form className="space-y-5" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* ===== ইমেজ আপলোড ===== */}
            <div className="md:col-span-1">
              <Label className="block text-sm font-medium text-foreground mb-2">
                ছবি <span className="text-muted font-normal">(ঐচ্ছিক)</span>
              </Label>

              <CldUploadWidget
                cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={handleUploadSuccess}
                options={{
                  sources: ["local", "url", "camera"],
                  multiple: false,
                  maxFileSize: 2000000,
                  clientAllowedFormats: ["jpg", "png", "webp", "jpeg"],
                }}
              >
                {({ open }) => (
                  <div
                    onClick={() => open()}
                    className={`
                      relative w-full aspect-square rounded-xl border-2 border-dashed 
                      ${imageUrl ? "border-primary" : "border-border"}
                      bg-secondary/30 hover:bg-secondary/50 transition-all cursor-pointer
                      flex flex-col items-center justify-center overflow-hidden
                    `}
                  >
                    {imageUrl ? (
                      <>
                        <Image
                          src={imageUrl}
                          alt="শিক্ষকের ছবি"
                          fill
                          className="object-cover rounded-xl"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setImageUrl(null);
                          }}
                          className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full transition z-10"
                        >
                          <MdClose className="size-4" />
                        </button>
                      </>
                    ) : (
                      <div className="text-center p-4">
                        <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3">
                          <MdCloudUpload className="size-8 text-primary" />
                        </div>
                        <p className="text-sm font-medium text-foreground">
                          ইমেজ আপলোড করুন
                        </p>
                        <p className="text-xs text-muted mt-1">
                          PNG, JPG, WebP (সর্বোচ্চ ২MB)
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CldUploadWidget>
            </div>

            {/* ===== ফর্ম ফিল্ড ===== */}
            <div className="md:col-span-2 space-y-4">
              {/* নাম */}
              <TextField
                isRequired
                name="name"
                defaultValue={teacher?.name}
                validate={(value) => {
                  if (!value || value.trim().length === 0) return "নাম আবশ্যক";
                  if (value.trim().length < 2) return "নাম কমপক্ষে ২ অক্ষর হতে হবে";
                  return null;
                }}
              >
                <Label className="text-sm font-medium text-foreground">পূর্ণ নাম</Label>
                <Input
                  placeholder="শিক্ষকের পূর্ণ নাম"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
                <FieldError className="text-xs text-error mt-1" />
              </TextField>

              {/* বিশেষত্ব */}
              <TextField
                isRequired
                name="expertise"
                defaultValue={teacher?.expertise}
                validate={(value) => {
                  if (!value || value.trim().length === 0) return "বিশেষত্ব আবশ্যক";
                  return null;
                }}
              >
                <Label className="text-sm font-medium text-foreground">বিশেষত্ব</Label>
                <Input
                  placeholder="যেমন: তাজবিদ, তাফসীর, ফিকহ"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
                <FieldError className="text-xs text-error mt-1" />
              </TextField>

              {/* ইমেইল ও ফোন */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                  isRequired
                  name="email"
                  defaultValue={teacher?.email}
                  validate={(value) => {
                    if (!value || value.trim().length === 0) return "ইমেইল আবশ্যক";
                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                      return "সঠিক ইমেইল ঠিকানা দিন";
                    }
                    return null;
                  }}
                >
                  <Label className="text-sm font-medium text-foreground">ইমেইল</Label>
                  <Input
                    type="email"
                    placeholder="teacher@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  />
                  <FieldError className="text-xs text-error mt-1" />
                </TextField>

                <TextField
                  isRequired
                  name="phone"
                  defaultValue={teacher?.phone}
                  validate={(value) => {
                    if (!value || value.trim().length === 0) return "ফোন নম্বর আবশ্যক";
                    return null;
                  }}
                >
                  <Label className="text-sm font-medium text-foreground">
                    ফোন <span className="text-muted font-normal">(কান্ট্রি কোড সহ)</span>
                  </Label>
                  <Input
                    type="tel"
                    placeholder="+88017xxxxxxxx"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  />
                  <FieldError className="text-xs text-error mt-1" />
                </TextField>
              </div>

              {/* শিক্ষার্থী সংখ্যা ও যোগদানের তারিখ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                  isRequired
                  name="students"
                  defaultValue={teacher?.students}
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

                <TextField
                  isRequired
                  name="joined"
                  defaultValue={teacher?.joined}
                  validate={(value) => {
                    if (!value) return "যোগদানের তারিখ আবশ্যক";
                    if (!/^\d{4}-\d{2}-\d{2}$/.test(value))
                      return "সঠিক তারিখ ফরম্যাট দিন (YYYY-MM-DD)";
                    return null;
                  }}
                >
                  <Label className="text-sm font-medium text-foreground">যোগদানের তারিখ</Label>
                  <Input
                    type="date"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  />
                  <FieldError className="text-xs text-error mt-1" />
                </TextField>
              </div>

              {/* বায়ো */}
              <TextField
                name="bio"
                defaultValue={teacher?.bio}
              >
                <Label className="text-sm font-medium text-foreground">
                  বায়ো <span className="text-muted font-normal">(ঐচ্ছিক)</span>
                </Label>
                <TextArea
                  placeholder="শিক্ষকের পরিচয়, অভিজ্ঞতা ও বিশেষ দক্ষতা"
                  minRows={3}
                  maxRows={6}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition resize-none"
                />
              </TextField>

              {/* স্ট্যাটাস */}
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
                      defaultChecked={teacher?.status === "active"}
                      className="w-4 h-4 text-primary focus:ring-primary/20 accent-primary"
                    />
                    <span className="text-sm text-foreground">সক্রিয়</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      defaultChecked={teacher?.status === "inactive"}
                      className="w-4 h-4 text-error focus:ring-error/20 accent-error"
                    />
                    <span className="text-sm text-foreground">নিষ্ক্রিয়</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* ===== ফর্ম ফুটার ===== */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-border">
            <Link
              href="/dashboard/teachers"
              className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-foreground hover:bg-primary/5 rounded-xl transition text-center"
            >
              বাতিল
            </Link>
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-primary hover:bg-primary-light text-white font-heading font-semibold px-6 py-2.5 rounded-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
            >
              <MdSave className="size-5 inline mr-2" />
              {loading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}