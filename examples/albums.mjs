import { searchAlbums } from '../src/main';

global.fetch = require('node-fetch');

(async () => {
    const albums = await searchAlbums('adele');

    console.log(albums);
})();
