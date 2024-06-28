export interface IMailer {
    sendMail(message: string, subject: string, email: string, code: number): Promise<void>
}