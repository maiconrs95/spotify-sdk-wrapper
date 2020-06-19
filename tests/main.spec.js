import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import {
    search, searchAlbums, searchArtists, searchTracks, searchPlaylists,
} from '../src/main';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Spotify Wrapper', () => {
    let stubedFetch;
    let promise;

    beforeEach(() => {
        stubedFetch = sinon.stub(global, 'fetch');
        promise = stubedFetch.resolves({ json: () => ({ }) });
    });

    afterEach(() => {
        stubedFetch.restore();
    });

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

    describe('searchArtists', () => {
        it('should call fetch function', () => {
            const artists = searchArtists('Incubus');

            expect(stubedFetch).to.have.been
                .calledOnce;
        });

        it('should call fetch with de correct URL', () => {
            const artists = searchArtists('Incubus');
            expect(stubedFetch).to.have.been
                .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

            const artists2 = searchArtists('Muse');
            expect(stubedFetch).to.have.been
                .calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');
        });
    });

    describe('searchAlbums', () => {
        it('should call fetch function', () => {
            const albums = searchAlbums('Incubus');

            expect(stubedFetch).to.have.been
                .calledOnce;
        });

        it('should call fetch with de correct URL', () => {
            const albums = searchAlbums('Incubus');
            expect(stubedFetch).to.have.been
                .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');

            const albums2 = searchAlbums('Muse');
            expect(stubedFetch).to.have.been
                .calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');
        });
    });

    describe('searchTracks', () => {
        it('should call fetch function', () => {
            const tracks = searchTracks('Incubus');

            expect(stubedFetch).to.have.been
                .calledOnce;
        });

        it('should call fetch with de correct URL', () => {
            const tracks = searchTracks('Incubus');
            expect(stubedFetch).to.have.been
                .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track');

            const tracks2 = searchTracks('Muse');
            expect(stubedFetch).to.have.been
                .calledWith('https://api.spotify.com/v1/search?q=Muse&type=track');
        });
    });

    describe('searchPlaylists', () => {
        it('should call fetch function', () => {
            const playlists = searchPlaylists('Incubus');

            expect(stubedFetch).to.have.been
                .calledOnce;
        });

        it('should call fetch with de correct URL', () => {
            const playlists = searchPlaylists('Incubus');
            expect(stubedFetch).to.have.been
                .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist');

            const playlists2 = searchPlaylists('Muse');
            expect(stubedFetch).to.have.been
                .calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist');
        });
    });
});
