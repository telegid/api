import {Server} from 'ws';
import {getChannelsListHandler} from './handlers/getChannelsListHandler';
import {Client} from 'pg';

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
            if (msgObj.message === 'Channels') {
                const result = await getChannelsListHandler(client);
                ws.send(JSON.stringify(result));
            }
        });
    });


    return await wss;
};
