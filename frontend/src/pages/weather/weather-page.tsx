/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  AlertTriangle,
  CloudRain,
  CloudSun,
  Droplets,
  Gauge,
  Loader2,
  MapPin,
  Sun,
  Thermometer,
  Wind,
} from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";

import { AutocompleteDropdown } from "./components/auto-complete-dropdown";
import { Card } from "@/components/ui/card";
import EyeIcon from "./components/even-icon";
import WeatherCard from "./components/weather-card";
import WeatherDetail from "./components/weather-detail";
import WeatherMap from "./components/weather-map";
import { getCities } from "@brazilian-utils/brazilian-utils";
import getUvIndexLevel from "./components/get-uv-index-level";
import { getWeatherByCity } from "../../api/modules/weather/get-weather";
import { normalizeCityName } from "./utils/normalize-city-name";
import { useQuery } from "@tanstack/react-query";

const brazilianCities = getCities();

export function WeatherPage() {
  const [city, setCity] = useState("São Paulo");
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    if (!city) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();

            if (data.address && data.address.city) {
              const cityName = data.address.city;
              if (brazilianCities.includes(cityName)) {
                setCity(cityName);
              } else if (
                data.address.town &&
                brazilianCities.includes(data.address.town)
              ) {
                setCity(data.address.town);
              } else if (
                data.address.village &&
                brazilianCities.includes(data.address.village)
              ) {
                setCity(data.address.village);
              }
            }
          } catch (error) {
            console.error("Erro ao obter cidade por coordenadas:", error);
          }
        },
        (error) => {
          console.warn("Permissão de localização negada ou erro:", error);
        }
      );
    }
  }, []);

  const {
    data: weather,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["weather", normalizeCityName(city)],
    queryFn: () => getWeatherByCity(city),
    enabled: !!city,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
        <p className="text-gray-600">Carregando dados climáticos...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">Erro ao carregar clima</p>
          <p className="text-gray-600">{error.message}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (
    !weather ||
    !weather.weatherData.forecast ||
    !weather.weatherData.forecast.forecastday ||
    weather.weatherData.forecast.forecastday.length === 0
  ) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-gray-600">Nenhum dado climático disponível</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Recarregar
        </button>
      </div>
    );
  }

  const current = weather.weatherData.current;
  const location = weather.weatherData.location;
  const forecastDay = weather.weatherData.forecast.forecastday[selectedDay];

  // Verifica se forecastDay e hour existem antes de mapear
  const temperatureData =
    forecastDay?.hour?.length > 0
      ? forecastDay.hour.map((hour) => ({
          time: hour.time.split(" ")[1].substring(0, 5),
          temp: hour.temp_c,
          feelslike: hour.feelslike_c,
        }))
      : [];

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Cabeçalho e Seletor de Cidade */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Sun className="text-yellow-500" />
          Previsão do Tempo
        </h1>

        <div className="w-full sm:w-64">
          <AutocompleteDropdown
            options={brazilianCities}
            value={city}
            onChange={setCity}
          />
        </div>
      </div>

      {/* Informações Atuais */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-white">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2 text-blue-600">
              <MapPin className="h-5 w-5" />
              <h2 className="text-xl font-semibold">
                {location.name}, {location.region}
              </h2>
              <span className="text-sm text-gray-500 ml-auto">
                {format(new Date(location.localtime), "dd/MM/yyyy")}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-5xl font-bold mt-1">{current.temp_c}°C</p>
                <div className="flex items-center gap-1">
                  {current.condition.icon && (
                    <img
                      src={`https:${current.condition.icon}`}
                      alt={current.condition.text}
                      className="h-6 w-6"
                    />
                  )}
                  <p className="text-gray-600 capitalize">
                    {current.condition.text}
                  </p>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Sensação: {current.feelslike_c}°C
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:w-72">
            <WeatherDetail
              icon={<Droplets className="h-5 w-5 text-blue-400" />}
              label="Umidade"
              value={`${current.humidity}%`}
            />
            <WeatherDetail
              icon={<Wind className="h-5 w-5 text-blue-400" />}
              label="Vento"
              value={`${current.wind_kph} km/h`}
            />
            <WeatherDetail
              icon={<Gauge className="h-5 w-5 text-blue-400" />}
              label="Pressão"
              value={`${current.pressure_mb} hPa`}
            />
            <WeatherDetail
              icon={<EyeIcon className="h-5 w-5 text-blue-400" />}
              label="Visibilidade"
              value={`${current.vis_km} km`}
            />
          </div>
        </div>
      </Card>

      <WeatherMap
        latitude={location.lat}
        longitude={location.lon}
        cityName={location.name}
      />

      {/* Gráfico de Temperatura - Só renderiza se houver dados */}
      {temperatureData.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Variação de Temperatura
            </h3>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} tickMargin={10} />
                <YAxis
                  domain={["dataMin - 2", "dataMax + 2"]}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${value}°C`}
                  tickMargin={10}
                />
                <Tooltip
                  formatter={(value, name) => [
                    `${value}°C`,
                    name === "temp" ? "Temperatura" : "Sensação",
                  ]}
                  labelFormatter={(label) => `Horário: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="temp"
                  name="Temperatura"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, stroke: "#1d4ed8" }}
                />
                <Line
                  type="monotone"
                  dataKey="feelslike"
                  name="Sensação"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, stroke: "#d97706" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {/* Previsão Detalhada - Só renderiza se houver forecastDay */}
      {forecastDay && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Previsão do Dia */}
          <Card className="p-6 md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Previsão para {format(parseISO(forecastDay.date), "dd/MM/yyyy")}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <WeatherCard
                icon={<Thermometer className="h-6 w-6" />}
                title="Máxima"
                value={`${forecastDay.day.maxtemp_c}°C`}
              />
              <WeatherCard
                icon={<Thermometer className="h-6 w-6" />}
                title="Mínima"
                value={`${forecastDay.day.mintemp_c}°C`}
              />
              <WeatherCard
                icon={<CloudRain className="h-6 w-6" />}
                title="Chuva"
                value={`${forecastDay.day.daily_chance_of_rain}%`}
              />
              <WeatherCard
                icon={<Sun className="h-6 w-6" />}
                title="UV"
                value={forecastDay.day.uv.toString()}
              />
              <WeatherCard
                icon={<Wind className="h-6 w-6" />}
                title="Vento Máx"
                value={`${forecastDay.day.maxwind_kph} km/h`}
              />
              <WeatherCard
                icon={<Droplets className="h-6 w-6" />}
                title="Precipitação"
                value={`${forecastDay.day.totalprecip_mm} mm`}
              />
              <WeatherCard
                icon={<CloudSun className="h-6 w-6" />}
                title="Nascer do Sol"
                value={forecastDay.astro.sunrise}
              />
              <WeatherCard
                icon={<CloudSun className="h-6 w-6" />}
                title="Pôr do Sol"
                value={forecastDay.astro.sunset}
              />
            </div>
          </Card>

          {/* Alertas e Informações Adicionais */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Condições Atuais
              </h3>
              <div className="space-y-3">
                <WeatherDetail
                  icon={<EyeIcon className="h-5 w-5" />}
                  label="Índice UV"
                  value={`${current.uv} - ${getUvIndexLevel(current.uv)}`}
                />
                <WeatherDetail
                  icon={<CloudRain className="h-5 w-5" />}
                  label="Precipitação"
                  value={`${current.precip_mm} mm`}
                />
                <WeatherDetail
                  icon={<Droplets className="h-5 w-5" />}
                  label="Ponto de Orvalho"
                  value={`${current.dewpoint_c}°C`}
                />
                <WeatherDetail
                  icon={<Wind className="h-5 w-5" />}
                  label="Rajadas de Vento"
                  value={`${current.gust_kph} km/h`}
                />
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
