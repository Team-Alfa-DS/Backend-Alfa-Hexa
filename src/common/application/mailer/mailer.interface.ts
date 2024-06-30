export interface IMailer {
    sendCodeMail(message: string, subject: string, email: string, code: number): Promise<void>;
    sendUserMail(message: string, subject: string, email: string): Promise<void>;
}