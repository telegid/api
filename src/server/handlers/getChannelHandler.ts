import {Request, RequestQuery, ResponseToolkit} from 'hapi';
import {Client} from 'pg';
import {formatIntoDays} from '../../parse/formatIntoDays';

export const getChannelHandler = async (request: Request, h: ResponseToolkit, client: Client) => {
    // return request.params.id;
    const query = request.query as RequestQuery;

    const result = await client.query('SELECT content FROM channel_raw_content WHERE channel_id=$1 AND release_date=$2', [query.channel_id, query.release_date]);

    // const day = query.day as string;

    const {content} = result.rows[0];

    return {data: {raw: content, byday: formatIntoDays(content)}};
};
