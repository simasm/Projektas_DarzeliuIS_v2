package parentTests;

import generalMethods.GeneralMethods;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.filter.log.ResponseLoggingFilter;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;
import managerPages.CreateAndDeleteNewKindergartenPage;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;
import pages.LoginPage;
import parentPages.MyApplicationsPage;

import java.io.IOException;
import java.time.Duration;
import java.util.Arrays;

import static generalMethods.ApiGeneralMethods.logInApi;
import static generalMethods.ApiGeneralMethods.logOutApi;
import static generalMethods.ApiManagerMethods.*;

public class ApplyToKindergarten extends GeneralMethods {

    /**
     * Test scenario:
     * Fill in and submit application to a kindergarten. Confirm queues. Download contract.
     * Delete the submitted application after.
     * <p>
     * Test steps:
     * 1. MANAGER checks if registration is open. If it's closed, opens it for the test. Logs out.
     * 2. Login as MANAGER, create a new kindergarten for this test.
     * 3. Log in as ADMIN. Create new USER for the test. Log out.
     * 4. Log in as the newly created USER.
     * 5. USER fills in application. User information is stored in parentAndChildDetails.txt file.
     * 6. MANAGER logs in, closes application process, processes queues, confirms queues. Logs out.
     * 7. USER logs in, checks if notification about end of admittance is displayed.
     * 8. USER downloads contract.
     * 9. USER deletes the application.
     * 7. MANAGER deletes kindergarten, ADMIN deletes USER created for this test.
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
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));

        // check if registration is open; if not - open it;
        logInApi("manager@manager.lt", "manager@manager.lt", reqSpec);
        if(!isRegistrationActive(reqSpec)) {
            openRegistration(reqSpec);
        }
        logOutApi(reqSpec);

        // create kindergarten for this test
        successfullyCreateNewKindergarten();
        logOutUi();

        // log in as ADMIN and create new USER for this test
        waitForLoginToLoad();
        LoginPage loginPage = new LoginPage(driver);
        loginPage.enterUsername(adminLogIn);
        loginPage.enterPassword(adminLogIn);
        userNotLoggedInPopUp();
        createNewParent(2);
        logOutUi();

        // fill in the application and submit it
        logInUi(createNewUserParentEmail, createNewUserParentEmail);
        fillInTheApplication();
        applicationSuccessful();
        clickOkButton();

        // API log in manager > close registration > process queues > confirm queues > log out
        logInApi("manager@manager.lt", "manager@manager.lt", reqSpec);
        closeRegistration(reqSpec);
        processQueue(reqSpec);
        confirmQueue(reqSpec);
        logOutApi(reqSpec);

        // UI USER navigate to mano prasymai > assert notification is shown > download contract
        MyApplicationsPage myApplicationsPage = new MyApplicationsPage(driver);
        driver.navigate().refresh();
        wait.until(ExpectedConditions.elementToBeClickable(myApplicationsPage.myApplications));
        myApplicationsPage.clickBtnMyApplications();
        Assert.assertTrue(myApplicationsPage.getAlertText().contains("Eilės patvirtintos"), "Notification is displayed:");
        wait.until(ExpectedConditions.elementToBeClickable(myApplicationsPage.btnListDownloadContract));
        myApplicationsPage.clickBtnListDownloadContract();
        wait.until(ExpectedConditions.elementToBeClickable(myApplicationsPage.checkboxConfirmPersonalInfo));
        myApplicationsPage.clickCheckboxConfirmPersonalInfo();
        wait.until(ExpectedConditions.elementToBeClickable(myApplicationsPage.btnDialogDownloadContract));
        myApplicationsPage.clickBtnDialogDownloadContract();
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
        logInUi(managerLogIn, managerLogIn);
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
