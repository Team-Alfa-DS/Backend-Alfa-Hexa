import { MailerService } from "@nestjs-modules/mailer";
import { IMailer } from "src/common/application/mailer/mailer.interface";

export class NodeMailer implements IMailer {

    private mailerService: MailerService;

    constructor(mailerService: MailerService) {
        this.mailerService = mailerService;
    }

    async sendMail(message: string, subject: string, email: string, code: number): Promise<void> {
        this.mailerService.sendMail({
            from: 'gymnastic.alfa@gmail.com',
            to: email,
            subject,
            text: `${message}: ${code}`
        })
    }

}