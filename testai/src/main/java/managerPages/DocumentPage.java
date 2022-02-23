package managerPages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import pages.AbstractObjectPage;

public class DocumentPage extends AbstractObjectPage {

    // navbar
    @FindBy(linkText = "Pažymos")
    public WebElement buttonPazymos;

    // dialogs
    @FindBy(xpath = "//div[@class='swal-text']")
    public WebElement dialogDocumentDeletedSuccessfully;

    @FindBy (xpath = "//button[@class='swal-button swal-button--confirm']")
    public WebElement buttonConfirmSuccessfullyDeleted;

    // buttons
    @FindBy (xpath = "//button[text()='Ištrinti']")
    public WebElement buttonDelete;

    @FindBy (xpath = "//button[@class='swal-button swal-button--confirm swal-button--danger']")
    public WebElement buttonConfirmDelete;

    @FindBy (xpath = "//button[@class='btn btn-primary btn-sm btn-block']")
    public WebElement buttonDownload;

    // clicks
    public void clickButtonDelete() {
        buttonDelete.click();
    }

    public void clickButtonConfirmDelete() {
        buttonConfirmDelete.click();
    }

    public void clickButtonDownload() {
        buttonDownload.click();
    }

    public void clickButtonPazymos() {
        buttonPazymos.click();
    }

    // constructor
    public DocumentPage(WebDriver driver) {
        super(driver);
    }
}
