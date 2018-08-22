import {Server} from 'hapi';
import {Client} from 'pg';
import {getChannelHandler} from './handlers/getChannelHandler';
import {getAvailableDatesHandler} from './handlers/getAvailableDatesHandler';
import {getChannelsListHandler} from './handlers/getChannelsListHandler';

export const startHapiServer = async (client: Client) => {

    const serverInstance = new Server({
        host: 'localhost',
        port: 8000
    });

    serverInstance.route({
        method: 'GET',
        path: '/channel',
        options: {
            cors: true
        },
        handler: (request, h) => getChannelHandler(request, h, client)
    });

    serverInstance.route({
        method: 'GET',
        path: '/channels',
        options: {
            cors: true
        },
        handler: (request, h) => getChannelsListHandler(request, h, client)
    });

    serverInstance.route({
        method: 'GET',
        path: '/dates',
        options: {
            cors: true
        },
        handler: (request, h) => getAvailableDatesHandler(request, h, client)
    });

    try {
        await serverInstance.start();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', serverInstance.info.uri);
};
