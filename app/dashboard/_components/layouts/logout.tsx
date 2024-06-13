"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { axiosApiCall } from "@/lib/utils";

const Logout = () => {
  const router = useRouter();

  const handleClick = async () => {
    try {
      const response = await axiosApiCall("post", "auth/logout/api");
      if (response.status === 200) {
        toast.success(response.data?.success);
        // Redirect to the home page after logout
        router.push("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout", error);
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      Logout
    </div>
  );
};

export default Logout;
