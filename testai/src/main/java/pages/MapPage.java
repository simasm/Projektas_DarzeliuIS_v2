package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class MapPage extends AbstractObjectPage{

    // navbar
    @FindBy(linkText = "Žemėlapis")
    public WebElement btnZemelapis;

   // pop-up
    @FindBy (className = "leaflet-popup-content-wrapper")
    public WebElement popUp;

    // search bar
    @FindBy (xpath = "//input[@class='form-control my-3 searchbox']")
    public WebElement searchBar;

    // select kindergarten in list
    // kindergarten ids can be found at /darzelis/api/darzeliai/visi
    public WebElement selectKindergartenInList(String kindergartenId) {
       return driver.findElement(By.xpath("//div[@id='" + kindergartenId + "']"));
    }

    public void clickBtnZemelapis() {
        btnZemelapis.click();
    }

    //filter kindergarten list
    public void filterKindergartenList(String kindergartenNameOrElderate) {
        searchBar.sendKeys(kindergartenNameOrElderate);
    }


    // constructor
    public MapPage(WebDriver driver) {
        super(driver);
    }
}
