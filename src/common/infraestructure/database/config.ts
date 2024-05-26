
import { DataSource, getMetadataArgsStorage } from 'typeorm';

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