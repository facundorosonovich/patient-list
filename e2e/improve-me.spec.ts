import { test, expect } from "@playwright/test";
import {HomePage} from "../src/pageobjects/pages/home-page";


test.describe("Patients", () => {
  const patients = [
    {
      name: 'Laurence Fournier',
      indication: 'Post TAVI',
      age: '21',
      creationDate: '3/12/2023'
    },
    {
      name: 'Françoise Fournier',
      indication: 'Post PVC Ablation',
      age: '31',
      creationDate: '3/18/2023'
    },
    {
      name: 'Clotilde Sanchez',
      indication: 'Palpitations',
      age: '38',
      creationDate: '1/25/2023'
    }
  ];

  patients.forEach((people) => {
    test(`List should have patient ${people.name}`, async ({ page }) => {

      const expectedName = people.name.toString();
      const expectedIndication = people.indication.toString();
      const expectedAge = people.age.toString();
      const expectedCreationDate = people.creationDate.toString();

      const homePage = new HomePage(page);
      await homePage.goto();

      const patient = await homePage.getPatientByName(expectedName)

      await expect(patient.name).toHaveText(expectedName);
      await expect(patient.indication).toHaveText(expectedIndication);
      await expect(patient.age).toHaveText(expectedAge);
      await expect(patient.creationDate).toHaveText(expectedCreationDate);
    });
  });
});

test.describe("Filters", () => {
  test("Should filter by patient name", async ({ page }) => {

    const expectedSubstring = 'rou'
    const expectedPatientsCount = 3;
    const homePage = new HomePage(page);
    await homePage.goto();

    await homePage.filterByName(expectedSubstring)

    const patientsCount = await homePage.patientList.getPatients()
    await expect(patientsCount).toHaveCount(expectedPatientsCount)

    for (let i = 0; i < patientsCount ; i++ ) {
      const patient = await homePage.getPatientByIndex(i)
      await expect(patient.name).toContainText(expectedSubstring)
    }
  });

  test("Should filter by indication", async ({ page }) => {

    const expectedIndication = 'Palpitations';
    const expectedPatientsCount = 10;
    const homePage = new HomePage(page);
    await homePage.goto();

    await homePage.filterByIndication(expectedIndication)

    const patientsCount = await homePage.patientList.getPatients()
    await expect(patientsCount).toHaveCount(expectedPatientsCount)

    for (let i = 0; i < expectedPatientsCount ; i++ ) {
      const patient = await homePage.getPatientByIndex(i)
      await expect(patient.indication).toHaveText(expectedIndication)
    }
  });
});
