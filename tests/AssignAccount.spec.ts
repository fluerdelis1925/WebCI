import { test, expect, Page} from '@playwright/test';
import {TestConfig} from '../test.config'
import { LoginWebCi } from '../pages/WebCILogin';
import {AssignAcc} from '../pages/AssignAccount'
import {ManagerHomepage} from '../pages/ManagerHomepage'
import {unassignedPage} from '../pages/TaskManagementFV/unassignedPage'
import {RandomDataUtil} from '../utils/RandomDataGenerator';


  let config: TestConfig;
  let loginWebCi: LoginWebCi;
  let unassignedpage: unassignedPage;
  let Managerhomepage: ManagerHomepage;

test.beforeEach(async ({ page }) => {
  config = new TestConfig(); 
  await page.goto(config.webCIurl);

   loginWebCi = new LoginWebCi(page);
   Managerhomepage = new ManagerHomepage(page);
   unassignedpage = new unassignedPage(page);

});

test.afterEach(async ({ page }) => {
    // await page.waitForTimeout(3000); 
    await page.pause()
    await page.close(); 
});


test('Assign Test data', async () => {


    await loginWebCi.loginAcc(config.email, config.password);
    await Managerhomepage.clickTaskManagementFV();
    await unassignedpage.TaskElementFVPage("10000192500ds00102")


  
    });
