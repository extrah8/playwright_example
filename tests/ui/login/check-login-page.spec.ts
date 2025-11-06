import { test } from '../../../fixtures/ui/ui.fixture';
import { Endpoint } from '@enums/endpoints.enum';

test.describe(
  'Login - Auth & Dashboard',
  {
    tag: ['@auth', '@login', '@dashboard'],
  },
  () => {
    test('Login form is visible on Login page', async ({ loginPage }) => {
      await loginPage.navigate(Endpoint._LOGIN_PAGE);
      await loginPage.verifyAllInputsVisible();
    });
  },
);
