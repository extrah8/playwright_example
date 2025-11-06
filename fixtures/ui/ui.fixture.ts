import { test as base } from '@playwright/test';
import { EnvUtils } from '../../utils/env.utils';
import uiConfig from './ui.config.json' assert { type: 'json' };
import { LoginPage } from '@pages/login.page';
import { RegistrationPage } from '@pages/registration.page';

// Validate user secrets before any UI tests run
EnvUtils.validateUserSecrets();

export interface UIFixture {
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
  uiConfig: typeof uiConfig;
}

export const test = base.extend<UIFixture>({
  page: async ({ browser }, use) => {
    const context = await browser.newContext({
      viewport: uiConfig.dev.viewport,
      baseURL: EnvUtils.getBaseURL(),
    });

    const page = await context.newPage();
    page.setDefaultTimeout(uiConfig.dev.actionTimeout);
    page.setDefaultNavigationTimeout(uiConfig.dev.navigationTimeout);

    await use(page);
    await context.close();
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },

  // eslint-disable-next-line no-empty-pattern
  uiConfig: async ({}, use) => {
    await use(uiConfig);
  },
});

export { expect } from '@playwright/test';
