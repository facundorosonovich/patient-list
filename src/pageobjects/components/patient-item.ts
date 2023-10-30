import {Locator} from "@playwright/test";

export class PatientItem {

    private readonly container: Locator

    private readonly cells: Locator
    public readonly name: Locator
    public readonly indication: Locator
    public readonly age: Locator
    public readonly creationDate: Locator
    private readonly actionsButton: Locator
    private readonly editPatientButton: Locator
    private readonly deletePatientButton: Locator

    constructor(container: Locator) {
        this.container = container
        this.cells = this.container.locator('td')
        this.name = this.cells.nth(0)
        this.indication = this.cells.nth(1)
        this.age = this.cells.nth(2)
        this.creationDate = this.cells.nth(3)
        this.actionsButton = this.cells.locator('[id*="menu-button"]')
        this.editPatientButton = this.cells.nth(4).locator('div button').first()
        this.deletePatientButton = this.cells.nth(4).getByRole('menuitem', {name: 'Delete'})
    }

    async editPatient() {
        await this.actionsButton.click()
        await this.editPatientButton.click()
    }

    async deletePatient() {
        await this.actionsButton.click()
        await this.deletePatientButton.click()
    }

}