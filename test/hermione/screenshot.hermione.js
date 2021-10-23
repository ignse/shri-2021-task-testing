const { assert } = require('chai');

describe('github', async function() {
    it('Тест, который пройдет', async function() {
        const browser = this.browser;

        await browser.url('https://shri.yandex/hw/store/catalog/0');
        const details = await browser.$('.ProductDetails');
        await details.waitForExist();

        await browser.assertView('plain', '.ProductDetails');
    });
});