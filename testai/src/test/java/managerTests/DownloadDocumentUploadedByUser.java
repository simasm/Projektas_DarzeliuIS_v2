package managerTests;

import generalMethods.GeneralMethods;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.filter.log.ResponseLoggingFilter;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;
import managerPages.DocumentPage;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.Test;

import java.io.IOException;
import java.time.Duration;
import java.util.Arrays;
import java.util.HashMap;

import static generalMethods.ApiAdminMethods.createNewUser;
import static generalMethods.ApiAdminMethods.deleteUser;
import static generalMethods.ApiGeneralMethods.logInApi;
import static generalMethods.ApiGeneralMethods.logOutApi;
import static org.hamcrest.Matchers.equalTo;
import static org.testng.Assert.assertEquals;

public class DownloadDocumentUploadedByUser extends GeneralMethods {
    /**
     * Test steps:
     * Setup -
     * Log in as ADMIN.
     * Create new USER for this test.
     * Log out.
     * Log in as USER.
     * Upload document.
     * Log out.
     * ----------
     * Log in as MANAGER
     * Navigate to 'Pažymos' page
     * Download document uploaded in earlier step.
     * Assert document was downloaded.
     * Delete uploaded document.
     * Log out.
     * ----------
     * Teardown -
     * Log in as ADMIN.
     * Delete USER created for this test.
     * Log out.
     */

    @Test (groups = "regression", priority = 2)
    public void successfullyDownloadPdfAsManager() throws IOException {

        RequestSpecification reqSpec = new RequestSpecBuilder().
                setBaseUri("https://sextet.akademijait.vtmc.lt/test-darzelis/").
                setContentType(ContentType.JSON).
                addFilters(Arrays.asList(new RequestLoggingFilter(), new ResponseLoggingFilter())).
                build();

        // Create new USER for this test.
        HashMap<String, Object> user = new HashMap<>();
        user.put("email", "andriusd@andrius.lt");
        user.put("name", "Andrius");
        user.put("password", "andriusd@andrius.lt");
        user.put("role", "USER");
        user.put("surname", "Andriulis");
        user.put("username", "andriusd@andrius.lt");

        logInApi("admin@admin.lt", "admin@admin.lt", reqSpec);
        createNewUser(user, reqSpec).
                then().
                contentType("text/plain; charset=UTF-8").
                statusCode(201).
                body(equalTo("Naudotojas sukurtas sėkmingai!"));
        logOutApi(reqSpec);

        // Upload document as USER.
        logInUi("andriusd@andrius.lt", "andriusd@andrius.lt");
        clickNavButtonMyDocumentsParent();
        assertThatMyDocumentsPageLoaded();
        uploadPDF();
        logOutUi();

        // Download document as MANAGER.
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(3));
        DocumentPage documentPage = new DocumentPage(driver);

        logInUi("manager@manager.lt", "manager@manager.lt");
        wait.until(ExpectedConditions.elementToBeClickable(documentPage.buttonPazymos));
        documentPage.clickButtonPazymos();
        wait.until(ExpectedConditions.elementToBeClickable(documentPage.buttonDownload));
        documentPage.clickButtonDownload();
        wait.until(ExpectedConditions.elementToBeClickable(documentPage.buttonDelete));
        documentPage.clickButtonDelete();
        wait.until(ExpectedConditions.elementToBeClickable(documentPage.buttonConfirmDelete));
        documentPage.clickButtonConfirmDelete();
        wait.until(ExpectedConditions.elementToBeClickable(documentPage.buttonConfirmSuccessfullyDeleted));
        assertEquals(documentPage.dialogDocumentDeletedSuccessfully.getText(), "Pažyma buvo sėkmingai ištrinta", "Successfully deleted dialog message:");
        clickOkButton();
        logOutUi();


        // Delete USER created for this test.
        logInApi("admin@admin.lt", "admin@admin.lt", reqSpec);
        deleteUser("andriusd@andrius.lt", reqSpec);
        logOutApi(reqSpec);

    }
}
