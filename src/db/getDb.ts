import {config as loadConfig} from 'dotenv';
import {Client} from 'pg';

loadConfig(); // Load ENV variables from the file

export const getDb = async () => {
    console.log('Initializing db connection...');

    const client = new Client(getConnectionConfig());

    try {
        client.connect();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    return client;
};

const getConnectionConfig = () => {
    const env = process.env;

    return {
        host: env.TG_DB_HOST,
        user: env.TG_DB_USER,
        password: env.TG_DB_PASSWORD,
        database: env.TG_DB_DATABASE,
        port: Number(env.TG_DB_PORT)
    };
};
