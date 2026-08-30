import { test, expect, Page} from '@playwright/test';
import {TestConfig} from '../test.config'
import { LoginWebCi } from '../pages/WebCILogin';
import {DCHompage} from '../pages/DealerCoordinator/dchomepage'
import {tasktrackerPage} from '../pages/DealerCoordinator/tasktrackerPage'


  let config: TestConfig;
  let loginWebCi: LoginWebCi;
  let DChompage: DCHompage;
  let tasktrackerpage: tasktrackerPage;

test.beforeEach(async ({ page }) => {
  config = new TestConfig(); 
  await page.goto(config.dealerCoorPage);

   loginWebCi = new LoginWebCi(page);
   DChompage = new DCHompage(page);
   tasktrackerpage = new tasktrackerPage(page);

});

test.afterEach(async ({ page }) => {
    // await page.waitForTimeout(3000); 
    await page.pause()
    await page.close(); 
});


test('Assign Test data', async () => {


    await loginWebCi.loginAcc(config.DCemail, config.DCpass);
    await DChompage.clickTaskManagementFV();
    await tasktrackerpage.TaskTrackerFV();
   
    });
