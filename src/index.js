const {
    search, searchAlbums, searchArtists, searchPlaylists, searchTracks,
} = require('./search');
const { getAlbum, getAlbums, getAlbumTracks } = require('./album');

module.exports = {
    search,
    searchAlbums,
    searchArtists,
    searchPlaylists,
    searchTracks,
    getAlbum,
    getAlbums,
    getAlbumTracks,
};
