"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logout from "./logout";
import { axiosApiCall } from "@/lib/utils";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/modal/user-delete-dialog";
import { Settings, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useHomeAddressModal } from "@/store/use-rename-modal";

interface IUserSettings {
  userId: number;
}

export const UserSettings = ({ userId }: IUserSettings) => {
  const router = useRouter();
  const { setAddressSet } = useHomeAddressModal();

  const handleSettingsClick = () => {
    router.push("/dashboard/user");
  };

  const onDelete = async () => {
    try {
      const response = await axiosApiCall("post", "api/delete-user", {
        id: Number(userId),
      });
      toast.success(response.data.msg);
      router.refresh();
      //to reset the home address modal dialog visibility
      setTimeout(() => {
        setAddressSet(false);
      }, 500);
    } catch (error) {
      console.error(`Error deleting user ` + error);
      toast.error("Error deleting user");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={handleSettingsClick}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem className="hover:cursor-pointer"> */}
          <ConfirmModal
            header="Delete user?"
            description="This will delete the user and all of its data."
            onConfirm={onDelete}
          >
            <Button
              variant="ghost"
              className="p-1 pl-2 py-1 hover:cursor-pointer w-full justify-start h-fit rounded-sm"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </ConfirmModal>
          {/* </DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="hover:cursor-pointer">
            <Logout />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
