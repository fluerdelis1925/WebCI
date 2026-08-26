import { Page, Locator } from '@playwright/test';

export class unassignedPage {

    private readonly page: Page;
    private readonly searchBar: Locator;

 

    constructor(page: Page) {
        this.page = page;
        this.searchBar = page.getByLabel('Search:').nth(0);
     
    }

    async TaskElementFVPage(accnumber: string) {
        await this.searchBar.pressSequentially(accnumber);
 
}
}