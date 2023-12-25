const { expect } = require('@playwright/test');

exports.BasePage = class BasePage {
    constructor(page) {
        this.page = page;
        this.site_moto = page.locator('Swag Labs')
    }

    async verifySiteMoto() {
        await expect(this.site_moto).toBeVisible
    }
}