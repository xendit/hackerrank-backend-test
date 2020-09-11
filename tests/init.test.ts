import { init } from 'src/init';

describe('init()', () => {
    it('is successful', async () => {
        const results = await init();
        expect(results).toBeObject();
    });
});
