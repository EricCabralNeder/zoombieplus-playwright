const { test } = require('../support')
const date = require('../support/fixtures/movies.json')

const { executeSQL } = require('../support/database')

test('Deve poder cadastrar um novo filme', async ({ page }) => {

    const movie = date.create

    await executeSQL(`delete from movies where title = '${movie.title}';`)

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year)

    await page.toast.containText('Cadastro realizado com sucesso!')
})
