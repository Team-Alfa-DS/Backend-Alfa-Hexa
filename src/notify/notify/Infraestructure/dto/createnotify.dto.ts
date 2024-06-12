import{ IsBoolean, IsString } from "class-validator";


export class createNotificaciondto{

    @IsString()
    title: string;

    @IsString()
    body: string;

    
}