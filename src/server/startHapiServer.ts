import {Client} from 'pg';
import {getAvailableDatesHandler} from './handlers/getAvailableDatesHandler';
import {getChannelsListHandler} from './handlers/getChannelsListHandler';
import * as nes from 'nes';
import * as hapi from 'hapi';

export const startHapiServer = async (client: Client) => {


    const serverInstance = new hapi.Server({
        host: 'localhost',
        port: 8000,
    });

    await serverInstance.register(nes);

    /*
        serverInstance.route({
            method: 'GET',
            path: '/channel',
            options: {
                cors: true
            },
            handler: (request, h) => getChannelHandler(request, h, client)
        });
    */

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
    serverInstance.subscription('/sync/status');

    try {
        await serverInstance.start();

    } catch (err) {
        console.log(err);
        process.exit(1);
    }

    serverInstance.publish('/sync/status', {id: 5, status: new Date()});

    console.log('Server running at:', serverInstance.info.uri);
};
