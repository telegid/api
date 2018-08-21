import {getDb} from './db/getDb';
import {startHapiServer} from './server/startHapiServer';

const startApiServer = async () => {
    const client = await getDb();
    const server = await startHapiServer(client);
};

startApiServer();
