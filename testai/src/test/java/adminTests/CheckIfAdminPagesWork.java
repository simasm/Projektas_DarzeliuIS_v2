package adminTests;

import generalMethods.GeneralMethods;
import org.testng.annotations.Test;
import smokeTestPages.CheckIfAllUsersPagesLoad;

public class CheckIfAdminPagesWork extends GeneralMethods {

    /**
     * Test scenario:
     * Open all admin pages to check if everything loads successfully.
     * <p>
     * Preconditions:
     * User "admin@admin.lt" is already created. User is not logged in.
     * <p>
     * Test steps:
     * 1. Login
     * 2. Check all pages (click and assert page titles)
     * 3. Logout
     */

    @Test(groups = "smoke")
    public void openAndAssertAllAdminPages() {
        uiLogInAsAdmin();

        // check Naudotojai page
        verifyIfAdminIsLoggedIn();
        CheckIfAllUsersPagesLoad checkPages = new CheckIfAllUsersPagesLoad(driver);
        checkPages.assertNaudotojaiPageTitle();

        // check Prasymu statistika page
        checkPages.clickNavPrasymuStatistikaAdmin();
        checkPages.assertPrasymuStatistikaPageTitle();

        // check Prasymu redagavimas page
        checkPages.clickNavPrasymuRedagavimas();
        checkPages.assertPrasymuRedagavimasPageTitle();

        // check Ivykiu zurnalas page
        checkPages.clickNavIvykiuZurnalas();
        checkPages.assertIvykiuZurnalasPageTitle();

        // check Mano paskyra page
        clickNavButtonAdminMyAccount();
        assertThatMyAccountPageHasLoaded();

        logOutUi();
    }
}
