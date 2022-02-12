package parentTests;

import generalMethods.GeneralMethods;
import org.testng.annotations.Test;
import pages.LoginPage;
import managerPages.CreateAndDeleteNewKindergartenPage;

import java.io.IOException;

public class SubmitNewApplication extends GeneralMethods {

    /**
     * Test scenario:
     * Fill in and submit application to a kindergarten.
     * Fill in a new application with no priority points and confirm that the first child (who had more priority points) got the place and second child is in the waiting list.
     * Delete the submitted application afterwards.
     * <p>
     * Test steps:
     * 1. Login as kindergarten specialist, create a new kindergarten for this test.
     * 2. Kindergarten specialist checks if registration is open. If it's closed, user opens it for the test. Logout.
     * 3. Login as admin. New user (parent) is created for the test. Logout.
     * 4. Login as the newly created user.
     * 5. User fills in application. User information is stored in parentAndChildDetails.txt file
     * 6. Parent logs in again to delete the application
     * 7. The kindergarten and user that were used for this test are deleted.
     *
     * @throws IOException
     */

    @Test(groups = "regression", priority = 1)
    public void successfullySubmitNewApplication() throws IOException, InterruptedException {
        successfullyCreateNewKindergarten();
        logOutUi();

        waitForLoginToLoad();
        LoginPage loginPage = new LoginPage(driver);
        loginPage.enterUsername(adminLogins);
        loginPage.enterPassword(adminLogins);

        userNotLoggedInPopUp();

        // create a new user (parent) for this test
        createNewParent(2);
        logOutUi();
        logInUi(createNewUserParentEmail, createNewUserParentEmail);

        // fill in the application and submit it
        fillInTheApplication();
        applicationSuccessful();
        clickOkButton();
        logOutUi();
    }


    @Test(groups = "regression", priority = 2)
    public void deleteApplication() {

        waitForLoginToLoad();
        logInUi(createNewUserParentEmail, createNewUserParentEmail);

        clickDeleteApplication();
        waitToAgreePopUp();
        clickOkButton();
        logOutUi();

        // delete the kindergarten that was created for the test
        logInUi(managerLogins, managerLogins);
        CreateAndDeleteNewKindergartenPage createNewKindergarten = new CreateAndDeleteNewKindergartenPage(driver);
        createNewKindergarten.searchForTheNewlyCreatedKindergarten("123 Testinis");
        deleteNewKindergarten();
        logOutUi();

        // delete test user
        uiLogInAsAdmin();
        verifyIfAdminIsLoggedIn();
        deleteNewUser();
    }
}
