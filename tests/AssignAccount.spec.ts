import { test, expect, Page} from '@playwright/test';
import {TestConfig} from '../test.config'
import { LoginWebCi } from '../pages/WebCILogin';
import {AssignAcc} from '../pages/AssignAccount'
import {RandomDataUtil} from '../utils/RandomDataGenerator';


  let config: TestConfig;
  let loginWebCi: LoginWebCi;
  let assignacc: AssignAcc;

test.beforeEach(async ({ page }) => {
  config = new TestConfig(); 
  await page.goto(config.webCIurl);

   loginWebCi = new LoginWebCi(page);
   assignacc = new AssignAcc(page);

});

test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000); 
    await page.close(); 
});


test('Assign Test data', async () => {


    await loginWebCi.loginAcc(config.email, config.password);
    await assignacc.TaskElementFVPage();
    console.log(RandomDataUtil.getFirstName());
    console.log(RandomDataUtil.getlastName());
console.log(RandomDataUtil.getFirstName());
    console.log(RandomDataUtil.getlastName());
console.log(RandomDataUtil.getFirstName());
    console.log(RandomDataUtil.getlastName());
    console.log(RandomDataUtil.getFirstName());
    console.log(RandomDataUtil.getlastName());
    console.log(RandomDataUtil.getRandomAddress())
    });
