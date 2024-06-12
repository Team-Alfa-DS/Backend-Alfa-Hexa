/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";


@Module({

    imports: [ClientsModule.register([
        {
            name: 'MATH_SERVICE',
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://localhost:5672'],
                queue: 'cats_queue',
                queueOptions: {
                    durable: false
                    },
                },
            },
        ]),
    ],

    controllers: [],

    providers: [],
})
export class serModule {};