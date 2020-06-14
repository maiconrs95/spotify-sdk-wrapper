import { expect } from 'chai';
import {
    search,
    searchAlbums,
    searchArtists,
    searchTracks,
    searchPlaylists,
} from '../src/main';

describe('Spotify Wrapper', () => {
    describe('smoke tests', () => {
        // search (genérico) + de 1 tipo
        // searchAlbums
        // searchArtists
        // searchTracks
        // searchPlaylists

        it('should exists the search', () => {
            expect(search).to.exist;
        });

        it('should exists the searchAlbums', () => {
            expect(searchAlbums).to.exist;
        });

        it('should exists the searchArtists', () => {
            expect(searchArtists).to.exist;
        });

        it('should exists the searchTracks', () => {
            expect(searchTracks).to.exist;
        });

        it('should exists the searchPlaylists', () => {
            expect(searchPlaylists).to.exist;
        });
    });
});
