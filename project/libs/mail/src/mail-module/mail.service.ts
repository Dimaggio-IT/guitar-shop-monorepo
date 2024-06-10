import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { Member } from '@project/shared/core';
import { MailConfig } from '@project/configuration';

import { EMAIL_ADD_USER } from './mail.constant';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) { }

  @Inject(MailConfig.KEY)
  private readonly mailConfig: ConfigType<typeof MailConfig>

  public async sendNotifyNewUser(member: Member) {
    await this.mailerService.sendMail({
      from: this.mailConfig.from,
      to: member.email,
      subject: EMAIL_ADD_USER,
      template: './add-user',
      context: {
        user: `${member.login}`,
        email: `${member.email}`,
      }
    })
  }
}
