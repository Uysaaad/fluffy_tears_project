// e2e-tests/login.test.mjs
import { Builder, By, Key, until } from "selenium-webdriver";
import { expect } from "chai";

describe("E2E Tests", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function () {
    await driver.quit();
  });

  it("should log in, verify user profile picture, and navigate back to the homepage", async function () {
    try {
      await driver.get("http://localhost:5173");

      // Wait for the email input to be present and then enter email
      await driver.wait(until.elementLocated(By.name("email")), 10000);
      await driver.findElement(By.name("email")).sendKeys("12345@gmail.com");

      // Wait for the password input to be present and then enter password
      await driver.wait(until.elementLocated(By.name("password")), 10000);
      await driver
        .findElement(By.name("password"))
        .sendKeys("8008208820", Key.RETURN);

      // Wait for the user profile image to appear in the header
      let userProfile = await driver.wait(
        until.elementLocated(By.css("figure img")),
        10000
      );
      let userProfileSrc = await userProfile.getAttribute("src");
      expect(userProfileSrc).to.match(
        /^http.*cloudinary\.com\/.*\.(jpg|jpeg|png|webp)$/
      ); // Verify it is a Cloudinary URL

      // Navigate back to the homepage
      await driver.findElement(By.css("a[href='/']")).click();

      // Wait until the homepage loads
      await driver.wait(until.urlIs("http://localhost:5173/"), 10000);

      // Verify the user profile image is still present in the header on the homepage
      let homepageUserProfile = await driver.wait(
        until.elementLocated(By.css("figure img")),
        10000
      );
      let homepageUserProfileSrc = await homepageUserProfile.getAttribute(
        "src"
      );
      expect(homepageUserProfileSrc).to.match(
        /^http.*cloudinary\.com\/.*\.(jpg|jpeg|png|webp)$/
      ); // Verify it is a Cloudinary URL
    } catch (error) {
      console.error("Test failed:", error);
      throw error;
    }
  });
});
