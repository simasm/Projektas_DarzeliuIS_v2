package managerTests;

import generalMethods.GeneralMethods;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.Test;
import smokeTestPages.CheckIfAllUsersPagesLoad;

import java.time.Duration;

public class CheckIfManagerPagesLoad extends GeneralMethods {

    /**
     * Test scenario:
     * Open all kindergarten specialist pages to check if everything loads successfully.
     * <p>
     * Preconditions:
     * User "manager@manager.lt" is already created. User is not logged in.
     * <p>
     * Test steps:
     * 1. Login
     * 2. Check all pages (click and assert page titles)
     * 3. Logout
     */


    @Test(groups = "smoke")
    public void openAndAssertAllManagerPages() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));
        logInUi(managerLogIn, managerLogIn);

        // check if Darzeliu sarasas page loads
        verifyIfManagerIsLoggedIn();
        CheckIfAllUsersPagesLoad checkPages = new CheckIfAllUsersPagesLoad(driver);
        checkPages.assertDarzeliuSarasasPageTitle();

        // check if Registraciju eile loads
        checkPages.clickNavManagerPrasymai();
        wait.until(ExpectedConditions.elementToBeClickable(checkPages.navRegistrationQueue));
        checkPages.clickNavManagerRegistrationQueue();

        checkPages.assertPrasymuEilePageTitle();

        // check if Registraciju statistika page loads
        checkPages.clickNavManagerPrasymai();
        checkPages.clickNavManagerRegistracijuStatistika();
        wait.until(ExpectedConditions.textToBe(By.xpath("//h6"), "Registracijų statistika"));

        // check if Kompensacijos page loads
        checkPages.clickNavManagerPrasymai();
        checkPages.clickNavManagerKompensacijos();
        checkPages.assertKompensacijosPageTitle();

        // check if Mano paskyra page loads
        clickNavButtonSpecialistMyAccount();
        assertThatMyAccountPageHasLoaded();

        logOutUi();
    }
}
