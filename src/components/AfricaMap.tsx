import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Set your Mapbox token here
mapboxgl.accessToken = "YOUR_MAPBOX_TOKEN";

const AfricaMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || mapInitialized) return;

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

      // Define supply chain points with explicit typing
      const points: Array<{ coordinates: [number, number]; name: string }> = [
        { coordinates: [36.8219, -1.2921], name: "Nairobi Hub" },
        { coordinates: [3.3792, 6.5244], name: "Lagos Distribution" },
        { coordinates: [31.2357, 30.0444], name: "Cairo Warehouse" },
      ];

      map.current.on("load", () => {
        if (!map.current) return;

        // Clear existing markers
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        // Add new markers
        points.forEach(point => {
          const marker = new mapboxgl.Marker()
            .setLngLat(point.coordinates)
            .setPopup(
              new mapboxgl.Popup({ offset: 25 })
                .setHTML(`<h3>${point.name}</h3>`)
            )
            .addTo(map.current!);

          markersRef.current.push(marker);
        });
      });

      setMapInitialized(true);
    } catch (error) {
      console.error("Error initializing map:", error);
    }

    // Cleanup function
    return () => {
      // Remove markers first
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      // Then remove the map
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      setMapInitialized(false);
    };
  }, [mapInitialized]);

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