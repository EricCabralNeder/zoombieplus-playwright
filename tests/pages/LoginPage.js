const { expect } = require('@playwright/test');

export class LoginPage {

    constructor(page) {
        this.page = page
    }

    async visit() {
        await this.page.goto('http://localhost:3000/admin/login')

        const loginform = this.page.locator('.login-form')
        await expect(loginform).toBeVisible()
    }

    async submit(email, password) {
        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(password)
        await this.page.getByText('Entrar').click()
        //await this.page.locator('//button[text()="Entrar"]').click()
    }

    async alertHaveText(text) {
        const alert = this.page.locator('span[Class$=alert]')
        await expect(alert).toHaveText(text)
    }
}