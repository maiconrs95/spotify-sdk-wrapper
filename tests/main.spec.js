import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

/**
 * Lib
 */
import {
    search, searchAlbums, searchArtists, searchTracks, searchPlaylists,
} from '../src/main';

/**
 * Middlewares
 */
global.fetch = require('node-fetch');

chai.use(sinonChai);
sinonStubPromise(sinon);

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

    describe('generic search', () => {
        let fetchedStub;

        beforeEach(() => {
            fetchedStub = sinon.stub(global, 'fetch');
        });

        afterEach(() => {
            fetchedStub.restore();
        });

        it('should call fetch function', () => {
            const artist = search();

            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            context('passing one type', () => {
                const artist = search('Muse', 'artist');
                expect(fetchedStub).to.have.been
                    .calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');

                const albums = search('Muse', 'album');
                expect(fetchedStub).to.have.been
                    .calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');
            });

            context('passing more than one type', () => {
                const artistsAndAlbums = search('Muse', ['artist', 'album']);
                expect(fetchedStub).to.have.been
                    .calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist,album');
            });
        });
    });
});
