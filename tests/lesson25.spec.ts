import { test } from "@playwright/test";
import { openFormLayouts } from "../functions/functions1";

test.beforeEach(async ({ page }) => {
  await openFormLayouts(page);
});

// test("user facing locators", async ({ page }) => {
//   await page.getByRole("button", { name: "SING IN" }).click();
// });

test("user facing locators", async ({ page }) => {
  await page.getByRole("textbox", { name: "Email" }).first().click();
  await page.getByRole("button", { name: "SIGN IN" }).first().click();
  await page.getByLabel("Email").first().click();
  await page.getByPlaceholder("Jane Doe").click();
  await page.getByText("Using the Grid").click();
  await page.getByTitle("IoT Dashboard").click();
  await page.getByTestId("signIn").click();
});
