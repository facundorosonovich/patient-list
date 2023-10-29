import { Locator, Page } from '@playwright/test'

export class InvitePage {
    private readonly page: Page

    // Locators
    private readonly patientFirstNameField: Locator
    private readonly patientLastNameField: Locator
    private readonly patientBirthDateField: Locator
    private readonly patientIndicationField: Locator
    private readonly inviteButton: Locator

    constructor(page: Page) {
        this.page = page
        this.patientFirstNameField = this.page.getByLabel('First name*')
        this.patientLastNameField = this.page.getByLabel('Last name*')
        this.patientBirthDateField = this.page.getByLabel('Birth date*')
        this.patientIndicationField = this.page.getByLabel('Indication*')
        this.inviteButton = this.page.getByRole('button', { name: 'Invite' })
    }

    async enterFirstname(firstname: string) {
        await this.patientFirstNameField.fill(firstname);
    }

    async enterLastname(lastname: string) {
        await this.patientLastNameField.fill(lastname);
    }

    async enterBirthDate(birthDate: string) {
        await this.patientBirthDateField.fill(birthDate);
    }

    async enterIndication(indication: string) {
        await this.patientIndicationField.selectOption(indication);
    }

    async invitePatient() {
        await this.inviteButton.click();
        await this.page.waitForLoadState();
    }

}