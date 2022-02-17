package parentTests;

import generalMethods.ApiManagerMethods;
import generalMethods.GeneralMethods;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.filter.log.ResponseLoggingFilter;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;
import managerPages.CreateAndDeleteNewKindergartenPage;
import org.testng.annotations.Test;
import pages.LoginPage;

import java.io.IOException;
import java.util.Arrays;

import static generalMethods.ApiGeneralMethods.logInApi;
import static generalMethods.ApiGeneralMethods.logOutApi;
import static generalMethods.ApiManagerMethods.isRegistrationActive;
import static generalMethods.ApiManagerMethods.openRegistration;

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

        RequestSpecification reqSpec = new RequestSpecBuilder().
                setBaseUri("https://sextet.akademijait.vtmc.lt/darzelis/").
                setContentType(ContentType.JSON).
                addFilters(Arrays.asList(new RequestLoggingFilter(), new ResponseLoggingFilter())).
                build();

        // check if registration is open; if not - open it;
        logInApi("manager@manager.lt", "manager@manager.lt", reqSpec);
        if(!isRegistrationActive(reqSpec)) {
            openRegistration(reqSpec);
        }
        logOutApi(reqSpec);

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

        // fill in the application and submit it
        logInUi(createNewUserParentEmail, createNewUserParentEmail);
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
