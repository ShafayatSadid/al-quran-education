// app/admin/teachers/add/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Form,
  Button,
  Input,
  Label,
  FieldError,
  TextField,
  TextArea
} from "@heroui/react";
import { CldUploadWidget } from "next-cloudinary";
import {
  MdArrowBack,
  MdSave,
  MdClose,
  MdCloudUpload
} from "react-icons/md";
import toast from "react-hot-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { addTeacher } from "@/lib/actions/teachers";
import { authClient } from "@/lib/auth-client";

export default function AddTeacherPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useLocalStorage("teacherFormData", {
    name: "",
    expertise: "",
    bio: "",
    email: "",
    phone: "",
    status: "active",
    students: "",
    joined: "",
  });

  const [imageUrl, setImageUrl] = useLocalStorage("teacherImageUrl", "");

  const handleUploadSuccess = (result) => {
    if (result.event === "success") {
      setImageUrl(result.info.secure_url);
      toast.success("ছবি আপলোড সফল হয়েছে!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await authClient.token();
    const token = data?.token;
    // const formDataObj = new FormData(e.currentTarget);
    // const teacher = Object.fromEntries(formDataObj.entries());
    const teacher = { ...formData };


    setLoading(true);

    try {
      teacher.image = imageUrl;
      console.log("শিক্ষকের ডেটা:", teacher);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/teachers`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(teacher)
      })

      const result = await res.json();
      console.log('result:', result);

      if (result.insertedId) {
        toast.success("শিক্ষক যোগ করা হয়েছে!");
        localStorage.removeItem("teacherFormData");
        localStorage.removeItem("teacherImageUrl");
        router.push("/dashboard/teachers");
      }
    } catch (error) {
      toast.error("কিছু একটা সমস্যা হয়েছে");
      console.error('error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl("");
  };

  return (
    <div className="max-w-4xl mx-auto">

      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/teachers"
          className="p-2 rounded-lg text-muted hover:text-primary hover:bg-primary/10 transition-all"
        >
          <MdArrowBack className="size-6" />
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          নতুন শিক্ষক যোগ করুন
        </h1>
      </div>

      <Form
        onSubmit={handleSubmit}
        className="bg-card/50 border border-border rounded-2xl p-6 md:p-8 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

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
                          handleRemoveImage();
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

          <div className="md:col-span-2 space-y-4">
            {/* name */}
            <TextField
              isRequired
              name="name"
              defaultValue={formData.name}
              validate={(value) => {
                if (!value || value.trim().length === 0) return "নাম আবশ্যক";
                if (value.trim().length < 2) return "নাম কমপক্ষে ২ অক্ষর হতে হবে";
                return null;
              }}
            >
              <Label className="text-sm font-medium text-foreground">পূর্ণ নাম</Label>
              <Input
                name="name"
                type="text"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="শিক্ষকের পূর্ণ নাম"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
              />
              <FieldError className="text-xs text-error mt-1" />
            </TextField>
            {/* experience */}
            <TextField
              isRequired
              defaultValue={formData.expertise}
              name="expertise"
              validate={(value) => {
                if (!value || value.trim().length === 0) return "বিশেষত্ব আবশ্যক";
                return null;
              }}
            >
              <Label className="text-sm font-medium text-foreground">বিশেষত্ব</Label>
              <Input
                name="expertise"

                onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                placeholder="যেমন: তাজবিদ, তাফসীর, ফিকহ"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
              />
              <FieldError className="text-xs text-error mt-1" />
            </TextField>
            {/* email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField
                isRequired
                name="email"
                defaultValue={formData.email}
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
                  name="email"
                  type="email"

                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="teacher@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
                <FieldError className="text-xs text-error mt-1" />
              </TextField>
              {/* phone */}
              <TextField
                isRequired
                defaultValue={formData.phone}
                name="phone"
                validate={(value) => {
                  if (!value || value.trim().length === 0) return "ফোন নম্বর আবশ্যক";
                  return null;
                }}
              >
                <Label className="text-sm font-medium text-foreground">
                  ফোন <span className="text-muted font-normal">(কান্ট্রি কোড সহ)</span>
                </Label>
                <Input
                  name="phone"
                  type="tel"

                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+201554629555"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
                <FieldError className="text-xs text-error mt-1" />
              </TextField>
            </div>

            {/* students */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField
                isRequired
                defaultValue={formData.students}
                name="students"
                validate={(value) => {
                  if (!value) return "শিক্ষার্থী সংখ্যা আবশ্যক";
                  const num = parseInt(value);
                  if (isNaN(num) || num < 0) return "সঠিক সংখ্যা দিন";
                  return null;
                }}
              >
                <Label className="text-sm font-medium text-foreground">শিক্ষার্থী সংখ্যা</Label>
                <Input
                  name="students"
                  type="number"

                  onChange={(e) => setFormData({ ...formData, students: e.target.value })}
                  placeholder="যেমন: ১২০"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
                <FieldError className="text-xs text-error mt-1" />
              </TextField>

              <TextField
                isRequired
                defaultValue={formData.joined}
                name="joined"
                validate={(value) => {
                  if (!value) return "যোগদানের তারিখ আবশ্যক";
                  // ISO তারিখ ফরম্যাট চেক (YYYY-MM-DD)
                  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "সঠিক তারিখ ফরম্যাট দিন (YYYY-MM-DD)";
                  return null;
                }}
              >
                <Label className="text-sm font-medium text-foreground">যোগদানের তারিখ</Label>
                <Input
                  name="joined"
                  type="date"

                  onChange={(e) => setFormData({ ...formData, joined: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
                <FieldError className="text-xs text-error mt-1" />
              </TextField>
            </div>

            {/*  bio */}
            <TextField
              defaultValue={formData.bio}
              name="bio">
              <Label className="text-sm font-medium text-foreground">
                বায়ো <span className="text-muted font-normal">(ঐচ্ছিক)</span>
              </Label>
              <TextArea
                name="bio"

                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="h-32 max-w-120 bg-background text-foreground placeholder:text-muted/50"
                placeholder="শিক্ষকের পরিচয়, অভিজ্ঞতা ও বিশেষ দক্ষতা"
              />
            </TextField>

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
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-border">
          <Link
            href="/admin/teachers"
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
            {loading ? "সংরক্ষণ হচ্ছে..." : "শিক্ষক যোগ করুন"}
          </Button>
        </div>
      </Form>
    </div>
  );
}