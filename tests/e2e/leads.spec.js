const { test, expect } = require('../support');

const { faker } = require('@faker-js/faker');
const { request } = require('http');


test('deve cadastrar um lead na fila de espera', async ({ page }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()
  await page.lading.visit()
  await page.lading.openLeadModal()
  await page.lading.submitLeadForm(leadName, leadEmail)

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await page.toast.containText(message)

});

test('nao deve cadastrar quando o email já existe', async ({ page, request }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  const newLead = request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })

 expect((await newLead).ok()).toBeTruthy

 await page.lading.visit()
 await page.lading.openLeadModal()
 await page.lading.submitLeadForm(leadName, leadEmail)

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await page.toast.containText(message)

});

test('Não deve cadastrar quando o campo nome estiver vazio', async ({ page }) => {

  await page.lading.visit()
  await page.lading.openLeadModal()
  await page.lading.submitLeadForm('', 'eric.neder@hotmail.com')

  await page.lading.alertHaveText('Campo obrigatório')

});

test('não deve cadastrar email incorreto', async ({ page }) => {

  await page.lading.visit()
  await page.lading.openLeadModal()
  await page.lading.submitLeadForm('eric.neder', 'eric.neder.com')

  await page.lading.alertHaveText('Email incorreto')

});

test('Não deve cadastrar quando o campo email estiver vazio', async ({ page }) => {

  await page.lading.visit()
  await page.lading.openLeadModal()
  await page.lading.submitLeadForm('eric.neder', '')

  await page.lading.alertHaveText('Campo obrigatório')

});

test('Não deve cadastrar quando nenhum campo é reenchido', async ({ page }) => {

  await page.lading.visit()
  await page.lading.openLeadModal()
  await page.lading.submitLeadForm('', '')

  await page.lading.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])
});
