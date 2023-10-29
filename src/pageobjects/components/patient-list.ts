import { Locator } from '@playwright/test'
import {PatientItem} from "./patient-item";


export class PatientList {
    private readonly container: Locator
    private readonly listHeader: Locator
    private readonly ageHeader: Locator
    private readonly patientRow: Locator



    constructor (container: Locator) {
        this.container = container
        this.listHeader = this.container.locator('thead')
        this.ageHeader = this.container.getByRole('cell', { name: 'Age' })
        this.patientRow = this.container.locator('tbody tr')
    }

    async getPatientByName(name: string) {
        return new PatientItem(this.patientRow.filter({ hasText: name }).first())
    }

    async getPatientByIndex(index: number) {
        return new PatientItem(this.patientRow.nth(index))
    }

    async getPatients() {
        return this.patientRow;
    }

    async orderByAge() {
        await this.ageHeader.click()
        await this.container.page().waitForLoadState()
    }
}