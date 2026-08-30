import { Page, Locator } from '@playwright/test';
import { TestConfig } from '../../test.config'

export class TodoPage {

    private readonly page: Page;
    private readonly searchBarTodo: Locator;
    private readonly config: TestConfig

 

    constructor(page: Page) {
        this.page = page;
         this.searchBarTodo = page.getByLabel('Search:').nth(1);
         this.config = new TestConfig();
        //this.Unassigned = page.locator("#myTab li").nth(0);
    }

       async TodoStartVerification(){
    {
       await this.searchBarTodo.pressSequentially(this.config.data)
    }


}

}