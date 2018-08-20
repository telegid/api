import {createQueryString, createUrl} from './createQueryString';
import fetch from 'node-fetch';
import {downloadToFile} from './downloadToFile';
import * as iconv from 'iconv-lite';
import * as cheerio from 'cheerio';

require('dotenv').config();

let headers: any;

export const fetchChannels = async () => {
    const params = createQueryString();
    const url = createUrl(params);

    console.log(`Will fetch channels from ${url}`);

    const respBuff = await fetch(url)
        .then((resp) => {
            headers = resp.headers;
            return resp.buffer();
        });

    const str = iconv.decode(respBuff, 'win1251');

    const $ = cheerio.load(str);

    const rows = $('table tbody tr');

    rows.each((index, row) => {
        const releaseDate = $(row).find('td').eq(3).text();
        const href = $(row).find('a').attr('href');

        downloadToFile(`${process.env.STV_BASEURL}${href}`, headers, releaseDate);
    });


};

fetchChannels();
