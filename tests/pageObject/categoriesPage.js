exports.CategoriesPage = class CategoriesPage{
    constructor(page){
        this.page = page;
        this.categoriesMenuButton = page.getByRole('link', { name: 'CATEGORIES' });
        this.phonesCategoryButton = page.getByRole('link', { name: 'Phones' });
        this.laptopsCategoryButton = page.getByRole('link', { name: 'Laptops' });
        this.monitorsCategoryButton = page.getByRole('link', { name: 'Monitors' });
        this.productName = page.locator('.card-title a');
    }
    async clickOnCategoriesMenuButton(){
        await this.categoriesMenuButton.click();
    }
    async clickOnPhonesCategoryButton(){
        await this.phonesCategoryButton.click();
    }
    async clickOnLaptopsCategoryButton(){
        await this.laptopsCategoryButton.click();
    }
    async clickOnMonitorsCategoryButton(){
        await this.monitorsCategoryButton.click();
    }
    async getProductNames(){
        await this.productName.first().waitFor({ state: 'visible', timeout: 5000 });
        const productNames = await this.productName.allTextContents();
        console.log('product names: ' + await productNames);
        return productNames;
    }
    /**
     * Extract a list of product names for a specific category from the JSON object.
     * @param {object} JSONData - The loaded JSON object (e.g., the content of productCardInfo.json).
     * @param {string} category - The category key (e.g., 'phones', 'laptops').
     * @returns {string[]} An array containing only the values of the 'name' attribute."
     */
    static getProductNamesFromJSON(JSONData, category) {
        if (!JSONData[category]) {
            throw new Error(`Category '${category}' not found in test data.`);
        }

        const productsObject = JSONData[category];
        const productNames = [];

        for (const key in productsObject) {
            if (Object.hasOwnProperty.call(productsObject, key)) {
                productNames.push(productsObject[key].name);
            }
        }
        console.log('Product names from JSON:', productNames);
        return productNames;
    }
}