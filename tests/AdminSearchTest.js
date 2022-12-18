const { Builder, By, Key } = require('selenium-webdriver');
const LoginPage = require('../pages/LoginPage');
const AdminPage = require('../pages/AdminPage');


const validSearchUsername = 'Aaliyah.Haq';
const validSearchName = 'Aaliyah Haq';

describe('Search Functionality Tests - Admin/User Management', function() {
	this.timeout(80000);
	let driver;
	let login;


	beforeEach(async function() {
		driver = await new Builder().forBrowser('chrome').build();
		login = new LoginPage(driver);
		admin = new AdminPage(driver);
		await login.visitUrl();
		await login.login();
		await admin.changePageToAdmin();

	});

	afterEach(async function() {
		await driver.close();
		await driver.quit();

	});

	it('Test 1 - Default state', async function() {
		await admin.checkDefaultInputValues();

	});

	describe('Username Field', () => {

		it('Test 1 - Invalid username', async function() {
			await admin.searchUsername('Aaliyah');
			await admin.clickSearch();
			await admin.searchResult('No Records Found');
			await admin.checkSearchToastMessage('No Records Found');

		});

		it('Test 2 - Valid username (no capitals)', async function() {
			await admin.searchUsername('aaliyah.haq');
			await admin.clickSearch();
			await admin.searchResult('(1) Record Found');

		});

		it('Test 3 - Valid username (capitals)', async function() {
			await admin.searchUsername(validSearchUsername);
			await admin.clickSearch();
			await admin.searchResult('(1) Record Found');

		});

	});

	describe('User Role Dropdown', () => {

		it('Test 1 - Select option (ESS)', async function() {
			await admin.selectOptionRole('ESS');
			await admin.clickSearch();
			await admin.checkSearchResultRole('ESS');

		})

		it('Test 2 - Select option (Admin)', async function() {
			await admin.selectOptionRole('Admin');
			await admin.clickSearch();
			await admin.checkSearchResultRole('Admin');

		});

	});

	describe('Employee Name autocomplete Field', () => {

		it('Test 1 - Not use autocomplete', async function() {
			await admin.searchName(validSearchName);
			await admin.clickSearch();

		})

		it('Test 2 - Use autocomplete', async function() {
			await admin.searchName(validSearchName);
			await admin.nameAutocomplete();
			await admin.clickSearch();
			await admin.searchResult('(1) Record Found');

		});

	});

	describe('Status Dropdown', () => {

		it('Test 1 - Select option (Enabled)', async function() {
			await admin.selectOptionStatus('Enabled');
			await admin.clickSearch();
			await admin.checkSearchResultStatus('Enabled');

		});

		it('Test 2 - Select option (Disabled)', async function() {
			await admin.selectOptionStatus('Disabled');
			await admin.clickSearch();
			await admin.checkSearchToastMessage('Invalid Parameter');

		});

	});

	describe('Valid Search Combinations', () => {

		it('Test 1 - Username + Role', async function() {
			await admin.searchUsername(validSearchUsername);
			await admin.selectOptionRole('ESS');
			await admin.clickSearch();
			await admin.searchResult('(1) Record Found');

		});

		it('Test 2 - Username + Role + Employee name', async function() {
			await admin.searchUsername(validSearchUsername);
			await admin.selectOptionRole('ESS');
			await admin.searchName(validSearchName);
			await admin.nameAutocomplete();
			await admin.clickSearch();
			await admin.searchResult('(1) Record Found');

		});

		it('Test 3 - Username + Role + Employee name + Status', async function() {
			await admin.searchUsername(validSearchUsername);
			await admin.selectOptionRole('ESS');
			await admin.searchName(validSearchName);
			await admin.nameAutocomplete();
			await admin.selectOptionStatus('Enabled');
			await admin.clickSearch();
			await admin.searchResult('(1) Record Found');

		});

	});

	describe('Invalid Search Combinations', () => {

		it('Test 1 - OK Username + NOK Role', async function() {
			await admin.searchUsername(validSearchUsername);
			await admin.selectOptionRole('Admin');
			await admin.clickSearch();
			await admin.searchResult('No Records Found');
			await admin.checkSearchToastMessage('No Records Found');

		});

		it('Test 2 - OK Username + OK Role + NOK Employee name', async function() {
			await admin.searchUsername(validSearchUsername);
			await admin.selectOptionRole('ESS');
			await admin.searchName('d');
			await admin.nameAutocomplete();
			await admin.clickSearch();
			await admin.searchResult('No Records Found');
			await admin.checkSearchToastMessage('No Records Found');

		});

		it('Test 3 - OK Username + OK Role + OK Employee name + NOK Status', async function() {
			await admin.searchUsername(validSearchUsername);
			await admin.selectOptionRole('ESS');
			await admin.searchName(validSearchName);
			await admin.nameAutocomplete();
			await admin.selectOptionStatus('Disabled');
			await admin.clickSearch();
			await admin.checkSearchToastMessage('Invalid Parameter');

		});

	});

});