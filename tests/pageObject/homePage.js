exports.HomePage = class HomePage{
    constructor(page){
        this.page = page;
        this.signUpLink = page.getByRole('link', { name: 'Sign up' });
        this.logInLink = page.getByRole('link', { name: 'Log in' });
        this.userNameProfile = page.getByRole('link', { name: 'Welcome' });
    }
    /**
     * Navigates to the application's home page.
     * @returns {Promise<void>}
     */
    async openPage(){
        try {
            await this.page.goto('https://www.demoblaze.com/');
        } catch (error) {
            console.error(`ERROR in openPage: ${error.message}`);
            throw error;
        }
    }
    /**
     * Clicks the 'Sign up' link in the navigation bar.
     * @returns {Promise<void>}
     */
    async clickOnSignUpButton(){
        try {
            await this.signUpLink.click();
        } catch (error) {
            console.error(`ERROR in clickOnSignUpButton: ${error.message}`);
            throw error;
        }
    }
    /**
     * Clicks the 'Log in' link in the navigation bar.
     * @returns {Promise<void>}
     */
    async clickOnLoginButton(){
        try {
            await this.logInLink.click();
        } catch (error) {
            console.error(`ERROR in clickOnLoginButton: ${error.message}`);
            throw error;
        }
    }
}