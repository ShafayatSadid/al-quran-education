// app/dashboard/reviews/[id]/edit/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
import { CldUploadWidget } from "next-cloudinary";
import {
  MdArrowBack,
  MdSave,
  MdClose,
  MdCloudUpload
} from "react-icons/md";
import toast from "react-hot-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { authClient } from "@/lib/auth-client";

export default function EditReviewPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [initialData, setInitialData] = useState({
    studentName: "",
    role: "",
    rating: "5",
    comment: "",
    date: "",
  });
  const [imageUrl, setImageUrl] = useLocalStorage("editReviewImageUrl", "");

  // রিভিউ ডেটা fetch
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/${id}`);
        if (!res.ok) throw new Error("রিভিউ খুঁজে পাওয়া যায়নি");
        const data = await res.json();

        setInitialData({
          studentName: data.studentName || "",
          role: data.role || "",
          rating: data.rating?.toString() || "5",
          comment: data.comment || "",
          date: data.date || "",
        });
        setImageUrl(data.image || "");
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("রিভিউ লোড করতে সমস্যা হয়েছে");
        router.push("/dashboard/reviews");
      } finally {
        setFetching(false);
      }
    };

    if (id) {
      fetchReview();
    }
  }, [id, router]);

  const handleUploadSuccess = (result) => {
    if (result.event === "success") {
      setImageUrl(result.info.secure_url);
      toast.success("ছবি আপলোড সফল হয়েছে!");
    }
  };

  const handleRemoveImage = () => {
    setImageUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData(e.currentTarget);
    const data = Object.fromEntries(formDataObj.entries());

    const reviewData = {
      studentName: data.studentName,
      role: data.role,
      rating: parseInt(data.rating),
      comment: data.comment,
      date: data.date,
      image: imageUrl,
    };

    if (!reviewData.studentName.trim()) {
      toast.error("শিক্ষার্থীর নাম আবশ্যক");
      return;
    }
    if (!reviewData.comment.trim()) {
      toast.error("মন্তব্য আবশ্যক");
      return;
    }

    setLoading(true);

    try {
      const { data: tokenData, error } = await authClient.token();
      if (error) {
        toast.error("অথেনটিকেশন সমস্যা: লগইন করুন");
        setLoading(false);
        return;
      }
      const token = tokenData?.token;

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
      });

      const result = await res.json();

      if (result.modifiedCount > 0) {
        toast.success("রিভিউ আপডেট করা হয়েছে!");
        localStorage.removeItem("editReviewImageUrl");
        router.push("/dashboard/reviews");
      } else {
        toast.error("রিভিউ আপডেট করতে সমস্যা হয়েছে");
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
          href="/dashboard/reviews"
          className="p-2 rounded-lg text-muted hover:text-primary hover:bg-primary/10 transition-all"
        >
          <MdArrowBack className="size-6" />
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          রিভিউ সম্পাদনা করুন
        </h1>
      </div>

      <Form
        onSubmit={handleSubmit}
        className="bg-card/50 border border-border rounded-2xl p-6 md:p-8 space-y-6"
      >
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
                        alt="শিক্ষার্থীর ছবি"
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

          {/* ===== ফর্ম ফিল্ড ===== */}
          <div className="md:col-span-2 space-y-4">
            {/* studentName */}
            <TextField
              isRequired
              name="studentName"
              defaultValue={initialData.studentName}
              validate={(value) => {
                if (!value || value.trim().length === 0) return "শিক্ষার্থীর নাম আবশ্যক";
                return null;
              }}
            >
              <Label className="text-sm font-medium text-foreground">শিক্ষার্থীর নাম</Label>
              <Input
                placeholder="যেমন: মোইদুল ইসলাম মন্ডল"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
              />
              <FieldError className="text-xs text-error mt-1" />
            </TextField>

            {/* role */}
            <TextField
              name="role"
              defaultValue={initialData.role}
            >
              <Label className="text-sm font-medium text-foreground">
                ভূমিকা <span className="text-muted font-normal">(ঐচ্ছিক)</span>
              </Label>
              <Input
                placeholder="যেমন: শিক্ষার্থী, শিক্ষক এবং নাগরিক পরিচয়"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
              />
            </TextField>

            {/* rating + date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm font-medium text-foreground mb-1.5">
                  রেটিং
                </Label>
                <select
                  name="rating"
                  defaultValue={initialData.rating}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                >
                  <option value="1">⭐ ১</option>
                  <option value="2">⭐⭐ ২</option>
                  <option value="3">⭐⭐⭐ ৩</option>
                  <option value="4">⭐⭐⭐⭐ ৪</option>
                  <option value="5">⭐⭐⭐⭐⭐ ৫</option>
                </select>
              </div>

              <TextField
                isRequired
                name="date"
                defaultValue={initialData.date}
                validate={(value) => {
                  if (!value) return "তারিখ আবশ্যক";
                  return null;
                }}
              >
                <Label className="text-sm font-medium text-foreground">তারিখ</Label>
                <Input
                  type="date"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
                <FieldError className="text-xs text-error mt-1" />
              </TextField>
            </div>

            {/* comment */}
            <TextField
              isRequired
              name="comment"
              defaultValue={initialData.comment}
              validate={(value) => {
                if (!value || value.trim().length === 0) return "মন্তব্য আবশ্যক";
                if (value.trim().length < 10) return "মন্তব্য কমপক্ষে ১০ অক্ষর হতে হবে";
                return null;
              }}
            >
              <Label className="text-sm font-medium text-foreground">মন্তব্য</Label>
              <TextArea
                placeholder="শিক্ষার্থীর মতামত লিখুন"
                minRows={4}
                maxRows={8}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition resize-none"
              />
              <FieldError className="text-xs text-error mt-1" />
            </TextField>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-border">
          <Link
            href="/dashboard/reviews"
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