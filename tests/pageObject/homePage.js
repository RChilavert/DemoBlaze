exports.HomePage = class HomePage{
    constructor(page){
        this.page = page;
        this.signUpLink = page.getByRole('link', { name: 'Sign up' });
        this.logInLink = page.getByRole('link', { name: 'Log in' });
        this.userNameProfile = page.getByRole('link', { name: 'Welcome' });
    }
    async openPage(){
        await this.page.goto('https://www.demoblaze.com/');
    }
    async clickOnSignUpButton(){
        await this.signUpLink.click();
    }
    async clickOnLoginButton(){
        await this.logInLink.click();
    }
}