const BasePage = require('./BasePage')

//search function
const SEARCH_USERNAME_TEXTBOX = { css: ':nth-child(2) > .oxd-input' };
const SEARCH_NAME_TEXTBOX = { css: '.oxd-autocomplete-text-input > input' };
const SEARCH_NAME_AUTOCOMPLETE = { css: '.oxd-autocomplete-dropdown' };
const SEARCH_BUTTON = {	css: '.oxd-form-actions > .oxd-button--secondary' };

//user role dropdown
const SEARCH_ROLE_DROPDOWN = {
	css: ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text'
};
const SEARCH_ROLE_OPTION = { css: '.oxd-select-option'};
const SEARCH_ROLE_TEXT = { css: '.oxd-table-row > :nth-child(3) > div' };

//status dropdown
const SEARCH_STATUS_DROPDOWN = { css: ':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text'
};
const SEARCH_STATUS_OPTION = { css: '.oxd-select-option' };
const SEARCH_STATUS_TEXT = { css: '.oxd-table-row > :nth-child(5) > div' };


class AdminPage extends BasePage {
	constructor(driver) {
		super(driver);

	}

	async changePageToAdmin() {
		await this.clickContainText('Admin');

	}

	async checkDefaultInputValues() {
		await this.assertTrueText(SEARCH_USERNAME_TEXTBOX, '');
		await this.assertTrueText(SEARCH_ROLE_DROPDOWN, '-- Select --');
		await this.assertTrueText(SEARCH_NAME_TEXTBOX, '');
		await this.assertTrueText(SEARCH_STATUS_DROPDOWN, '-- Select --');

	}

	async nameAutocomplete() {
		await this.autocomplete(SEARCH_NAME_AUTOCOMPLETE);

	}

	async searchResult(message) {
		await this.assertTrueSearchResult(message);

	}

	async selectOptionRole(option) {
		await this.clickOn(SEARCH_ROLE_DROPDOWN);
		await this.clickContainTextDropdown(option);

	}

	async checkSearchResultRole(role) {
		await this.assertTrueList(SEARCH_ROLE_TEXT, role);

	}

	async selectOptionStatus(option) {
		await this.clickOn(SEARCH_STATUS_DROPDOWN);
		await this.clickContainTextDropdown(option);

	}

	async checkSearchResultStatus(status) {
		await this.assertTrueList(SEARCH_STATUS_TEXT, status);

	}

	async checkSearchToastMessage(message) {
		await this.assertTrueToast(message);

	}

	async searchUsername(username) {
		await this.type(SEARCH_USERNAME_TEXTBOX, username);

	}

	async searchName(name) {
		await this.type(SEARCH_NAME_TEXTBOX, name);

	}

	async clickSearch() {
		await this.clickOn(SEARCH_BUTTON);

	}

}
module.exports = AdminPage