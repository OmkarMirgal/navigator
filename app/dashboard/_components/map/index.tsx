import dynamic from "next/dynamic";

const Map = dynamic(() => import("./leaflet-map"), {
  ssr: false,
});

export default Map;
