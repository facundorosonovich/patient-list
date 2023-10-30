import {Locator, Page} from "@playwright/test";

export class DeletePatientPage {

    private readonly page: Page
    private readonly cancelButton: Locator
    private readonly deleteButton: Locator

    constructor(page: Page) {
        this.page = page
        this.cancelButton = this.page.getByRole('button', { name: 'Cancel' })
        this.deleteButton = this.page.getByRole('button', { name: 'Delete' })
    }

    async confirmPatientDeletion() {
        await this.deleteButton.click()
        await this.page.waitForLoadState()
    }


}