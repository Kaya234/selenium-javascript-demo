const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

class BasePage {
    constructor(driver) {
      this.driver = driver
    }

    async goToUrl(url){
         await this.driver.get(url);
    }

    async type(element, text){
            await this.driver.wait(until.elementLocated(element)).sendKeys(text);
    }

    async clickOn(element){
            await this.driver.wait(until.elementLocated(element)).click();
    }

    async clickContainText(text){

           await this.driver.wait(until.elementLocated(By.xpath("//span[text()= '" + text + "']"))).click();
             }

    async clickContainTextDropdown(option){
          await this.driver.wait(until.elementLocated(By.xpath("//div[span[text()= '" + option + "']]"))).click();
             }

    async assertTrueText(element, text){
            let actualString = await this.driver.wait(until.elementLocated(element), 10000, 1000).getText();
            assert.strictEqual(actualString, text);

    }

      async assertTrueToast(message){
            let actualString = await this.driver
            .wait(until.elementLocated(By.xpath("//p[text()= '" + message + "']"), 10000, 1000)).getText();
            assert.strictEqual(actualString, message);
        }

      async assertTrueSearchResult(message){
            let actualString = await this.driver
            .wait(until.elementLocated(By.xpath("//div[span[text()= '" + message + "']]"), 10000, 1000)).getText();
            assert.strictEqual(actualString, message);

        }

    async assertTrueList(element, text){
            let rows = await this.driver.findElements(element);
                for (let row of rows) {
                await row.getText();
                assert.strictEqual(actualString, text);
        }
    }

     async autocomplete(element){
            await new Promise(r => setTimeout(r, 2000));
            await this.driver.wait(until.elementLocated(element), 10000, 1000).click();

  }
  }
  module.exports = BasePage