import { test, expect } from '../../../fixtures/ui/ui.fixture';
import { Endpoint } from '@enums/endpoints.enum';

test.describe(
  'Login - UI Elements & Navigation',
  {
    tag: ['@auth', '@login', '@ui'],
  },
  () => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.navigate(Endpoint._LOGIN_PAGE);
    });

    test('Forgot Password link is visible and clickable', async ({ loginPage, page }) => {
      await test.step('Verify Forgot Password link is visible', async () => {
        await expect(loginPage.forgotPasswordLink).toBeVisible();
      });
      await test.step('Click Forgot Password link', async () => {
        await loginPage.forgotPasswordLink.click();
        await loginPage.spinnerWait();
      });
      await test.step('Verify navigation to forgot password page', async () => {
        await expect(page).toHaveURL(/forgot-password/);
      });
    });

    test('Sign Up link is visible and clickable', async ({ loginPage, page }) => {
      await test.step('Verify Sign Up link is visible', async () => {
        await expect(loginPage.signUpNowLink).toBeVisible();
      });
      await test.step('Click Sign Up link', async () => {
        await loginPage.signUpNowLink.click();
        await loginPage.spinnerWait();
      });
      await test.step('Verify navigation to registration page', async () => {
        await expect(page).toHaveURL(/sign-up/);
      });
    });

    test('Login page title is displayed correctly', async ({ loginPage }) => {
      await test.step('Verify login title', async () => {
        await expect(loginPage.loginTitle).toBeVisible();
        await expect(loginPage.loginTitle).toContainText(/sign in/i);
      });
    });

    test('All form fields are present and enabled', async ({ loginPage }) => {
      await test.step('Verify email input is enabled', async () => {
        await expect(loginPage.emailInp).toBeVisible();
        await expect(loginPage.emailInp).toBeEnabled();
      });
      await test.step('Verify password input is enabled', async () => {
        await expect(loginPage.passwordInp).toBeVisible();
        await expect(loginPage.passwordInp).toBeEnabled();
      });

      await test.step('Verify sign in button is enabled', async () => {
        await expect(loginPage.signInBtn).toBeVisible();
        await expect(loginPage.signInBtn).toBeEnabled();
      });
    });

    test('Password field should mask input', async ({ loginPage }) => {
      await test.step('Fill password field', async () => {
        await loginPage.fillPassword('SecretPassword123!');
      });
      await test.step('Verify password is masked', async () => {
        const inputType = await loginPage.passwordInp.getAttribute('type');
        expect(inputType).toBe('password');
      });
    });
  },
);
