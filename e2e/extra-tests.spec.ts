import { expect, test } from "@playwright/test";
import {HomePage} from "../src/pageobjects/pages/home-page";

test("Order patients by age", async ({ page}) => {

    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.patientList.orderByAge()

    const ages = []
    const patients = await homePage.patientList.getPatients()

    const count = await patients.count();
    // Storing all ages in an array to check if its sorted
    for (let i = 0; i < count; ++i) {
        const patient = await homePage.getPatientByIndex(i)
        const patientAge = Number(await patient.age.textContent())
        ages.push(patientAge)
    }

    const isSorted = arr => arr.every((v,i,a) => !i || a[i-1] <= v);
    expect(isSorted(ages)).toBeTruthy()
})

