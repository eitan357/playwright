import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("first test", async ({ page }) => {
  await page.pause();
  console.log("first pause");
  // let inputs = await page.locator("input").all();

  await page.evaluate(() => {
    let inputs = document.querySelectorAll("input");
    console.log("Total inputs found:", inputs.length);

    inputs.forEach((input, index) => {
      console.log(input);
    });
  });

  console.log("end of the loop");
  await page.pause();

  let inputID = page.locator("#inputEmail1");
  let inputCalss = page.locator(".shape-rectangle");
  let inputAttribute = page.locator("[placeholder='Email']");

  //combine selectors
  let inputCombine = page.locator("input[placeholder='Email'].shape-rectangle");

  //get text
  let text = page.locator(":text('Using')");
  let exactText = page.locator(":text-is('Using the Grid')");
});

// test.beforeEach(async ({ page }) => {
//   await page.goto("http://localhost:4200/");
//   await page.getByText("Forms").click();
// });

// test("first test", async ({ page }) => {
//   await page.getByText("Form Layouts").click();
// });

// test("second test", async ({ page }) => {
//   await page.getByText("Datepicker").click();
// });

//test suite
// test.describe("first suite", () => {
//   test("first test", ({page}) => {});
// });
