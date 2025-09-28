import { test, expect } from '@playwright/test';
import { Base } from '../utility/base';
import { HomePage } from '../pageObject/homePage';
import { CategoriesPage } from '../pageObject/categoriesPage';

const JSON_PATH = 'tests/testData/productCardInfo.json';

test.describe('validation of all catalog products.', () => {
    test.beforeEach(async ({ page }) => {
        const Home = new HomePage(page);
            await Home.openPage();
    });
    test.afterEach(async ({ page }, testInfo) => {
        const Base_ = new Base(page);
        const dateTimeString = await Base_.getCurrentDateTimeString();
        await page.screenshot({ path: `test-results/screenshot/${testInfo.title}_${dateTimeString}.png` });
    });

    test('validate that the product names are correct.', async ({ page }) => {
        const Categories = new CategoriesPage(page);

            await Categories.clickOnPhonesCategoryButton();
            const WEBproductName = await Categories.getProductNames();
            
            const productCardInfoJSON = await Base.readTestData(JSON_PATH);
            const JSONproductName = CategoriesPage.getProductNamesFromJSON(productCardInfoJSON, 'phones');
            expect(WEBproductName).toEqual(JSONproductName);
            await page.pause(9000);
    });
});