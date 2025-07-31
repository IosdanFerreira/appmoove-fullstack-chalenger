import "leaflet/dist/leaflet.css";

import { useEffect, useRef } from "react";

import L from "leaflet";

interface WeatherMapProps {
  latitude: number;
  longitude: number;
  cityName: string;
}

const WeatherMap = ({ latitude, longitude, cityName }: WeatherMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Inicializa o mapa uma vez
      if (!mapRef.current) {
        mapRef.current = L.map("map").setView([latitude, longitude], 10);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapRef.current);
      }

      const customIcon = L.divIcon({
        html: `
    <div class="bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center" style="width:40px; height:40px; border: 2px solid white;">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    </div>`,
        className: "",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      // Cria ou atualiza marcador
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
  }, [latitude, longitude, cityName]);

  return <div id="map" className="h-[400px] w-full" />;
};

export default WeatherMap;
