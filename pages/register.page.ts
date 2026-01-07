import { Locator, Page } from "@playwright/test";
import { MessageStatus } from "./login.page";

export class RegisterPage {
  readonly route = "/register";
  readonly page: Page;
  readonly usernameLocator: Locator;
  readonly passwordLocator: Locator;
  readonly confirmPasswordLocator: Locator;
  readonly registerButtonLocator: Locator;
  readonly messageLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameLocator = page.getByRole("textbox", { name: "Username" });
    this.passwordLocator = page.getByRole("textbox", {
      name: "Password",
      exact: true,
    });
    this.confirmPasswordLocator = page.getByRole("textbox", {
      name: "Confirm Password",
    });
    this.registerButtonLocator = page.getByRole("button", { name: "Register" });
    this.messageLocator = page.locator("#flash");
  }

  async goto() {
    await this.page.goto(this.route);
  }

  async register(username: string, password: string) {
    await this.usernameLocator.fill(username);
    await this.passwordLocator.fill(password);
    await this.confirmPasswordLocator.fill(password);
    await this.registerButtonLocator.click();
  }

  async getMessageStatus(): Promise<MessageStatus> {
    const messageLocator = this.page.locator("#flash");
    const classAttribute = await messageLocator.getAttribute("class");

    if (classAttribute?.includes(MessageStatus.SUCCESS)) {
      return MessageStatus.SUCCESS;
    } else if (classAttribute?.includes(MessageStatus.INFO)) {
      return MessageStatus.INFO;
    } else if (classAttribute?.includes(MessageStatus.ERROR)) {
      return MessageStatus.ERROR;
    } else {
      return MessageStatus.HIDDEN;
    }
  }
}
