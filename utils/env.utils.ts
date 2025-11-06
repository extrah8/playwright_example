import { Credentials } from '@interfaces/login.interface';

const BASE_URL = 'BASE_URL';
const TEST_USER_EMAIL = 'TEST_USER_EMAIL';
const TEST_USER_PASSWORD = 'TEST_USER_PASSWORD';

export class EnvUtils {
  static validateRequiredEnvVars(): void {
    const requiredVars = [BASE_URL, TEST_USER_EMAIL, TEST_USER_PASSWORD];

    const missingVars: string[] = [];

    for (const varName of requiredVars) {
      if (!process.env[varName]) {
        missingVars.push(varName);
      }
    }

    if (missingVars.length > 0) {
      const errorMessage = `
 Missing required environment variables:

${missingVars.map((varName) => `   - ${varName}`).join('\n')}

 Add them to your .env file.
`;

      throw new Error(errorMessage);
    }
  }

  static getBaseURL(): string {
    return this.getEnv(BASE_URL);
  }

  private static getEnv(envName: string): string {
    const value = process.env[envName];
    if (!value) {
      throw new Error(`Environment variable ${envName} is required but not set`);
    }
    return value;
  }

  static validateUserSecrets(): void {
    const userSecrets = [TEST_USER_EMAIL, TEST_USER_PASSWORD];
    const missingVars: string[] = [];

    for (const varName of userSecrets) {
      if (!process.env[varName]) {
        missingVars.push(varName);
      }
    }

    if (missingVars.length > 0) {
      const errorMessage = `
 Missing required user credentials:

${missingVars.map((varName) => `   - ${varName}`).join('\n')}

 Add them to your .env file for UI testing.
`;

      throw new Error(errorMessage);
    }
  }
}

/**
 * Secrets class for managing user credentials and sensitive test data
 */
export class Secrets {
  static get User(): Credentials {
    return {
      username: process.env.TEST_USER_EMAIL as string,
      password: process.env.TEST_USER_PASSWORD as string,
      role: 'User',
    };
  }
}
