package managerPages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import pages.AbstractObjectPage;

public class CompensationPage extends AbstractObjectPage {

    // navbar
    @FindBy(id = "navManagerApplications")
    public WebElement buttonPrasymai;

    @FindBy (id = "compensationsList")
    public WebElement navManagerKompensacijos;

    // buttons
    @FindBy (id = "btnReviewCompensations")
    public WebElement buttonPerziureti;

    @FindBy (id = "btnDownloadCompensations")
    public WebElement buttonAtsisiusti;

    @FindBy (id = "btnDeleteCompensation")
    public WebElement buttonIstrinti;

    @FindBy (xpath = "//button[text()='Atgal']")
    public WebElement buttonAtgal;

    @FindBy (xpath = "//button[@class='swal-button swal-button--confirm swal-button--danger']")
    public WebElement buttonConfirmDelete;

    // clicks

    public void clickPerziureti() {
        buttonPerziureti.click();
    }

    public void clickAtsisiusti() {
        buttonAtsisiusti.click();
    }

    public void clickIstrinti() {
        buttonIstrinti.click();
    }

    public void clickConfirmDelete() {
        buttonConfirmDelete.click();
    }

    public void clickButtonPrasymai() {
        buttonPrasymai.click();
    }

    public void clickNavManagerKompensacijos() {
        navManagerKompensacijos.click();
    }

    public void clickAtgal() {
        buttonAtgal.click();
    }


    // constructor
    public CompensationPage(WebDriver driver) {
        super(driver);
    }
}
