exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page
        this.userNameInput = page.locator('#loginusername');
        this.passwordInput = page.locator('#loginpassword');
        this.logInButton = page.getByRole('button', { name: 'Log in' });
        this.closeButton = page.getByLabel('Log in').getByText('Close');
    }
    async enterUserName(userName) {
        await this.userNameInput.fill(userName);
    }
    async enterPassword(password) {
        await this.passwordInput.fill(password);
    }
    async clickOnLogInButton() {
        await this.logInButton.click();
    }
    async clickCloseButton() {
        await this.closeButton.click();
    }
    async logIn(userName, password) {
        await this.enterUserName(userName);
        await this.enterPassword(password);
        await this.clickOnLogInButton();
    }
}