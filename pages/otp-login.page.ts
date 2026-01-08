import { Locator, Page } from "@playwright/test";

export class OTPLoginPage {
  readonly route = "/otp-login";
  readonly page: Page;
  readonly emailLocator: Locator;
  readonly sendButtonLocator: Locator;
  readonly otpInputLocator: Locator;
  readonly verifyOTPButtonLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailLocator = page.getByRole("textbox", {
      name: "Your Email Address",
    });
    this.sendButtonLocator = page.getByRole("button", {
      name: "Send OTP Code",
    });
    this.otpInputLocator = page.getByPlaceholder("Enter OTP code");
    this.verifyOTPButtonLocator = page.getByRole("button", {
      name: "Verify OTP Code",
    });
  }

  async goto() {
    await this.page.goto(this.route);
  }

  async submitEmail(email: string) {
    await this.emailLocator.fill(email);
    await this.sendButtonLocator.click();
  }

  async sendOTP(otp: string) {
    await this.otpInputLocator.fill(otp);
    await this.verifyOTPButtonLocator.click();
  }
}
