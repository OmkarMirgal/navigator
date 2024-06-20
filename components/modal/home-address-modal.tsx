// "use client";

// import { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { UserHomeForm } from "@/app/dashboard/(user)/user/_components/user-home-form";
// import { axiosApiCall, getUserAddress } from "@/lib/utils";

// interface HomeAddressModalProps {
//   userId: number;
// }

// export const HomeAddressModal = ({ userId }: HomeAddressModalProps) => {
//   const [isOpen, setOpen] = useState<boolean>(true);

//   const onClose = () => {
//     setOpen(false);
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Add Home Address</DialogTitle>
//         </DialogHeader>
//         <UserHomeForm userId={userId} />
//       </DialogContent>
//     </Dialog>
//   );
// };

"use client";

import { useEffect, useState } from "react";
import { axiosApiCall } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserHomeForm } from "@/app/dashboard/(user)/user/_components/user-home-form";
import { useHomeAddressModal } from "@/store/use-rename-modal";

interface HomeAddressModalProps {
  userId: number;
}

const HomeAddressModal = ({ userId }: HomeAddressModalProps) => {
  const { isOpen, onOpen, onClose } = useHomeAddressModal();
  // const [open, setOpen] = useState<boolean>(true);

  // const handleClose = () => {
  //   setOpen(false);
  //   setTimeout(() => {
  //     setOpen(true);
  //   }, 10);
  // };

  useEffect(() => {
    onOpen();
  }, [userId]);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      onOpen();
    }, 10);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Home Address</DialogTitle>
        </DialogHeader>
        <UserHomeForm userId={userId} />
      </DialogContent>
    </Dialog>
  );
};

export default HomeAddressModal;
