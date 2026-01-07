import test, { expect } from "@playwright/test";
import { WebInputsPage } from "../pages/web.inputs.page";

const testData = {
  number: 42,
  text: "Hello, Playwright!",
  password: "securePassword123",
};

test("Web inputs allow users to interact with web pages, submit forms, and provide data for processing.", async ({
  page,
}) => {
  const webInputsPage = new WebInputsPage(page);
  await webInputsPage.goto();

  webInputsPage.sumbitForm(testData.number, testData.text, testData.password);

  // Verify that the inputs were submitted correctly
  await expect
    .soft(webInputsPage.outputNumberLocator)
    .toHaveText(testData.number.toString());
  await expect.soft(webInputsPage.outputTextLocator).toHaveText(testData.text);
  await expect
    .soft(webInputsPage.outputPasswordLocator)
    .toHaveText(testData.password);
});
