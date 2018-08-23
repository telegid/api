import {getDb} from './db/getDb';
import {startWsServer} from './server/startWsServer';

const startApiServer = async () => {
    const client = await getDb();
    // const server = await startHapiServer(client);
    const server = await startWsServer(client);
    console.log('+++ server started +++');
};

startApiServer();
