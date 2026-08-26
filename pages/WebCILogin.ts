import { Page, Locator } from '@playwright/test';

export class LoginWebCi {

    private readonly EmailAdd: Locator;
    private readonly Pass: Locator;
    private readonly LoginBtn: Locator;

    constructor(page: Page) {
        this.EmailAdd = page.locator("#floatingEmailInput");
        this.Pass = page.locator("#floatingPasswordInput");
        this.LoginBtn = page.getByRole('button', { name: 'Sign in' });
    }

    async loginAcc(email: string, pass: string) {
        await this.EmailAdd.clear();
        await this.EmailAdd.fill(email);

        await this.Pass.clear();
        await this.Pass.fill(pass);

        await this.LoginBtn.click();
    }
}