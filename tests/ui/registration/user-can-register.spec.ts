import { test, expect } from '../../../fixtures/ui/ui.fixture';
import { Endpoint } from '@enums/endpoints.enum';
import { REGISTRATION_DATA } from '../../../fixtures/testData/uiTestData';

test.describe(
  'Registration - User Can Register',
  {
    tag: ['@auth', '@registration'],
  },
  () => {
    test('Should successfully register new user and see dashboard', async ({ registrationPage }) => {
      const userData = registrationPage.generateRandomUserData({
        firstNames: REGISTRATION_DATA.FIRST_NAMES,
        lastNames: REGISTRATION_DATA.LAST_NAMES,
        companyNames: REGISTRATION_DATA.COMPANY_NAMES,
        password: REGISTRATION_DATA.PASSWORD,
      });

      await test.step('Navigate to registration page', async () => {
        await registrationPage.navigate(Endpoint._REGISTRATION_PAGE);
      });

      await test.step('Fill and submit registration form', async () => {
        await registrationPage.submitRegistration({
          firstName: userData.firstName,
          lastName: userData.lastName,
          companyName: userData.companyName,
          email: userData.email,
          phone: userData.phone,
          password: userData.password,
        });
      });

      await test.step('Verify dashboard is visible', async () => {
        const url = registrationPage.getCurrentUrl();
        expect(url).toContain('dashboard');
      });
    });
  },
);
