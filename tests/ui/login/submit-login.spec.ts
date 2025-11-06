import { test, expect } from '../../../fixtures/ui/ui.fixture';
import { Secrets } from '@utils/env.utils';
import { Endpoint } from '@enums/endpoints.enum';

test.describe(
  'Login - Auth & Dashboard',
  {
    tag: ['@auth', '@login', '@dashboard'],
  },
  () => {
    test('User can login to Dashboard', async ({ loginPage }) => {
      await test.step('Navigate to Login page', async () => {
        await loginPage.navigate(Endpoint._LOGIN_PAGE);
      });
      await test.step('Submit login', async () => {
        await loginPage.submitLogin(Secrets.User);
      });
      await test.step('Verify Dashboard badge is visible', async () => {
        expect(await loginPage.isDashboardVisible(), 'Dashboard badge is not visible').toBeTruthy();
      });
    });
  },
);
