exports.CategoriesPage = class CategoriesPage{
    constructor(page){
        this.page = page;
        this.categoriesMenuButton = page.getByRole('link', { name: 'CATEGORIES' });
        this.phonesCategoryButton = page.getByRole('link', { name: 'Phones' });
        this.laptopsCategoryButton = page.getByRole('link', { name: 'Laptops' });
        this.monitorsCategoryButton = page.getByRole('link', { name: 'Monitors' });
        this.productName = page.locator('.card-title a');
    }
    /**
     * Clicks the 'CATEGORIES' menu button.
     * @returns {Promise<void>}
     */
    async clickOnCategoriesMenuButton(){
        try {
            await this.categoriesMenuButton.click();
        } catch (error) {
            console.error(`ERROR in clickOnCategoriesMenuButton: ${error.message}`);
            throw error;
        }
    }
    /**
     * Clicks the 'Phones' category button.
     * @returns {Promise<void>}
     */
    async clickOnPhonesCategoryButton(){
        try {
            await this.phonesCategoryButton.click();
        } catch (error) {
            console.error(`ERROR in clickOnPhonesCategoryButton: ${error.message}`);
            throw error;
        }
    }
    /**
     * Clicks the 'Laptops' category button.
     * @returns {Promise<void>}
     */
    async clickOnLaptopsCategoryButton(){
        try {
            await this.laptopsCategoryButton.click();
        } catch (error) {
            console.error(`ERROR in clickOnLaptopsCategoryButton: ${error.message}`);
            throw error;
        }
    }
    /**
     * Clicks the 'Monitors' category button.
     * @returns {Promise<void>}
     */
    async clickOnMonitorsCategoryButton(){
        try {
            await this.monitorsCategoryButton.click();
        } catch (error) {
            console.error(`ERROR in clickOnMonitorsCategoryButton: ${error.message}`);
            throw error;
        }
    }
    /**
     * Gets the names of all visible products on the page.
     * @returns {Promise<string[]>} An array of product names.
     */
    async getProductNames(){
        try {
            await this.productName.first().waitFor({ state: 'visible', timeout: 5000 });
            const productNames = await this.productName.allTextContents();
            console.log('product names: ', productNames);
            return productNames;
        } catch (error) {
            console.error(`ERROR in getProductNames: ${error.message}`);
            throw error;
        }
    }
}