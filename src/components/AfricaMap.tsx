import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const AfricaMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = "YOUR_MAPBOX_TOKEN"; // User needs to provide this
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [20, 0] as [number, number], // Explicitly type as tuple
      zoom: 2.5,
      projection: "mercator",
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Add some example supply chain points with explicit typing
    const points: Array<{ coordinates: [number, number]; name: string }> = [
      { coordinates: [36.8219, -1.2921], name: "Nairobi Hub" },
      { coordinates: [3.3792, 6.5244], name: "Lagos Distribution" },
      { coordinates: [31.2357, 30.0444], name: "Cairo Warehouse" },
    ];

    map.current.on("load", () => {
      if (!map.current) return;

      points.forEach((point) => {
        new mapboxgl.Marker({ color: "#C84E31" })
          .setLngLat(point.coordinates)
          .setPopup(new mapboxgl.Popup().setHTML(point.name))
          .addTo(map.current!);
      });
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Supply Chain Network</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={mapContainer} className="h-[400px] rounded-lg" />
      </CardContent>
    </Card>
  );
};

export default AfricaMap;