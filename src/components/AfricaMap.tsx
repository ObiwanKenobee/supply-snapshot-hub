import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  const [token, setToken] = useState("");
  const [mapInitialized, setMapInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializeMap = () => {
    if (!mapContainer.current || !token || mapInitialized) return;

    try {
      mapboxgl.accessToken = token;
      const markers: mapboxgl.Marker[] = [];
      
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [20, 0],
        zoom: 2.5,
        projection: "mercator",
        transformRequest: (url: string, resourceType: string) => {
          if (resourceType === 'Source' || resourceType === 'Tile') {
            return {
              url: url.replace(':/', '://'),
            };
          }
        },
      });

      map.addControl(new mapboxgl.NavigationControl(), "top-right");

      map.on("load", () => {
        points.forEach((point) => {
          const marker = new mapboxgl.Marker()
            .setLngLat(point.coordinates)
            .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>${point.name}</h3>`))
            .addTo(map);
          markers.push(marker);
        });
      });

      map.on("error", (e) => {
        console.error("Mapbox error:", e);
        setError("An error occurred while loading the map. Please check your token and try again.");
        setMapInitialized(false);
      });

      setMapInitialized(true);
      setError(null);

      return () => {
        markers.forEach((marker) => marker.remove());
        map.remove();
        setMapInitialized(false);
      };
    } catch (error) {
      console.error("Error initializing map:", error);
      setError("Failed to initialize the map. Please check your token and try again.");
      setMapInitialized(false);
    }
  };

  useEffect(() => {
    if (token) {
      const cleanup = initializeMap();
      return () => cleanup?.();
    }
  }, [token]);

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Supply Chain Network</CardTitle>
      </CardHeader>
      <CardContent>
        {!mapInitialized && (
          <div className="mb-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Please enter your Mapbox public token to view the map. You can get one from{" "}
              <a
                href="https://www.mapbox.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Mapbox
              </a>
            </p>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter Mapbox token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
              <Button onClick={initializeMap} disabled={!token}>
                Initialize Map
              </Button>
            </div>
          </div>
        )}
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