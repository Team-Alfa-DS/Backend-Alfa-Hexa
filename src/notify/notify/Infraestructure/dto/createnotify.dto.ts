/* eslint-disable @typescript-eslint/no-unused-vars */
import{ IsBoolean, IsDate, IsString } from "class-validator";
import { UserEntity } from "src/user/infraestructure/entities/user.entity";


export class createNotificaciondto{

    @IsString()
    title: string;

    @IsString()
    body: string;


    @IsDate()
    date: Date;

    @IsBoolean()
    userReaded: boolean
    
}