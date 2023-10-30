import { Locator, Page } from '@playwright/test'
import {PatientList} from "../components/patient-list";


export class HomePage {
    private readonly page: Page

    // Locators
    private readonly inviteNewPatientButton: Locator
    private readonly patientNameField: Locator
    private readonly patientIndicationDropdown: Locator
    private readonly patientAgeSlider: Locator
    private readonly patientListContainer: Locator
    public readonly patientDeletedNotification: Locator

    // Components
    public readonly patientList: PatientList

    constructor(page: Page) {
        this.page = page
        this.inviteNewPatientButton = this.page.getByRole('link', { name: 'Invite a new Patient' })
        this.patientNameField = this.page.getByLabel('Patient Name')
        this.patientIndicationDropdown = this.page.getByLabel('Indication')
        this.patientAgeSlider = this.page.locator('[id=slider-root-:r9]')
        this.patientListContainer = this.page.locator('div table')
        this.patientDeletedNotification = this.page.getByText('Patient deleted successfully')

        this.patientList = new PatientList(this.patientListContainer)
    }

    async goto() {
        await this.page.goto('http://localhost:5173/')
    }

    async getPatientByName(name: string) {
        return this.patientList.getPatientByName(name)
    }

    async getPatientByIndex(index: number = 0) {
        return this.patientList.getPatientByIndex(index)
    }

    async filterByName(name: string) {
        await this.patientNameField.fill(name)
    }

    async filterByIndication(indication: string) {
        await this.patientIndicationDropdown.selectOption(indication)
        await this.page.waitForLoadState()
    }

    async inviteNewPatient() {
        await this.inviteNewPatientButton.click()
        await this.page.waitForLoadState()
    }
}
