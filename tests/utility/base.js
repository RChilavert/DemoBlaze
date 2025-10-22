import * as fs from 'fs/promises'; 
import * as path from 'path';
exports.Base = class Base {
    constructor(page) {
        this.page = page;
    }
    /**
     * Read and parse a JSON file from the specified path.
     * @param {string} filePath - The path to the JSON file, relative to the project's root directory.
     * @returns {Promise<object>} - The parsed JSON object.
     */
    static async readTestData(filePath) {
        const fullPath = path.join(process.cwd(), filePath);
        try {
            const data = await fs.readFile(fullPath, 'utf-8');
            return JSON.parse(data);
            
        } catch (error) {
            console.error(`Error reading or parsing the JSON file at: ${fullPath}`, error);
            throw new Error(`Failed to load test data: ${error.message}`);
        }
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
                productNames.push(productsObject[key].name.trim());
            }
        }
        console.log('Product names from JSON:', productNames);
        return productNames;
    }
    /**
     * Writes a data object to any JSON file dynamically.
     * @param {string} filePath - The path to the JSON file, relative to the project's root directory.
     * @param {object} dataObject - The complete JavaScript object to write to the file.
     * @param {number} [indent=4] - The indentation level for the JSON format (default is 4).
     */
    static async writeTestData(filePath, dataObject, indent = 4) {
        const fullPath = path.join(process.cwd(), filePath);
        try {
            const jsonString = JSON.stringify(dataObject, null, indent);
            await fs.writeFile(fullPath, jsonString);
            console.log(`JSON file updated successfully: ${filePath}`);
        } catch (error) {
            console.error(`Error writing to the JSON file at: ${fullPath}`, error);
            throw new Error(`Failed to save test data: ${error.message}`);
        }
    }
    /**
     * Builds a product object ready for the JSON category.
     * @param {string[]} productNamesFromWeb - Array of product names obtained from the web.
     * @param {object} existingData - The complete JSON object already loaded.
     * @param {string} categoryKey - The category key (e.g., 'phones').
     * @returns {object} A mapped object with keys "product1", "product2", etc.
     */
    static buildProductDataForJSON(productNamesFromWeb, existingData, categoryKey) {
        const newProducts = {};
        productNamesFromWeb.forEach((name, index) => {
            const productKey = `product${index + 1}`;
            const existingProduct = existingData[categoryKey]?.[productKey] || {};
            newProducts[productKey] = {
                "name": name,
                "price": existingProduct.price || "",
                "description": existingProduct.description || ""
            };
        });

        return newProducts;
    }
    /**
     * Coordinates reading, updating, and writing data for a category in a JSON file.
     * @param {string} jsonPath - Path to the JSON file (e.g., 'tests/testData/productCardInfo.json').
     * @param {string} categoryKey - The key of the category to update (e.g., 'phones').
     * @param {string[]} productNamesFromWeb - The product names obtained from the Page.
     */
    static async updateCategoryDataInJSON(jsonPath, categoryKey, productNamesFromWeb) {
        try {
            const existingData = await Base.readTestData(jsonPath);
            const newProductStructure = Base.buildProductDataForJSON(
                productNamesFromWeb, 
                existingData, 
                categoryKey
            );
            existingData[categoryKey] = newProductStructure;
            await Base.writeTestData(jsonPath, existingData);
            console.log(`The '${categoryKey}' category in the JSON has been updated.`);
        } catch (error) {
            console.error(`Failed in the data update flow for category ${categoryKey}:`, error);
            throw error;
        }
    }
    /**
     * Gets the current date and time as a formatted string.
     * @returns {Promise<string>} - A string with the current date and time in "YYYY-MM-DD_HH-MM-SS" format.
     */
    async getCurrentDateTimeString() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // months 0-11
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
    }
}