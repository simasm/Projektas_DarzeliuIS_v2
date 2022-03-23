package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class LoginPage extends AbstractObjectPage {

    //input fields
    @FindBy(id = "username")
    public WebElement inputUsername;

    @FindBy(id = "password")
    public WebElement inputPassword;

    //buttons
    @FindBy(id = "btnLogin")
    public WebElement buttonLogin;

    @FindBy(id = "btnCreate")
    public WebElement buttonCreateNewAcc;

    public void enterUsername(String value) {
        inputUsername.sendKeys(value);
    }

    public void enterPassword(String value) {
        inputPassword.sendKeys(value);
    }

    public void clickLoginButton() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));
        WebElement login = wait.until(
                ExpectedConditions.elementToBeClickable(buttonLogin));
        login.click();
    }

    public void clickButtonCreateNewAcc() {
        buttonCreateNewAcc.click();
    }

    // constructor
    public LoginPage(WebDriver driver) {
        super(driver);
    }
}
