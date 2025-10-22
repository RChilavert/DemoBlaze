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
     * Clicks the 'Phones' category button and waits for the product list to be updated.
     * @returns {Promise<void>}
     */
    async clickOnPhonesCategoryButton() {
        // Inicia la espera de la respuesta de la red ANTES de hacer clic.
        const responsePromise = this.page.waitForResponse('**/bycat');
        try {
            await this.phonesCategoryButton.click();
            await responsePromise; // Espera a que la petición finalice.
        } catch (error) {
            console.error(`ERROR in clickOnPhonesCategoryButton: ${error.message}`);
            throw error;
        }
    }
    /**
     * Clicks the 'Laptops' category button and waits for the product list to be updated.
     * @returns {Promise<void>}
     */
    async clickOnLaptopsCategoryButton() {
        // Inicia la espera de la respuesta de la red ANTES de hacer clic.
        const responsePromise = this.page.waitForResponse('**/bycat');
        try {
            await this.laptopsCategoryButton.click();
            await responsePromise; // Espera a que la petición finalice.
        } catch (error) {
            console.error(`ERROR in clickOnLaptopsCategoryButton: ${error.message}`);
            throw error;
        }
    }
    /**
     * Clicks the 'Monitors' category button and waits for the product list to be updated.
     * @returns {Promise<void>}
     */
    async clickOnMonitorsCategoryButton() {
        // Inicia la espera de la respuesta de la red ANTES de hacer clic.
        const responsePromise = this.page.waitForResponse('**/bycat');
        try {
            await this.monitorsCategoryButton.click();
            await responsePromise; // Espera a que la petición finalice.
        } catch (error) {
            console.error(`ERROR in clickOnMonitorsCategoryButton: ${error.message}`);
            throw error;
        }
    }
    /**
     * Gets the names of all visible products on the page after a category change.
     * @param {string} category - Name of the category from which the product names are being retrieved.
     * @returns {Promise<string[]>} An array of product names.
     */
    async getProductNames(category){
        try {
            await this.productName.first().waitFor({ state: 'attached', timeout: 5000 });
            const productNamesFromWeb = await this.productName.allTextContents();
            const cleanedProductNames = productNamesFromWeb.map(name => name.trim());
            console.log(`WEB - Product names of the ${category} category: `, cleanedProductNames);
            return cleanedProductNames;
        } catch (error) {
            console.error(`ERROR in getProductNames: ${error.message}`);
            throw error;
        }
    }
}