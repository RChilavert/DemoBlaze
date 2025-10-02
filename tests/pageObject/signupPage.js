exports.SignUpPage = class SignUpPage {
    constructor(page) {
        this.page = page;
        this.userNameInput = page.getByRole('textbox', { name: 'Username:' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password:' });
        this.signUpButton = page.getByRole('button', { name: 'Sign up' });
    }
    /**
     * Enters the username into the username input field.
     * @param {string} userName - The username to enter.
     * @returns {Promise<void>}
     */
    async enterUserName(userName) {
        try {
            await this.userNameInput.fill(userName);
        } catch (error) {
            console.error(`ERROR in enterUserName: ${error.message}`);
            throw error;
        }
    }
    /**
     * Enters the password into the password input field.
     * @param {string} password - The password to enter.
     * @returns {Promise<void>}
     */
    async enterPassword(password) {
        try {
            await this.passwordInput.fill(password);
        } catch (error) {
            console.error(`ERROR in enterPassword: ${error.message}`);
            throw error;
        }
    }
    /**
     * Clicks the 'Sign up' button.
     * @returns {Promise<void>}
     */
    async clickSignUpButton() {
        try {
            await this.signUpButton.click();
        } catch (error) {
            console.error(`ERROR in clickSignUpButton: ${error.message}`);
            throw error;
        }
    }
    /**
     * Performs the complete user sign-up process.
     * @param {string} userName - The username to register with.
     * @param {string} password - The user's password.
     * @returns {Promise<void>}
     */
    async signUp(userName, password) {
        try {
            await this.enterUserName(userName);
            await this.enterPassword(password);
            await this.clickSignUpButton();
        } catch (error) {
            console.error(`ERROR in signUp: ${error.message}`);
            throw error;
        }
    }
}