import { Page, Locator, expect } from '@playwright/test'
import { TestConfig } from '../../test.config'
import { RandomDataUtil } from '../../utils/RandomDataGenerator';

export class tasktrackerPage {

    private readonly page: Page;
    private readonly searchBar: Locator;
    private readonly searchBarTodo: Locator;
    private readonly searchBarOngoing: Locator;
    private readonly config: TestConfig
    private readonly TodoLink: Locator;
    private readonly OngoingClick: Locator;


    constructor(page: Page) {
        this.page = page;
        this.searchBar = page.getByLabel('Search:').nth(0);
        this.searchBarTodo = page.getByLabel('Search:').nth(1);
        this.searchBarOngoing = page.getByLabel('Search:').nth(2);
        this.config = new TestConfig();
        this.TodoLink = page.locator("#myTab li").nth(1);
        this.OngoingClick = page.locator("#myTab li").nth(2);
    }

    async TaskTrackerFV() {
        await this.searchBar.fill(this.config.data);
        await this.page.waitForTimeout(1000);

        const rows = this.page.locator("#pending-tb tbody tr");
        const assignButtons = this.page.locator(
            "#pending-tb tbody tr button.set_todo"
        );

        const rowTexts = await rows.allTextContents();
        console.log(rowTexts);

        if (rowTexts.some(text => text.includes("No matching records found"))) {
            console.log("No matching records found -> endingPage");
            await this.pendingPage();
            return;
        }

        while (await assignButtons.count() > 0) {
            const initialCount = await assignButtons.count();

            console.log(`Remaining assignments: ${initialCount}`);

            // IMPORTANT: dialog listener BEFORE click
            this.page.once('dialog', async dialog => {
                console.log("Dialog:", dialog.message());
                await dialog.accept();
            });

            // Click Accept
            await assignButtons.first().click();

            // Wait until the accepted row/button disappears
            await expect(assignButtons).toHaveCount(initialCount - 1);
           
        }
         await this.pendingPage();
            return;
    }


    async pendingPage() {

        console.log("for todo page")
        await this.TodoLink.click();
        await this.searchBarTodo.pressSequentially(this.config.data)

        await this.page.waitForTimeout(1000);

        const rows = this.page.locator("#todo-tb tbody tr");
        const rowTexts = await rows.allTextContents();
        console.log(rowTexts);
        const startVeriBtn = this.page.locator("#todo-tb tbody tr button.set_ongoing");

        if (rowTexts.some(text => text.includes("No matching records found"))) {
            console.log("No matching records found ->Ongoing Page")
            await this.OngoingPage();
            return;
        }
        console.log(await startVeriBtn.count());
        while (await startVeriBtn.count() > 0) {
            const initialCount = await startVeriBtn.count();
            console.log(`number of for Todo: ${initialCount}`);

            // IMPORTANT: dialog listener BEFORE click
            this.page.once('dialog', async dialog => {
                console.log("Dialog:", dialog.message());
                await dialog.accept();
            });

            // Click Accept
            await startVeriBtn.first().click();

            // Wait until the accepted row/button disappears
            await expect(startVeriBtn).toHaveCount(initialCount - 1);
           

        }
         await this.OngoingPage();
            return;
    }

    async OngoingPage() {
    await this.OngoingClick.click();
    await this.searchBarOngoing.pressSequentially(this.config.data);
    await this.page.waitForTimeout(1000);

    const rows = this.page.locator("#ongoing-tb tbody tr");
    const rowTexts = await rows.allTextContents();

    console.log(rowTexts);

    const FillFormBtn = this.page.locator(
        "#ongoing-tb_wrapper tbody tr a.btn-outline-success"
    );

    if (rowTexts.some(text => text.includes("No matching records found"))) {
        console.log("Hindi mahanap !");
        return;
    }

    if (rowTexts.some(text => text.includes("FEV"))) {

        console.log("FEV found");

        await FillFormBtn.first().click();
        await this.FillFormFEV();

        // balik sa Ongoing at check ulit
        await this.OngoingPage();

        return;

    } else if (rowTexts.some(text => text.includes("FRV"))) {

        console.log("FRV found");

        await FillFormBtn.first().click();
        await this.FillFormFRV();

        return;
    }
}

    async FillFormFEV()
    {

        await this.page.locator("#interviewYes").check();
        await this.page.locator("#resultSelect").selectOption("FAVORABLE");
        await this.page.locator("#subcategoryFavorable").selectOption("Full Verification");
        await this.page.getByRole('button', {name: 'Next'}).click();
        await this.page.locator("#dateOfHire").pressSequentially("01/02/2016");
        await this.page.locator("#employeeRank").selectOption("Manager");
        await this.page.locator("#employmentStatus").selectOption("Regular");
        await this.page.locator("#positionDesignation").fill("Manager");
        await this.page.locator("#monthlyIncome").fill("150000");
        await this.page.locator("#derogatoryRecords").selectOption("No");
        await this.page.locator("#employmentResult").selectOption("Employed");
        await this.page.locator("#informant").fill(RandomDataUtil.getFullName())
        await this.page.locator("#informantPosition").selectOption("Supervisor");
        await this.page.getByRole('button', {name: 'Next'}).click();
        await this.page.locator("#visitedAdd").selectOption("Yes")
        await this.page.locator("#contactNumber").fill(RandomDataUtil.getPhoneNumber());
        await this.page.locator("#assignedCompany").fill("Company Test");
        await this.page.locator("#assignedCompanyAddress").fill(RandomDataUtil.getRandomCountry());
        await this.page.locator("#visitedAddAssigned").selectOption("Yes")
        await this.page.locator("#contactNumberAssigned").fill(RandomDataUtil.getPhoneNumber())
        await this.page.locator("#natureOfBusiness").fill("Others");
        await this.page.locator("#lengthOfOperation").fill("15");
        await this.page.locator("#classification").selectOption("Commercial")
        await this.page.locator("#otherDescription").fill("None")
        await this.page.getByRole('button', {name: 'Next'}).click();
        await this.page.locator("select[name='knownParty1']").selectOption("HR/Admin/Owner");
        await this.page.locator("select[name='knownHR']").selectOption("Yes");
        await this.page.locator("input[name='informantHR']").fill(RandomDataUtil.getFullName());
        await this.page.locator("input[name='contactHR']").fill(RandomDataUtil.getPhoneNumber());
        await this.page.locator("input[name='commentsHR']").fill("Lorem ipsum");

        await this.page.locator("select[name='knownParty2']").selectOption("Co-Worker");
        await this.page.locator("select[name='knownSupervisor']").selectOption("Yes");
        await this.page.locator("input[name='informantSupervisor']").fill(RandomDataUtil.getFullName());
        await this.page.locator("input[name='contactSupervisor']").fill(RandomDataUtil.getPhoneNumber());
        await this.page.locator("input[name='commentsSupervisor']").fill("Lorem ipsum");

      await this.page.locator("select[name='agreedSelfie']").selectOption("Yes");
           await this.page.locator("input[name='otherRemarks']").fill("Lorem ipsum");
              await this.page.getByRole('button', {name: 'Next'}).click();


const uploadFields = [
    "#buildingPhoto",
    "#roadPhotoLeft",
    "#roadPhotoRight",
    "#businessDocuments",
    "#officePhoto",
    "#selfieClient",
    "#selfieInformantOne",
    "#selfieInformantTwo",
    "#googleMap"
];

for (const field of uploadFields) {
    await this.page.locator(field).setInputFiles("upload/small_size.jpg");
}

await this.page.getByRole('button', { name: 'Submit' }).click();



    }

  async FillFormFRV()
    {

        console.log("FRV page")
        await this.page.locator("#interviewYes").check();
        await this.page.locator("#resultSelect").selectOption("FAVORABLE");
        await this.page.locator("#subcategoryFavorable").selectOption("Full Verification");
        await this.page.getByRole('button',{name: 'Next'}).click();        
        await this.page.locator("#borrowerDOB").fill("2000-02-12");
        await this.page.locator("#borrowerAge").fill("26");
        await this.page.locator("#borrowerAge").fill("26");
        await this.page.locator("#civilStatus").selectOption("Single")
        await this.page.locator("#borrowerEmail").fill(RandomDataUtil.getEmail());
        await this.page.locator("#borrowerContact").fill(RandomDataUtil.getPhoneNumber());
        await this.page.locator("#informantName").fill(RandomDataUtil.getFullName());
        await this.page.locator("#informantRelationship").selectOption("Relative");
        await this.page.getByRole('button',{name: 'Next'}).click();   


        await this.page.locator("#sameAddress").check();
        await this.page.locator("#lengthOfStay").fill("20");
        await this.page.locator("#ownershipType").selectOption("Owned");
        await this.page.locator("#lessorName").fill(RandomDataUtil.getFullName());
        await this.page.locator("#monthlyRental").fill("0");
        await this.page.locator("#mortgageTo").fill("0");
        await this.page.locator("#monthlyAmort").fill("0");
        await this.page.getByRole('button', {name: 'Next'}).click();

        //RESIDENCE VERIFICATION
        await this.page.locator("#houseDescription").fill("Lorem ipsum");
        await this.page.locator("#generalAppearance").selectOption("Good");
        await this.page.locator("#garageYes").check();
        await this.page.locator("#parkingYes").check();
        await this.page.locator("#livingCondition").selectOption("High Income");
        await this.page.getByRole("button", {name: 'Next'}).click();

        //SOURCE OF INCOME
         await this.page.getByRole("button", {name: 'Next'}).click();

        //  MEMBERSHIP
          await this.page.locator("#coopNo").check();
          await this.page.locator("input[name='coopName']").fill("N/A");
          await this.page.locator("input[name='coopAddress']").fill("N/A");
          await this.page.locator("input[name='coopOfferings']").fill("N/A");
          await this.page.locator("textarea[name='coopRemarks']").fill("N/A");
          await this.page.locator('input[name="numMotorbikes"]').pressSequentially('1');
          await this.page.locator("select[name='motorbikeStatus']").selectOption("Still in use");
          await this.page.locator("input[name='motorPurpose']").fill("Test");
          await this.page.locator("#userApplicant").check();
          await this.page.locator("#lipNo").check();
          await this.page.locator("#parentsNo").check();
          await this.page.locator("input[name='childAge']").fill("1");
          await this.page.locator("#childWorkNo").check();
          await this.page.locator("input[name='downPaymentBy']").fill("Borrower");
          await this.page.locator("input[name='monthlyAmortBy']").fill("Borrower");
          await this.page.getByRole("button", {name: 'Next'}).click();

          //NEIGHBORHOOD CHECKING
          await this.page.locator("#resultNeighborHood").selectOption("Living")
          await this.page.locator("#classification").selectOption("Residential")
          await this.page.locator("#floodedArea").selectOption("No")
          await this.page.locator("#greyArea").selectOption("No")
          await this.page.locator("#otherDescription").pressSequentially("Lorem Ipsum");
          await this.page.locator("#otherDescription").pressSequentially("Lorem Ipsum");
          await this.page.getByRole("button", {name: 'Next'}).click();

         // 3RD PARTY CHECKINGS
         await this.page.locator("select[name='knownParty1']").selectOption("Neighbors");
         await this.page.locator("select[name='neighbor1Known']").selectOption("Yes");
         await this.page.locator("input[name='neighbor1Informants']").fill(RandomDataUtil.getFullName());
         await this.page.locator("input[name='neighbor1Contact']").fill(RandomDataUtil.getPhoneNumber());
         await this.page.locator("input[name='neighbor1CreditHistory']").fill("N/A");
         await this.page.locator("select[name='neighbor1WitnessedCollectors']").selectOption("Yes");
         await this.page.locator("input[name='neighbor1Comments']").fill("Test");

         await this.page.locator("select[name='knownParty2']").selectOption("Neighbors");
         await this.page.locator("select[name='neighbor2Known']").selectOption("Yes");
         await this.page.locator("input[name='neighbor2Informants']").fill(RandomDataUtil.getFullName());
         await this.page.locator("input[name='neighbor2Contact']").fill(RandomDataUtil.getPhoneNumber());
         await this.page.locator("input[name='neighbor2CreditHistory']").fill("N/A");
         await this.page.locator("select[name='neighbor2WitnessedCollectors']").selectOption("Yes");
         await this.page.locator("input[name='neighbor2Comments']").fill("Test");
         await this.page.locator("select[name='brgySelfieAgreed']").selectOption("Yes")
         await this.page.locator("textarea[name='otherRemarks']").fill("Lorem Ipsum")
         await this.page.getByRole("button", {name: 'Next'}).click();


         //PICTURES
        const uploadFields = [
    "housePhoto",
    "parkingAreaPhoto",
    "roadLeftPhoto",
    "roadRightPhoto",
    "insideHouseFirstPhoto",
    "insideHouseSecondPhoto",
    "brgyHallFrontPhoto",
    "selfieBrgyInformantPhoto",
    "selfieClientPhoto",
    "selfieClientPhoto",
    "selfieInformantFirstPhoto",
    "selfieInformantSecondPhoto",
    "selfieInformantSecondPhoto",
    "googleMapPhoto",
    "clientValidIdFirstPhoto",
    "clientValidIdSecondPhoto",
    "proofBillingPhoto",
];

for (const field of uploadFields) {
    await this.page
        .locator(`input[name="${field}"]`)
        .setInputFiles("upload/small_size.jpg");
}

await this.page.getByRole('button', { name: 'Submit' }).click();
await this.page.waitForTimeout(90000);

    }
}