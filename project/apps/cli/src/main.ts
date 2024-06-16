#!/usr/bin/env node
import { GenerateCommand, HelpCommand, ICommand, VersionCommand } from './app/commands';
import { CLIApplication } from './app/cli-app';

async function bootstrap() {
  const cliApplication = new CLIApplication();
  const importedCommands: ICommand[] = [
    new HelpCommand(),
    new VersionCommand(),
    new GenerateCommand(),
  ];

  cliApplication.registerCommands(importedCommands);
  cliApplication.processCommand(process.argv);
}

bootstrap();
