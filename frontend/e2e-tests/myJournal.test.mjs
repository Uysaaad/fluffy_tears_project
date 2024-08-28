// e2e-tests/addJournal.test.mjs
import { Builder, By, Key, until } from "selenium-webdriver";
import { expect } from "chai";

describe("E2E Tests - Add Journal", function () {
  let driver;

  this.timeout(60000); 

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function () {
    await driver.quit();
  });

  it("should log in, navigate to profile, add a journal entry, predict emotions, and generate an illustration", async function () {
    try {
      await driver.get("http://localhost:5173/login");

      // Log in
      await driver.wait(until.elementLocated(By.name("email")), 20000);
      await driver.findElement(By.name("email")).sendKeys("12345@gmail.com");

      await driver.wait(until.elementLocated(By.name("password")), 20000);
      await driver
        .findElement(By.name("password"))
        .sendKeys("8008208820", Key.RETURN);

      // Wait for the redirection to the homepage after login
      await driver.wait(until.urlIs("http://localhost:5173/"), 20000);

      // Wait for the login success toast to disappear
      await driver.wait(
        until.stalenessOf(
          await driver.findElement(By.css(".Toastify__toast--success"))
        ),
        20000
      );

      // Navigate to the user's profile page
      await driver.findElement(By.css("a[href='/users/profile/me']")).click();

      // Wait for the profile page to load
      await driver.wait(
        until.urlIs("http://localhost:5173/users/profile/me"),
        20000
      );

      // Open the "Add Journal" form
      await driver.wait(
        until.elementLocated(By.css("button[aria-label='Add Journal']")),
        20000
      );
      await driver
        .findElement(By.css("button[aria-label='Add Journal']"))
        .click();

      // Wait for the "Add Journal" form to appear
      await driver.wait(
        until.elementLocated(By.css("input[type='text']")),
        20000
      );

      // Fill out the "Add Journal" form
      await driver
        .findElement(By.css("input[type='text']"))
        .sendKeys("Test Journal Title");
      await driver
        .findElement(By.css("textarea"))
        .sendKeys("This is a test journal content.");

      // Submit the form
      await driver.findElement(By.css("button[type='submit']")).click();

      // Wait for the journal addition success message
      let toastMessage = await driver
        .wait(until.elementLocated(By.css(".Toastify__toast--success")), 20000)
        .getText();
      expect(toastMessage).to.equal("Journal added successfully!");

      const predictButton = await driver.wait(
        until.elementLocated(By.xpath("//button[contains(text(),'Predict')]")),
        10000
      );
      await driver.wait(until.elementIsVisible(predictButton), 10000);
      await predictButton.click();
      console.log("Clicked Predict button");

      const drawEmotionButton = await driver.wait(
        until.elementLocated(
          By.xpath("//button[contains(text(),'Draw my emotion')]")
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(drawEmotionButton), 10000);
      console.log("Draw My Emotion button is now visible");

      // Generate the illustration
      await drawEmotionButton.click();
      console.log("Clicked Draw my emotion button");


    } catch (error) {
      console.error("Test failed:", error);
      throw error;
    }
  });
});
