package parentTests;

import generalMethods.GeneralMethods;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.filter.log.ResponseLoggingFilter;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;
import org.openqa.selenium.Alert;
import org.testng.annotations.Test;

import java.util.Arrays;
import java.util.HashMap;

import static generalMethods.GeneralApiMethods.*;
import static org.hamcrest.Matchers.equalTo;
import static org.testng.Assert.assertEquals;

public class ApplyForCompensation extends GeneralMethods {

    /**
     * Test steps:
     * API - Create new USER for this test.
     * UI -
     * Log in as USER.
     * Click dropdown 'sukurti prasyma'.
     * Click 'prasymas del kompensacijos'.
     * Fill in 3 forms.
     * Click submit.
     * Assert alert 'submitted' is shown.
     * Click OK on alert. Log out.
     * <p>
     * API - Assert application has been created.
     * API - Delete application.
     * API - Delete USER created for this test.
     */

    @Test(groups = "regression", priority = 1)
    public void successfullyApplyForCompensation() {
        RequestSpecification reqSpec = new RequestSpecBuilder().
                setBaseUri("https://sextet.akademijait.vtmc.lt/test-darzelis/").
                setContentType(ContentType.JSON).
                addFilters(Arrays.asList(new RequestLoggingFilter(), new ResponseLoggingFilter())).
                build();

        // create new USER for this test
        HashMap<String, Object> user = new HashMap<>();
        user.put("email", "andriusd@andrius.lt");
        user.put("name", "Andrius");
        user.put("password", "andriusd@andrius.lt");
        user.put("role", "USER");
        user.put("surname", "Andriulis");
        user.put("username", "andriusd@andrius.lt");

        logIn("admin@admin.lt", "admin@admin.lt", reqSpec);
        createNewUser(user, reqSpec);

        // USER fills in application for compensation
        doLogin("andriusd@andrius.lt", "andriusd@andrius.lt");

        fillInCompensationForm("51609260036");
        Alert alert = driver.switchTo().alert();
        assertEquals(alert.getText(), "submitted");
        alert.accept();
        doLogout();

        // assert application was submitted then delete it
        logIn("manager@manager.lt", "manager@manager.lt", reqSpec);
        getCompensationApplicationByChildId("51609260036", reqSpec).
                then().
                statusCode(200).
                body("childPersonalCode", equalTo("51609260036"));

        deleteCompensationApplicationByChildId("51609260036", reqSpec).
                then().
                statusCode(204);
        logOut(reqSpec);

        // delete previously created USER
        logIn("admin@admin.lt", "admin@admin.lt", reqSpec);
        deleteUser("andriusd@andrius.lt", reqSpec).
                then().
                statusCode(200).
                body(equalTo("Naudotojas ištrintas sėkmingai"));
    }
}
