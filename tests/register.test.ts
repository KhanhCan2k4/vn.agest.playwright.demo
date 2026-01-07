import test, { expect } from "@playwright/test";
import { RegisterPage } from "../pages/register.page";
import { LoginPage, MessageStatus } from "../pages/login.page";

const currentTimestamp = new Date().getTime();

const testData = {
  username: `test${currentTimestamp}`,
  password: "Test@1234",
};

test("Complete User Journey: Register -> Validate -> Login", async ({
  page,
}) => {
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);

  await test.step("User can register successfully", async () => {
    await registerPage.goto();
    await registerPage.register(testData.username, testData.password);

    await expect
      .soft(registerPage.getMessageStatus())
      .resolves.toBe(MessageStatus.INFO);
  });

  await test.step("User cannot register with same information", async () => {
    await registerPage.goto();
    await registerPage.register(testData.username, testData.password);

    await expect(registerPage.getMessageStatus()).resolves.toBe(
      MessageStatus.ERROR
    );
  });

  await test.step("User can login with registered information", async () => {
    await loginPage.goto();
    await loginPage.login(testData.username, testData.password);

    await expect(loginPage.getMessageStatus()).resolves.toBe(
      MessageStatus.SUCCESS
    );
  });
});
