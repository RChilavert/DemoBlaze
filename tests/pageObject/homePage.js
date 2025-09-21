exports.HomePage = class HomePage{
    
    //page elements
    constructor(page){
        this.page = page;
        this.signUpLink = page.getByRole('link', { name: 'Sign up' });
        this.userNameProfile = page.locator('button', { hasText: 'Welcome' });
    }
    async openPage(){
        await this.page.goto('https://www.demoblaze.com/');
    }
    async goToSignUpPage(){
        await this.signUpLink.click();
    }
}