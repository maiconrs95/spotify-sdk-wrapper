import album from './album';

const {
    search, searchAlbums, searchArtists, searchPlaylists, searchTracks,
} = require('./search');

export default class SpotifyWrapper {
    constructor(options = {}) {
        const { apiURL = 'https://api.spotify.com/v1', token = '' } = options;

        this.apiURL = apiURL;
        this.token = token;
        this.album = album.bind(this)();
    }

    request(url) {
        const headers = {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        };

        return fetch(url, headers);
    }
}
