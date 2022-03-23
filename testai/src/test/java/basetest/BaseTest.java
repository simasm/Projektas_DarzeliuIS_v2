package basetest;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.checkerframework.checker.units.qual.C;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.annotations.AfterClass;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeClass;

public class BaseTest {

    protected WebDriver driver;

    @BeforeClass(alwaysRun = true)
    protected void setUp() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://sextet.akademijait.vtmc.lt/darzelis/");
    }

    @AfterClass(alwaysRun = true)
    protected void closeBrowser() {
        driver.manage().deleteAllCookies();
        driver.close();
        driver.quit();
    }

    @AfterSuite(alwaysRun = true)
    protected void tearDown() {
        driver.quit();
    }

}
