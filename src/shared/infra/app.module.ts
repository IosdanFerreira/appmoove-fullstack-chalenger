import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/modules/users/infra/user.module';
import { WeatherModule } from 'src/modules/weather/infra/weather.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    WeatherModule,
  ],
})
export class AppModule {}
