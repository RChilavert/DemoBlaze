import { test, expect } from '@playwright/test';
import { Base } from '../utility/base';
import { HomePage } from '../pageObject/homePage';

test.describe('User LogIn Tests', () => {
    test.beforeEach(async ({ page }) => {
        const Home = new HomePage(page);
            await Home.openPage();
            await Home.goToSignUpPage();
    });
    test.afterEach(async ({ page }, testInfo) => {
        const Base_ = new Base(page);
        const dateTimeString = await Base_.getCurrentDateTimeString();
        await page.screenshot({ path: `tests/screenshot/${testInfo.title}_${dateTimeString}.png` });
    });

    test('create new user', async ({ page }) => {
        const SignUp = new SignUpPage(page);
            await SignUp.signUp('sampleUser', 'Sample123!!');
            await page.once('dialog', async dialog => {
                expect(dialog.message()).toContain('Sign up successful.');
                await dialog.accept();
            });
    });
});