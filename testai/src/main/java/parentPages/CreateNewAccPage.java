package parentPages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import pages.AbstractObjectPage;

public class CreateNewAccPage extends AbstractObjectPage {

    // fields
    @FindBy(id = "txtName")
    public WebElement txtName;

    @FindBy(id = "txtSurname")
    public WebElement txtSurname;

    @FindBy(id = "txtEmail")
    public WebElement txtEmail;

    @FindBy(id = "txtNewPassword")
    public WebElement txtNewPassword;

    @FindBy(id = "txtNewPasswordRepeat")
    public WebElement txtNewPasswordRepeat;

    // buttons
    @FindBy(id = "???")
    public WebElement btnBack;

    @FindBy(id = "btnClean")
    public WebElement btnClean;

    @FindBy(xpath = "//button[text()='Sukurti']")
    public WebElement btnCreate;

    @FindBy (xpath = "//button[@class='swal-button swal-button--confirm']")
    public WebElement btnConfirmSuccessfullyCreated;


    // input
    public void inputTxtName(String name) {
        txtName.sendKeys(name);
    }

    public void inputTxtSurname(String surname) {
        txtSurname.sendKeys(surname);
    }

    public void inputTxtEmail(String email) {
        txtEmail.sendKeys(email);
    }

    public void inputTxtNewPassword(String password) {
        txtNewPassword.sendKeys(password);
    }

    public void inputTxtPasswordRepeat(String password) {
        txtNewPasswordRepeat.sendKeys(password);
    }

    // clicks
    public void clickBtnBack() {
        btnBack.click();
    }

    public void clickBtnClean() {
        btnClean.click();
    }

    public void clickBtnCreate() {
        btnCreate.click();
    }
    public void clickBtnConfirmCreated() {
        btnConfirmSuccessfullyCreated.click();
    }



    // constructor
    public CreateNewAccPage(WebDriver driver) {
        super(driver);
    }
}
