"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import RenderMarkers from "./render-markers";

import { Coordinates, LeafletMapProps } from "@/types/point-types";
import { LatLngExpression } from "leaflet";
import L from "leaflet";

interface MapProps extends LeafletMapProps {
  homePoint?: Coordinates;
  homeAddress?: string;
}

const homeIcon = L.divIcon({
  className: "custom-marker",
  html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#F56416" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                `,
  iconSize: [20, 20],
  iconAnchor: [11, 24],
  popupAnchor: [0, -24],
});

const LeafletMap = ({ points, homePoint, homeAddress }: MapProps) => {
  const HomePosition: LatLngExpression | undefined = homePoint
    ? [parseFloat(homePoint.y.toString()), parseFloat(homePoint.x.toString())]
    : undefined;

  return (
    <MapContainer
      center={HomePosition || [50.83997274798375, 12.927821405376726]}
      zoom={14}
      scrollWheelZoom={true}
      className="w-full h-full z-10"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={20}
      />

      {/* Home Marker  */}
      {HomePosition && (
        <Marker position={HomePosition} icon={homeIcon}>
          <Popup>
            <div>
              <h2 className="text-lg mb-2 font-bold">Home Details</h2>
              <div className="pb-1">
                <strong>Coordinates: </strong>
                {HomePosition[0]},{HomePosition[1]}
              </div>
              <div>
                <strong>Address: </strong>
                {homeAddress || "Your home sweet home"}
              </div>
            </div>
          </Popup>
        </Marker>
      )}

      {/* flagged Markers  */}
      <RenderMarkers points={points} />
    </MapContainer>
  );
};

export default LeafletMap;
