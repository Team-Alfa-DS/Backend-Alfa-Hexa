import { MailerService } from "@nestjs-modules/mailer";
import { IMailer } from "src/common/application/mailer/mailer.interface";
import { htmlMailer } from "./html-mailer";

export class NodeMailer implements IMailer {

    private mailerService: MailerService;

    constructor(mailerService: MailerService) {
        this.mailerService = mailerService;
    }
    sendUserMail(message: string, subject: string, email: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async sendCodeMail(message: string, subject: string, email: string, code: number): Promise<void> {
        this.mailerService.sendMail({
            from: 'gymnastic.alfa@gmail.com',
            to: email,
            subject,
            text: `${message}: ${code}`,
            html: htmlMailer(code.toString())
        })
    }

}