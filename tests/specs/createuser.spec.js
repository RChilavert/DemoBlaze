import { test, expect } from '@playwright/test';
import { Base } from '../utility/base';
import { HomePage } from '../pageObject/homePage';
import { SignUpPage } from '../pageObject/signupPage';

test.describe('User Sign Up Tests', () => {
    test.beforeEach(async ({ page }) => {
        const Home = new HomePage(page);
            await Home.openPage();
            await Home.clickOnSignUpButton();
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
    test('validate that duplicate users cannot be created', async ({ page }) => {
        const SignUp = new SignUpPage(page);
            await SignUp.signUp('sampleUser', 'Sample123!!');
            await page.once('dialog', async dialog => {
                expect(dialog.message()).toContain('This user already exist.');
                await dialog.accept();
            });
    });
    test('validate that a user cannot be created without providing both Username and Password.', async ({ page }) => {
        const SignUp = new SignUpPage(page);
            await SignUp.signUp('', '');
            await page.once('dialog', async dialog => {
                expect(dialog.message()).toContain('Please fill out Username and Password.');
                await dialog.accept();
            });
    });
    test('validate that users cannot be created without completing the Username field.', async ({ page }) => {
        const SignUp = new SignUpPage(page);
            await SignUp.signUp('', 'Sample123!!');
            await page.once('dialog', async dialog => {
                expect(dialog.message()).toContain('Please fill out Username and Password.');
                await dialog.accept();
            });
    });
    test('validate that users cannot be created without completing the Password field.', async ({ page }) => {
        const SignUp = new SignUpPage(page);
            await SignUp.signUp('sampleUser', '');
            await page.once('dialog', async dialog => {
                expect(dialog.message()).toContain('Please fill out Username and Password.');
                await dialog.accept();
            });
    });
});