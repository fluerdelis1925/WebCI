import { Page, Locator } from '@playwright/test';
import {tasktrackerPage} from '../DealerCoordinator/tasktrackerPage'

export class DCHompage {

    private readonly page: Page;
    private readonly TaskTrackerFV: Locator;

 

    constructor(page: Page) {
        this.page = page;
        this.TaskTrackerFV = page.locator("#sidemenu li").nth(1);
        //this.Unassigned = page.locator("#myTab li").nth(0);
    }

       async clickTaskManagementFV():Promise<tasktrackerPage>{
    {
       await this.TaskTrackerFV.click();
       return new tasktrackerPage(this.page);
    }


}

}