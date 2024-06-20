"use client";

import { useEffect, useState } from "react";
import HomeAddressModal from "@/components/modal/home-address-modal";

interface ModalProviderProps {
  userId: number;
}

const ModalProvider = ({ userId }: ModalProviderProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <HomeAddressModal userId={userId} />;
};

export default ModalProvider;
