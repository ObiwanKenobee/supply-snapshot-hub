import { useEffect, useRef } from "react";
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
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    const initializeMap = () => {
      if (!mapContainer.current) return;

      mapInstance.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [20, 0],
        zoom: 2.5,
        projection: "mercator",
      });

      mapInstance.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      mapInstance.current.on("load", () => {
        if (!mapInstance.current) return;
        
        points.forEach(point => {
          const marker = new mapboxgl.Marker()
            .setLngLat(point.coordinates)
            .setPopup(
              new mapboxgl.Popup({ offset: 25 })
                .setHTML(`<h3>${point.name}</h3>`)
            )
            .addTo(mapInstance.current!);
          
          markersRef.current.push(marker);
        });
      });
    };

    initializeMap();

    return () => {
      // Clean up markers
      markersRef.current.forEach(marker => {
        if (marker) marker.remove();
      });
      markersRef.current = [];

      // Clean up map
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
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