import test, { expect } from "@playwright/test";
import { OTPLoginPage } from "../pages/otp-login.page.ts";

const testData = {
  validEmail: "practice@expandtesting.com",
  validOTP: "214365",
};

test("Test OTP login functionality", async ({ page }) => {
  const otpLoginPage = new OTPLoginPage(page);

  await test.step("User can submit a email to receive OTP", async () => {
    await otpLoginPage.goto();
    await otpLoginPage.submitEmail(testData.validEmail);

    await expect.soft(page.getByText(testData.validEmail)).toBeVisible();
  });

  await test.step("User can submit the received OTP to log in", async () => {
    await otpLoginPage.sendOTP(testData.validOTP);

    await expect(page.getByText(`You logged into a secure area`)).toBeVisible();
  });
});
