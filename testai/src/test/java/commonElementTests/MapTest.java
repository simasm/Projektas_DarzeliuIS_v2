package commonElementTests;

import generalMethods.GeneralMethods;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;
import pages.MapPage;

import java.time.Duration;

public class MapTest extends GeneralMethods {

    /**
     * Test steps:
     * 1. Log in as MANAGER.
     * 2. Click on 'Zemelapis'
     * 3. Select kindergarten from list.
     * 4. Assert pop-up is shown.
     * 5. Log out.
     * 6. Log in as USER.
     * 7. Repeat steps 2-5.
     */

    @Test(groups = "regression", priority = 1)
    public void mapTest() {

        MapPage mapPage = new MapPage(driver);
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));

        // MANAGER test
        logInUi("manager@manager.lt", "manager@manager.lt");
        wait.until(ExpectedConditions.elementToBeClickable(mapPage.btnZemelapis));
        mapPage.clickBtnZemelapis();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//div[@class='container pt-4']")));
        mapPage.filterKindergartenList("Ąžuolas");
        WebElement kindergarten = mapPage.selectKindergartenInList("303318623");
        kindergarten.click();
        wait.until(ExpectedConditions.visibilityOf(mapPage.popUp));
        // TODO currently unable to get pop-up text due to how element is written, text is not part of element;
        //  can get with xpath method text() but selenium complains about it being an object and not an element
        Assert.assertTrue(mapPage.popUp.isDisplayed(), "Pop-up is displayed:");
        logOutUi();

        // USER test
        logInUi("user@user.lt", "user@user.lt");
        wait.until(ExpectedConditions.elementToBeClickable(mapPage.btnZemelapis));
        mapPage.clickBtnZemelapis();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//div[@class='ps-2 all-kindergarten-map sidemenubox']")));
        mapPage.filterKindergartenList("Aušrelė");
        WebElement kindergarten2 = wait.until(
                ExpectedConditions.visibilityOf(mapPage.selectKindergartenInList("190020391")));
        kindergarten2.click();
        wait.until(ExpectedConditions.visibilityOf(mapPage.popUp));
        Assert.assertTrue(mapPage.popUp.isDisplayed());
        logOutUi();
    }

}
