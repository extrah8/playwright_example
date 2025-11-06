import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from '@pages/base.page';

export class RegistrationPage extends BasePage {
  readonly firstNameInp: Locator;
  readonly lastNameInp: Locator;
  readonly companyNameInp: Locator;
  readonly industryDropdown: Locator;
  readonly emailInp: Locator;
  readonly countryDropdown: Locator;
  readonly phoneInp: Locator;
  readonly passwordInp: Locator;
  readonly signUpBtn: Locator;
  readonly dashboardLink: Locator;

  constructor(page: Page) {
    super(page);

    this.firstNameInp = page.locator('app-input[placeholder="First Name"] input');
    this.lastNameInp = page.locator('app-input[placeholder="Last Name"] input');
    this.companyNameInp = page.locator('app-input[placeholder="Company Name"] input');
    this.industryDropdown = page.locator('ng-select[placeholder="Industry"]');
    this.emailInp = page.locator('app-input[placeholder="Email"] input');
    this.countryDropdown = page.locator('ng-select[placeholder="Country"]');
    this.phoneInp = page.locator('app-phone-number[placeholder="Phone"] input[type="text"]:not([readonly])');
    this.passwordInp = page.locator('app-input[placeholder="Password"] input');
    this.signUpBtn = page.locator('//button[contains(@type, "submit")]');
    this.dashboardLink = page.locator('//cdk-tree//a[contains(@href, "dashboard")]');
  }

  /**
   * Generate random user data for registration
   */
  generateRandomUserData(testData: {
    firstNames: string[];
    lastNames: string[];
    companyNames: string[];
    password: string;
  }) {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    const randomFirstName = testData.firstNames[Math.floor(Math.random() * testData.firstNames.length)];
    const randomLastName = testData.lastNames[Math.floor(Math.random() * testData.lastNames.length)];
    const randomCompany = testData.companyNames[Math.floor(Math.random() * testData.companyNames.length)];
    const randomLetters = Math.random().toString(36).substring(2, 6);
    const randomPhone = Math.floor(Math.random() * 100000000) + 400000000;

    return {
      email: `user${timestamp}${randomLetters}@example.com`,
      password: testData.password,
      firstName: `${randomFirstName}${randomLetters}`,
      lastName: `${randomLastName}${randomNum}`,
      companyName: `${randomCompany}${randomNum}`,
      phone: randomPhone.toString(),
    };
  }

  /**
   * Submit full registration form with all required fields
   * @param userData Object containing user registration data
   */
  async submitRegistration(userData: {
    firstName: string;
    lastName: string;
    companyName: string;
    email: string;
    phone: string;
    password: string;
  }) {
    await expect(this.firstNameInp).toBeVisible({ timeout: 5000 });
    await this.firstNameInp.fill(userData.firstName);
    await this.lastNameInp.fill(userData.lastName);
    await this.companyNameInp.fill(userData.companyName);

    // Select first industry option
    await this.industryDropdown.click();
    await this.page.locator('.ng-option').first().click();

    await this.emailInp.fill(userData.email);

    // Select first country option
    await this.countryDropdown.click();
    await this.page.locator('.ng-option').first().click();

    await this.phoneInp.fill(userData.phone);
    await this.passwordInp.fill(userData.password);
    await this.signUpBtn.click();

    // Wait for registration spinner to disappear
    await this.page.waitForSelector('app-loading', { state: 'hidden', timeout: 15000 });
    await this.spinnerWait();
  }
}
