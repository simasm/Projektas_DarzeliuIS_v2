package smokeTests;

import generalMethods.GeneralMethods;
import org.testng.annotations.Test;
import smokeTestPages.CheckIfAllUsersPagesLoad;

public class CheckIfKindergartenSpecialistPagesWork extends GeneralMethods {

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
    public void openAndAssertAllSpecialistPages() {
        logInUi(managerLogins, managerLogins);

        // check if Darzeliu sarasas page loads
        verifyIfManagerIsLoggedIn();
        CheckIfAllUsersPagesLoad checkPages = new CheckIfAllUsersPagesLoad(driver);
        checkPages.assertDarzeliuSarasasPageTitle();

        // check if Prasymu eile loads
        clickNavButtonApplicationQueue();
        checkPages.assertPrasymuEilePageTitle();

        // check if Prasymu statistika page loads
        checkPages.clickNavPrasymuStatistikaSpecialist();
        checkPages.assertPrasymuStatistikaPageTitle();

        // check if Mano paskyra page loads
        clickNavButtonSpecialistMyAccount();
        assertThatMyAccountPageHasLoaded();

        logOutUi();
    }
}
