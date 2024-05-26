import { get } from "http";
import { DataSource, getMetadataArgsStorage } from "typeorm";

export class DatabaseSingleton {
    static instance: DataSource;
    
    static getInstance(): DataSource {
        if (!DatabaseSingleton.instance) {
            DatabaseSingleton.instance = new DataSource({
                type: "postgres",
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                synchronize: true,
                entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
                migrations:[__dirname + '/migrations/*{.ts}']
            });

            this.instance.initialize(); 
        }
        return DatabaseSingleton.instance;
    }
}