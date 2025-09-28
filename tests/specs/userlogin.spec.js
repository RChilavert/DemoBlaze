import { test, expect } from '@playwright/test';
import { Base } from '../utility/base';
import { HomePage } from '../pageObject/homePage';
import { LoginPage} from '../pageObject/loginPage';

test.describe('User LogIn Tests', () => {
    test.beforeEach(async ({ page }) => {
        const Home = new HomePage(page);
            await Home.openPage();
            await Home.clickOnLoginButton();
    });
    test.afterEach(async ({ page }, testInfo) => {
        const Base_ = new Base(page);
        const dateTimeString = await Base_.getCurrentDateTimeString();
        await page.screenshot({ path: `test-results/screenshot/${testInfo.title}_${dateTimeString}.png` });
    });

    test('validate that the user can log in with valid credentials.', async ({ page }) => {
        const Login = new LoginPage(page);
            await Login.logIn('loginUser', 'Sample123!!');
        const Home = new HomePage(page);
            await expect(Home.userNameProfile).toHaveText(/Welcome/);
    });
    test('validate that the user cannot log in with invalid credentials.', async ({ page }) => {
        const Login = new LoginPage(page);
            await Login.logIn('loginUser1', 'Sample123!!');
            await page.once('dialog', async dialog => {
                expect(dialog.message()).toContain('User does not exist.');
                await dialog.accept();
            });
    });
    test('validate that the user cannot log in with an incorrect password.', async ({ page }) => {
        const Login = new LoginPage(page);
            await Login.logIn('loginUser', 'Sample123++');
            await page.once('dialog', async dialog => {
                expect(dialog.message()).toContain('Wrong password.');
                await dialog.accept();
            });
    });
});