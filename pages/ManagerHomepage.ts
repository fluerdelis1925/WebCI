import { Page, Locator } from '@playwright/test';

export class ManagerHomepage {

    private readonly page: Page;
    private readonly taskManagementFv: Locator;

    constructor(page: Page) {
        this.page = page;
        this.taskManagementFv = page.locator("#sidemenu li:nth-child(11)");
    }

    

    async clickTaskManagementFV()
  {
    try
    {
      await this.taskManagementFv.click();
    }
    catch (error)
    {
      console.error("Error occurred while clicking on taskManagementFv:", error);
      throw error;
    }
  }


}