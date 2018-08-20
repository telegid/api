import {createWriteStream} from 'fs';
import fetch, {Headers} from 'node-fetch';
import * as iconv from 'iconv-lite';
import * as path from 'path';
import {channelsNames} from './channelsNames';

interface IFetchResult {
    fileName: string;
    content: Promise<Buffer>;
}

export const downloadToFile = async (url: string, headers: Headers, releaseDate: string) => {

    const cookie = headers.get('Set-Cookie');

    if (cookie) {
        const {fileName, content} = await fetchFile(url, cookie);


        const buff = await content;

        if (fileName) {
            const str = iconv.decode(buff, 'win1251');

            const file = createWriteStream(path.join('downloads', `${releaseDate}_${(channelsNames[fileName] || `!!!_${fileName}`)}.txt`));
            file.write(str);

        }
    } else {
        console.error('cookie is not defined');
    }

};

const fetchFile = async (url: string, cookie: string): Promise<IFetchResult> => {
    return fetch(url, {
        headers: {
            cookie
        }
    })
        .then((resp) => {
            const contentDispositionString = resp.headers.get('content-disposition');

            if (contentDispositionString && contentDispositionString.includes('.txt') && contentDispositionString.includes('(R)')) {
                const fileName = contentDispositionString.replace(/attachment; filename="\(R\)(.+)\.txt"/, '$1');

                return {
                    fileName,
                    content: resp.buffer()
                };

            } else {
                return {
                    fileName: '',
                    content: Promise.resolve(new Buffer(0))
                };
            }

        });
};
