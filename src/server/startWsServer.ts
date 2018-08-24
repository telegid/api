import {Server} from 'ws';
import {getChannelsListHandler} from './handlers/getChannelsListHandler';
import {Client} from 'pg';
import {fetchChannels} from '../sync/fetchChannels';

export const startWsServer = async (client: Client) => {
    console.log('will start ws server...');

    const wss = new Server({
        port: 8000
    });

    wss.addListener('connection', (ws) => {
        console.log('client connected');

        ws.addListener('message', async (msg: string) => {
            console.log('message received');
            const msgObj = JSON.parse(msg);
            switch (msgObj.message) {

                case 'Channels':
                    const payload = await getChannelsListHandler(client);
                    ws.send(JSON.stringify({message: 'ChannelsFulfilled', payload}));
                    break;

                case 'Sync':
                    fetchChannels(client, ws);
                    break;

            }
        });
    });


    return await wss;
};
