import { Locator, Page } from "@playwright/test";

export class WebInputsPage {
  readonly page: Page;
  readonly route: string = "/inputs";
  readonly inputNumberLocator: Locator;
  readonly inputTextLocator: Locator;
  readonly inputPasswordLocator: Locator;
  readonly inputDateLocator: Locator;
  readonly displayInputsButtonLocator: Locator;
  readonly clearInputsButtonLocator: Locator;
  readonly outputNumberLocator: Locator;
  readonly outputTextLocator: Locator;
  readonly outputPasswordLocator: Locator;
  readonly outputDateLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputNumberLocator = page.getByRole("spinbutton", {
      name: "Input: Number",
    });
    this.inputTextLocator = page.getByRole("textbox", { name: "Input: Text" });
    this.inputPasswordLocator = page.getByRole("textbox", {
      name: "Input: Password",
    });
    this.inputDateLocator = page.getByRole("textbox", { name: "Input: Date" });
    this.displayInputsButtonLocator = page.getByRole("button", {
      name: "Display Inputs",
    });
    this.clearInputsButtonLocator = page.getByRole("button", {
      name: "Clear Inputs",
    });
    this.outputNumberLocator = page.locator("#output-number");
    this.outputTextLocator = page.locator("#output-text");
    this.outputPasswordLocator = page.locator("#output-password");
    this.outputDateLocator = page.locator("#output-date");
  }

  async goto() {
    await this.page.goto(this.route);
  }

  async sumbitForm(num: number, text: string, password: string) {
    await this.inputNumberLocator.fill(num.toString());
    await this.inputTextLocator.fill(text);
    await this.inputPasswordLocator.fill(password);

    await this.displayInputsButtonLocator.click();
  }

  async clearForm() {
    this.clearInputsButtonLocator.click();
  }
}
