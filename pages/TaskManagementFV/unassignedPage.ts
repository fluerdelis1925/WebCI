import { Page, Locator, expect } from '@playwright/test';
import { TestConfig } from '../../test.config'

export class unassignedPage {

    private readonly page: Page;
    private readonly searchBar: Locator;
    private readonly config: TestConfig;



    constructor(page: Page) {
        this.page = page;
        this.searchBar = page.getByLabel('Search:').nth(0);
        this.config = new TestConfig();


    }

    async assignAcc() {
        await this.searchBar.pressSequentially(this.config.data);

        await this.page.waitForTimeout(1000);

        const rows = this.page.locator("#unassigned-tb tbody tr");
        const rowTexts = await rows.allTextContents();

        console.log(rowTexts);

        if (!rowTexts.some(text => text.includes("No matching records found"))) {

            const assignButtons = this.page.locator("#unassigned-tb tbody tr button.set_assign");

            while (await assignButtons.count() > 0) {

                const initialCount = await assignButtons.count();
                console.log(`Remaining assignments: ${initialCount}`);
                await assignButtons.first().click();
                await this.page.locator("#type_role").selectOption("Dealer Coordinator");
                await this.page.locator("#dc_id").selectOption("MOTO, IDOL");
                await this.page.getByRole("button", { name: "Submit" }).click();

                // Hintayin na mabawasan ang available Assign buttons
                await expect(assignButtons).toHaveCount(initialCount - 1);
            }

            console.log("All available accounts assigned.");

        } else {
            await this.page.locator("#tab-2-tab").click();
            await this.page.getByLabel("Search:").nth(1).pressSequentially(this.config.data);

            await this.page.waitForTimeout(1000);

            const rows = this.page.locator("#pending-tb tbody tr");
            const rowTexts = await rows.allTextContents();

            console.log(rowTexts);

            const assignButtons = this.page.locator(
                "#pending-tb tbody tr button.set_assign"
            );

            const count = await assignButtons.count();

            for (let i = 0; i < count; i++) {

                const button = assignButtons.nth(i);

                console.log(`Assigning row ${i + 1} of ${count}`);

                await button.click();

                await this.page
                    .locator("#type_role")
                    .selectOption("Dealer Coordinator");

                await this.page
                    .locator("#dc_id")
                    .selectOption("MOTO, IDOL");

                await this.page
                    .getByRole("button", { name: "Submit" })
                    .click();

                // Assign → ReAssign

                await expect(button).toHaveText("ReAssign");
            }
        }
    }
}