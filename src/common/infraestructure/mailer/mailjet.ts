import { MailjetService } from "nest-mailjet";
import { IMailer } from "src/common/application/mailer/mailer.interface";
import { htmlMailer } from "./html-mailer";

export class MailJet implements IMailer {

    private mailService: MailjetService;
    constructor(mailService: MailjetService) {
        this.mailService = mailService;
    }

    async sendMail(message: string, subject: string, email: string, code: number): Promise<void> {
        const codeS = code.toString();
        await this.mailService.send({
            Messages: [
                {
                    From: {
                        Email: 'gymnastic.alfa@gmail.com'
                    },
                    To: [
                        {
                            Email: email
                        }
                    ],
                    Subject: subject,
                    TextPart: `${message}: ${code}`,
                    TemplateID: 6035671,
                    TemplateLanguage: true,
                    Variables: {
                        code1: codeS[0],
                        code2: codeS[1],
                        code3: codeS[2],
                        code4: codeS[3]
                    }
                }
            ]
        })
    }
}