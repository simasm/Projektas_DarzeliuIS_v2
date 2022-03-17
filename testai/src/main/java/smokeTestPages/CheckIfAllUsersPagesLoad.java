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
        navManagerKompensacijos.click();
    }

    public void clickNavManagerRegistrationQueue() {
        navRegistrationQueue.click();
    }


    public Boolean assertNaudotojaiPageTitle() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));
        return wait.until(ExpectedConditions.textToBe(By.xpath("//*/div/h6"), "Naujo naudotojo sukūrimas"));
    }

    public Boolean assertPrasymuStatistikaPageTitle() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));
        return wait.until(ExpectedConditions.textToBe(By.xpath("//*/h6"), "Prašymų statistika"));
    }

    public void assertKompensacijosPageTitle() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));
        wait.until(ExpectedConditions.textToBe(By.xpath("//h3"), "Prašymai dėl kompensacijos"));
    }

    public Boolean assertPrasymuRedagavimasPageTitle() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));
        return wait.until(ExpectedConditions.textToBe(By.xpath("//*/h6"), "Prašymų sąrašo redagavimo administravimas"));
    }

    public Boolean assertIvykiuZurnalasPageTitle() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));
        return wait.until(ExpectedConditions.textToBe(By.xpath("//*/h6"), "Sistemos įvykių žurnalas"));
    }

    public Boolean assertDarzeliuSarasasPageTitle() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));
        return wait.until(ExpectedConditions.textToBe(By.xpath("//*//form/h6[1]"), "Pridėti naują darželį"));
    }

    public Boolean assertPrasymuEilePageTitle() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));
        return wait.until(ExpectedConditions.textToBe(By.xpath("//*/h6"), "Prašymų eilė"));
    }

    public Boolean assertManoPrasymaiPageTitle() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));
        return wait.until(ExpectedConditions.textToBe(By.id("navUserMyApplications"), "Mano prašymai"));
    }

    public Boolean assertPrasymasRegistracijaiPageLoaded() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));
        return wait.until(ExpectedConditions.textToBe(By.xpath("//h6[@class='pl-5 pt-3']"), "Prašymas dėl registracijos"));
    }

    public Boolean assertPrasymasKompensacijaiPageLoaded() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));
        return wait.until(ExpectedConditions.textToBe(By.xpath("//label[@for='txtGuardianNameCompensation']"), "Vardas *"));
    }

    // constructor
    public CheckIfAllUsersPagesLoad(WebDriver driver) {
        super(driver);
    }

}
