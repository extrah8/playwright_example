import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from '@pages/base.page';
import { Credentials } from '@interfaces/login.interface';

export class LoginPage extends BasePage {
  readonly emailInp: Locator;
  readonly passwordInp: Locator;
  readonly signInBtn: Locator;
  readonly forgotPasswordLink: Locator;
  readonly signUpNowLink: Locator;
  readonly loginTitle: Locator;
  readonly dashboardLink: Locator;
  readonly validationMessage: Locator;
  readonly toastMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.emailInp = page.locator('//input[contains(@type, "email")]');
    this.passwordInp = page.locator('//input[contains(@type, "password")]');
    this.signInBtn = page.locator('//button[contains(@type, "submit")]');
    this.forgotPasswordLink = page.locator('//app-button[contains(@routerlink, "/auth/forgot-password")]');
    this.signUpNowLink = page.locator('//app-button[contains(@class, "__info-button --primary --link")]');
    this.loginTitle = page.locator('div.rmv-heading-1').filter({ hasText: /sign in/i });
    this.dashboardLink = page.locator('//cdk-tree//a[contains(@href, "dashboard")]');
    this.validationMessage = page.locator('app-validation-message');
    this.toastMessage = page.locator('#toast-container');
  }

  /**
   * Submits the login form with user credentials
   * @param user The user credentials
   */
  async submitLogin(user: Credentials) {
    await expect(this.emailInp).toBeVisible({ timeout: 5000 });
    await expect(this.passwordInp).toBeVisible();
    await this.emailInp.fill(user.username);
    await this.passwordInp.fill(user.password);
    await this.signInBtn.click({ noWaitAfter: false });
    await this.spinnerWait();
  }

  /**
   * Verifies that all login input fields are visible
   */
  async verifyAllInputsVisible() {
    await expect(this.loginTitle).toBeVisible();
    await expect(this.emailInp).toBeVisible();
    await expect(this.passwordInp).toBeVisible();
    await expect(this.signInBtn).toBeVisible();
    await expect(this.forgotPasswordLink).toBeVisible();
    await expect(this.signUpNowLink).toBeVisible();
  }

  /**
   * Returns validation message locator
   */
  getValidationMessage(): Locator {
    return this.validationMessage;
  }

  /**
   * Returns specific validation message by index
   * @param index Index of the validation message (0-based)
   */
  getValidationMessageByIndex(index: number): Locator {
    return this.validationMessage.nth(index);
  }

  /**
   * Verifies that validation error message is visible with specific text
   * @param expectedText The expected error message text
   */
  async verifyErrorMessage(expectedText: string) {
    await expect(this.validationMessage).toBeVisible({ timeout: 3000 });
    await expect(this.validationMessage).toHaveText(expectedText);
  }

  /**
   * Verifies that toast message is visible with specific text
   * @param expectedText The expected toast message text
   */
  async verifyToastMessage(expectedText: string) {
    await expect(this.toastMessage).toBeVisible({ timeout: 3000 });
    await expect(this.toastMessage).toHaveText(expectedText);
  }

  /**
   * Verifies that dashboard link is visible
   */
  async isDashboardVisible(): Promise<boolean> {
    try {
      await expect(this.dashboardLink).toBeVisible({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Fill email field
   * @param email Email address
   */
  async fillEmail(email: string) {
    await this.emailInp.fill(email);
  }

  /**
   * Fill password field
   * @param password Password
   */
  async fillPassword(password: string) {
    await this.passwordInp.fill(password);
  }

  /**
   * Click sign in button
   */
  async clickSignIn() {
    await this.signInBtn.click();
    await this.spinnerWait();
  }
}
