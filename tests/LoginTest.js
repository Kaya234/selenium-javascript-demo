const { Builder, By, Key } = require('selenium-webdriver')
const LoginPage = require('../pages/LoginPage')

const VALID_NAME = 'Admin'
const VALID_PASSWORD = 'admin123'

describe('Login Scenarios Tests - Login Page', function() {
	this.timeout(60000)
	let driver
	let login

	describe('Login', function() {

		beforeEach(async function() {
			driver = await new Builder().forBrowser('chrome').build()
			login = new LoginPage(driver)
			await login.visitUrl()

		})

		afterEach(async function() {
			await driver.close()
			await driver.quit()

		})


		it('Test 1 - Without credentials', async function() {
			await login.clickLogin()

		})

		it('Test 2 - Without email', async function() {
			await login.enterPassword(VALID_PASSWORD)
			await login.clickLogin()
			await login.checkInputErrorUsername()

		})

		it('Test 3 - Without password', async function() {
			await login.enterUsername(VALID_NAME)
			await login.clickLogin()
			await login.checkInputErrorPassword()

		})

		it('Test 4 - Valid credentials', async function() {
			await login.enterUsername(VALID_NAME)
			await login.enterPassword(VALID_PASSWORD)
			await login.clickLogin()
			await login.checkValidLogin('Dashboard')

		})

		it('Test 5 - Invalid username', async function() {
			await login.enterUsername('admi')
			await login.enterPassword(VALID_PASSWORD)
			await login.clickLogin()
			await login.checkInvalidLoginError()

		})

		it('Test 6 - Invalid password', async function() {
			await login.enterUsername(VALID_NAME)
			await login.enterPassword('Admin123')
			await login.clickLogin()
			await login.checkInvalidLoginError()
		})
	})

	describe('Forgotten Password', async function() {

		beforeEach(async function() {
			driver = await new Builder().forBrowser('chrome').build()
			login = new LoginPage(driver)
			await login.visitUrl()
			await login.clickReset()

		})

		afterEach(async function() {
			await driver.close()
			await driver.quit()

		})

		it('Test 1 - Click reset without username', async function() {
			await login.clickResetSubmit()
			await login.checkResetInputError()

		})

		it('Test 2 - Click reset with username', async function() {
			await login.resetEnterUsername('admin')
			await login.clickResetSubmit()
			await login.checkResetSuccessInfo()

		})

		it('Test 3 - Click cancel', async function() {
			await login.clickResetCancel()
			await login.checkReturnToLoginPage()

		})

	})


	describe('Logout Tests', async function() {

		beforeEach(async function() {
			driver = await new Builder().forBrowser('chrome').build()
			login = new LoginPage(driver)
			await login.visitUrl()
		})

		afterEach(async function() {
			await driver.close()
			await driver.quit()

		})


		it.only('Test 1 - After logout, login inputs are empty', async function() {
			await login.login()
			await login.logout()
			await login.checkEmptyInputs()

		})

	})

})