package utilities;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;

public class ScrollToEnd {
    public static void scrollToEnd(WebDriver driver) throws InterruptedException {
        for (int i = 0; i < 2; i++) {
            driver.findElement(By.tagName("body")).sendKeys(Keys.END);
            Thread.sleep(200);
        }
    }
}
