/**
 * Test Case: Account Registration
 * 
 * Tags: @master @sanity @regression
 * 
 * Steps:
 * 1) Navigate to application URL 
 * 2) Go to 'My Account' and click 'Register'
 * 3) Fill in registration details with random data
 * 4) Agree to Privacy Policy and submit the form
 * 5) Validate the confirmation message
 */

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistartionPage } from '../pages/RegistrationPage';
import { RandomDataUtil } from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';

let homePage: HomePage;
let registrationPage: RegistartionPage;
let config: TestConfig;

test.beforeEach(async ({ page }) => {
    config = new TestConfig();
    await page.goto(config.appUrl); //Navigate to application URL 
    homePage = new HomePage(page);
    registrationPage = new RegistartionPage(page);

})


test.afterEach(async ({ page }) => {

    await page.waitForTimeout(3000);
    await page.close();

})


test('User registration test @master @sanity @regression', async () => {

    //Go to 'My Account' and click 'Register'

    await homePage.clickOnMyAccountDrodown();
    await homePage.clickOnRegisterLink();

    //Fill in registration details with random data
    await registrationPage.EnterFirstName(RandomDataUtil.getFirstName());
    await registrationPage.EnterLastName(RandomDataUtil.getlastName());
    await registrationPage.EnterEmail(RandomDataUtil.getEmail());
    await registrationPage.EnterTelephone(RandomDataUtil.getPhoneNumber());

    const password = RandomDataUtil.getPassword();
    await registrationPage.EnterPassword(password);
    await registrationPage.EnterConfirmPassword(password);

    await registrationPage.CheckPrivacyPolicy();
    await registrationPage.ClickContinueButton();

    //Validate the confirmation message

    const confirmationMsg = await registrationPage.GetConfirmationMessage();
    expect(confirmationMsg).toContain('Your Account Has Been Created!')


})
