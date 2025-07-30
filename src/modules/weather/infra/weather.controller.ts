// src/modules/weather/infra/http/weather.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { GetWeatherUseCase } from '../application/use-cases/get-weather.use-case';

@Controller('weather')
export class WeatherController {
  constructor(private readonly getWeatherUseCase: GetWeatherUseCase) {}

  @Get(':city')
  async getWeather(@Param('city') city: string) {
    const weatherData = await this.getWeatherUseCase.execute(city);

    return {
      weatherData,
    };
  }
}
