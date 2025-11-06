import { test, expect } from '../../../fixtures/ui/ui.fixture';
import { Endpoint } from '@enums/endpoints.enum';

/**
 * Email address containing special characters for testing edge cases in login functionality.
 * Note: These credentials are not real and are fictional/made up for testing purposes only.
 */

const validEmail = 'test@example.com';
const validPassword = 'ValidPassword123!';
const invalidEmail = 'invalid-email';
const wrongPassword = 'WrongPassword123!';
const nonExistentEmail = 'nonexistent@example.com';
const nonExistentPassword = 'SomePassword123!';

test.describe.parallel(
  'Login - Negative Scenarios',
  {
    tag: ['@auth', '@login', '@negative'],
  },
  () => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.navigate(Endpoint._LOGIN_PAGE);
    });

    test('Should show error with invalid email format', async ({ loginPage }) => {
      await test.step('Fill form with invalid email', async () => {
        await loginPage.fillEmail(invalidEmail);
        await loginPage.fillPassword(validPassword);
      });
      await test.step('Submit login', async () => {
        await loginPage.clickSignIn();
      });
      await test.step('Verify error message displayed', async () => {
        await expect(loginPage.getValidationMessage()).toBeVisible();
        await loginPage.verifyErrorMessage('Invalid email address');
      });
      await test.step('Verify login prevented', async () => {
        expect(await loginPage.isDashboardVisible()).toBeFalsy();
      });
    });

    test('Should show error with wrong password', async ({ loginPage }) => {
      await test.step('Fill form with valid email but wrong password', async () => {
        await loginPage.fillEmail(validEmail);
        await loginPage.fillPassword(wrongPassword);
      });
      await test.step('Submit login', async () => {
        await loginPage.clickSignIn();
      });
      await test.step('Verify error message displayed', async () => {
        await loginPage.verifyToastMessage('Invalid to login');
      });
      await test.step('Verify login prevented', async () => {
        expect(await loginPage.isDashboardVisible()).toBeFalsy();
      });
    });

    test('Should show error with non-existent user', async ({ loginPage }) => {
      await test.step('Fill form with non-registered credentials', async () => {
        await loginPage.fillEmail(nonExistentEmail);
        await loginPage.fillPassword(nonExistentPassword);
      });
      await test.step('Submit login', async () => {
        await loginPage.clickSignIn();
      });
      await test.step('Verify error message displayed', async () => {
        await loginPage.verifyToastMessage('Invalid to login');
      });
      await test.step('Verify login prevented', async () => {
        expect(await loginPage.isDashboardVisible()).toBeFalsy();
      });
    });

    test('Should prevent login with empty credentials', async ({ loginPage }) => {
      await test.step('Attempt to submit with empty fields', async () => {
        await loginPage.clickSignIn();
      });
      await test.step('Verify error message displayed', async () => {
        await expect(loginPage.getValidationMessageByIndex(0)).toBeVisible();
        await expect(loginPage.getValidationMessageByIndex(0)).toHaveText('Please, enter your email address');
        await expect(loginPage.getValidationMessageByIndex(1)).toBeVisible();
        await expect(loginPage.getValidationMessageByIndex(1)).toHaveText('The Password is required');
      });
      await test.step('Verify login prevented', async () => {
        expect(await loginPage.isDashboardVisible()).toBeFalsy();
      });
    });
  },
);
