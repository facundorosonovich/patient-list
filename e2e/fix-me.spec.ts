/**
 * These test cases do not work.
 *
 * Try to find what's wrong and propose a way to fix them.
 *
 */

import { expect, test } from "@playwright/test";
import {HomePage} from "../src/pageobjects/pages/home-page";
import {InvitePage} from "../src/pageobjects/pages/invite-page";

test("Should add a patient", async ({ page }) => {
  const firstName = 'Atreides'
  const lastName = 'Leto'
  const birthDate = '1980-10-10'
  const indication = 'Post TAVI'
  const homePage = new HomePage(page);
  const invitePage = new InvitePage(page)

  await homePage.goto();
  await homePage.inviteNewPatient()

  // Entering Patient information
  await invitePage.enterFirstname(firstName)
  await invitePage.enterLastname(lastName)
  await invitePage.enterBirthDate(birthDate)
  await invitePage.enterIndication(indication)
  await invitePage.invitePatient()

  // Searching for newly created patient.
  const patient = await homePage.getPatientByIndex()
  await expect(patient.name).toContainText(firstName + ' ' +  lastName)
});

// The issue with this test arose from the fact that the date of birth was set in the future,
// and the string format did not align with what the input field expected ->
// dd/mm/yyyy vs yyyy/dd/mm.

// test("should add pediatric patient", async ({ page }) => {
//   await page.goto("http://localhost:5173/");
//   await page.locator(".chakra-button").nth(1).click();
//   await page.locator(".chakra-input").nth(0).click();
//   await page.keyboard.type("Atreides");
//   await page.locator(".chakra-input").nth(1).click();
//   await page.keyboard.type("Leto");
//   await page.locator(".chakra-input").nth(2).click();
//   await page.keyboard.type("10/10/20020");
//   await page.keyboard.press("Tab");
//   await page.keyboard.press("Tab");
//   await page.keyboard.press("P");
//   await page.getByText("Invite").first().click();
//
//   await expect(page.locator("tr").nth(1)).toContainText("Atreides Leto");
// });


