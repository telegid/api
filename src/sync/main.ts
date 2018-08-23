import {config as loadConfig} from 'dotenv';
import {runSync} from './runSync';
import {getDb} from '../db/getDb';
import {Client} from 'pg';

loadConfig(); // Load ENV variables from the file

getDb().then((client: Client) => {
    runSync(client);
});

