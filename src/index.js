import album from './album';
import search from './search';

export default class SpotifyWrapper {
    constructor(options = {}) {
        const { apiURL = 'https://api.spotify.com/v1', token = '' } = options;

        this.apiURL = apiURL;
        this.token = token;
        this.album = album.bind(this)();
        this.search = search.bind(this)();
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
