import{Page,Locator,expect}from '@playwright/test';

export class RegistartionPage{

//Locators
private readonly page: Page;
private readonly txtFirstName: Locator;
private readonly txtLastName: Locator;
private readonly txtEmail: Locator;
private readonly txtTelephone: Locator;
private readonly txtPassword: Locator;
private readonly txtConfirmPassword: Locator;
private readonly checkboxPrivacyPolicyCheckbox: Locator;
private readonly btnContinue: Locator;
private readonly msgConfirmation: Locator;

//Constructor
constructor(page: Page) {
    this.page = page;
    
    this.txtFirstName = this.page.locator("#input-firstname");
    this.txtLastName = this.page.locator("#input-lastname");
    this.txtEmail = this.page.locator("#input-email");
    this.txtTelephone = this.page.locator("#input-telephone");
    this.txtPassword = this.page.locator("#input-password");
    this.txtConfirmPassword = this.page.locator("#input-confirm");
    this.checkboxPrivacyPolicyCheckbox = this.page.locator("input[value='1'][name='agree']");
    this.btnContinue = this.page.locator("input[value='Continue']");
    this.msgConfirmation = page.locator("h1:has-text('Your Account Has Been Created!')");
}

//Action Methods 
/**
 * Sets the first name in the registration form.
 * @param fName - First name to enter.
 */
// Enter First Name
async EnterFirstName(fName: string):Promise<void> {
    try {
        await this.txtFirstName.fill(fName);
    } catch (error) {
        console.log(`Exception Occured while entering 'First name': ${error}`);
    }
}

// Enter Last Name
/**
 * Sets the last name in the registration form.
 * @param lName - Last name to enter.
 */
async EnterLastName(lName: string):Promise<void> {
    try {
        await this.txtLastName.fill(lName);
    } catch (error) {
        console.log(`Exception Occured while entering 'Last name': ${error}`);
    }
}

// Enter Email
/**
 * Sets the email address in the registration form.
 * @param email - Email address to enter.
 */

async EnterEmail(email: string):Promise<void> {
    try {
        await this.txtEmail.fill(email);
    } catch (error) {
        console.log(`Exception Occured while entering 'Email': ${error}`);
    }
}

// Enter Telephone
/**
 * Sets the telephone number in the registration form.
 * @param telephone - Telephone number to enter.
 */
async EnterTelephone(telephone: string):Promise<void> {
    try {
        await this.txtTelephone.fill(telephone);
    } catch (error) {
        console.log(`Exception Occured while entering 'Telephone': ${error}`);
    }
}

// Enter Password
/**
 * Sets the password in the registration form.
 * @param password - Password to enter.
 */
async EnterPassword(password: string):Promise<void> {
    try {
        await this.txtPassword.fill(password);
    } catch (error) {
        console.log(`Exception Occured while entering 'Password': ${error}`);
    }
}

// Enter Confirm Password
/**
 * Sets the confirmation password in the registration form.
 * @param confirmPassword - Confirmation password to enter.
 */
async EnterConfirmPassword(confirmPassword: string):Promise<void> {
    try {
        await this.txtConfirmPassword.fill(confirmPassword);
    } catch (error) {
        console.log(`Exception Occured while entering 'Confirm Password': ${error}`);
    }
}

// Check Privacy Policy Checkbox
async CheckPrivacyPolicy():Promise<void> {
    try {
        await this.checkboxPrivacyPolicyCheckbox.check();
    } catch (error) {
        console.log(`Exception Occured while checking 'Privacy Policy' checkbox: ${error}`);
    }
}

// Click Continue Button
async ClickContinueButton():Promise<void> {
    try {
        await this.btnContinue.click();
    } catch (error) {
        console.log(`Exception Occured while clicking 'Continue' button: ${error}`);
    }
}


// Get confirmation message text
/**
 * Retrieves the account creation confirmation message.
 * @returns The confirmation message displayed after successful registration.
 */
async GetConfirmationMessage() {
    try {
        return (await this.msgConfirmation.textContent())?.trim() ?? "";
    } catch (error) {
        console.log(`Exception Occured while getting confirmation message: ${error}`);
        throw error;
    }
}


/**
     * Complete registration workflow
     * @param userData - Object containing registration data
     */
    async completeRegistration(userData: {
        firstName: string;
        lastName: string;
        email: string;
        telephone: string;
        password: string;
    }): Promise<void> {
        await this.EnterFirstName(userData.firstName);
        await this.EnterLastName(userData.lastName);
        await this.EnterEmail(userData.email);
        await this.EnterTelephone(userData.telephone);
        await this.EnterPassword(userData.password);
        await this.EnterConfirmPassword(userData.password);
        await this.CheckPrivacyPolicy();
        await this.ClickContinueButton();
        await expect(this.msgConfirmation).toBeVisible();
    }



}