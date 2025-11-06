import { test, expect } from '../../../fixtures/ui/ui.fixture';
import { Endpoint } from '@enums/endpoints.enum';

/**
 * Email address containing special characters for testing edge cases in login functionality.
 * Note: These credentials are not real and are fictional/made up for testing purposes only.
 */

const validPass = 'ValidPassword123!';
const validEmail = 'test@example.com';
const specialCharEmail = 'test+special!#$%@example.com';
const longEmail = 'a'.repeat(100) + '@example.com';

test.describe.parallel(
  'Login - Edge Cases',
  {
    tag: ['@auth', '@login', '@edge-cases'],
  },
  () => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.navigate(Endpoint._LOGIN_PAGE);
    });

    test('Should handle empty email field', async ({ loginPage }) => {
      await test.step('Fill only password field', async () => {
        await loginPage.fillPassword(validPass);
      });
      await test.step('Attempt to submit', async () => {
        await loginPage.clickSignIn();
      });
      await test.step('Verify error message displayed', async () => {
        await expect(loginPage.getValidationMessage()).toBeVisible();
        await loginPage.verifyErrorMessage('Please, enter your email address');
      });
      await test.step('Verify login prevented', async () => {
        expect(await loginPage.isDashboardVisible()).toBeFalsy();
      });
    });

    test('Should handle empty password field', async ({ loginPage }) => {
      await test.step('Fill only email field', async () => {
        await loginPage.fillEmail(validEmail);
      });
      await test.step('Attempt to submit', async () => {
        await loginPage.clickSignIn();
      });
      await test.step('Verify error message displayed', async () => {
        await expect(loginPage.getValidationMessage()).toBeVisible();
        await loginPage.verifyErrorMessage('The Password is required');
      });
      await test.step('Verify login prevented', async () => {
        expect(await loginPage.isDashboardVisible()).toBeFalsy();
      });
    });

    test('Should handle special characters in email', async ({ loginPage }) => {
      await test.step('Fill form with special characters', async () => {
        await loginPage.fillEmail(specialCharEmail);
        await loginPage.fillPassword(validPass);
      });
      await test.step('Submit login', async () => {
        await loginPage.clickSignIn();
      });
      // Error message didn't appear, user can register with special characters email
      await test.step('Verify appropriate handling', async () => {
        expect(await loginPage.isDashboardVisible()).toBeFalsy();
      });
    });

    test('Should handle very long email input', async ({ loginPage }) => {
      await test.step('Fill form with very long email', async () => {
        await loginPage.fillEmail(longEmail);
        await loginPage.fillPassword(validPass);
      });
      await test.step('Submit login', async () => {
        await loginPage.clickSignIn();
      });
      await test.step('Verify error message displayed', async () => {
        await expect(loginPage.getValidationMessage()).toBeVisible();
        await loginPage.verifyErrorMessage('Invalid email address');
      });
      await test.step('Verify appropriate handling', async () => {
        expect(await loginPage.isDashboardVisible()).toBeFalsy();
      });
    });
  },
);
