/* eslint-disable @typescript-eslint/no-explicit-any */

import { Weather } from "@/api/interfaces/weather.interface";
import { api } from "@/api/lib/axios";
import { normalizeCityName } from "@/pages/weather/utils/normalize-city-name";

export async function getWeatherByCity(city: string): Promise<Weather> {
  try {
    const normalizedCity = normalizeCityName(city);
    const encodedCity = encodeURIComponent(normalizedCity);

    const response = await api.get<Weather>(`/weather/${encodedCity}`);

    return response.data;
  } catch (error) {
    const apiError = error as any;
    throw new Error(apiError.response?.data?.message || "Erro desconhecido");
  }
}
