import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import SpotifyWrapper from '../src';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Album', () => {
    let spotify;
    let stubedFetch;

    beforeEach(() => {
        spotify = new SpotifyWrapper({
            token: 'foo',
        });
        stubedFetch = sinon
            .stub(global, 'fetch')
            .resolves({
                json: () => ({ album: 'name' }),
            });
    });

    afterEach(() => {
        stubedFetch.restore();
    });

    describe('smoke tests', () => {
        it('should exists getAlbum method', () => {
            expect(spotify.album.getAlbum).to.exist;
        });

        it('should exists getAlbumTracks method', () => {
            expect(spotify.album.getTracks).to.exist;
        });
    });

    describe('getAlbum', () => {
        it('should call fetch method', () => {
            const album = spotify.album.getAlbum();

            expect(stubedFetch).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            context('passing one id', () => {
                const album1 = spotify.album.getAlbum('1234');
                expect(stubedFetch).to.have.been
                    .calledWith('https://api.spotify.com/v1/albums/1234');

                const album2 = spotify.album.getAlbum('4321');
                expect(stubedFetch).to.have.been
                    .calledWith('https://api.spotify.com/v1/albums/4321');
            });
        });

        it('should return the JSON Data from the Promise', () => {
            const album = spotify.album.getAlbum('1234');

            album
                .then((data) => {
                    expect(data).to.be.eql({ album: 'name' });
                });
        });
    });

    describe('getAlbums', () => {
        it('should call fetch method', () => {
            const albums = spotify.album.getAlbums();

            expect(stubedFetch).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            context('passing one id', () => {
                const albums1 = spotify.album.getAlbums([1, 2, 3, 4]);
                expect(stubedFetch).to.have.been
                    .calledWith('https://api.spotify.com/v1/albums?ids=1,2,3,4');

                const albums2 = spotify.album.getAlbums([4, 3, 2, 1]);
                expect(stubedFetch).to.have.been
                    .calledWith('https://api.spotify.com/v1/albums?ids=4,3,2,1');
            });
        });

        it('should return the JSON Data from the Promise', () => {
            const album = spotify.album.getAlbum('1234');

            album
                .then((data) => {
                    expect(data).to.be.eql({ album: 'name' });
                });
        });
    });

    describe('getAlbumTracks', () => {
        it('should call fetch method', () => {
            const album = spotify.album.getTracks();

            expect(stubedFetch).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            context('passing one id', () => {
                const traks = spotify.album.getTracks('1234');
                expect(stubedFetch).to.have.been
                    .calledWith('https://api.spotify.com/v1/albums/1234/tracks');
            });
        });

        it('should return the JSON Data from the Promise', () => {
            const tracks = spotify.album.getTracks('1234');

            tracks
                .then((data) => {
                    expect(data).to.be.eql({ album: 'name' });
                });
        });
    });
});
