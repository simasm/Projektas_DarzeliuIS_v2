package parentPages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import pages.AbstractObjectPage;

public class MyApplicationsPage extends AbstractObjectPage {

    // nav button
    @FindBy(id = "navUserMyApplications")
    public WebElement myApplications;

    // alert at top of page
    @FindBy(xpath = "//div[@role='alert' and @class='alert alert-warning p-1']")
    public WebElement alertQueuesConfirmed;

    // button in list, download contract
    @FindBy(id = "btnDownloadApplication")
    public WebElement btnListDownloadContract;

    // dialog confirm personal info
    @FindBy (className = "swal2-checkbox")
    public WebElement checkboxConfirmPersonalInfo;

    @FindBy(xpath = "//button[text()='Atsisiųsti sutartį']")
    public WebElement btnDialogDownloadContract;


    // clicks
    public void clickBtnMyApplications() {
        myApplications.click();
    }

    public void clickBtnListDownloadContract() {
        btnListDownloadContract.click();
    }

    public void clickCheckboxConfirmPersonalInfo() {
        checkboxConfirmPersonalInfo.click();
    }

    public void clickBtnDialogDownloadContract() {
        btnDialogDownloadContract.click();
    }


    // get alert text
    public String getAlertText() {
        return alertQueuesConfirmed.getText();
    }

    // constructor
    public MyApplicationsPage(WebDriver driver) {
        super(driver);
    }
}
