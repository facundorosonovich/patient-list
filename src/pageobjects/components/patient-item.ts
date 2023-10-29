import {Locator} from "@playwright/test";

export class PatientItem {

    private readonly container: Locator

    private readonly cells: Locator
    public readonly name: Locator
    public readonly indication: Locator
    public readonly age: Locator
    public readonly creationDate: Locator

    constructor(container: Locator) {
        this.container = container
        this.cells = this.container.locator('td')
        this.name = this.cells.nth(0)
        this.indication = this.cells.nth(1)
        this.age = this.cells.nth(2)
        this.creationDate = this.cells.nth(3)
    }
}