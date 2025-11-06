# Test Plan: Login & Registration Testing

## Application Under Test
**RepMove Staging Environment**  
URL: http://dev-repmove-enterprise.web.app/

---

## 1. Scope of Testing

### In Scope
- **Login functionality** - User authentication with email and password
- **Registration functionality** - New user account creation with required fields
- UI validation messages and error handling
- Form field validations
- Navigation flows between Login and Registration pages
- Successful authentication and redirect to Dashboard

### Out of Scope
- Password reset/forgot password functionality
- Email verification flows
- Social login (Google, Facebook, etc.)
- API-level testing
- Performance and load testing
- Mobile responsive testing
- Browser compatibility testing (focused on Chromium only)
- Accessibility compliance testing

---

## 2. Test Scenarios

### 2.1 Login Functionality

#### Positive Scenarios
1. **Successful Login with Valid Credentials**
   - User can login with registered email and password
   - System redirects to Dashboard after successful login
   - User session is established

#### Negative Scenarios
1. **Login with Invalid Email Format**
   - System displays validation error for malformed email
   - Login is prevented
   
2. **Login with Wrong Password**
   - System displays authentication error
   - User remains on login page
   
3. **Login with Non-existent User**
   - System displays appropriate error message
   - Login attempt is rejected
   
4. **Login with Empty Credentials**
   - System prevents form submission
   - Validation messages appear for required fields

#### Edge Cases
1. **Empty Email Field** - Validation error displayed
2. **Empty Password Field** - Validation error displayed
3. **Email with Special Characters** - System handles appropriately
4. **Very Long Email Input** - Validation error for invalid format
5. **Whitespace in Credentials** - System handles input sanitization

---

### 2.2 Registration Functionality

#### Positive Scenarios
1. **Successful Registration with All Required Fields**
   - User can register with valid data (First Name, Last Name, Company Name, Industry, Email, Country, Phone, Password)
   - System processes registration successfully
   - User is redirected to Dashboard
   - New account is created

#### Negative Scenarios
1. **Registration with Existing Email**
   - System displays error indicating email already exists
   - Registration is prevented
   
2. **Registration with Invalid Email Format**
   - System displays validation error
   - Form submission is blocked

#### Edge Cases
1. **Empty Required Fields** - Individual field validation errors
2. **Invalid Phone Number Format** - Validation error displayed
3. **Special Characters in Name Fields** - System validation handling
4. **Dropdown Selection** - Industry and Country selection required
5. **Password Field Validation** - Minimum requirements enforced

---

## 3. Test Data Strategy

### Login Test Data
- Valid user credentials stored in environment variables
- Test data constants for invalid scenarios
- Dynamic email generation for edge cases

### Registration Test Data
- Dynamically generated unique user data per test run
- Randomized but valid values for:
  - First/Last names from predefined lists
  - Company names from predefined lists
  - Email addresses with timestamp and random strings
  - Phone numbers with appropriate format
- Fixed password meeting requirements

---

## 4. Test Implementation Details

### Test Organization
```
tests/ui/
  ├── login/
  │   ├── check-login-page.spec.ts       (UI verification)
  │   ├── submit-login.spec.ts           (Positive flow)
  │   ├── negative-login.spec.ts         (Negative scenarios)
  │   ├── edge-cases-login.spec.ts       (Edge cases)
  │   └── ui-elements-login.spec.ts      (Navigation elements)
  └── registration/
      └── user-can-register.spec.ts      (Positive flow)
```

### Page Object Model
- `BasePage` - Common functionality (navigation, spinner handling, URL utilities)
- `LoginPage` - Login-specific locators and methods
- `RegistrationPage` - Registration-specific locators and methods

### Key Technical Decisions
1. **No Hard Waits** - All waits use Playwright's built-in waiting mechanisms
2. **Spinner Handling** - Custom spinner wait for loading states
3. **Dynamic Locators** - Use of custom Angular components (app-input, ng-select, app-phone-number)
4. **Validation Messages** - Custom locators for app-validation-message and toast notifications
5. **Test Isolation** - Each test generates unique data to avoid conflicts

---

## 5. Assumptions

1. **Test Environment Stability**
   - Staging environment is available and stable during test execution
   - No rate limiting or CAPTCHA on registration/login endpoints
   
2. **Test Data**
   - Email addresses can be reused or system allows duplicate registrations with unique timestamps
   - No email verification required for successful registration
   
3. **Browser Support**
   - Tests are designed for Chromium browser only
   - Desktop viewport (1280x720)
   
4. **Application Behavior**
   - Dashboard page URL contains "dashboard" path
   - Spinner element appears during async operations
   - Validation messages use consistent Angular components
   
5. **Network Conditions**
   - Stable internet connection
   - Standard timeouts (5s for element visibility, 15s for spinners)

---

## 6. Risks and Mitigations

| Risk | Mitigation |
|------|-----------|
| Flaky tests due to spinner timing | Implemented custom spinner wait with hidden state detection |
| Duplicate email registration failures | Dynamic email generation with timestamp and random strings |
| Locator changes in Angular app | Use of semantic locators (placeholder, role) where possible |
| Test data cleanup required | Unique data per run eliminates need for cleanup |
| Environment downtime | Test failure handling with appropriate error messages |

---

## 7. Success Criteria

- All positive scenarios pass consistently
- All negative scenarios correctly validate error handling
- Edge cases are properly handled by the application
- No hard-coded waits used in test implementation
- Tests execute within reasonable timeframe (< 2 minutes total)
- Clear, maintainable code following Page Object Model pattern
- Comprehensive assertions for expected behaviors

---

## 8. Test Coverage Summary

### Login Tests: 16 test cases
- Positive: 5 tests
- Negative: 4 tests
- Edge Cases: 7 tests

### Registration Tests: 1 test case
- Positive: 1 test (full registration flow)

### Total: 17 automated test cases

---

## 9. Future Enhancements

1. Add negative registration scenarios (duplicate email, invalid formats)
2. Add edge case scenarios for registration form fields
3. Implement API-level tests for faster execution
4. Add visual regression testing
5. Expand browser coverage (Firefox, WebKit)
6. Add mobile viewport testing
7. Implement parallel test execution strategies
8. Add performance metrics collection
