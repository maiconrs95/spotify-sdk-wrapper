import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { getAlbum, getAlbums, getAlbumTracks } from '../src/album';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Album', () => {
    let stubedFetch;

    beforeEach(() => {
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
            expect(getAlbum).to.exist;
        });

        it('should exists getAlbumTracks method', () => {
            expect(getAlbumTracks).to.exist;
        });
    });

    describe('getAlbum', () => {
        it('should call fetch method', () => {
            const album = getAlbum();

            expect(stubedFetch).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            context('passing one id', () => {
                const album1 = getAlbum('1234');
                expect(stubedFetch).to.have.been
                    .calledWith('https://api.spotify.com/v1/albums/1234');

                const album2 = getAlbum('4321');
                expect(stubedFetch).to.have.been
                    .calledWith('https://api.spotify.com/v1/albums/4321');
            });
        });

        it('should return the JSON Data from the Promise', () => {
            const album = getAlbum('1234');

            album
                .then((data) => {
                    expect(data).to.be.eql({ album: 'name' });
                });
        });
    });

    describe('getAlbums', () => {
        it('should call fetch method', () => {
            const albums = getAlbums();

            expect(stubedFetch).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            context('passing one id', () => {
                const albums1 = getAlbums([1, 2, 3, 4]);
                expect(stubedFetch).to.have.been
                    .calledWith('https://api.spotify.com/v1/albums?ids=1,2,3,4');

                const albums2 = getAlbums([4, 3, 2, 1]);
                expect(stubedFetch).to.have.been
                    .calledWith('https://api.spotify.com/v1/albums?ids=4,3,2,1');
            });
        });

        it('should return the JSON Data from the Promise', () => {
            const album = getAlbum('1234');

            album
                .then((data) => {
                    expect(data).to.be.eql({ album: 'name' });
                });
        });
    });

    describe('getAlbumTracks', () => {
        it('should call fetch method', () => {
            const album = getAlbumTracks();

            expect(stubedFetch).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            context('passing one id', () => {
                const traks = getAlbumTracks('1234');
                expect(stubedFetch).to.have.been
                    .calledWith('https://api.spotify.com/v1/albums/1234/tracks');
            });
        });

        it('should return the JSON Data from the Promise', () => {
            const tracks = getAlbumTracks('1234');

            tracks
                .then((data) => {
                    expect(data).to.be.eql({ album: 'name' });
                });
        });
    });
});
