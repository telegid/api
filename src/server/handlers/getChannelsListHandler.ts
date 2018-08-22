import {Request, RequestQuery, ResponseToolkit} from 'hapi';
import {Client} from 'pg';

export const getChannelsListHandler = async (request: Request, h: ResponseToolkit, client: Client) => {
    // return request.params.id;
    const query = request.query as RequestQuery;

    const result = await client.query('SELECT channel_id FROM channel_raw_content WHERE release_date=$1 ORDER BY channel_id', [query.release_date]);

    return result.rows.map((row) => row.channel_id);
};
