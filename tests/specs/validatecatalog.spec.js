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

    test('validate that the product names for the Phones category are correct.', async ({ page }) => {
        const Categories = new CategoriesPage(page);

            await Categories.clickOnPhonesCategoryButton();
            const WEBproductName = await Categories.getProductNames('Phones');
            
            const productCardInfoJSON = await Base.readTestData(JSON_PATH);
            const JSONproductName = Base.getProductNamesFromJSON(productCardInfoJSON, 'phones');
            expect(WEBproductName).toEqual(JSONproductName);
    });
    test('validate that the product names for the Laptops category are correct.', async ({ page }) => {
        const Categories = new CategoriesPage(page);

            await Categories.clickOnLaptopsCategoryButton()
            const WEBproductName = await Categories.getProductNames('Laptops');
            
            const productCardInfoJSON = await Base.readTestData(JSON_PATH);
            const JSONproductName = Base.getProductNamesFromJSON(productCardInfoJSON, 'laptops');
            expect(WEBproductName).toEqual(JSONproductName);
    });
    test('validate that the product names for the Monitors category are correct.', async ({ page }) => {
        const Categories = new CategoriesPage(page);

            await Categories.clickOnMonitorsCategoryButton()
            const WEBproductName = await Categories.getProductNames('Monitors');
            
            const productCardInfoJSON = await Base.readTestData(JSON_PATH);
            const JSONproductName = Base.getProductNamesFromJSON(productCardInfoJSON, 'monitors');
            expect(WEBproductName).toEqual(JSONproductName);
    });
});