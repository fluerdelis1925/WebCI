import { Page, Locator } from '@playwright/test';

export class AssignAcc {

    private readonly TaskElementFV: Locator;
    private readonly TaskElementPV: Locator;
 

    constructor(page: Page) {
        this.TaskElementFV = page.locator("#sidemenu li:nth-child(11)");
     
    }

    async TaskElementFVPage() {
        await this.TaskElementFV.click();
    
    }
}