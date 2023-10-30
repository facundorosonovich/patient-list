import { Locator, Page } from '@playwright/test'


export class EditPatientPage {
    private readonly page: Page

    // Locators

    private readonly firstNameField: Locator
    private readonly lastNameField: Locator
    private readonly birthDateField: Locator
    private readonly indicationField: Locator
    private readonly closeButton: Locator
    private readonly saveButton: Locator

    constructor(page: Page) {
        this.page = page
        this.firstNameField = this.page.getByPlaceholder('First name')
        this.lastNameField = this.page.getByPlaceholder('Last name')
        this.birthDateField = this.page.getByLabel('Birth date*')
        this.indicationField = this.page.getByLabel('Indication*')
        this.closeButton = this.page.getByText('Close')
        this.saveButton = this.page.getByRole('button', { name: 'Save' })
    }

    async editFirstName(firstName: string) {
        await this.firstNameField.clear()
        await this.firstNameField.fill(firstName)
    }

    async editLastName(lastName: string) {
        await this.lastNameField.clear()
        await this.lastNameField.fill(lastName)
    }

    async editBirthDate(birthDate: string) {
        await this.birthDateField.clear()
        await this.birthDateField.fill(birthDate)
    }

    async editIndication(indication: string) {
        await this.indicationField.selectOption(indication);
    }

    async save() {
        await this.saveButton.click()
    }

    async close() {
        await this.closeButton.click()
    }
}