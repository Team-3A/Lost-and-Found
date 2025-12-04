"use client";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
const NEXT_PUBLIC_MAPS_API_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY as string;
function GoogleMaps() {
  const position = { lat: 47.88, lng: 106.9 };

  return (
    <APIProvider apiKey={NEXT_PUBLIC_MAPS_API_KEY}>
      <Map
        style={{
          width: "1024px",
          height: "400px",
          margin: "auto",
          marginTop: "80px",
          borderRadius: 25,
        }}
        defaultCenter={position}
        defaultZoom={10}
        gestureHandling="greedy"
        disableDefaultUI
        mapId="DEMO_MAP_ID"
      >
        <AdvancedMarker position={position} />
      </Map>
    </APIProvider>
  );
}

export default GoogleMaps;
