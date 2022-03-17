package parentTests;

import generalMethods.GeneralMethods;
import org.testng.annotations.Test;
import parentPages.UploadMedicalDocumentPDFPage;

import java.time.Duration;

public class UploadMedicalDocumentPDF extends GeneralMethods {

    /**
     * Test scenario:
     * Upload medical document (pdf) to parent account
     * <p>
     * Preconditions:
     * admin@admin.lt is already created. New user user123@parent.lt is created during the test
     * <p>
     * Test steps:
     * 1. Log in as admin.
     * 2. Create new parent.
     * 3. Log out.
     * 4. Log in as the newly created parent.
     * 5. Go to "Mano pazymos" page.
     * 6. Upload pdf.
     * 7. Download it.
     * 8. Delete it.
     * 9. Log out.
     * 10. Log in as admin.
     * 11. Delete the test user.
     */

    @Test(groups = "regression")
    public void successfullyUploadAndDeletePDF() throws InterruptedException {
        // create test user (parent)
        uiLogInAsAdmin();
        createNewParent(2);
        logOutUi();
        logInUi(createNewUserParentEmail, createNewUserParentEmail);

        // go to "Mano pazymos" page
        clickNavButtonMyDocumentsParent();

        // assert page
        assertThatMyDocumentsPageLoaded();

        // upload document
        uploadPDF();

        // download document
        UploadMedicalDocumentPDFPage uploadDocument = new UploadMedicalDocumentPDFPage(driver);
        uploadDocument.clickDownloadDocumentButton();
        driver.manage().timeouts().scriptTimeout(Duration.ofSeconds(5));

        // delete document
        deletePDF();
        logOutUi();

        // delete the user created for this test
        uiLogInAsAdmin();
        deleteNewUser();
    }
}
