import { test as uiTest, expect } from './ui/ui.fixture';

// Main fixture export for all test types
// Currently only UI tests, API tests can be added later
export const test = uiTest;
export { expect };
