import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Set your Mapbox token here
mapboxgl.accessToken = "YOUR_MAPBOX_TOKEN";

const points = [
  { coordinates: [36.8219, -1.2921], name: "Nairobi Hub" },
  { coordinates: [3.3792, 6.5244], name: "Lagos Distribution" },
  { coordinates: [31.2357, 30.0444], name: "Cairo Warehouse" },
] as const;

const AfricaMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [20, 0],
      zoom: 2.5,
      projection: "mercator",
    });

    // Add navigation control
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Create markers array to track them for cleanup
    const markers: mapboxgl.Marker[] = [];

    // Add markers when map loads
    map.on("load", () => {
      points.forEach((point) => {
        const marker = new mapboxgl.Marker()
          .setLngLat(point.coordinates)
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>${point.name}</h3>`))
          .addTo(map);
        markers.push(marker);
      });
    });

    // Cleanup function
    return () => {
      markers.forEach((marker) => marker.remove());
      map.remove();
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