const { expect } = require('@playwright/test');
const { BasePage } = require('../base_page');

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.username = page.locator('[id="user-name"]')
        this.password = page.locator('[id="password"]')
        this.loginButton = page.locator('[id="login-button"]')
        this.error_message = page.locator('h3')
    }

    async verifyLocators() {
        await expect(this.username).toBeVisible;
        await expect(this.password).toBeVisible;
        await expect(this.loginButton).toBeVisible;
    }

    async login(username, password) {
        await this.username.fill(username)
        await this.password.fill(password)
        await this.loginButton.click()
    }

    async verifyError(message) {
        await expect(this.error_message).toHaveText(message)
    }
}