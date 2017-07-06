const config = require('../../../nightwatch.conf.js');
const faker = require('faker');

const email = faker.internet.email(),
  newEmail = faker.internet.email(),
  password = faker.internet.password(),
  newPassword = faker.internet.password();

module.exports = {
  'edit profile': function (browser) {
    browser
     .resizeWindow(1280, 800)
      .url('http://localhost:7000/')
      .waitForElementVisible('body')
      .assert.title('Document Management System')
      .pause(1000)
      .waitForElementVisible('#signupForm', 5000)
      .setValue('input[name="firstName"]', faker.name.firstName())
      .pause(1000)
      .setValue('input[name="lastName"]', faker.name.lastName())
      .pause(1000)
      .setValue('input[name=email]', email)
      .setValue('input[name=password]', password)
      .setValue('input[name=rePassword]', password)
      .click('button[type=submit]')
      .pause(1000)
      .waitForElementNotPresent('.signupForm', 1000)
      .waitForElementPresent('nav', 1000)
      .click('#edit-profile')
      .pause(1000)
      .assert.urlEquals('http://localhost:7000/#/dashboard/editprofile')
      .clearValue('input[name=email]')
      .setValue('input[name=email]', newEmail)
      .clearValue('input[name=password]')
      .setValue('input[name=password]', newPassword)
      .click('button[type=submit]')
      .pause(1000)
      .waitForElementVisible('.toast-success', '.toast-message')
      .assert.containsText('.toast-message', 'profile update success')
      .waitForElementNotPresent('.toast-message')
      .click('.logout')
      .setValue('input[name=email]', email)
      .setValue('input[name=password]', password)
      .click('button[type=submit]')
      .pause(1000)
      .waitForElementVisible('.custom-error-login', 5000)
      .assert.containsText('.custom-error-login', 'email not found')
      .pause(1000)
      .clearValue('input[name=email]')
      .setValue('input[name=email]', newEmail)
      .click('button[type=submit]')
      .waitForElementVisible('.custom-error-login', 5000)
      .assert.containsText('.custom-error-login', 'invalid password')
      .pause(1000)
      .clearValue('input[name=password]')
      .setValue('input[name=password]', newPassword)
      .click('button[type=submit]')
      .pause(1000)
       .waitForElementPresent('nav', 1000)
      .assert.urlEquals('http://localhost:7000/#/dashboard')
      .click('.logout')
      .pause(1000)
       .assert.urlEquals('http://localhost:7000/#/login')
      .pause(1000)
      .end();
  }
};
