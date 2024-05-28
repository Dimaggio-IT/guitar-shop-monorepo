import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_SMTP_PORT = 8025;

export interface MailConfig {
  mailHost: string;
  mailPort: number;
  mailUser: string;
  mailPassword: string;
  mailFrom: string;
}

const validationSchema = Joi.object({
    mailHost: Joi.string().valid().hostname().required(),
    mailPort: Joi.number().port().default(DEFAULT_SMTP_PORT),
    mailUser: Joi.string().required(),
    mailPassword: Joi.string().required(),
    mailFrom: Joi.string().required(),
});

function validateConfig(config: MailConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Email Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): MailConfig {
  const config: MailConfig = {
      mailHost: process.env.MAIL_SMTP_HOST,
      mailPort: parseInt(process.env.MAIL_SMTP_PORT ?? DEFAULT_SMTP_PORT.toString(), 10),
      mailUser: process.env.MAIL_USER_NAME,
      mailPassword: process.env.MAIL_USER_PASSWORD,
      mailFrom: process.env.MAIL_FROM,
  };

  validateConfig(config);
  return config;
}

export default registerAs('mail', getConfig);
