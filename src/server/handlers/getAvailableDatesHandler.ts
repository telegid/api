import {Request, ResponseToolkit} from 'hapi';
import {Client} from 'pg';

export const getAvailableDatesHandler = async (request: Request, h: ResponseToolkit, client: Client) => {
    const result = await client.query('SELECT DISTINCT release_date FROM channel_raw_content ORDER BY release_date');
    const payload = result.rows.map((row) => row.release_date);

    return payload;
};
