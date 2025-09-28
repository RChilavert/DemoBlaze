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