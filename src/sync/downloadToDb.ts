import * as iconv from 'iconv-lite';
import {channelsNames} from './channelsNames';
import {fetchFile} from './fetchFile';
import {ILinkObj} from './fetchChannels';
import {Client} from 'pg';

export const downloadToDb = async (linkObj: ILinkObj, client: Client, cb: (channelId: string) => void) => {

    const {fileName, content} = await fetchFile(linkObj.link);

    const buff = await content;

    if (fileName) {

        const channelId = channelsNames[fileName];
        const str = iconv.decode(buff, 'win1251');
        const res = await client.query(
            `INSERT INTO channel_raw_content(release_date, created_date_time, channel_id, content)
                                      VALUES($1, $2, $3, $4)
                 ON CONFLICT (release_date, channel_id)
                 DO UPDATE SET content = $4, created_date_time = $2;`, [linkObj.releaseDate, linkObj.createdDateTime, channelId, str]);

        // console.log(`Saved to DB: ${channelsNames[fileName]}: ${linkObj.createdDateTime}`);
        cb(channelId);
    }

};
