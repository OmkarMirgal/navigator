"use client";

import { useState } from "react";
import { axiosApiCall } from "@/lib/utils";
import { usePOI } from "@/context/POIContext";

import L from "leaflet";
import "leaflet-routing-machine";
import { LatLngExpression } from "leaflet";
import { Marker, Popup, useMap } from "react-leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "./custom-leaflet-routing.css";

import FavouriteIcon from "./favourite-icon";
import { Badge } from "@/components/ui/badge";
import { Coordinates, LeafletMapProps, PopupPoint } from "@/types/point-types";

interface PopupContentItem {
  key: string;
  value: any;
}

interface MarkerProps extends LeafletMapProps {
  homePoints: LatLngExpression;
}

const RenderMarkers = ({ points, homePoints }: MarkerProps) => {
  const { userId } = usePOI();
  const [time, setTime] = useState<String>("");
  const [distance, setDistance] = useState<String>("");
  const [popupContent, setPopupContent] = useState<PopupContentItem[]>([]);
  const [hasRoutingDetails, setHasRoutingDetails] = useState<Boolean>(false);

  const handleMarkerClick = async ({ category, x, y }: PopupPoint) => {
    try {
      const response = await axiosApiCall("post", "api/marker-details", {
        category,
        x,
        y,
      });
      if (response.status == 200) {
        const dataArray = Object.entries(response.data)
          .filter(([_, value]) => value !== "")
          .map(([key, value]) => ({ key, value }));

        setPopupContent(dataArray);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const map = useMap();
  const homeAddress = homePoints;
  let routingControl: L.Routing.Control | null = null;

  const handleGetDistanceClick = (position: LatLngExpression) => {
    const homeLatLng = L.latLng(homeAddress);
    const facilityLatLng = Array.isArray(position)
      ? L.latLng(position[0], position[1])
      : L.latLng((position as L.LatLng).lat, (position as L.LatLng).lng);

    routingControl = L.Routing.control({
      waypoints: [homeLatLng, facilityLatLng],
      routeWhileDragging: true,
      showAlternatives: true,
      fitSelectedRoutes: true,

      /** This is a custom option added in Routing.control(options),
          prevents the markers to be added for start and end position **/
      createMarker: function (
        i: number,
        waypoint: L.Routing.Waypoint,
        n: number
      ) {
        return undefined;
      },
    }).addTo(map);

    routingControl.on("routesfound", function (e) {
      const routes = e.routes;
      const summary = routes[0].summary;
      const distanceInKm = (summary.totalDistance / 1000).toFixed(2); // Convert meters to kilometers
      const timeInMins = (summary.totalTime / 60).toFixed(2); // Convert seconds to minutes
      setDistance(distanceInKm);
      setTime(timeInMins);
      setHasRoutingDetails(true);
    });
  };

  map.on("popupclose", () => {
    if (routingControl) {
      routingControl.remove();
      setDistance("");
      setHasRoutingDetails(false);
    }
  });

  let markers = [];
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
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold  flex">Details</h2>
                    <div>
                      {!hasRoutingDetails && (
                        <Badge
                          variant="default"
                          className="absolute right-6 top-1 mr-2 hover:bg-green-600 hover:cursor-pointer "
                          onClick={() => handleGetDistanceClick(position)}
                        >
                          Get Distance
                          {/* {distance.length !== 0
                          ? `${distance} kms from home`
                          : `Get Distance`} */}
                        </Badge>
                      )}
                      {popupContent.length > 0 && (
                        <FavouriteIcon
                          id={popupContent[0].value}
                          details={point}
                          userId={userId}
                        />
                      )}
                    </div>
                  </div>
                  {distance.length !== 0 && (
                    <div className="mb-4 bg-slate-200 rounded p-2">
                      <div className="flex">
                        <strong>Distance: </strong>
                        <span className="ml-1">{`${distance} kms`}</span>
                      </div>
                      <div className="flex">
                        <strong>time: </strong>
                        <span className="ml-1">{`${time} mins`}</span>
                      </div>
                    </div>
                  )}
                  {/* <h2 className="text-lg font-semibold mb-4 flex justify-between items-center">
                    Details
                    <Badge
                      variant="default"
                      className="absolute right-6 top-1 mr-2 hover:bg-green-600 hover:cursor-pointer "
                      onClick={() => handleGetDistanceClick(position)}
                    >
                      {distance.length !== 0
                        ? `${distance} kms from home`
                        : `Get Distance`}
                    </Badge>
                    {popupContent.length > 0 && (
                      <FavouriteIcon
                        id={popupContent[0].value}
                        details={point}
                        userId={userId}
                      />
                    )}
                  </h2> */}
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
