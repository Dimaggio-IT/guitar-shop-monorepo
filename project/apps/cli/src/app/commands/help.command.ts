import chalk from 'chalk';
import { ICommand } from './index.js';

export class HelpCommand implements ICommand {
  private readonly _name: string = '--help';

  public get name(): string {
    return this._name;
  }

  public async execute(): Promise<void> {
    console.info(chalk.whiteBright(`
        Программа для подготовки данных для REST API сервера.
        Синтаксис:
            скрипт --<command> [arguments]
        Команды:
            --version:         # выводит номер версии приложения из файла package.json
            --help:            # печатает этот текст. Команда запускается по умолчанию
            --generate <n>:    # генерирует произвольное количество тестовых данных
                                 параметры:
                                   <count> - обязательный. Количество элементов для генерации
                                   <connection string> - DEPRECATED. В проекте
                                   используется в качестве БД PostgreSQL и Prisma как ORM.
                                   В папке libs/shared/models/prisma уже есть .env файл в котором
                                   строка подключения к базе
                                   DATABASE_URL=postgres://admin:123456@localhost:5432/guitar_shop
    `));
  }
}
