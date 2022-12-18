const BasePage = require('./BasePage')

//login
const USERNAME_TEXTBOX = { css: ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input' };
const PASSWORD_TEXTBOX = { css: ':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input' };
const URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
const LOGIN_BUTTON = { css: '.oxd-button' };
const PAGE_TITLE = { css: '.oxd-topbar-header-breadcrumb > .oxd-text' };

//login errors
const ERROR_USERNAME_INPUT = { css: ':nth-child(2) > .oxd-input-group > .oxd-text' };
const ERROR_PASSWORD_INPUT = { css: ':nth-child(3) > .oxd-input-group > .oxd-text' };
const ERROR_LOGIN = { css: '.oxd-alert-content > .oxd-text' };

//forgotten password
const RESET_BUTTON = { css: '.orangehrm-login-forgot > .oxd-text' };
const RESET_P_TEXTBOX = { css: '.oxd-input' };
const RESET_BUTTON_SUBMIT = { css: '.oxd-button--secondary' };
const RESET_BUTTON_CANCEL = { css: '.oxd-button--ghost' };
const RESET_ER_USERNAME_INPUT = { css: '.oxd-input-group > .oxd-text' };
const RESET_SUCCESS_INFO = { css: '.oxd-text--h6' };
const LOGIN_PAGE_TITLE = { css: '.oxd-text--h5' };

// logout
const PROFILE_DROPDOWN = { css: '.oxd-userdropdown-tab' };
const LOGOUT_BUTTON = { css: ':nth-child(4) > .oxd-userdropdown-link' };

class LoginPage extends BasePage {
	constructor(driver) {
		super(driver)
	}

	async visitUrl() {
		await this.goToUrl(URL)

	}

	async login() {
		await this.type(USERNAME_TEXTBOX, 'Admin')
		await this.type(PASSWORD_TEXTBOX, 'admin123')
		await this.clickOn(LOGIN_BUTTON)

	}

	async clickLogin() {
		await this.clickOn(LOGIN_BUTTON)

	}

	async enterUsername(text) {
		await this.type(USERNAME_TEXTBOX, text)

	}

	async enterPassword(text) {
		await this.type(PASSWORD_TEXTBOX, text)

	}

	async checkInputErrorUsername() {
		await this.assertTrueText(ERROR_USERNAME_INPUT, 'Required')

	}

	async checkInputErrorPassword() {
		await this.assertTrueText(ERROR_PASSWORD_INPUT, 'Required')

	}

	async checkValidLogin(title) {
		await this.assertTrueText(PAGE_TITLE, 'Dashboard')

	}

	async checkInvalidLoginError() {
		await this.assertTrueText(ERROR_LOGIN, 'Invalid credentials')

	}

	async clickReset() {
		await this.clickOn(RESET_BUTTON)

	}

	async resetEnterUsername(username) {
		await this.type(RESET_P_TEXTBOX, username)

	}

	async clickResetSubmit() {
		await this.clickOn(RESET_BUTTON_SUBMIT)

	}

	async clickResetCancel() {
		await this.clickOn(RESET_BUTTON_CANCEL)
	}

	async checkResetInputError() {
		await this.assertTrueText(RESET_ER_USERNAME_INPUT, 'Required')

	}

	async checkResetSuccessInfo() {
		await this.assertTrueText(RESET_SUCCESS_INFO, 'Reset Password link sent successfully')

	}

	async checkReturnToLoginPage() {
		await this.assertTrueText(LOGIN_PAGE_TITLE, 'Login')

	}

	//log out
	async logout() {
		await this.clickOn(PROFILE_DROPDOWN)
		await this.clickOn(LOGOUT_BUTTON)
	}

	async checkEmptyInputs() {
		await this.assertTrueText(USERNAME_TEXTBOX, '')
		await this.assertTrueText(PASSWORD_TEXTBOX, '')
	}


}

module.exports = LoginPage