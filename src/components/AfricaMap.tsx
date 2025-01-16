import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Set your Mapbox token here
mapboxgl.accessToken = "YOUR_MAPBOX_TOKEN";

const AfricaMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [20, 0] as [number, number],
        zoom: 2.5,
        projection: "mercator",
      });

      const navControl = new mapboxgl.NavigationControl();
      map.current.addControl(navControl, "top-right");

      // Add some example supply chain points with explicit typing
      const points: Array<{ coordinates: [number, number]; name: string }> = [
        { coordinates: [36.8219, -1.2921], name: "Nairobi Hub" },
        { coordinates: [3.3792, 6.5244], name: "Lagos Distribution" },
        { coordinates: [31.2357, 30.0444], name: "Cairo Warehouse" },
      ];

      map.current.on("load", () => {
        if (!map.current) return;

        points.forEach((point) => {
          const marker = new mapboxgl.Marker()
            .setLngLat(point.coordinates)
            .setPopup(new mapboxgl.Popup().setHTML(`<h3>${point.name}</h3>`))
            .addTo(map.current!);

          // Store markers in a way that can be cleaned up
          return marker;
        });
      });
    } catch (error) {
      console.error("Error initializing map:", error);
    }

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
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