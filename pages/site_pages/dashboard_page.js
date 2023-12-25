const { expect } = require('@playwright/test');
const { BasePage } = require('../base_page');

export class DashboardPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.header = page.getByTitle('Products')
        this.menuButton = page.locator('#react-burger-menu-btn')
        this.logoutLink = page.locator('#logout_sidebar_link')
    }

    async verifyPageHeader() {
        await this.header.isVisible()
    }

    async logout() {
        await this.menuButton.click()
        await this.logoutLink.click()
    }
}