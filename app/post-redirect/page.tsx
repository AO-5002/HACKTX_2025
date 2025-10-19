"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/layouts/Layout";
import { Loader2 } from "lucide-react";

function PostLoginRedirect() {
  const router = useRouter();

  // Redirect after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard/1");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center w-full h-[80vh]">
        {/* Spinner */}
        <Loader2 className="animate-spin text-zinc-700 w-10 h-10 mb-4" />

        {/* Text */}
        <h1 className="text-lg font-medium text-zinc-700">
          Redirecting you to your dashboard...
        </h1>
        <p className="text-xs text-zinc-400 mt-2">Please wait a moment</p>
      </div>
    </Layout>
  );
}

export default PostLoginRedirect;
