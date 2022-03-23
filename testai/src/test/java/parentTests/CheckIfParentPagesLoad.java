package parentTests;

import generalMethods.GeneralMethods;
import org.testng.annotations.Test;
import smokeTestPages.CheckIfAllUsersPagesLoad;

public class CheckIfParentPagesLoad extends GeneralMethods {

    /**
     * Test scenario:
     * Open all parent/ guardian pages to check if everything loads successfully.
     * <p>
     * Preconditions:
     * User "user@user.lt" is already created. User is not logged in.
     * <p>
     * Test steps:
     * 1. Login
     * 2. Check all pages (click and assert page titles)
     * 3. Logout
     */

    @Test(groups = "smoke")
    public void openAndAssertAllParentPages() {
        logInUi(parentLogIn, parentLogIn);

        // check if Mano prasymai page loads
        CheckIfAllUsersPagesLoad checkPages = new CheckIfAllUsersPagesLoad(driver);
        checkPages.assertManoPrasymaiPageTitle();

        // check Prasymas del registracijos page
        clickNavButtonNewApplication();
        clickDrpDnButtonRegistration();
        checkPages.assertPrasymasRegistracijaiPageLoaded();

        // check Prasymas del kompensacijos page
        clickNavButtonNewApplication();
        clickDrpDnButtonCompensation();
        checkPages.assertPrasymasKompensacijaiPageLoaded();

        // check Mano pazymos page
        clickNavButtonMyDocumentsParent();
        assertThatMyDocumentsPageLoaded();

        // check Prasymu statistika page
        checkPages.clickNavPrasymuStatistikaParent();
        checkPages.assertPrasymuStatistikaPageTitle();

        // check Mano paskyra page
        clickNavButtonMyAccountParent();
        assertThatMyAccountPageHasLoaded();

        logOutUi();
    }
}
