const { expect } = require('@playwright/test');

export class MoviesPage {

    constructor(page) {
        this.page = page
    }

    async isLoggedIn() {
        // const logoutLink = this.page.locator('a[href="/logout"]')
        // await expect(logoutLink).toBeVisible()
        await this.page.waitForLoadState('networkidle') // função que aquarda a finalização do trafico de rede atual e fica aquardando o próximo
        await expect(this.page).toHaveURL(/.*movies/)
    }

    async create(title, overview, company, release_year) {

        await this.page.locator('a[href$="register"]').click()

        await this.page.locator('#title').fill(title)
        await this.page.getByLabel('Sinopse').fill(overview)

        // await this.page.locator('#select_company_id')
        //     .click() 
        
        /await this.page.waitForTimeout(200)

        await this.page.locator('#select_company_id .react-select__indicator')
            .click()

        await this.page.locator('.react-select__option')
            .filter({ hasText: company })
            .click()

        await this.page.locator('#select_year .react-select__value-container')
            .click()
        
        await this.page.locator('.react-select__option')
            .filter({ hasText: release_year })
            .click()
        
        await this.page.getByRole('button', {name: 'Cadastrar'}).click()

    }
}