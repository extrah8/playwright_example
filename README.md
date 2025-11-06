# RepMove E2E Test Automation

Automated end-to-end testing suite for RepMove Login and Registration functionality using Playwright with TypeScript.

**Application Under Test:** http://dev-repmove-enterprise.web.app/

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Reports](#test-reports)
- [Code Quality](#code-quality)
- [Technical Stack](#technical-stack)

---

## Overview

This test automation framework implements comprehensive testing for RepMove's authentication flows:
- **Login functionality** - User authentication, validation, and error handling
- **Registration functionality** - New user account creation with form validation

The framework follows industry best practices including Page Object Model, dynamic test data generation, and proper waiting strategies.

---

## Features

- Page Object Model (POM) architecture
- TypeScript for type safety
- Dynamic test data generation
- Environment-based configuration
- Custom spinner wait implementation
- Comprehensive error handling
- Parallel test execution support
- Detailed HTML reporting with screenshots
- ESLint and Prettier for code quality
- No hard-coded waits (uses Playwright's built-in mechanisms)

---

## Project Structure

```
e2e/
├── enums/
│   └── endpoints.enum.ts          # Application endpoints
├── fixtures/
│   ├── _fixture.ts                # Main fixture export
│   ├── testData/
│   │   └── uiTestData.ts          # Test data constants
│   └── ui/
│       ├── ui.config.json         # UI fixture configuration
│       └── ui.fixture.ts          # UI page fixtures
├── interfaces/
│   └── login.interface.ts         # TypeScript interfaces
├── pages/
│   ├── base.page.ts               # Base page with common methods
│   ├── login.page.ts              # Login page object
│   └── registration.page.ts      # Registration page object
├── tests/
│   └── ui/
│       ├── login/
│       │   ├── check-login-page.spec.ts       # Form visibility tests
│       │   ├── edge-cases-login.spec.ts       # Edge case scenarios
│       │   ├── negative-login.spec.ts         # Negative scenarios
│       │   ├── submit-login.spec.ts           # Positive login flow
│       │   └── ui-elements-login.spec.ts      # UI navigation tests
│       └── registration/
│           └── user-can-register.spec.ts      # Registration flow
├── utils/
│   ├── env.utils.ts               # Environment utilities
│   └── log.ts                     # Logging utilities
├── .env.example                   # Example environment variables
├── .gitignore                     # Git ignore rules
├── eslint.config.js               # ESLint configuration
├── package.json                   # Project dependencies
├── playwright.config.ts           # Playwright configuration
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # This file
```

---

## Prerequisites

- **Node.js:** Version 18.x or higher
- **npm:** Version 9.x or higher
- **Operating System:** Windows, macOS, or Linux

---

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd e2e
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- Playwright and browser binaries
- TypeScript and type definitions
- ESLint and Prettier
- All other project dependencies

### 3. Install Playwright Browsers

```bash
npx playwright install chromium
```

---

## Configuration

### Environment Variables

Create a `.env` file in the project root (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` file with your credentials:

```env
# Application URL
BASE_URL=http://dev-repmove-enterprise.web.app/

# Test User Credentials (for login tests)
TEST_USER_EMAIL=your-test-user@example.com
TEST_USER_PASSWORD=YourPassword123!
```

**Note:** Registration tests generate unique user data automatically, so no registration credentials are needed.

### Playwright Configuration

Configuration is located in `playwright.config.ts`:

- **Browser:** Chromium (Desktop Chrome)
- **Base URL:** Loaded from environment variables
- **Timeout:** 60 seconds per test
- **Workers:** 1 (sequential execution)
- **Retries:** 0 (no automatic retries)
- **Screenshots:** On failure
- **Videos:** On failure
- **Trace:** On first retry

---

## Running Tests

### Run All Tests

```bash
npm run test
```

### Run Tests by Category

**Login Tests Only:**
```bash
npm run test:login
```

**Registration Tests Only:**
```bash
npm run test:registration
```

**UI Tests (all):**
```bash
npm run test:ui
```

### Run Tests in Headed Mode (with browser UI)

```bash
npm run test:headed
```

### Run Tests in Debug Mode

```bash
npm run test:debug
```

This opens Playwright Inspector for step-by-step debugging.

### Run Specific Test File

```bash
npx playwright test tests/ui/login/submit-login.spec.ts
```

### Run Tests by Tag

**Run only negative tests:**
```bash
npx playwright test --grep @negative
```

**Run only edge case tests:**
```bash
npx playwright test --grep @edge-cases
```

**Available tags:**
- `@auth` - Authentication tests
- `@login` - Login functionality
- `@registration` - Registration functionality
- `@positive` - Positive scenarios
- `@negative` - Negative scenarios
- `@edge-cases` - Edge case scenarios
- `@ui` - UI navigation tests

---

## Test Reports

### View Test Report

After test execution, view the HTML report:

```bash
npx playwright show-report
```

The report includes:
- Test execution summary
- Pass/fail status for each test
- Screenshots on failure
- Detailed error messages
- Execution timeline

### Report Location

Reports are generated in:
- `playwright-report/` - HTML report
- `test-results/` - JSON and other artifacts

---

## Code Quality

### Linting

**Run ESLint:**
```bash
npm run lint
```

**Fix linting issues automatically:**
```bash
npm run lint:fix
```

### Code Formatting

**Format code with Prettier:**
```bash
npm run format
```

**Check formatting without modifying files:**
```bash
npm run format:check
```

### Type Checking

**Run TypeScript type checking:**
```bash
npm run type-check
```

---

## Technical Stack

### Core Framework
- **Playwright:** v1.55.0 - Browser automation
- **TypeScript:** v5.x - Type-safe programming
- **Node.js:** v18+ - Runtime environment

### Testing Tools
- **@playwright/test** - Test runner and assertions
- **monocart-reporter** - Enhanced HTML reporting
- **dotenv** - Environment variable management

### Code Quality Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript Compiler** - Type checking

### Design Patterns
- **Page Object Model (POM)** - Maintainable test structure
- **Fixture Pattern** - Reusable test setup
- **Data-Driven Testing** - Dynamic test data generation

---

## Key Technical Decisions

### 1. No Hard Waits
All waiting mechanisms use Playwright's built-in functionality:
- `waitFor({ state: 'visible' })` for element visibility
- `waitFor({ state: 'hidden' })` for spinner disappearance
- `expect().toBeVisible()` with timeout for assertions

### 2. Custom Spinner Handling
Implemented custom `spinnerWait()` method in `BasePage` to handle application loading states:
```typescript
async spinnerWait(timeout: number = 15000) {
  await this.wait(1000);
  await this.spinner.waitFor({ state: 'hidden', timeout });
}
```

### 3. Dynamic Test Data
Registration tests generate unique data for each run:
- Timestamp-based email addresses
- Random combinations from predefined lists
- No test data cleanup required

### 4. Angular Component Support
Custom locators for Angular components:
- `app-input` - Input wrappers
- `ng-select` - Dropdown components
- `app-phone-number` - Phone number input
- `app-validation-message` - Error messages

---

## Troubleshooting

### Common Issues

**Issue:** Tests fail with "Element not found"
- **Solution:** Check if application is accessible at BASE_URL
- **Solution:** Verify spinner timing and wait strategies

**Issue:** Login tests fail with authentication error
- **Solution:** Verify TEST_USER_EMAIL and TEST_USER_PASSWORD in .env file
- **Solution:** Ensure test user exists in the system

**Issue:** Registration tests fail with "email already exists"
- **Solution:** Tests should generate unique emails automatically
- **Solution:** Check timestamp and random string generation

**Issue:** Timeout errors
- **Solution:** Increase timeout in playwright.config.ts
- **Solution:** Check network connectivity to staging environment

---

## Contributing

### Code Style Guidelines
- Use TypeScript for all new files
- Follow existing Page Object Model structure
- Add JSDoc comments for public methods
- Use meaningful variable and method names
- Run linter and formatter before committing

### Adding New Tests
1. Create test file in appropriate directory (`tests/ui/login/` or `tests/ui/registration/`)
2. Import necessary fixtures and utilities
3. Follow existing test structure with `test.step()` blocks
4. Add appropriate tags for categorization
5. Update TEST_CASES.md with new test documentation

### Adding New Page Objects
1. Extend `BasePage` class
2. Define locators in constructor
3. Implement page-specific methods
4. Add to fixtures in `fixtures/ui/ui.fixture.ts`
5. Export from main fixture file

---

## Contact & Support

For questions or issues related to this test automation framework, please contact the QA team.

---

## License

This project is private and proprietary to RepMove.
