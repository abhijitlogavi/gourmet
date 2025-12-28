"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface DeliveryMapProps {
  restaurantLocation?: { lat: number; lng: number };
  deliveryLocation?: { lat: number; lng: number };
  partnerLocation?: { lat: number; lng: number };
  className?: string;
}

export function DeliveryMap({
  restaurantLocation,
  deliveryLocation,
  partnerLocation,
  className = "",
}: DeliveryMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const partnerMarkerRef = useRef<maplibregl.Marker | null>(null);
  const restaurantMarkerRef = useRef<maplibregl.Marker | null>(null);
  const deliveryMarkerRef = useRef<maplibregl.Marker | null>(null);
  
  const [mapLoaded, setMapLoaded] = useState(false);

  const defaultCenter = { lat: 12.9716, lng: 77.5946 };
  const center = restaurantLocation || defaultCenter;

  // 1. Initialize Map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: '&copy; OpenStreetMap Contributors',
          },
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm",
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center: [center.lng, center.lat],
      zoom: 13,
    });

    map.current.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    map.current.on("load", () => {
      setMapLoaded(true);
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // 2. Update Static Markers
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    if (restaurantLocation) {
      if (!restaurantMarkerRef.current) {
        const el = document.createElement("div");
        el.innerHTML = `<div style="width: 36px; height: 36px; background: hsl(25 95% 48%); border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg></div>`;
        restaurantMarkerRef.current = new maplibregl.Marker({ element: el })
          .setLngLat([restaurantLocation.lng, restaurantLocation.lat])
          .addTo(map.current);
      } else {
        restaurantMarkerRef.current.setLngLat([restaurantLocation.lng, restaurantLocation.lat]);
      }
    }

    if (deliveryLocation) {
      if (!deliveryMarkerRef.current) {
        const el = document.createElement("div");
        el.innerHTML = `<div style="width: 36px; height: 36px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>`;
        deliveryMarkerRef.current = new maplibregl.Marker({ element: el })
          .setLngLat([deliveryLocation.lng, deliveryLocation.lat])
          .addTo(map.current);
      } else {
        deliveryMarkerRef.current.setLngLat([deliveryLocation.lng, deliveryLocation.lat]);
      }
    }
  }, [mapLoaded, restaurantLocation, deliveryLocation]);

  // 3. Update Partner Marker (Live Tracking)
  useEffect(() => {
    if (!map.current || !mapLoaded || !partnerLocation) return;

    if (partnerMarkerRef.current) {
      partnerMarkerRef.current.setLngLat([partnerLocation.lng, partnerLocation.lat]);
    } else {
      const el = document.createElement("div");

      el.style.width = "42px";
      el.style.height = "42px";
      el.style.backgroundImage = "url('/bike.svg')";
      el.style.backgroundSize = "contain";
      el.style.backgroundRepeat = "no-repeat";
      el.style.backgroundPosition = "center";
      el.style.filter = "drop-shadow(0 4px 10px rgba(0,0,0,0.35))";

      partnerMarkerRef.current = new maplibregl.Marker({ element: el })
        .setLngLat([partnerLocation.lng, partnerLocation.lat])
        .addTo(map.current);
    }

    // Use easeTo for smoother tracking without forcing zoom level
    map.current.easeTo({
      center: [partnerLocation.lng, partnerLocation.lat],
      duration: 1000, // Smooth transition duration
      easing: (t) => t,
      essential: true
      // Note: Removed 'zoom' property here to respect user's zoom preference
    });
  }, [mapLoaded, partnerLocation?.lat, partnerLocation?.lng]);

  return <div ref={mapContainer} className={`w-full h-full ${className}`} />;
}