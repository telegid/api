import {createQueryString, createUrl} from './createQueryString';
import {Client} from 'pg';

import {config as loadConfig} from 'dotenv';
import {getDatetimeFromStvDateTime} from './utils/getDatetimeFromStvDateTime';
import {downloadToDb} from './downloadToDb';
import WebSocket from 'ws';
import fetch from 'node-fetch';
import * as iconv from 'iconv-lite';
import * as cheerio from 'cheerio';

loadConfig();

export interface ILinkObj {
    link: string;
    releaseDate: string;
    createdDateTime: number;
}

export const fetchChannels = async (client: Client, ws: WebSocket) => {

    let currentProgressValue = 0;

    const dataRows = await getRowsDataList();


    const rowsQuery = createDbQueryString(dataRows);

    const rowsQueryString = `SELECT channel_id AS "channelId", release_date AS "releaseDate", created_date_time AS "createdDateTime"
                                       FROM channel_raw_content
                                       WHERE ((release_date, created_date_time)) IN (${rowsQuery})
                                       ORDER BY channel_id`;


    const dbRows = await client.query(rowsQueryString);


    const linksToDownload = getUnsavedRows(dataRows, dbRows.rows.map((row) => (
        {
            ...row,
            createdDateTime: Number(row.createdDateTime)
        }
    )));

    const promises: Array<Promise<any>> = linksToDownload.map((linkObj: ILinkObj) => {
        return downloadToDb(linkObj, client, (channelId: string) => {
            currentProgressValue += 1;
            ws.send(JSON.stringify({message: 'SyncProgressUpdated', payload: {total: promises.length, currentValue: currentProgressValue, channelId}}));
        });
    });

    ws.send(JSON.stringify({message: 'SyncStarted', payload: {total: promises.length}}));

    await Promise.all(promises);

    ws.send(JSON.stringify({message: 'SyncComplete'}));
};

const getRowsDataList = async (): Promise<ILinkObj[]> => {
    const params = createQueryString();
    const url = createUrl(params);

    const respBuff = await fetch(url)
        .then((resp) => resp.buffer());

    const programmeContentString = iconv.decode(respBuff, 'win1251');

    const $ = cheerio.load(programmeContentString);

    const rows = $('table tbody tr');

    return formatDomRowsToDataRows(rows, $);

};

const formatDomRowsToDataRows = (rows: Cheerio, $: CheerioStatic): ILinkObj[] => {
    // console.log(`Will fetch channels from ${url}`);

    return rows.toArray()
        .filter((row) => {
            const rowType = $(row).find('td').eq(2).text();
            return rowType.toLowerCase() === 'расписание';
        })
        .map((row) => {
            const releaseDate = $(row).find('td').eq(3).text();
            const createdDateTime = getDatetimeFromStvDateTime($(row).find('td').eq(4).text());
            const href = $(row).find('a').attr('href');

            return {
                createdDateTime,
                releaseDate,
                link: `${process.env.STV_BASEURL}${href}`
            };
        });
};

const createDbQueryString = (rows: ILinkObj[]) => {
    const queryString = rows.map((row) => {
        return `('${row.releaseDate}',${row.createdDateTime})`;
    });

    return queryString.join(',');
};

const getUnsavedRows = (dataRows: ILinkObj[], dbRows: any[]) => {
    const unsaved: ILinkObj[] = [];

    dataRows.forEach((dataRow) => {
        const item = dbRows.find((dbRow) => {
            return dbRow.releaseDate === dataRow.releaseDate
                && dbRow.createdDateTime === dataRow.createdDateTime;
        });
        if (!item) {
            unsaved.push(dataRow);
        }
    });

    return unsaved;
};
