package parentPages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import pages.AbstractObjectPage;

public class ApplyForCompensationPage extends AbstractObjectPage {

    // fields - child info
    @FindBy(id = "txtChildPersonalCodeCompensation")
    public WebElement childPersonalId;

    @FindBy(id = "txtChildNameCompensation")
    public WebElement childName;

    @FindBy(id = "txtChildSurnameCompensation")
    public WebElement childSurname;

    @FindBy(xpath = "//div[@class='form']/div[5]/div/div/input")
    public WebElement childDateOfBirth;


    // fields - guardian info
    @FindBy(id = "txtGuardianNameCompensation")
    public WebElement guardianName;

    @FindBy(id = "txtGuardianSurnameCompensation")
    public WebElement guardianSurname;

    @FindBy(id = "txtGuardianIdCompensation")
    public WebElement guardianPersonalId;

    @FindBy(id = "txtGuardianPhoneCompensation")
    public WebElement guardianPhone;

    @FindBy(id = "txtGuardianEmailCompensation")
    public WebElement guardianEmail;

    @FindBy(id = "txtGuardianAddressCompensation")
    public WebElement guardianAddress;


    //fields - kindergarten info
    @FindBy(id = "txtKindergartenName")
    public WebElement kindergartenName;

    @FindBy(id = "txtKindergartenCode")
    public WebElement kindergartenCode;

    @FindBy(id = "txtKindergartenAddress")
    public WebElement kindergartenAddress;

    @FindBy(id = "txtKindergartenPhone")
    public WebElement kindergartenPhone;

    @FindBy(id = "txtKindergartenEmail")
    public WebElement kindergartenEmail;

    @FindBy(id = "txtKindergartenBankName")
    public WebElement kindergartenBankName;

    @FindBy(id = "txtKindergartenAccountNumber")
    public WebElement kindergartenAccountNumber;

    @FindBy(id = "txtKindergartenBankCode")
    public WebElement kindergartenBankCode;


    //buttons
    @FindBy(id = "btnSubmit")
    public WebElement btnSubmit;


    //input - child info
    public void inputChildPersonalId(String value) {
        childPersonalId.sendKeys(value);
    }

    public void inputChildName(String value) {
        childName.sendKeys(value);
    }

    public void inputChildSurname(String value) {
        childSurname.sendKeys(value);
    }

    public void inputChildDateOfBirth(String value) {
        childDateOfBirth.sendKeys(value);
    }


    //input - guardian info
    public void inputGuardianName(String value) {
        guardianName.sendKeys(value);
    }

    public void inputGuardianSurname(String value) {
        guardianSurname.sendKeys(value);
    }

    public void inputGuardianPersonalId(String value) {
        guardianPersonalId.sendKeys(value);
    }

    public void inputGuardianPhone(String value) {
        guardianPhone.sendKeys(value);
    }

    public void inputGuardianEmail(String value) {
        guardianEmail.sendKeys(value);
    }

    public void inputGuardianAddress(String value) {
        guardianAddress.sendKeys(value);
    }


    //input - kindergarten info
    public void inputKindergartenName(String value) {
        kindergartenName.sendKeys(value);
    }

    public void inputKindergartenCode(String value) {
        kindergartenCode.sendKeys(value);
    }

    public void inputKindergartenAddress(String value) {
        kindergartenAddress.sendKeys(value);
    }

    public void inputKindergartenPhone(String value) {
        kindergartenPhone.sendKeys(value);
    }

    public void inputKindergartenEmail(String value) {
        kindergartenEmail.sendKeys(value);
    }

    public void inputKindergartenBankName(String value) {
        kindergartenBankName.sendKeys(value);
    }

    public void inputKindergartenAccountNumber(String value) {
        kindergartenAccountNumber.sendKeys(value);
    }

    public void inputKindergartenBankCode(String value) {
        kindergartenBankCode.sendKeys(value);
    }

    //click button
    public void clickBtnSubmit() {
        btnSubmit.click();
    }

    // constructor
    public ApplyForCompensationPage(WebDriver driver) {
        super(driver);
    }
}
