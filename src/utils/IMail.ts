
interface IMail{
    sendMail(to: string, subject: string, body: string): Promise<void>;
}
export {IMail}