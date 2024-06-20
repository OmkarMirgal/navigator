"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { axiosApiCall } from "@/lib/utils";
import { useHomeAddressModal } from "@/store/use-rename-modal";
import { LogOut } from "lucide-react";

const Logout = () => {
  const router = useRouter();
  const { setAddressSet } = useHomeAddressModal();

  const handleClick = async () => {
    try {
      const response = await axiosApiCall("post", "auth/logout/api");
      if (response.status === 200) {
        toast.success(response.data?.success);
        // Redirect to the home page after logout
        router.push("/");
        //to reset the home address modal dialog visibility
        setTimeout(() => {
          setAddressSet(false);
        }, 500);
      } else {
        toast.error("Logout failed");
        console.error("Logout failed", response.data);
      }
    } catch (error) {
      toast.error("An error occurred during logout");
      console.error("An error occurred during logout", error);
    }
  };

  return (
    <div onClick={handleClick} className="flex w-full">
      <LogOut className="h-4 w-4 mr-2" />
      Logout
    </div>
  );
};

export default Logout;
