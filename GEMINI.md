## 1. General Objective
The project aims to automate functional tests (positive and negative cases) for all features of the e-commerce platform **https://www.demoblaze.com/index.html**.

## 2. Technology Stack
- Environment: **VS Code**
- Automation Tool: **Playwright**
- Programming Language: **JavaScript** (JS)

## 3. Architecture and File Structure (POM)
The project follows the **Page Object Model (POM)** pattern. The folder structure is strict:

| Folder | Purpose | File Naming Convention |
| :--- | :--- | :--- |
| **pageObject/** | Classes that represent web screens/pages. | Must end with **Page.js** (e.g., `homePage.js`). |
| **specs/** | Files containing the tests (test cases). | Must end with **.spec.js** (e.g., `login.spec.js`). |
| **testData/** | Temporary storage and test data. | N/A |
| **utility/** | Helper functions that do NOT interact directly with the page (e.g., reading JSON, formatting). | N/A |
| **test-results/screenshot** | Location for failure screenshots. | N/A |

## 4. Code Style and Naming Conventions

### A. Functions and Variables
- **Nomenclature:** Always use **camelCase** style (e.g., `logIn`, `checkoutButton`).
- **Descriptiveness:** Function and variable names must be **descriptive and concise**.

### B. Locators (Playwright Selectors)
- **Suffix Rule:** Every page element selector (a *locator*) must end with the name of the **element type** it refers to.
    - Buttons: Must end with **Button** (e.g., `loginButton`).
    - Input fields: Must end with **Input** (e.g., `usernameInput`).
    - Messages/Texts: Must end with **Text** or **Label** (e.g., `welcomeMessageText`).
    - Links: Must end with **Link** (e.g., `cartLink`).

### C. Comments and Documentation (Mandatory)
- **Format:** All functions must be documented using the **JSDoc** comment format.
- **Comment Content:** Must be in English, descriptive, and brief, including:
    1.  A description of what the function does.
    2.  A description of the parameter and the **data type** it receives (`@param`).
    3.  A description of what it returns and the **data type** it returns (`@returns`).

**Required Comment Example:**
```javascript
 /**
     * Performs the user login process.
     * @param {string} username - The username to log in with.
     * @param {string} password - The user's password.
     * @returns {Promise<void>} - Does not return an explicit value.
     */
```
### D. Error Handling
- **Required Structure:** All **`async`** functions that interact with the page (`pageObject/`) must be wrapped in a **`try-catch`** block to ensure test robustness.
- **`catch` Handling:** The `catch` block must capture the error (`error`) and print a **clear and brief** error message to the console. The message must include the name of the function where the error occurred.

**Required Structure Example:**

```javascript
/**
 * DescriptiveFunctionName: Describes what the function does (in English, if you've already translated GEMINI.md).
 * @param {dataType} parameterName - Description of the parameter.
 * @returns {Promise<void>} - (Or the data type that it returns).
 */
async functionNameInCamelCase(parameterInput) {
    try {
        // Playwright automation logic goes here.
        // Example:
        await this.usernameInput.fill(parameterInput);
        
        // If everything is successful, you can return something or simply finish:
        console.log('Action completed successfully.');

    } catch (error) {
        // This line is crucial for error handling:
        console.error(`ERROR in functionNameInCamelCase: ${error.message}`);
        
        // It's a good practice in testing to rethrow the error so the test fails:
        throw error; 
    }
}