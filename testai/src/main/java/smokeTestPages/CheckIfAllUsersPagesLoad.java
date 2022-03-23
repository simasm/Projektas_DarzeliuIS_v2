package smokeTestPages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import pages.AbstractObjectPage;

import java.time.Duration;

public class CheckIfAllUsersPagesLoad extends AbstractObjectPage {

    // nav buttons
    @FindBy(id = "navAdminApplicationStats")
    public WebElement navPrasymuStatistikaAdmin;

    @FindBy(id = "navManagerApplicationAdmin")
    public WebElement navPrasymuRedagavimas;

    @FindBy(id = "navAdminEventLog")
    public WebElement navIvykiuZurnalas;

    @FindBy (id = "navManagerApplications")
    public WebElement navManagerPrasymai;

    @FindBy (xpath = "//div[text()='Registracijų statistika']")
    public WebElement navManagerRegistracijuStatistika;

    @FindBy (xpath = "//div[text()='Kompensacijos']")
    public WebElement navManagerKompensacijos;

    @FindBy (xpath = "//div[text()='Registracijų eilė']")
    public WebElement navRegistrationQueue;


    @FindBy(id = "navUserApplicationStats")
    public WebElement navPrasymuStatistikaParent;

    public void clickNavPrasymuStatistikaAdmin() {
        navPrasymuStatistikaAdmin.click();
    }

    public void clickNavManagerRegistracijuStatistika() {
        navManagerRegistracijuStatistika.click();
    }

    public void clickNavPrasymuStatistikaParent() {
        navPrasymuStatistikaParent.click();
    }

    public void clickNavPrasymuRedagavimas() {
        navPrasymuRedagavimas.click();
    }

    public void clickNavIvykiuZurnalas() {
        navIvykiuZurnalas.click();
    }

    public void clickNavManagerPrasymai() {
        navManagerPrasymai.click();
    }

    public void clickNavManagerKompensacijos() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));
        wait.until(ExpectedConditions.elementToBeClickable(navManagerKompensacijos));
        navManagerKompensacijos.click();
    }

    public void clickNavManagerRegistrationQueue() {
        navRegistrationQueue.click();
    }


    public void assertNaudotojaiPageTitle() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));
        wait.until(ExpectedConditions.textToBe(By.xpath("//*/div/h6"), "Naujo naudotojo sukūrimas"));
    }

    public void assertPrasymuStatistikaPageTitle() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));
        wait.until(ExpectedConditions.textToBe(By.xpath("//h6"), "Registracijų statistika"));
    }

    public void assertKompensacijosPageTitle() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));
        wait.until(ExpectedConditions.textToBe(By.xpath("//h6"), "Prašymai dėl kompensacijos"));
    }

    public void assertPrasymuRedagavimasPageTitle() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));
        wait.until(ExpectedConditions.textToBe(By.xpath("//*/h6"), "Prašymų sąrašo redagavimo administravimas"));
    }

    public void assertIvykiuZurnalasPageTitle() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));
        wait.until(ExpectedConditions.textToBe(By.xpath("//*/h6"), "Sistemos įvykių žurnalas"));
    }

    public void assertDarzeliuSarasasPageTitle() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));
        wait.until(ExpectedConditions.textToBe(By.xpath("//*//form/h6[1]"), "Pridėti naują darželį"));
    }

    public void assertPrasymuEilePageTitle() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));
        wait.until(ExpectedConditions.textToBe(By.xpath("//*/h6"), "Registracijų eilė"));
    }

    public void assertManoPrasymaiPageTitle() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));
        wait.until(ExpectedConditions.textToBe(By.id("navUserMyApplications"), "Mano prašymai"));
    }

    public void assertPrasymasRegistracijaiPageLoaded() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));
        wait.until(ExpectedConditions.textToBe(By.xpath("//h6[@class='pl-5 pt-3']"), "Prašymas dėl registracijos"));
    }

    public void assertPrasymasKompensacijaiPageLoaded() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));
        wait.until(ExpectedConditions.textToBe(By.xpath("//label[@for='txtGuardianNameCompensation']"), "Vardas *"));
    }

    // constructor
    public CheckIfAllUsersPagesLoad(WebDriver driver) {
        super(driver);
    }

}
