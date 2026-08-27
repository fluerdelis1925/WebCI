import { Page, Locator } from '@playwright/test';
import {unassignedPage} from '../pages/TaskManagementFV/unassignedPage'

export class AssignAcc {

    private readonly page: Page;
    private readonly TaskElementFV: Locator;
    private readonly Unassigned: Locator;

 

    constructor(page: Page) {
        this.page = page;
        this.TaskElementFV = page.locator("#sidemenu li:nth-child(11)");
        this.Unassigned = page.locator("#myTab li").nth(0);
    }

       async TaskManagementFV():Promise<unassignedPage> {
    {
       await this.TaskElementFV.click();
       await this.Unassigned.click();
       return new unassignedPage(this.page);
    }


}

}