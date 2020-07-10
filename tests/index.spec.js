import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import SpotifyWrapper from '../src';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('SpotifyWrapper Library', () => {
    it('sould create an instance of SpotifyWrapper', () => {
        const spotify = new SpotifyWrapper({});

        expect(spotify).to.be.an.instanceOf(SpotifyWrapper);
    });

    it('should receive apiURL as an option', () => {
        const spotify = new SpotifyWrapper({
            apiURL: 'test.url.com',
        });

        expect(spotify.apiURL).to.be.equal('test.url.com');
    });

    it('sould use the default URL if not provided', () => {
        const spotify = new SpotifyWrapper();

        expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1');
    });

    it('sould receive token as an option', () => {
        const spotify = new SpotifyWrapper({
            token: 'foo',
        });

        expect(spotify.token).to.be.equal('foo');
    });

    describe('request method', () => {
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

        it('should have request method', () => {
            const spotify = new SpotifyWrapper({});

            expect(spotify.request).to.exist;
        });

        it('should call fetch on request', () => {
            const spotify = new SpotifyWrapper({
                token: 'foo',
            });
            spotify.request('');

            // expect(stubedFetch).to.have.been
            //     .calledWith('test.url.com');
            expect(stubedFetch).to.have.been.calledOnce;
        });

        it('should call request with the correct URL', () => {
            const spotify = new SpotifyWrapper({
                apiURL: 'test.url.com',
                token: 'foo',
            });
            spotify.request('url');

            expect(stubedFetch).to.have.been
                .calledWith('url');
        });

        it('should call fetch with de right headers passed', () => {
            const spotify = new SpotifyWrapper({
                apiURL: 'test.url.com',
                token: 'foo',
            });
            spotify.request('url');

            expect(stubedFetch).to.have.been
                .calledWith('url', {
                    headers: {
                        Authorization: 'Bearer foo',
                    },
                });
        });
    });
});
