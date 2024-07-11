import { User } from "src/user/domain/user";
import { OrmUserEntity } from "src/user/infraestructure/entities/orm-entities/orm-user.entity";

export class NotifyDTO {
    id: string;
    title: string;
    body: string;
    date: Date;
    userReaded: boolean;
    user : OrmUserEntity
}