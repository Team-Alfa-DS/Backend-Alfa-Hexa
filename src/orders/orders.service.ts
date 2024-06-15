/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { PlaceOrderDto } from './dto/placeOrder.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
    constructor(@Inject("ORDERS_SERVICE") private rabbitClient: ClientProxy){}
    placeOrder(order: PlaceOrderDto){
        this.rabbitClient.emit('order-placed', order)
        return {message: 'order placed!'};
    }
    
}
