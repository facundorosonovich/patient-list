import { expect, test } from "@playwright/test";
import {HomePage} from "../src/pageobjects/pages/home-page";
import {EditPatientPage} from "../src/pageobjects/pages/edit-patient-page";
import {InvitePage} from "../src/pageobjects/pages/invite-page";
import {DeletePatientPage} from "../src/pageobjects/pages/delete-patient-page";

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

test("Edit patient", async ({page}) => {
    const firstName = 'Arian'
    const lastName = 'Fontaine'
    const patientName = firstName + ' ' + lastName
    //const birthDate = '1980-11-12'
    const indication = 'Post TAVI'
    const newIndication = 'Post PVC Ablation'


    const homePage = new HomePage(page);
    const editPage = new EditPatientPage(page)


    await homePage.goto();
    let patient = await homePage.getPatientByName(patientName)
    await expect(patient.indication).toContainText(indication)

    await patient.editPatient()

    await editPage.editIndication(newIndication)
    await editPage.save()

    patient = await homePage.getPatientByName(patientName)
    await expect(patient.indication).toContainText(newIndication)
})

test("Create and Delete", async ({page}) => {
    const firstName = 'Facundo'
    const lastName = 'Rosonovich'
    const patientName = firstName + ' ' + lastName
    const birthDate = '1998-02-04'
    const indication = 'Post PVC Ablation'

    const homePage = new HomePage(page);
    const invitePage = new InvitePage(page)
    const deletePage = new DeletePatientPage(page)


    await homePage.goto();
    await homePage.inviteNewPatient()

    // Entering Patient information
    await invitePage.enterFirstname(firstName)
    await invitePage.enterLastname(lastName)
    await invitePage.enterBirthDate(birthDate)
    await invitePage.enterIndication(indication)
    await invitePage.invitePatient()

    const patient = await homePage.getPatientByName(patientName)

    await patient.deletePatient()
    await deletePage.confirmPatientDeletion()

    await expect(homePage.patientDeletedNotification).toBeVisible()


})



