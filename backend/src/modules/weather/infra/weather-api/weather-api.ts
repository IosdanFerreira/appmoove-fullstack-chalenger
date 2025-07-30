import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class WeatherApi {
  private readonly baseUrl = 'http://api.weatherapi.com/v1/forecast.json';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getWeatherByCoordinates(city: string): Promise<any> {
    const apiKey = this.configService.get<string>('WEATHER_API_KEY');

    const url = `${this.baseUrl}?key=${apiKey}&q=${city}&hour_fields=temp_c,wind_mph`;

    const response$ = this.httpService.get(url);

    const response = await lastValueFrom(response$);

    return response.data;
  }
}
