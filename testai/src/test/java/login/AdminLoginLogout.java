package login;

import generalMethods.GeneralMethods;
import org.testng.annotations.Test;

public class AdminLoginLogout extends GeneralMethods {

    /**
     * Test scenario:
     * Login successfully.
     * <p>
     * Preconditions:
     * User admin@admin.lt is already created. User is not logged in.
     * <p>
     * Test steps:
     * 1. Go to login page
     * 2. Enter username and password
     * 3. Click "Prisijungti" button
     */

    @Test(groups = "smoke")
    public void successfulLoginAndLogout() {
        // login
        doLoginAsAdmin();

        // check if admin is logged in and can see the user list
        verifyIfAdminIsLoggedIn();

        // logout
        doLogout();
    }

    /**
     * Test scenario:
     * Login unsuccessfully, check if error message appears.
     * <p>
     * Preconditions:
     * User admin@admin.lt's password is not "adminNeteisingas@admin.lt".
     * <p>
     * Test steps:
     * 1. Go to login page
     * 2. Enter username and password
     * 3. Click "Prisijungti" button
     * 4. Check the error message
     */

    @Test(groups = "regression")
    public void unsuccessfulLogin() {

        // wait for the login page to load
        waitForLoginToLoad();

        //login with incorrect data
        doLogin("adminNeteisingas@admin.lt", "adminNeteisingas@admin.lt");

        // check if an error message appears
        checkErrorMessage();
    }
}
