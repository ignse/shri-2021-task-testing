const { assert } = require('chai');

describe('Hermione', async function() {
    it('Screenshot ProductDetails', async function () {
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
        const brand = await browser.$('.Application-Brand');

        if (await links[0].getText() !== 'Catalog')
            assert.ok(false, 'Текст ссылки неверный');

        if (await links[1].getText() !== 'Delivery')
            assert.ok(false, 'Текст ссылки неверный');

        if (await links[2].getText() !== 'Contacts')
            assert.ok(false, 'Текст ссылки неверный');

        if (await links[3].getText() !== 'Cart')
            assert.ok(false, 'Текст ссылки неверный');

        if (await brand.getText() !== 'Example store')
            assert.ok(false, 'Текст заголовка неверный');

        if (await links[0].getAttribute('href') !== '/hw/store/catalog')
            assert.ok(false, 'Адрес ссылки неверный');

        if (await links[1].getAttribute('href') !== '/hw/store/delivery')
            assert.ok(false, 'Адрес ссылки неверный');

        if (await links[2].getAttribute('href') !== '/hw/store/contacts')
            assert.ok(false, 'Адрес ссылки неверный');

        if (await links[3].getAttribute('href') !== '/hw/store/cart')
            assert.ok(false, 'Адрес ссылки неверный');

        if (await brand.getAttribute('href') !== '/hw/store/')
            assert.ok(false, 'Адрес заголовка неверный');

        assert.ok(true, 'Успешно');
    });

    it('check page exists', async function () {
        const browser = this.browser;

        await browser.url('catalog');
        const catalog = await browser.$('.Catalog');
        await catalog.waitForExist();
        if (await browser.getTitle() !== 'Catalog — Example store')
            assert.ok(false, 'Неверный заголовок страницы');

        await browser.url('delivery');
        const delivery = await browser.$('.Delivery');
        await delivery.waitForExist();
        if (await browser.getTitle() !== 'Delivery — Example store')
            assert.ok(false, 'Неверный заголовок страницы');

        await browser.url('contacts');
        const contacts = await browser.$('.Contacts');
        await contacts.waitForExist();
        if (await browser.getTitle() !== 'Contacts — Example store')
            assert.ok(false, 'Неверный заголовок страницы');

        await browser.url('cart');
        const cart = await browser.$('.Cart');
        await cart.waitForExist();
        if (await browser.getTitle() !== 'Shopping cart — Example store')
            assert.ok(false, 'Неверный заголовок страницы');

        await browser.url('https://shri.yandex/hw/store/');
        const home = await browser.$('.Home');
        await home.waitForExist();

        if (await browser.getTitle() !== 'Welcome — Example store')
            assert.ok(false, 'Неверный заголовок страницы');
    });

    it('make an order', async function() {
        const browser = this.browser;
        await browser.url('cart');
        await browser.$('.Cart').waitForExist();
        await browser.assertView('cart', '.Cart', {
            compositeImage: true,
        });
        await browser.url("catalog/1");
        await browser.$('.ProductDetails-AddToCart').waitForExist();
        await browser.$(".ProductDetails-AddToCart").click()
        await browser.pause(2000);
        await browser.url("catalog/2");
        await browser.$('.ProductDetails-AddToCart').waitForExist();
        await browser.$(".ProductDetails-AddToCart").click()
        await browser.pause(2000);
        await browser.url('cart');

        await browser.assertView('application-menu', '.Application-Menu', {
          compositeImage: true,
        });

        const name = await browser.$('#f-name');
        const phone = await browser.$('#f-phone');
        const address = await browser.$('#f-address');

        name.setValue('aaaaaaaaaa');
        phone.setValue('1234567890');
        address.setValue('Fake address');

        const button = await browser.$('.Form-Submit');
        await button.scrollIntoView();
        await browser.waitUntil(() => button.isClickable(), 1500);
        await button.click();
        await browser.pause(2000);

        await browser.assertView('cart-success', '.Cart-SuccessMessage', {
            compositeImage: true,
            ignoreElements: ['.Cart-Number'],
        });
    });

    it('Burger menu check', async function () {
        const browser = this.browser;
        await browser.setWindowSize(575, 1000);
        await browser.url("/hw/store/delivery");

        await browser.assertView("burger-menu", ".navbar", {
            compositeImage: true,
        });

        await browser.$(".navbar-toggler").click();
        await browser.pause(1000);
        await browser.assertView("burger-menu-opened", ".navbar", {
            compositeImage: true,
        });

        await browser.$(".nav-link.active").click();
        await browser.pause(1000);
        await browser.assertView("burger-menu-closed", ".navbar", {
            compositeImage: true,
        });
    });
});