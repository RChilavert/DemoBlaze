import { expect } from '@playwright/test';  
import { HomePage } from './homePage';

exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page
        this.logInLink = page.getByRole('link', { name: 'Log in' })
        this.logInUserNameInput = page.locator('#loginusername')
        this.logInPasswordInput = page.locator('#loginpassword')
        this.logInButton = page.getByRole('button', { name: 'Log in' })
        this.closeButton = page.getByLabel('Log in').getByText('Close')
    }
    async openLogInModal() {
        await this.logInLink.click();
    }
    async enterLogInUserName(userName) {
        await this.logInUserNameInput.fill(userName);
    }
    async enterLogInPassword(password) {
        await this.logInPasswordInput.fill(password);
    }
    async clickLogInButton() {
        await this.logInButton.click();
    }
    async clickCloseButton() {
        await this.closeButton.click();
    }
    async logIn(userName, password) {
        await this.openLogInModal();
        await this.enterLogInUserName(userName);
        await this.enterLogInPassword(password);
        await this.clickLogInButton();
        
        const Home = new HomePage(this.page);
        await expect(Home.userNameProfile).toHaveText('Welcome ' + userName);
    }
}