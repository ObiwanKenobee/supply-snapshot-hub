import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Set your Mapbox token here
mapboxgl.accessToken = "YOUR_MAPBOX_TOKEN";

interface MapPoint {
  coordinates: [number, number];
  name: string;
}

const points: MapPoint[] = [
  { coordinates: [36.8219, -1.2921], name: "Nairobi Hub" },
  { coordinates: [3.3792, 6.5244], name: "Lagos Distribution" },
  { coordinates: [31.2357, 30.0444], name: "Cairo Warehouse" },
];

const AfricaMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || map) return;

    const initializeMap = () => {
      try {
        const newMap = new mapboxgl.Map({
          container: mapContainer.current!,
          style: "mapbox://styles/mapbox/dark-v11",
          center: [20, 0],
          zoom: 2.5,
          projection: "mercator",
        });

        newMap.addControl(new mapboxgl.NavigationControl(), "top-right");

        newMap.on("load", () => {
          const newMarkers = points.map(point => {
            const marker = new mapboxgl.Marker()
              .setLngLat(point.coordinates)
              .setPopup(
                new mapboxgl.Popup({ offset: 25 })
                  .setHTML(`<h3>${point.name}</h3>`)
              )
              .addTo(newMap);
            return marker;
          });
          setMarkers(newMarkers);
        });

        setMap(newMap);
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };

    initializeMap();

    // Cleanup function
    return () => {
      markers.forEach(marker => marker.remove());
      if (map) {
        map.remove();
        setMap(null);
        setMarkers([]);
      }
    };
  }, []);

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Supply Chain Network</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          ref={mapContainer}
          className="h-[400px] w-full rounded-md border"
          style={{ background: "#1a1a1a" }}
        />
      </CardContent>
    </Card>
  );
};

export default AfricaMap;