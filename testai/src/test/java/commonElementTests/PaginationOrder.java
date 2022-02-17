package commonElementTests;

import adminPages.EventLogPage;
import generalMethods.GeneralMethods;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.Test;

import java.time.Duration;

import static org.testng.Assert.assertEquals;

public class PaginationOrder extends GeneralMethods {

    /**
     * Test steps:
     * Log in as ADMIN.
     * Open 'Įvykių žurnalas' page.
     * Go to last page in event log.
     * Assert first element in event log is logged as event no. 5 (system default).
     * Log out.
     */


    @Test(groups = "regression", priority = 3)
    public void paginationOrder() {

        EventLogPage eventLog = new EventLogPage(driver);

        // log in as ADMIN
        logInUi("admin@admin.lt", "admin@admin.lt");

        // Open 'Įvykių žurnalas' page.
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(3));
        WebElement navAdminEventLog = wait.until(
                ExpectedConditions.elementToBeClickable(By.id("navAdminEventLog")));
        navAdminEventLog.click();

        //Go to last page in event log.
        wait.until(ExpectedConditions.elementToBeClickable(eventLog.inputPageLink));
        eventLog.inputPageLink.sendKeys(Keys.BACK_SPACE);
        eventLog.enterPageNumber("999");
        eventLog.inputPageLink.sendKeys(Keys.RETURN);
        WebElement firstItemInLog = wait.until(
                ExpectedConditions.presenceOfElementLocated(By.xpath("//table//tr[position()=last()]//td[1]/span")));

        //Assert first element in event log is logged as event no. 5.
        assertEquals(firstItemInLog.getText(), "5", "First item in log has event no.:");
    }
}
