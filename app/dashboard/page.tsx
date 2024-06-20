import React from "react";

import { getSession } from "@/lib/auth";
import { Points } from "@/types/point-types";
import { HomeAdressResponse } from "@/types/req-res-types";
import { getAllPoints, getUserAddress } from "@/lib/utils";
import DashboardPageCondionalMount from "./_components/dashboard-conditional-mount";

const DashboardPage = async () => {
  const POI: Points = await getAllPoints();

  const session = await getSession();
  const userId = await session.user.id;
  const userAddress: HomeAdressResponse | null | undefined =
    await getUserAddress(Number(userId));

  return (
    <>
      <DashboardPageCondionalMount
        userId={userId}
        userAddress={userAddress}
        POI={POI}
      />
    </>
  );
};

export default DashboardPage;
