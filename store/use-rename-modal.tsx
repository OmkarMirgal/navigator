import { create } from "zustand";

interface IHomeModalProps {
  isOpen: boolean;
  initialValues: { address: string };
  addressSet: boolean;
  onOpen: () => void;
  onClose: () => void;
  setAddressSet: (addressSet: boolean) => void;
}

export const useHomeAddressModal = create<IHomeModalProps>((set) => ({
  isOpen: false,
  initialValues: { address: "" },
  addressSet: false,
  onOpen: () =>
    set({
      isOpen: true,
      initialValues: { address: "" },
    }),
  onClose: () =>
    set({
      isOpen: false,
      initialValues: { address: "" },
    }),
  setAddressSet: (addressSet) =>
    set({
      addressSet,
    }),
}));
