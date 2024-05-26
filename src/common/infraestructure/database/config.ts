import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource, getMetadataArgsStorage } from 'typeorm';

// export const ConfigPostgres = TypeOrmModule.forRootAsync({
//     imports: [ConfigModule],
//     inject: [ConfigService],
//     useFactory: (configService: ConfigService) => ({
//         type: 'postgres',
//         host: configService.getOrThrow('DB_HOST'),
//         port: configService.getOrThrow('DB_PORT'),
//         username: configService.getOrThrow('DB_USERNAME'),
//         password: configService.getOrThrow('DB_PASSWORD'),
//         database: configService.getOrThrow('DB_NAME'),
//         synchronize: true,
//         autoLoadEntities: true,
//     })
// })
export class DataSourceSingleton {
    static instance: DataSource;

    static getInstance() {
        if (!DataSourceSingleton.instance) {
            DataSourceSingleton.instance = new DataSource({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: +process.env.DB_PORT,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
                synchronize: true,
            });
            this.instance.initialize();
        }

        return DataSourceSingleton.instance;
    }

}
