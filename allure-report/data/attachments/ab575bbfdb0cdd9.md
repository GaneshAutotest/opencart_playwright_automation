# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Logout.spec.ts >> User logout test @master @regression
- Location: tests\Logout.spec.ts:47:5

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "http://localhost/opencart/upload/", waiting until "load"

```

# Test source

```ts
  1  | /**
  2  |  * Test Case: User Logout
  3  |  * 
  4  |  * Tags: @master @regression
  5  |  * 
  6  |  * Steps:
  7  |  * 1) Navigate to the application URL
  8  |  * 2) Go to Login page from Home page
  9  |  * 3) Login with valid credentials
  10 |  * 4) Verify 'My Account' page
  11 |  * 5) Click on Logout link
  12 |  * 6) Click on Continue button
  13 |  * 7) Verify user is redirected to Home Page
  14 |  */
  15 | 
  16 | import { test, expect } from '@playwright/test';
  17 | import { TestConfig } from '../test.config';
  18 | import { HomePage } from '../pages/HomePage';
  19 | import { LoginPage } from '../pages/LoginPage';
  20 | import { MyAccountPage } from '../pages/MyAccountPage';
  21 | import { LogoutPage } from '../pages/LogOutPage';
  22 | 
  23 | // Declare shared variables
  24 | let config: TestConfig;
  25 | let homePage: HomePage;
  26 | let loginPage: LoginPage;
  27 | let myAccountPage: MyAccountPage;
  28 | let logoutPage: LogoutPage;
  29 | 
  30 | // Setup before each test
  31 | test.beforeEach(async ({ page }) => {
  32 |   config = new TestConfig(); // Load test config
> 33 |   await page.goto(config.appUrl); // Step 1: Navigate to app URL
     |              ^ Error: page.goto: Target page, context or browser has been closed
  34 | 
  35 |   // Initialize page objects
  36 |   homePage = new HomePage(page);
  37 |   loginPage = new LoginPage(page);
  38 |   myAccountPage = new MyAccountPage(page);
  39 |   //logoutPage = new LogoutPage(page);
  40 | });
  41 | 
  42 | // Optional cleanup after each test
  43 | test.afterEach(async ({ page }) => {
  44 |   await page.close(); // Close the browser tab (helps keep tests clean)
  45 | });
  46 | 
  47 | test('User logout test @master @regression', async () => {
  48 |   // Step 2: Navigate to Login page
  49 |   await homePage.clickOnMyAccountDrodown();
  50 |   await homePage.clickOnLoginLink();
  51 | 
  52 |   // Step 3: Perform login using valid credentials
  53 |   await loginPage.login(config.email, config.password);
  54 | 
  55 |   // Step 4: Verify successful login
  56 |   expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
  57 | 
  58 |   // Step 5: Click Logout, which returns LogoutPage instance
  59 |   logoutPage = await myAccountPage.clickLogout();
  60 | 
  61 |   // Step 6: Verify "Continue" button is visible before clicking
  62 |   expect(await logoutPage.isContinueButtonVisible()).toBe(true);
  63 | 
  64 |   // Step 7: Click Continue and verify redirection to HomePage
  65 |   homePage = await logoutPage.clickContinue();
  66 |   expect(await homePage.isHomePageExists()).toBe(true);
  67 | });
  68 | 
```