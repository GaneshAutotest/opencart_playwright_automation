import{Page,Locator} from '@playwright/test';
export class HomePage{
//Locators
private readonly page:Page;
private readonly MyAccountDropdown:Locator;
private readonly RegisterLink:Locator;
private readonly loginLink:Locator;
private readonly searchInput:Locator;
private readonly SearchButton:Locator;


//Constructor
constructor(page:Page){
this.page=page;
this.MyAccountDropdown=this.page.locator("a[title='My Account'] span[class='hidden-xs hidden-sm hidden-md']");
//this.RegisterLink=this.page.locator("a[href='http://localhost/opencart/upload/index.php?route=account/register']");
this.RegisterLink=this.page.getByRole('link', { name: 'Register' });
//this.loginLink=this.page.locator("a[href='http://localhost/opencart/upload/index.php?route=account/login']");
this.loginLink=this.page.getByRole('link', { name: 'Login' });
this.searchInput=this.page.locator("input[placeholder='Search']");
this.SearchButton=this.page.locator("button[class='btn btn-default btn-lg']");

}

//Action methods
//Check Home Page is Exists or Not
async isHomePageExists(){
let Title=await this.page.title();
   if(Title){
    return true;
   }
   return false;
}

//Click on MyAccount Dropdown
async clickOnMyAccountDrodown():Promise<void>{
    try {
         await this.MyAccountDropdown.click();
    } catch (error) {
        console.error(`Exception Occured while clicking 'My Account Dropdown':${error}`);
        throw error;
    }
}

//Click on RegisterLink 
async clickOnRegisterLink():Promise<void>{
    try {
         await this.RegisterLink.click();
    } catch (error) {
        console.error(`Exception Occured while clicking 'Register Link':${error}`);
        throw error;
    }
}

//Click on Login Link
async clickOnLoginLink():Promise<void>{
    try {
         await this.loginLink.click();
    } catch (error) {
        console.error(`Exception Occured while clicking 'Login Link':${error}`);
        throw error;
    }
}

//Enter product name in the Search Box
async EnterProductName(ProductName:string):Promise<void>{
    try {
         await this.searchInput.fill(ProductName);
    } catch (error) {
        console.error(`Exception Occured while entering product name :${error}`);
        throw error;
    }
}

//Click on Search Button
async clickOnSearchButton():Promise<void>{
    try {
         await this.SearchButton.click();
    } catch (error) {
        console.error(`Exception Occured while clicking 'Login Link':${error}`);
        throw error;
    }
}


}