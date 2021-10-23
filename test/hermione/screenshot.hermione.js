const { assert } = require('chai');

describe('Hermione', async function() {
    it('Screenshot ProductDetails', async function() {
        const browser = this.browser;

        await browser.url('catalog/0');
        const details = await browser.$('.ProductDetails');
        await details.waitForExist();

        await browser.assertView('plain', '.ProductDetails');
    });

    it('check links', async function () {

        const browser = this.browser;
        await browser.url("https://shri.yandex/hw/store/");

        const links = await browser.$$('.nav-link');

        if (await links[0].getText() !== 'Catalog')
           assert.ok(false, 'Текст ссылки неверный');

        if (await links[1].getText() !== 'Delivery')
            assert.ok(false, 'Текст ссылки неверный');

        if (await links[2].getText() !== 'Contacts')
            assert.ok(false, 'Текст ссылки неверный');

        if (await links[3].getText() !== 'Cart')
            assert.ok(false, 'Текст ссылки неверный');


        if (await links[0].getAttribute('href') !== '/hw/store/catalog')
            assert.ok(false, 'Адрес ссылки неверный');

        if (await links[1].getAttribute('href') !== '/hw/store/delivery')
            assert.ok(false, 'Адрес ссылки неверный');

        if (await links[2].getAttribute('href') !== '/hw/store/contacts')
            assert.ok(false, 'Адрес ссылки неверный');

        if (await links[3].getAttribute('href') !== '/hw/store/cart')
            assert.ok(false, 'Адрес ссылки неверный');

        assert.ok(true, 'Успешно');
    });

    it('check page exists', async function () {
        const browser = this.browser;

        await browser.url('catalog');
        const catalog = await browser.$('.Catalog');
        await catalog.waitForExist();

        await browser.url('delivery');
        const delivery = await browser.$('.Delivery');
        await delivery.waitForExist();

        await browser.url('contacts');
        const contacts = await browser.$('.Contacts');
        await contacts.waitForExist();

        await browser.url('cart');
        const cart = await browser.$('.Cart');
        await cart.waitForExist();
    });
});