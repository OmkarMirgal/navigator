"use client";

import { useEffect, useState } from "react";

import { axiosApiCall } from "@/lib/utils";

import L from "leaflet";
import { LatLngExpression } from "leaflet";
import { Marker, Popup } from "react-leaflet";

import { LeafletMapProps, PopupPoint } from "@/types/point-types";
import FavouriteIcon from "./favourite-icon";
import { usePOI } from "@/context/POIContext";
import { Badge } from "@/components/ui/badge";

interface PopupContentItem {
  key: string;
  value: any;
}

const RenderMarkers = ({ points }: LeafletMapProps) => {
  let markers = [];
  // const [popupContent, setPopupContent] = useState<PopupContent>({});
  const [popupContent, setPopupContent] = useState<PopupContentItem[]>([]);

  const { userId } = usePOI();

  const handleMarkerClick = async ({ category, x, y }: PopupPoint) => {
    try {
      // Empty the popupContent state
      // setPopupContent({});

      const response = await axiosApiCall("post", "api/marker-details", {
        category,
        x,
        y,
      });
      if (response.status == 200) {
        // setPopupContent(() => ({
        //   [category + "-[" + x + "]-[" + y + "]"]: response.data,
        // }));
        const dataArray = Object.entries(response.data)
          .filter(([_, value]) => value !== "")
          .map(([key, value]) => ({ key, value }));

        setPopupContent(dataArray);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  for (const category in points) {
    if (points.hasOwnProperty(category)) {
      const coordinates = points[category];

      for (const key in coordinates) {
        if (coordinates.hasOwnProperty(key)) {
          const point = coordinates[key];

          const position: LatLngExpression = [
            parseFloat(point.y),
            parseFloat(point.x),
          ];

          // const customIcon = L.divIcon({
          //   className: "custom-marker",
          //   html: `<div style="background-color: ${point.color}; width: 6px; height: 6px; border-radius: 50%;"></div>`,
          //   iconSize: [20, 20],
          //   iconAnchor: [10, 10],
          //   popupAnchor: [0, -10],
          // });

          const customIcon = L.divIcon({
            className: "custom-marker",
            html: `
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-crosshair">
            <circle cx="12" cy="12" r="6" fill="${point.color}" />
            <circle cx="12" cy="12" r="2" fill="white" />
            <line x1="22" x2="18" y1="12" y2="12" />
            <line x1="6" x2="2" y1="12" y2="12" />
            <line x1="12" x2="12" y1="6" y2="2" />
            <line x1="12" x2="12" y1="22" y2="18" />
          </svg>
                          `,
            iconSize: [20, 20],
            iconAnchor: [11, 24],
            popupAnchor: [0, -24],
          });

          // const customIcon = L.divIcon({
          //   className: "custom-marker",
          //   html: `
          //       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${point.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-school"><path d="M14 22v-4a2 2 0 1 0-4 0v4"/><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/><path d="M18 5v17"/><path d="m4 6 8-4 8 4"/><path d="M6 5v17"/><circle cx="12" cy="9" r="2"/></svg>
          //       `,
          //   iconSize: [20, 20],
          //   iconAnchor: [11, 24],
          //   popupAnchor: [0, -24],
          // });

          markers.push(
            <Marker
              key={`${category}-${key}`}
              position={position}
              icon={customIcon}
              eventHandlers={{
                click: () =>
                  handleMarkerClick({
                    category: point.category,
                    x: position[1].toString(),
                    y: position[0].toString(),
                  }),
              }}
            >
              <Popup autoPan={true} maxWidth={300} className="max-w-md">
                <div className="relative">
                  <h2 className="text-lg font-semibold mb-4 flex justify-between items-center">
                    Details
                    <Badge
                      variant="default"
                      className="absolute right-6 top-1 mr-2 hover:bg-green-600 hover:cursor-pointer "
                    >
                      Get Distance
                    </Badge>
                    {popupContent.length > 0 && (
                      <FavouriteIcon
                        id={popupContent[0].value}
                        details={point}
                        userId={userId}
                      />
                    )}
                  </h2>
                  <div className="max-h-72 overflow-auto">
                    <strong>Category: </strong> {point.category} <br />
                    <strong>Coordinates: </strong> {position.join(", ")} <br />
                    {popupContent.length > 0 ? (
                      popupContent.map((item, index) => (
                        <div key={index} className="flex">
                          <strong className="mr-1">{item.key}:</strong>{" "}
                          {item.value}
                        </div>
                      ))
                    ) : (
                      <div className="">Loading more details...</div>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        }
      }
    } else {
      return null;
    }
  }
  return markers;
};

export default RenderMarkers;
