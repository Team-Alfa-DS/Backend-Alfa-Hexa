import { User } from "src/user/domain/user";
import { UserEntity } from "src/user/infraestructure/entities/user.entity";

export class NotifyDTO {
    id: string;
    title: string;
    body: string;
    date: Date;
    userReaded: boolean;
    user : UserEntity
}