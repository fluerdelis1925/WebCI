import { Page, Locator } from '@playwright/test';

export class AssignAcc {

    private readonly page: Page;
    private readonly TaskElementFV: Locator;
    private readonly searchBar: Locator;
    private readonly TaskElementPV: Locator;
 

    constructor(page: Page) {
        this.page = page;
        this.TaskElementFV = page.locator("#sidemenu li:nth-child(11)");
        this.searchBar = page.getByLabel('Search:').nth(0);
     
    }

    async TaskElementFVPage(accnumber: string) {
        await this.TaskElementFV.click();
        await this.searchBar.pressSequentially(accnumber);
        const numOf = await this.page.locator("#unassigned-tb tbody tr").count();
    
       // const noFound = await this.page.locator("#unassigned-tb tbody td").textContent();

       if(numOf > 0)
       {
        console.log("wala lang")
           
       }
       else
       {
        await this.page.locator("#myTab li").nth(1).click();
       }
        // await this.page.waitForTimeout(5000);
        // console.log(await numOf.count())
        
        // console.log(noFound)
    }
}