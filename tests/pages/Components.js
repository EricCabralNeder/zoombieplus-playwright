const { expect } = require('@playwright/test');

export class Toast {

    constructor(page) {
        this.page = page
    }

    async containText(message) {
        const toast = this.page.locator('.toast')

        await expect(toast).toContainText(message)
        await expect(toast).toBeHidden({ timeout: 5000 })     // garante que nao esta no HTML
        //await expect(toast).not.toBeEditable({ timeout: 5000 }) // nao esta visivel mas pode estar no HTML
    }
}