// components/shared/DeleteButton.jsx
"use client";

import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

const DeleteButton = ({
  id,          // ডকুমেন্টের আইডি (teacherId, courseId, reviewId)
  name,        // ডিলিট হওয়া আইটেমের নাম (শিক্ষকের নাম, কোর্সের নাম)
  endpoint,    // API এন্ডপয়েন্ট (teachers, courses, reviews)
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    const { data, error } = await authClient.token();
    const token = data?.token;
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${endpoint}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success(`${name || "আইটেম"} সফলভাবে ডিলিট করা হয়েছে!`);
        router.push('/dashboard/teachers') // পেজ রিফ্রেশ না করেই ডেটা আপডেট
      } else {
        toast.error("ডিলিট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("কিছু একটা সমস্যা হয়েছে।");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      {/* ট্রিগার বাটন – থিম অনুযায়ী */}
      <Button
        className="bg-error/10 hover:bg-error/20 text-error text-sm rounded-xl"
        disabled={isLoading}
      >
        <MdDelete />
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px] bg-card border border-border rounded-2xl shadow-xl p-0 overflow-hidden">
            {/* ক্লোজ বাটন */}
            <AlertDialog.CloseTrigger className="absolute top-4 right-4 text-muted hover:text-foreground transition" />

            <AlertDialog.Header className="px-6 pt-6 pb-3">
              <div className="flex items-start gap-3">
                <AlertDialog.Icon status="danger" className="text-error text-2xl" />
                <AlertDialog.Heading className="font-heading text-lg font-bold text-foreground">
                  নিশ্চিত করুন?
                </AlertDialog.Heading>
              </div>
            </AlertDialog.Header>

            <AlertDialog.Body className="px-6 pb-4">
              <p className="font-body text-sm text-foreground/70">
                আপনি কি <strong className="text-foreground">{name || "এই আইটেমটি"}</strong> স্থায়ীভাবে ডিলিট করতে চান?
                <br />
                <span className="text-error/70 text-xs">এই কাজটি পূর্বাবস্থায় ফেরানো সম্ভব নয়।</span>
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer className="px-6 pb-6 pt-3 flex justify-end gap-3 border-t border-border">
              <Button
                slot="close"
                variant="light"
                className="bg-muted/10 hover:bg-muted/20 text-foreground font-body font-medium px-5 py-2 rounded-xl transition"
              >
                বাতিল
              </Button>
              <Button
                onClick={handleDelete}
                slot="close"
                variant="danger"
                className="bg-error hover:bg-error/80 text-white font-heading font-semibold px-5 py-2 rounded-xl transition shadow-md"
                disabled={isLoading}
              >
                {isLoading ? "ডিলিট হচ্ছে..." : "ডিলিট করুন"}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default DeleteButton;