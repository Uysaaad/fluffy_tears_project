// e2e-tests/register.test.mjs
import { Builder, By, Key, until } from "selenium-webdriver";
import { expect } from "chai";

describe("E2E Tests - Registration", function () {
  let driver;

  this.timeout(30000); // Increase the timeout to 30 seconds

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function () {
    await driver.quit();
  });

  it("should register a new user and redirect to the login page", async function () {
    try {
      await driver.get("http://localhost:5173/register");

      // Wait for the registration form inputs to be present
      await driver.wait(until.elementLocated(By.name("email")), 20000);
      await driver
        .findElement(By.name("email"))
        .sendKeys("newuser3344@example.com");

      await driver.wait(until.elementLocated(By.name("username")), 20000);
      await driver
        .findElement(By.name("username"))
        .sendKeys("newuser3344");

      await driver.wait(until.elementLocated(By.name("password")), 20000);
      await driver
        .findElement(By.name("password"))
        .sendKeys("newpassword", Key.RETURN);

      // Wait for redirection to the login page
      await driver.wait(until.urlIs("http://localhost:5173/login"), 20000);

    
      // Verify the presence of the login form
      let loginForm = await driver.wait(
        until.elementLocated(By.tagName("form")),
        20000
      );
      expect(loginForm).to.not.be.null;

      // Verify the presence of email and password input fields
      let emailInput = await driver.wait(
        until.elementLocated(By.name("email")),
        20000
      );
      expect(emailInput).to.not.be.null;

      let passwordInput = await driver.wait(
        until.elementLocated(By.name("password")),
        20000
      );
      expect(passwordInput).to.not.be.null;
    } catch (error) {
      console.error("Test failed:", error);
      throw error;
    }
  });
});
