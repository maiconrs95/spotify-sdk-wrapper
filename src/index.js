const {
    search, searchAlbums, searchArtists, searchPlaylists, searchTracks,
} = require('./search');
const { getAlbum, getAlbums, getAlbumTracks } = require('./album');

// module.exports = {
//     search,
//     searchAlbums,
//     searchArtists,
//     searchPlaylists,
//     searchTracks,
//     getAlbum,
//     getAlbums,
//     getAlbumTracks,
// };

export default class SpotifyWrapper {
    constructor(options = {}) {
        const { apiURL = 'https://api.spotify.com/v1', token = '' } = options;

        this.apiURL = apiURL;
        this.token = token;
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
