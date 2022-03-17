package parentTests;

import generalMethods.GeneralMethods;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.Test;
import pages.LoginPage;
import parentPages.CreateNewAccPage;

import java.time.Duration;

public class CreateNewAccount extends GeneralMethods {

    /**
     * Test scenario:
     * Create new account as USER.
     * <p>
     * Test steps:
     * 1. Open login screen.
     * 2. Click "Sukurti paskyra"
     * 3. Fill all fields.
     * 4. Click "Sukurti"
     * 5. Click "Gerai" on popup.
     * 6. Log in with newly created account.
     * 7. Assert login was successful.
     */

    @Test(groups = "regression", priority = 1)
    public void createNewAccAsUser() {

        LoginPage loginPage = new LoginPage(driver);
        CreateNewAccPage newAccPage = new CreateNewAccPage(driver);
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));

        // create new account
        wait.until(ExpectedConditions.elementToBeClickable(loginPage.buttonCreateNewAcc));
        loginPage.clickButtonCreateNewAcc();

        newAccPage.inputTxtName("Arminas");
        newAccPage.inputTxtSurname("Bložė");
        newAccPage.inputTxtEmail("arminas@mail.com");
        newAccPage.inputTxtNewPassword("ASDasdASD1");
        newAccPage.inputTxtPasswordRepeat("ASDasdASD1");

        newAccPage.clickBtnCreate();
        wait.until(ExpectedConditions.elementToBeClickable(newAccPage.btnConfirmSuccessfullyCreated));
        newAccPage.clickBtnConfirmCreated();

        // log in with new account
        loginPage.enterUsername("arminas@mail.com");
        loginPage.enterPassword("ASDasdASD1");
        loginPage.clickLoginButton();
        wait.until(ExpectedConditions.textToBe(By.xpath("//h6"), "Jūs neturite pateiktų prašymų."));
        logOutUi();

        // delete user created for this test
        uiLogInAsAdmin();
        deleteNewUser();








    }
}
