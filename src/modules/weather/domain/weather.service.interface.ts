export interface WeatherServiceInterface {
  getWeatherByCoordinates(city: string): Promise<any>;
}
