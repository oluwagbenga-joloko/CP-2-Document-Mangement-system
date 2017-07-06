const config = require('../../../nightwatch.conf.js');
const faker = require('faker');

module.exports = {
  'signup tests': function (browser) {
    browser
      .resizeWindow(1280, 800)
      .url('http://localhost:7000/')
      .waitForElementVisible('body')
      .assert.title('Document Management System')
      .waitForElementVisible('#signupForm', 5000)
      .setValue('input[name="firstName"]', 'gbenga')
      .setValue('input[name="lastName"]', 'gbenga')
      .setValue('input[name=email]', 'admin@documentit.com')
      .setValue('input[name=password]', 'password')
      .setValue('input[name=rePassword]', 'different')
      .click('button[type=submit]')
      .pause(1000)
      .waitForElementVisible('#rePassword-error', 5000)
      .assert.containsText('#rePassword-error',
      'Please enter the same value again.')
      .clearValue('input[name=rePassword]')
      .setValue('input[name=rePassword]', 'password')
      .pause(1000)
      .click('button[type=submit]')
      .waitForElementVisible('.custom-error', 5000)
      .assert.containsText('.custom-error', 'user email already used')
      .pause(1000)
      .clearValue('input[name=email]')
      .setValue('input[name=email]', faker.internet.email())
       .click('button[type=submit]')
      .waitForElementNotPresent('.signupForm', 1000)
      .waitForElementPresent('nav', 10000)
      .pause(1000)
      .assert.urlEquals('http://localhost:7000/#/dashboard/generaldocuments')
      .pause(1000)
      .click('.logout')
      .pause(1000)
      .end();
  }
};
