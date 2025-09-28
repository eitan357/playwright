import { test, expect } from "@playwright/test";
import { openFormLayouts } from "../functions/functions1";

test.beforeEach(async ({ page }) => {
  await openFormLayouts(page);
});

test("get child element", async ({ page }) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click();

  await page
    .locator("nb-card")
    .locator("nb-radio")
    .locator(":text-is('Option 2')")
    .click();

  await page
    .locator("nb-card")
    .getByRole("button", { name: "Sign in" })
    .first()
    .click();

  await page.locator("nb-card").nth(3).getByRole("button").click();
});

test("get parent element", async ({ page }) => {
  // await page
  //   .locator("nb-card", { hasText: "Using the Grid" })
  //   .getByRole("textbox", { name: "Email" })
  //   .click();

  await page
    .locator("nb-card", { has: page.locator("#inputPassword2") })
    .getByRole("textbox", { name: "Email" })
    .click();

  await page
    .locator("nb-card")
    .filter({ has: page.locator("#inputPassword2") })
    .getByRole("textbox", { name: "Password" })
    .click();

  await page
    .locator("nb-card")
    .filter({ has: page.locator("nb-checkbox"), hasText: "Sign in" })
    .getByRole("textbox", { name: "Email" })
    .click();

  await page
    .locator(":text-is('Using the Grid')")
    .locator("..")
    .getByRole("textbox", { name: "Email" })
    .click();
});

test("Reusing the locator", async ({ page }) => {
  const getCard = page
    .locator("nb-card")
    .filter({ has: page.locator("#exampleInputEmail1") });

  const emailFiled = getCard.getByRole("textbox", { name: "Email" });

  await emailFiled.fill("Eitan357@gmail.com");
  await getCard.getByRole("textbox", { name: "Password" }).fill("Aa123456");
  await getCard.locator("nb-checkbox").click();
  await getCard.getByRole("button").click();

  await expect(emailFiled).toHaveValue("Eitan357@gmail.com");
});

test("extracting values", async ({ page }) => {
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });

  // option 1
  // const textButton = await basicForm.locator("button").textContent();
  // expect(textButton).toEqual("Submit");

  // option 2
  const basicFormButton = basicForm.locator("button");
  await expect(basicFormButton).toHaveText("Submit");

  //search from list of data
  const UsingTheGridForm = page
    .locator("nb-card")
    .filter({ hasText: "Using the Grid" });

  const radioButtons = await UsingTheGridForm.locator(
    "nb-radio"
  ).allTextContents();

  expect(radioButtons).toContain("Option 2");

  //input value
  const emailFiled = basicForm.getByRole("textbox", { name: "Email" });
  await emailFiled.fill("Eitan357@gmail.com");
  const emailInput = await emailFiled.inputValue();
  expect(emailInput).toEqual("Eitan357@gmail.com");

  //input attribute
  const placeholder = await emailFiled.getAttribute("placeholder");
  expect(placeholder).toEqual("Email");
});

test("assertions", async ({ page }) => {
  //General assertions - provinding value in the expect function, and no needed await
  const value = 5;
  expect(value).toBeLessThan(6);

  //Locator assertions - provinding locator in the expect function, and adding await in it
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
  const basicFormButton = basicForm.locator("button");
  await expect(basicFormButton).toHaveText("Submit");

  //Soft assertions - test can be continue even it failed
  await expect.soft(basicFormButton).toHaveText("Banana");
  expect(value).toEqual(5);
});
