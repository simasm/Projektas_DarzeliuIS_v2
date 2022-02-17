package adminPages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import pages.AbstractObjectPage;

public class EventLogPage extends AbstractObjectPage {

    // input field
    @FindBy(tagName = "input")
    public WebElement inputPageLink;


    public void enterPageNumber(String pageNumber) {
        inputPageLink.sendKeys(pageNumber);
    }

    // constructor
    public EventLogPage(WebDriver driver) {
        super(driver);
    }
}
