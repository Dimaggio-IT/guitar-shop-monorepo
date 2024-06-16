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
            скрипт --<command> [--arguments]
        Команды:
            --version:         # выводит номер версии приложения из файла package.json
            --help:            # печатает этот текст. Команда запускается по умолчанию
            --generate <n>:    # генерирует произвольное количество тестовых данных
                                 параметры:
                                   <count> -обязательный. Количество элементов для генерации
    `));
  }
}
