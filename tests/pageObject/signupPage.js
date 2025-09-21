exports.SignUpPage = class SignUpPage {

    constructor(page) {
        this.page = page;
        this.userNameInput = page.getByRole('textbox', { name: 'Username:' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password:' });
        this.signUpButton = page.getByRole('button', { name: 'Sign up' });
    }
    async enterUserName(userName) {
        await this.userNameInput.fill(userName);
    }
    async enterPassword(password) {
        await this.passwordInput.fill(password);
    }
    async clickSignUpButton() {
        await this.signUpButton.click();
    }

    async signUp(userName, password) {
        await this.enterUserName(userName);
        await this.enterPassword(password);
        await this.clickSignUpButton();
    }
}