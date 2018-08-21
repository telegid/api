import {Server} from 'hapi';
import {Client} from 'pg';
import {getChannelHandler} from './handlers/getChannelHandler';

export const startHapiServer = async (client: Client) => {

    const serverInstance = new Server({
        host: 'localhost',
        port: 8000
    });

    serverInstance.route({
        method: 'GET',
        path: '/channel',
        handler: (request, h) => getChannelHandler(request, h, client)
    });

    serverInstance.route({
        method: 'GET',
        path: '/stats',
        handler: (request, h) => {
            return '123';
        }
    });

    try {
        await serverInstance.start();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', serverInstance.info.uri);
};
