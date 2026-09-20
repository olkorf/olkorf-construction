"use client";

import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { LocationsMapFallback } from "./locations-map";

const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

// Geodesic 50-mile circle, rather than a screen-space approximation.
function serviceBoundary() {
  const lat = 43.0731 * Math.PI / 180;
  const lng = -89.4012 * Math.PI / 180;
  const distance = 80.4672 / 6371;
  return Array.from({ length: 129 }, (_, i) => {
    const bearing = i / 128 * 2 * Math.PI;
    const y = Math.asin(Math.sin(lat) * Math.cos(distance) + Math.cos(lat) * Math.sin(distance) * Math.cos(bearing));
    const x = lng + Math.atan2(Math.sin(bearing) * Math.sin(distance) * Math.cos(lat), Math.cos(distance) - Math.sin(lat) * Math.sin(y));
    return [x * 180 / Math.PI, y * 180 / Math.PI];
  });
}

export function LocationsMap() {
  const container = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!token || !container.current || failed) return;
    let disposed = false;
    let map: import("mapbox-gl").Map | undefined;
    let observer: ResizeObserver | undefined;
    import("mapbox-gl").then(({ default: mapboxgl }) => {
      if (disposed || !container.current) return;
      map = new mapboxgl.Map({
        container: container.current, accessToken: token,
        style: "mapbox://styles/mapbox/light-v11",
        center: [-89.4012, 43.0731], zoom: 7, minZoom: 5, maxZoom: 14,
        scrollZoom: false, dragRotate: false, pitchWithRotate: false,
      });
      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");
      map.on("error", () => { if (!disposed) setFailed(true); });
      map.on("load", () => {
        if (!map || disposed) return;
        map.addSource("service-area", { type: "geojson", data: {
          type: "Feature", properties: {}, geometry: { type: "Polygon", coordinates: [serviceBoundary()] },
        } });
        map.addLayer({ id: "service-fill", type: "fill", source: "service-area", paint: { "fill-color": "#203f60", "fill-opacity": 0.07 } });
        map.addLayer({ id: "service-outline", type: "line", source: "service-area", paint: { "line-color": "#203f60", "line-width": 1.5, "line-opacity": 0.65, "line-dasharray": [3, 3] } });
        const marker = document.createElement("div");
        marker.className = "service-map-pin";
        marker.textContent = "Madison";
        new mapboxgl.Marker({ element: marker }).setLngLat([-89.4012, 43.0731]).addTo(map);
        map.fitBounds([[-90.42, 42.34], [-88.38, 43.81]], { padding: 45, duration: 0 });
      });
      observer = new ResizeObserver(() => map?.resize());
      observer.observe(container.current);
    }).catch(() => { if (!disposed) setFailed(true); });
    return () => { disposed = true; observer?.disconnect(); map?.remove(); };
  }, [failed]);

  if (!token || failed) return <LocationsMapFallback />;
  return <div className="service-map-shell"><div ref={container} className="service-map-canvas" aria-label="Interactive map of our service area around Madison" /></div>;
}
