// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/site_pages/login_page');
const { DashboardPage } = require('../pages/site_pages/dashboard_page');

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
});

test('login page elements', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.verifyLocators()
    await loginPage.verifySiteMoto()
});

test('login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.login('standard_user', 'secret_sauce')
    const dashboardPage = new DashboardPage(page)
    await dashboardPage.verifyPageHeader()
});

test('login with locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.login('locked_out_user', 'secret_sauce')
    const message = 'Epic sadface: Sorry, this user has been locked out.'
    await loginPage.verifyError(message)
});

test('login with problem user', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.login('problem_user', 'secret_sauce')
    await page.screenshot({ path: 'problem_user.png' });
    await expect(page).toHaveScreenshot()
});

test('login with performance glitch user', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.login('performance_glitch_user', 'secret_sauce')
    await loginPage.verifyLocators()
    const dashboardPage = new DashboardPage(page)
    await dashboardPage.verifyPageHeader()
});

test('logout', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.login('standard_user', 'secret_sauce')
    await loginPage.verifyLocators()
    const dashboardPage = new DashboardPage(page)
    await dashboardPage.verifyPageHeader()
    await dashboardPage.logout()
    await loginPage.verifyLocators()
});