# Test Cases Documentation

## Overview

This document describes all automated test cases implemented for RepMove Login and Registration functionality. Each test case includes purpose, preconditions, test steps, and expected results.

---

## Login Test Cases

### 1. Positive Login Scenarios

#### TC-LOGIN-001: User Can Login to Dashboard

**File:** `tests/ui/login/submit-login.spec.ts`

**Purpose:** Verify that a registered user can successfully log in with valid credentials and access the Dashboard.

**Preconditions:**

- User account exists in the system
- Valid credentials available in environment variables (TEST_USER_EMAIL, TEST_USER_PASSWORD)

**Test Steps:**

1. Navigate to Login page (`/auth/sign-in`)
2. Fill email field with valid email
3. Fill password field with valid password
4. Click "Sign In" button
5. Wait for spinner to disappear

**Expected Result:**

- User is redirected to Dashboard
- Dashboard navigation link is visible
- User session is established

**Tags:** `@auth`, `@login`, `@dashboard`

---

#### TC-LOGIN-002: Login Form is Visible

**File:** `tests/ui/login/check-login-page.spec.ts`

**Purpose:** Verify that all login form elements are displayed correctly on the Login page.

**Preconditions:** None

**Test Steps:**

1. Navigate to Login page (`/auth/sign-in`)
2. Verify all form elements are visible

**Expected Result:**

- Login title is displayed
- Email input field is visible
- Password input field is visible
- Sign In button is visible
- Forgot Password link is visible
- Sign Up link is visible

**Tags:** `@auth`, `@login`, `@dashboard`

---

### 2. Negative Login Scenarios

#### TC-LOGIN-NEG-001: Login with Invalid Email Format

**File:** `tests/ui/login/negative-login.spec.ts`

**Purpose:** Verify that system prevents login with malformed email address and displays appropriate error message.

**Test Data:**

- Email: `invalid-email` (no @ symbol, no domain)
- Password: `ValidPassword123!`

**Test Steps:**

1. Navigate to Login page
2. Enter invalid email format
3. Enter valid password
4. Click "Sign In" button

**Expected Result:**

- Validation error message is displayed: "Invalid email address"
- Login is prevented
- User remains on login page
- Dashboard is not accessible

**Tags:** `@auth`, `@login`, `@negative`

---

#### TC-LOGIN-NEG-002: Login with Wrong Password

**File:** `tests/ui/login/negative-login.spec.ts`

**Purpose:** Verify that system rejects login attempt with incorrect password and displays authentication error.

**Test Data:**

- Email: `test@example.com` (valid format)
- Password: `WrongPassword123!` (incorrect password)

**Test Steps:**

1. Navigate to Login page
2. Enter valid email address
3. Enter incorrect password
4. Click "Sign In" button

**Expected Result:**

- Toast message displayed: "Invalid to login"
- Login is prevented
- User remains on login page
- Dashboard is not accessible

**Tags:** `@auth`, `@login`, `@negative`

---

#### TC-LOGIN-NEG-003: Login with Non-Existent User

**File:** `tests/ui/login/negative-login.spec.ts`

**Purpose:** Verify that system handles login attempt for unregistered user appropriately.

**Test Data:**

- Email: `nonexistent@example.com` (not registered in system)
- Password: `SomePassword123!`

**Test Steps:**

1. Navigate to Login page
2. Enter email that does not exist in system
3. Enter any password
4. Click "Sign In" button

**Expected Result:**

- Toast message displayed: "Invalid to login"
- Login is prevented
- User remains on login page
- Dashboard is not accessible

**Tags:** `@auth`, `@login`, `@negative`

---

#### TC-LOGIN-NEG-004: Login with Empty Credentials

**File:** `tests/ui/login/negative-login.spec.ts`

**Purpose:** Verify that system requires both email and password fields to be filled before allowing login.

**Test Data:** Empty fields

**Test Steps:**

1. Navigate to Login page
2. Leave email field empty
3. Leave password field empty
4. Click "Sign In" button

**Expected Result:**

- Validation message for email: "Please, enter your email address"
- Validation message for password: "The Password is required"
- Login is prevented
- Form submission is blocked
- Dashboard is not accessible

**Tags:** `@auth`, `@login`, `@negative`

---

### 3. Edge Case Scenarios

#### TC-LOGIN-EDGE-001: Empty Email Field Only

**File:** `tests/ui/login/edge-cases-login.spec.ts`

**Purpose:** Verify validation when only email field is left empty.

**Test Data:**

- Email: (empty)
- Password: `ValidPassword123!`

**Test Steps:**

1. Navigate to Login page
2. Leave email field empty
3. Fill password field with valid password
4. Click "Sign In" button

**Expected Result:**

- Validation error displayed: "Please, enter your email address"
- Login is prevented
- Dashboard is not accessible

**Tags:** `@auth`, `@login`, `@edge-cases`

---

#### TC-LOGIN-EDGE-002: Empty Password Field Only

**File:** `tests/ui/login/edge-cases-login.spec.ts`

**Purpose:** Verify validation when only password field is left empty.

**Test Data:**

- Email: `test@example.com`
- Password: (empty)

**Test Steps:**

1. Navigate to Login page
2. Fill email field with valid email
3. Leave password field empty
4. Click "Sign In" button

**Expected Result:**

- Validation error displayed: "The Password is required"
- Login is prevented
- Dashboard is not accessible

**Tags:** `@auth`, `@login`, `@edge-cases`

---

#### TC-LOGIN-EDGE-003: Special Characters in Email

**File:** `tests/ui/login/edge-cases-login.spec.ts`

**Purpose:** Verify system handling of email addresses with special characters.

**Test Data:**

- Email: `test+special!#$%@example.com`
- Password: `ValidPassword123!`

**Test Steps:**

1. Navigate to Login page
2. Enter email with special characters
3. Fill password field
4. Click "Sign In" button

**Expected Result:**

- System processes the email
- Login attempt is made
- Dashboard is not accessible (user not registered)

**Note:** System allows special characters in email addresses (RFC 5322 compliant).

**Tags:** `@auth`, `@login`, `@edge-cases`

---

#### TC-LOGIN-EDGE-004: Very Long Email Input

**File:** `tests/ui/login/edge-cases-login.spec.ts`

**Purpose:** Verify system validates excessively long email addresses.

**Test Data:**

- Email: 100 'a' characters + `@example.com` (104 characters total)
- Password: `ValidPassword123!`

**Test Steps:**

1. Navigate to Login page
2. Enter very long email (100+ characters)
3. Fill password field
4. Click "Sign In" button

**Expected Result:**

- Validation error displayed: "Invalid email address"
- Login is prevented
- Dashboard is not accessible

**Tags:** `@auth`, `@login`, `@edge-cases`

---

### 4. UI Elements & Navigation

#### TC-LOGIN-UI-001: Forgot Password Link Functionality

**File:** `tests/ui/login/ui-elements-login.spec.ts`

**Purpose:** Verify that Forgot Password link is visible and navigates to correct page.

**Test Steps:**

1. Navigate to Login page
2. Verify "Forgot Password" link is visible
3. Click "Forgot Password" link
4. Wait for navigation

**Expected Result:**

- Forgot Password link is visible
- Click navigates to `/auth/forgot-password` page
- Spinner appears during navigation

**Tags:** `@auth`, `@login`, `@ui`

---

#### TC-LOGIN-UI-002: Sign Up Link Functionality

**File:** `tests/ui/login/ui-elements-login.spec.ts`

**Purpose:** Verify that Sign Up link is visible and navigates to registration page.

**Test Steps:**

1. Navigate to Login page
2. Verify "Sign Up" link is visible
3. Click "Sign Up" link
4. Wait for navigation

**Expected Result:**

- Sign Up link is visible
- Click navigates to `/auth/sign-up` page
- Spinner appears during navigation

**Tags:** `@auth`, `@login`, `@ui`

---

#### TC-LOGIN-UI-003: Login Page Title Display

**File:** `tests/ui/login/ui-elements-login.spec.ts`

**Purpose:** Verify that login page displays correct title.

**Test Steps:**

1. Navigate to Login page
2. Check page title element

**Expected Result:**

- Title is visible
- Title text contains "Sign In" (case insensitive)

**Tags:** `@auth`, `@login`, `@ui`

---

#### TC-LOGIN-UI-004: All Form Fields are Present and Enabled

**File:** `tests/ui/login/ui-elements-login.spec.ts`

**Purpose:** Verify that all form input fields are present, visible, and enabled for user interaction.

**Test Steps:**

1. Navigate to Login page
2. Check email input field state
3. Check password input field state
4. Check sign in button state

**Expected Result:**

- Email input is visible and enabled
- Password input is visible and enabled
- Sign In button is visible and enabled

**Tags:** `@auth`, `@login`, `@ui`

---

#### TC-LOGIN-UI-005: Password Field Masks Input

**File:** `tests/ui/login/ui-elements-login.spec.ts`

**Purpose:** Verify that password input field masks entered characters for security.

**Test Steps:**

1. Navigate to Login page
2. Fill password field with test value
3. Check input field type attribute

**Expected Result:**

- Password field has `type="password"` attribute
- Entered text is masked (displayed as dots or asterisks)

**Tags:** `@auth`, `@login`, `@ui`

---

## Registration Test Cases

### 1. Positive Registration Scenarios

#### TC-REG-001: Successful User Registration

**File:** `tests/ui/registration/user-can-register.spec.ts`

**Purpose:** Verify that new user can successfully register with all required fields and access Dashboard.

**Preconditions:**

- Registration page is accessible
- Unique test data is generated for each test run

**Test Data Generation:**

- First Name: Random from predefined list + random letters (e.g., "Johnabcd")
- Last Name: Random from predefined list + random number (e.g., "Smith123")
- Company Name: Random from predefined list + random number (e.g., "Tech Corp456")
- Industry: First option from dropdown (selected automatically)
- Email: `user[timestamp][random]@example.com` (e.g., "user1730123456abcd@example.com")
- Country: First option from dropdown (selected automatically)
- Phone: 9-digit number starting with 4 (e.g., "412345678")
- Password: `ValidPassword123!`

**Test Steps:**

1. Navigate to Registration page (`/auth/sign-up`)
2. Generate unique user data
3. Fill "First Name" field
4. Fill "Last Name" field
5. Fill "Company Name" field
6. Click "Industry" dropdown and select first option
7. Fill "Email" field
8. Click "Country" dropdown and select first option
9. Fill "Phone" field (without country code)
10. Fill "Password" field
11. Click "Sign Up" button
12. Wait for registration spinner to disappear

**Expected Result:**

- Form is submitted successfully
- Registration spinner appears and disappears
- User is redirected to Dashboard
- Current URL contains "dashboard"
- New user account is created in system

**Tags:** `@auth`, `@registration`

**Technical Notes:**

- Email uniqueness ensured by timestamp and random string combination
- Phone number format validated (starts with 4, 9 digits)
- Industry and Country automatically select first available option
- Custom Angular components used: `app-input`, `ng-select`, `app-phone-number`
- Registration spinner element: `app-loading`

---

## Test Execution Summary

### Coverage Statistics

- **Total Test Cases:** 16
- **Login Tests:** 15
  - Positive: 2
  - Negative: 4
  - Edge Cases: 4
  - UI/Navigation: 5
- **Registration Tests:** 1
  - Positive: 1

### Test Organization

```
tests/ui/
├── login/
│   ├── check-login-page.spec.ts      (1 test)
│   ├── submit-login.spec.ts          (1 test)
│   ├── negative-login.spec.ts        (4 tests)
│   ├── edge-cases-login.spec.ts      (4 tests)
│   └── ui-elements-login.spec.ts     (5 tests)
└── registration/
    └── user-can-register.spec.ts     (1 test)
```

### Execution Commands

```bash
# Run all tests
npm run test

# Run login tests only
npm run test:login

# Run registration tests only
npm run test:registration

# Run with UI (headed mode)
npm run test:headed

# Run in debug mode
npm run test:debug
```

---

## Test Data Management

### Login Test Data

**Source:** Environment variables (`.env` file)

```
TEST_USER_EMAIL=your-email@example.com
TEST_USER_PASSWORD=YourPassword123!
```

**Constants in specs:**

- Valid email: `test@example.com`
- Invalid email: `invalid-email`
- Special char email: `test+special!#$%@example.com`
- Long email: 100 'a' characters + `@example.com`

### Registration Test Data

**Source:** `fixtures/testData/uiTestData.ts`

**REGISTRATION_DATA:**

- FIRST_NAMES: Array of 10 common first names
- LAST_NAMES: Array of 10 common last names
- COMPANY_NAMES: Array of 8 company name variations
- PASSWORD: `ValidPassword123!`

**Dynamic Generation:**

- Unique email per test run (timestamp + random letters)
- Random combinations from predefined lists
- Phone numbers: 400000000-499999999 range

---

## Technical Implementation Details

### Page Object Model Structure

#### BasePage

**Location:** `pages/base.page.ts`

**Responsibilities:**

- Universal navigation method (full URL or Endpoint enum)
- Spinner wait handling
- Current URL retrieval
- Generic wait utilities

#### LoginPage

**Location:** `pages/login.page.ts`

**Key Locators:**

- Email input: XPath `//input[contains(@type, "email")]`
- Password input: XPath `//input[contains(@type, "password")]`
- Sign In button: XPath `//button[contains(@type, "submit")]`
- Validation message: `app-validation-message`
- Toast message: `#toast-container`
- Dashboard link: XPath `//cdk-tree//a[contains(@href, "dashboard")]`

**Key Methods:**

- `submitLogin(credentials)` - Full login flow
- `verifyAllInputsVisible()` - Form visibility check
- `getValidationMessage()` - Returns validation locator
- `verifyErrorMessage(text)` - Validates error text
- `verifyToastMessage(text)` - Validates toast text
- `isDashboardVisible()` - Dashboard access check
- `fillEmail(email)`, `fillPassword(password)` - Individual field actions
- `clickSignIn()` - Submit button action

#### RegistrationPage

**Location:** `pages/registration.page.ts`

**Key Locators:**

- First Name input: `app-input[placeholder="First Name"] input`
- Last Name input: `app-input[placeholder="Last Name"] input`
- Company Name input: `app-input[placeholder="Company Name"] input`
- Industry dropdown: `ng-select[placeholder="Industry"]`
- Email input: `app-input[placeholder="Email"] input`
- Country dropdown: `ng-select[placeholder="Country"]`
- Phone input: `app-phone-number[placeholder="Phone"] input[type="text"]:not([readonly])`
- Password input: `app-input[placeholder="Password"] input`
- Sign Up button: XPath `//button[contains(@type, "submit")]`
- Dashboard link: XPath `//cdk-tree//a[contains(@href, "dashboard")]`

**Key Methods:**

- `generateRandomUserData(testData)` - Creates unique user data
- `submitRegistration(userData)` - Full registration flow with dropdown selections

**Custom Component Handling:**

- `app-input`: Custom Angular input wrapper
- `ng-select`: Angular dropdown component
- `app-phone-number`: Custom phone number input with country code
- `app-loading`: Registration spinner element

### Waiting Strategies

**No Hard Waits Policy:**

- All waits use Playwright's built-in mechanisms
- `waitFor({ state: 'visible' })` for element visibility
- `waitFor({ state: 'hidden' })` for spinner disappearance
- `expect().toBeVisible()` with timeout for assertions

**Spinner Handling:**

- Login spinner: `.loading-app__spinner` waits for `hidden` state
- Registration spinner: `app-loading` waits for element removal
- Default timeout: 15 seconds
- Custom implementation in BasePage.spinnerWait()

### Validation Patterns

**Error Messages:**

- Use `app-validation-message` element for field-level errors
- Use `#toast-container` for authentication errors
- Verify both visibility and text content
- Use `getValidationMessageByIndex()` for multiple error messages

**Success Validation:**

- Check dashboard URL contains "dashboard"
- Verify dashboard navigation link is visible
- Confirm user session establishment

---

## Future Test Cases

### Planned Login Tests

1. Password complexity validation
2. Session timeout handling
3. Remember me functionality
4. Browser back button after logout
5. Multiple failed login attempts (account lockout)

### Planned Registration Tests

1. Negative: Registration with existing email
2. Negative: Invalid phone number formats
3. Edge: Special characters in name fields
4. Edge: Minimum/maximum field length validation
5. Edge: Password strength requirements
6. UI: Terms and Conditions link functionality
7. UI: Privacy Policy link functionality

### Planned Integration Tests

1. End-to-end: Register → Logout → Login flow
2. Data persistence after registration
3. Profile data accuracy after login
