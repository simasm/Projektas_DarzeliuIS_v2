package managerPages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import pages.AbstractObjectPage;

public class ApplicationQueuePage extends AbstractObjectPage {

    //buttons
    @FindBy(id = "btnStartRegistration")
    public WebElement startRegistrationButton;

    @FindBy(id = "btnStopRegistration")
    public WebElement stopRegistrationButton;

    @FindBy(id = "btnFormQueue")
    public WebElement formQueue;

    @FindBy(id = "btnConfirmQueue")
    public WebElement confirmQueue;

    // clicks
    public void clickStartRegistration() {
        startRegistrationButton.click();
    }

    public void clickStopRegistration() {
        stopRegistrationButton.click();
    }

    public void clickFormQueue() {
        formQueue.click();
    }

    public void clickConfirmQueue() {
        confirmQueue.click();
    }

    // constructor
    public ApplicationQueuePage(WebDriver driver) {
        super(driver);
    }
}
