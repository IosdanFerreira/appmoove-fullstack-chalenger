import { GetWeatherUseCase } from '../application/use-cases/get-weather.use-case';
import { HttpModule } from '@nestjs/axios';
// src/modules/weather/weather.module.ts
import { Module } from '@nestjs/common';
import { WeatherApi } from './weather-api/weather-api';
import { WeatherController } from './weather.controller';

@Module({
  imports: [HttpModule],
  controllers: [WeatherController],
  providers: [
    WeatherApi,
    {
      provide: GetWeatherUseCase,
      useFactory: (weatherApi: WeatherApi) => new GetWeatherUseCase(weatherApi),
      inject: [WeatherApi],
    },
  ],
})
export class WeatherModule {}
