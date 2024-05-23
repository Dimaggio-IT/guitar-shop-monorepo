import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

const ENV_FILE_PATH = 'apps/api/api.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // TODO: Передать список конфигураций для загрузки
      load: [],
      envFilePath: ENV_FILE_PATH
    }),
  ]
})
export class AppConfigModule { }
