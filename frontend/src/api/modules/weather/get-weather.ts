/* eslint-disable @typescript-eslint/no-explicit-any */

import { Weather } from "@/api/interfaces/weather.interface";
import { api } from "@/api/lib/axios";

export async function getWeatherByCity(city: string): Promise<Weather> {
  try {
    const response = await api.get<Weather>(`/weather/${city}`);

    return response.data;
  } catch (error) {
    const apiError = error as any;
    throw new Error(apiError.response?.data?.message || "Erro desconhecido");
  }
}
