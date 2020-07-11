import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import SpotifyWrapper from '../src';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Search', () => {
    let spotify;
    let stubedFetch;
    let promise;

    beforeEach(() => {
        spotify = new SpotifyWrapper({
            token: 'foo',
        });
        stubedFetch = sinon.stub(global, 'fetch');
        promise = stubedFetch.resolves({ json: () => ({}) });
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
            expect(spotify.search).to.exist;
        });

        it('should exists the spotify.search.album', () => {
            expect(spotify.search.albums).to.exist;
        });

        it('should exists the spotify.search.artists', () => {
            expect(spotify.search.artists).to.exist;
        });

        it('should exists the spotify.search.tracks', () => {
            expect(spotify.search.tracks).to.exist;
        });

        it('should exists the spotify.search.playlists', () => {
            expect(spotify.search.playlists).to.exist;
        });
    });

    describe('spotify.search.artists', () => {
        it('should call fetch function', () => {
            const artists = spotify.search.artists('Incubus');

            expect(stubedFetch).to.have.been
                .calledOnce;
        });

        it('should call fetch with de correct URL', () => {
            const artists = spotify.search.artists('Incubus');
            expect(stubedFetch).to.have.been
                .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

            const artists2 = spotify.search.artists('Muse');
            expect(stubedFetch).to.have.been
                .calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');
        });
    });

    describe('searchAlbums', () => {
        it('should call fetch function', () => {
            const albums = spotify.search.albums('Incubus');

            expect(stubedFetch).to.have.been
                .calledOnce;
        });

        it('should call fetch with de correct URL', () => {
            const ss = spotify.search.albums('Incubus');
            expect(stubedFetch).to.have.been
                .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');

            const albums2 = spotify.search.albums('Muse');
            expect(stubedFetch).to.have.been
                .calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');
        });
    });

    describe('spotify.search.tracks', () => {
        it('should call fetch function', () => {
            const tracks = spotify.search.tracks('Incubus');

            expect(stubedFetch).to.have.been
                .calledOnce;
        });

        it('should call fetch with de correct URL', () => {
            const tracks = spotify.search.tracks('Incubus');
            expect(stubedFetch).to.have.been
                .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track');

            const tracks2 = spotify.search.tracks('Muse');
            expect(stubedFetch).to.have.been
                .calledWith('https://api.spotify.com/v1/search?q=Muse&type=track');
        });
    });

    describe('searchPlaylists', () => {
        it('should call fetch function', () => {
            const playlists = spotify.search.playlists('Incubus');

            expect(stubedFetch).to.have.been
                .calledOnce;
        });

        it('should call fetch with de correct URL', () => {
            const playlists = spotify.search.playlists('Incubus');
            expect(stubedFetch).to.have.been
                .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist');

            const playlists2 = spotify.search.playlists('Muse');
            expect(stubedFetch).to.have.been
                .calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist');
        });
    });
});
