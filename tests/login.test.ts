import test, { expect } from "@playwright/test";
import { LoginPage, MessageStatus } from "../pages/login.page";

const testData = {
  validData: {
    username: "practice",
    password: "SuperSecretPassword!",
  },
  invalidData: {
    username: "invalidUser",
    password: "invalidPassword",
  },
};

test("If the credentials are correct, you should see a welcome message.", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  await loginPage.login(
    testData.validData.username,
    testData.validData.password
  );

  await expect(loginPage.getMessageStatus()).resolves.toBe(
    MessageStatus.SUCCESS
  );
});

test("If the credentials are incorrect, you should see an error message.", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  await loginPage.login(
    testData.invalidData.username,
    testData.invalidData.password
  );

  await expect(loginPage.getMessageStatus()).resolves.toBe(MessageStatus.ERROR);
});
