"use client";

import React from "react";
import DashboardContent from "./dashboard-content";
import ModalProvider from "@/providers/modal-provider";
import { HomeAdressResponse } from "@/types/req-res-types";
import { Points } from "@/types/point-types";
import { useHomeAddressModal } from "@/store/use-rename-modal";

interface IDashboardMountProps {
  userId: string;
  userAddress: HomeAdressResponse | null | undefined;
  POI: Points;
}

const DashboardPageCondionalMount = ({
  userId,
  userAddress,
  POI,
}: IDashboardMountProps) => {
  const { addressSet } = useHomeAddressModal((state) => state);
  return (
    <>
      {userId && (userAddress !== null || addressSet) ? (
        <DashboardContent points={POI} userId={userId} />
      ) : (
        <ModalProvider userId={Number(userId)} />
      )}
    </>
  );
};

export default DashboardPageCondionalMount;
