import "leaflet/dist/leaflet.css";

import { useEffect, useRef } from "react";

import L from "leaflet";

interface WeatherMapProps {
  latitude: number;
  longitude: number;
  cityName: string;
  onCityDetected?: (city: string) => void;
}

const WeatherMap = ({
  latitude,
  longitude,
  cityName,
  onCityDetected,
}: WeatherMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!mapRef.current) {
        mapRef.current = L.map("map").setView([latitude, longitude], 10);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapRef.current);

        mapRef.current.on("click", async (e: L.LeafletMouseEvent) => {
          const { lat, lng } = e.latlng;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const data = await response.json();

            const detectedCity =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.county ||
              "";

            if (detectedCity && onCityDetected) {
              onCityDetected(detectedCity);
            }
          } catch (err) {
            console.error("Erro ao detectar cidade:", err);
          }
        });
      }

      const customIcon = L.divIcon({
        html: `<div class="bg-blue-600 text-white p-2 rounded-full border-2 border-white shadow-lg">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                   <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                   <circle cx="12" cy="10" r="3"></circle>
                 </svg>
               </div>`,
        className: "",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      if (markerRef.current) {
        markerRef.current.setLatLng([latitude, longitude]);
      } else {
        markerRef.current = L.marker([latitude, longitude], {
          icon: customIcon,
        })
          .addTo(mapRef.current!)
          .bindPopup(`<b>${cityName}</b>`);
      }

      mapRef.current.setView([latitude, longitude], 10);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  }, [latitude, longitude, cityName, onCityDetected]);

  return <div id="map" className="h-full w-full" />;
};

export default WeatherMap;
