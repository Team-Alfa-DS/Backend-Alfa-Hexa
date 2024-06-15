/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsNumber, IsString } from "class-validator";

export class PlaceOrderDto{

    @IsString()
    email: string;

    @IsString()
    productName: string;

    @IsString()
    quantity: string;
}