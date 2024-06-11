import { User } from "src/user/domain/user";

export interface TokenDto{
    token: string;
    title: string;
    body: string;
    userId: User;
}