"use client";

import React, { useEffect, useState } from "react";
import MapForm from "./layouts/map-form";
import Map from "./map";
import { LeafletMapProps, Points, Coordinates } from "@/types/point-types";
import { usePOI } from "@/context/POIContext";
import { axiosApiCall } from "@/lib/utils";

interface DashboardContentProps {
  userId: string;
  points: Points;
}

const DashboardContent = ({ userId, points }: DashboardContentProps) => {
  const {
    schulenCoordinates,
    schulsocialarbeitCoordinates,
    kindertageseinrichtungenCoordinates,
    jugendberufshilfenCoordinates,
    setUserId,
  } = usePOI();

  const Flags = {
    schulenCoordinates,
    schulsocialarbeitCoordinates,
    kindertageseinrichtungenCoordinates,
    jugendberufshilfenCoordinates,
  };

  const [homeCoords, setHomeCoords] = useState<Coordinates>();
  const [homeAddress, setHomeAddress] = useState<string>("");
  // const [favFacilityCoords, setfavFacilityCoords] = useState<Coordinates>();

  useEffect(() => {
    const initializeUserData = async () => {
      try {
        // Set userId in the context
        setUserId(userId);

        // Fetch user's home address data
        const addressResponse = await axiosApiCall(
          "post",
          "api/user-home-address",
          {
            userId: Number(userId),
          }
        );
        if (addressResponse.status === 200) {
          setHomeCoords({
            x: addressResponse.data?.longitude,
            y: addressResponse.data?.latitude,
          });
          setHomeAddress(addressResponse.data?.address);
        }

        // // Fetch user's Faviourite facility Coords data
        // const favouriteResponse = await axiosApiCall(
        //   "post",
        //   "api/user-favourite",
        //   {
        //     userId: Number(userId),
        //   }
        // );
        // if (favouriteResponse.status === 200) {
        //   setfavFacilityCoords({
        //     x: favouriteResponse.data[0]?.x,
        //     y: favouriteResponse.data[0]?.y,
        //   });
        // }
      } catch (error) {
        console.error("Error initializing user data:", error);
      }
    };

    initializeUserData();
  }, [userId]);

  // Filter only the flags with values that are true
  const trueFlags = Object.fromEntries(
    Object.entries(Flags).filter(([key, value]) => value === true)
  );

  // Filter only the points with keys that are in trueFlag
  const filteredPoints = Object.fromEntries(
    Object.entries(points).filter(([key, value]) => key in trueFlags)
  );

  return (
    <>
      {/* <div
        className="relative hidden flex-col items-start gap-8 md:flex"
        x-chunk="dashboard-03-chunk-0"
      >
        <MapForm />
      </div> */}
      <div className="relative flex h-full min-h-[80vh] flex-col rounded-xl bg-muted/50 lg:p-4 sm:p-2 lg:col-span-4 md:col-span-4">
        {/* <Badge variant="outline" className="absolute right-3 top-3">
      Output
    </Badge> */}
        <div className="flex-1 h-full">
          {/* userDetailMarker={} */}

          <Map
            points={filteredPoints}
            {...(homeCoords ? { homePoint: homeCoords } : {})}
            {...(homeAddress ? { homeAddress } : {})}
          />
        </div>
      </div>
    </>
  );
};

export default DashboardContent;
