module.exports = {
    baseUrl: 'https://shri.yandex/hw/store/',
    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome' // this browser should be installed on your OS
            }
        }
    },
    screenshotsDir: './test/hermione/screens',
};