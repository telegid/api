import {Request, RequestQuery, ResponseToolkit} from 'hapi';
import {Client} from 'pg';

export const getChannelsListHandler = async (request: Request, h: ResponseToolkit, client: Client) => {
    // return request.params.id;
    const query = request.query as RequestQuery;

    const result = await client.query('SELECT id, label FROM channels ORDER BY id');

    return result.rows.reduce((accumulator, currentItem) => {
            accumulator[currentItem.id] = currentItem.label;
            return accumulator;
        },
        {});
};
