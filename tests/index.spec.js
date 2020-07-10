import { expect } from 'chai';

import SpotifyWrapper from '../src';

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
});
