import { Page, Locator } from '@playwright/test';
import {pendingPage} from '../TaskManagementFV/pendingPage'

export class unassignedPage {

    private readonly page: Page;
    private readonly searchBar: Locator;
    private readonly PendingPageLink: Locator;

 

    constructor(page: Page) {
        this.page = page;
         this.searchBar = page.getByLabel('Search:').nth(0);
         this.PendingPageLink = page.locator("#myTab li").nth(1)
      
     
    }

    async assignAcc(accnumber: string) {
        await this.searchBar.pressSequentially(accnumber);
        const numOf = await this.page.locator("#unassigned-tb tbody tr").count();
          if(numOf === 0)
       {
        console.log("assigned the acc")
           
       }
       else
       {
         
           await this.PendingPageLink.click();
           return new pendingPage(this.page);

       }
}
}