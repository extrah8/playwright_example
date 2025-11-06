import { Page, Locator } from '@playwright/test';
import { Endpoint } from '@enums/endpoints.enum';

export abstract class BasePage {
  protected page: Page;
  private spinner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.spinner = page.locator('[class="loading-app__spinner"]');
  }
  /**
   *  Navigates to a specified path and waits for the page to load.
   *  Can accept either a full URL or an Endpoint enum value.
   * @param path - Full URL or Endpoint enum value (will be prepended with BASE_URL)
   */
  async navigate(path: string | Endpoint) {
    const url = this.isFullUrl(path) ? path : `${process.env.BASE_URL}${path}`;
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await this.waitForPageIsLoaded();
    await this.spinnerWait();
  }

  /**
   * Checks if the provided path is a full URL
   * @param path - Path to check
   * @returns True if path starts with http:// or https://
   */
  private isFullUrl(path: string): boolean {
    return path.startsWith('http://') || path.startsWith('https://');
  }
  /**
   *  Waits for the page to be fully loaded.
   */
  async waitForPageIsLoaded() {
    await this.page.waitForLoadState('domcontentloaded');
  }
  /**
   *  Waits for an element to be visible on the page.
   * @param locator
   * @param timeout
   */
  async waitForElement(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }
  /**
   *  Retrieves the text content of a specified element.
   * @param locator
   * @returns
   */
  async getElementText(locator: Locator): Promise<string> {
    await this.waitForElement(locator);
    const text = await locator.textContent();
    return text || '';
  }
  /**
   *  Checks if a specific text is visible on the page.
   * @param text
   * @returns
   */
  async hasText(text: string): Promise<boolean> {
    return this.page.locator(`text=${text}`).isVisible();
  }
  /**
   *  Waits for a specific text to appear on the page.
   * @param text
   * @param timeout
   */
  async waitForText(text: string, timeout: number = 10000): Promise<void> {
    await this.page.locator(`text=${text}`).waitFor({ state: 'visible', timeout });
  }
  /**
   *  Takes a screenshot of the current page and saves it with the given name.
   * @param name
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({
      path: `screenshots/${name}.png`,
      fullPage: true,
    });
  }
  /**
   * Gets the current URL of the page.
   * @returns The current URL as a string.
   */
  getCurrentUrl(): string {
    return this.page.url();
  }
  /**
   *  Waits for the URL to change to a specified value or waits for the page to load if no URL is provided.
   * @param expectedUrl
   * @param timeout
   */
  async waitForUrlChange(expectedUrl?: string, timeout: number = 10000): Promise<void> {
    if (expectedUrl) {
      await this.page.waitForURL(expectedUrl, { timeout });
    } else {
      await this.page.waitForLoadState('domcontentloaded');
    }
  }

  /**
   * Waits for a specified amount of time.
   * @param time - Time to wait in milliseconds
   */
  async wait(time: number) {
    await this.page.waitForTimeout(time);
  }

  /**
   * Waits for loading spinners to disappear from the page.
   *
   * This method waits until the spinner element has display: none (is hidden).
   * The spinner is always in DOM but changes display property between 'none' and 'flex'.
   *
   * @param timeout - Maximum time in milliseconds to wait for spinners to disappear. Defaults to 15000ms (15 seconds).
   * @returns Promise that resolves when spinner is hidden or the timeout is reached.
   */
  async spinnerWait(timeout: number = 15000) {
    await this.wait(1000);
    await this.spinner.waitFor({ state: 'hidden', timeout });
  }
}
