import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import {
    search, searchAlbums, searchArtists, searchTracks, searchPlaylists,
} from '../src/main';

chai.use(sinonChai);

global.fetch = require('node-fetch');

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
        let stubedFetch;
        let promise;

        beforeEach(() => {
            stubedFetch = sinon.stub(global, 'fetch');
            promise = stubedFetch.resolves({ json: () => ({ }) });
        });

        afterEach(() => {
            stubedFetch.restore();
        });

        it('should call fetch function', () => {
            const artist = search();

            expect(stubedFetch).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            context('passing one type', () => {
                const artist = search('Muse', 'artist');
                expect(stubedFetch).to.have.been
                    .calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');

                const albums = search('Muse', 'album');
                expect(stubedFetch).to.have.been
                    .calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');
            });

            context('passing more than one type', () => {
                const artistsAndAlbums = search('Muse', ['artist', 'album']);
                expect(stubedFetch).to.have.been
                    .calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist,album');
            });
        });

        it('should return the JSON Data from the Promise', () => {
            const artists = search('Incubus', 'artist');

            artists.then((data) => {
                expect(data).to.be.eql({ });
            });
        });
    });
});
