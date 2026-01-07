import { Locator, Page } from "@playwright/test";

export enum MessageStatus {
  SUCCESS = "success",
  ERROR = "danger",
  INFO = "info",
  HIDDEN = "",
}

export class LoginPage {
  readonly route = "/login";
  readonly page: Page;
  readonly usernameInputLocator: Locator;
  readonly passwordInputLocator: Locator;
  readonly loginButtonLocator: Locator;
  readonly messageLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInputLocator = this.page.getByRole("textbox", {
      name: "Username",
    });
    this.passwordInputLocator = this.page.getByRole("textbox", {
      name: "Password",
    });
    this.loginButtonLocator = this.page.getByRole("button", { name: "Login" });
    this.messageLocator = this.page.locator("#flash");
  }

  async goto() {
    await this.page.goto(this.route);
  }

  async login(username: string, password: string) {
    await this.usernameInputLocator.fill(username);
    await this.passwordInputLocator.fill(password);
    await this.loginButtonLocator.click();
  }

  async getMessageStatus(): Promise<MessageStatus> {
    const classAttribute = await this.messageLocator.getAttribute("class");

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
