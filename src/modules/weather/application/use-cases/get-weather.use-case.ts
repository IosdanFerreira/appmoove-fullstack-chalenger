import { WeatherServiceInterface } from '../../domain/weather.service.interface';

export class GetWeatherUseCase {
  constructor(private readonly weatherService: WeatherServiceInterface) {}

  async execute(city: string): Promise<any> {
    return this.weatherService.getWeatherByCoordinates(city);
  }
}
