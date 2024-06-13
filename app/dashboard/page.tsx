import React from "react";

import { getAllPoints } from "@/lib/utils";
import { Points } from "@/types/point-types";
import DashboardContent from "./_components/dashboard-content";
import { getSession } from "@/lib/auth";

const DashboardPage = async () => {
  const POI: Points = await getAllPoints();

  const session = await getSession();
  const userId = session.user.id;

  return (
    <>
      <DashboardContent points={POI} userId={userId} />
    </>
  );
};

export default DashboardPage;
