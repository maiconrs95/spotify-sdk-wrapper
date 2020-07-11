import spotidyWrapper from '../src';
import SpotifyWrapper from '../src';

global.fetch = require('node-fetch');

const spotify = new SpotifyWrapper({
    token: 'foo',
});

(async () => {
    const albums = await spotify.search.albums('adele');

    console.log(albums);
})();
