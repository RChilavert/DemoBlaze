exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page
        this.userNameInput = page.locator('#loginusername');
        this.passwordInput = page.locator('#loginpassword');
        this.logInButton = page.getByRole('button', { name: 'Log in' });
        this.closeButton = page.getByLabel('Log in').getByText('Close');
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
     * Clicks the 'Log in' button.
     * @returns {Promise<void>}
     */
    async clickOnLogInButton() {
        try {
            await this.logInButton.click();
        } catch (error) {
            console.error(`ERROR in clickOnLogInButton: ${error.message}`);
            throw error;
        }
    }

    /**
     * Clicks the 'Close' button on the login modal.
     * @returns {Promise<void>}
     */
    async clickCloseButton() {
        try {
            await this.closeButton.click();
        } catch (error) {
            console.error(`ERROR in clickCloseButton: ${error.message}`);
            throw error;
        }
    }

    /**
     * Performs the complete user login process.
     * @param {string} userName - The username to log in with.
     * @param {string} password - The user's password.
     * @returns {Promise<void>}
     */
    async logIn(userName, password) {
        try {
            await this.enterUserName(userName);
            await this.enterPassword(password);
            await this.clickOnLogInButton();
        } catch (error) {
            console.error(`ERROR in logIn: ${error.message}`);
            throw error;
        }
    }
}
