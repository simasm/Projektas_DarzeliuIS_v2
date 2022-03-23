package parentPages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import pages.AbstractObjectPage;

public class UploadMedicalDocumentPDFPage extends AbstractObjectPage {

    // buttons
    @FindBy(id = "btnUploadDocument")
    public WebElement buttonUploadDocument;

    @FindBy(id = "inputUploadDocument")
    public WebElement inputUploadDocument;

    @FindBy (xpath = "//button[text()='Įkelti']")
    public WebElement buttonIkelti;

    @FindBy(xpath = "//*/div[3]//button")
    public WebElement buttonDownloadDocument;

    @FindBy(xpath = "//button[text()='Ištrinti']")
    public WebElement buttonDeleteDocument;

    public void clickUploadDocumentButton() {
        buttonUploadDocument.click();
    }

    public void clickDownloadDocumentButton() {
        buttonDownloadDocument.click();
    }

    public void clickButtonIkelti() {
        buttonIkelti.click();
    }

    public void clickDeleteDocumentButton() {
        buttonDeleteDocument.click();
    }

    // constructor
    public UploadMedicalDocumentPDFPage(WebDriver driver) {
        super(driver);
    }

}
