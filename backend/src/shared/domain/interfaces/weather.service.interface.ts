export interface WeatherServiceInterface {
  getWeatherByCity(city: string): Promise<any>;
}
