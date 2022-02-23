package apiTest;

import generalMethods.ApiGeneralMethods;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.filter.log.ResponseLoggingFilter;
import io.restassured.filter.session.SessionFilter;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;
import models.Kindergarten;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

import static generalMethods.ApiAdminMethods.createNewUser;
import static generalMethods.ApiAdminMethods.deleteUser;
import static generalMethods.ApiManagerMethods.*;
import static generalMethods.ApiUserMethods.*;
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.not;


public class ApiTest extends ApiGeneralMethods {

    RequestSpecification reqSpec = new RequestSpecBuilder().
    setBaseUri("https://sextet.akademijait.vtmc.lt/test-darzelis/").
    setContentType(ContentType.JSON).
    addFilters(Arrays.asList(new RequestLoggingFilter(), new ResponseLoggingFilter())).
    build();

    // log in with all available user roles
    @Test(dataProvider = "parameters")
    public void api_shouldLogInAndOut(String username, String pwd, String role) {

        SessionFilter sessionFilter =
                logInApi(username, pwd, reqSpec);

        given().
                spec(reqSpec).
                filter(sessionFilter).
        when().
                get("api/users/user").
        then().
                body("role", equalTo(role)).
                body("username", equalTo(username));

        logOutApi(reqSpec);

        // assert that logout was successful
        given().
                spec(reqSpec).
                filter(sessionFilter).
        when().
                get("api/users/user").
        then().
                statusCode(401);
    }

    // create 1 new user then delete
    @Test
    public void api_shouldCreateNewUser() {

        logInApi("admin@admin.lt", "admin@admin.lt", reqSpec);

        HashMap<String, Object> user = new HashMap<>();
        user.put("email", "andriusd@andrius.lt");
        user.put("name", "Andrius");
        user.put("password", "andriusd@andrius.lt");
        user.put("role", "USER");
        user.put("surname", "Andriulis");
        user.put("username", "andriusd@andrius.lt");

        createNewUser(user, reqSpec).
                then().
                contentType("text/plain; charset=UTF-8").
                statusCode(201).
                body(equalTo("Naudotojas sukurtas sėkmingai!"));

        // delete user
        deleteUser("andriusd@andrius.lt", reqSpec).
                then().
                contentType("text/plain; charset=UTF-8").
                statusCode(200).
                body(equalTo("Naudotojas ištrintas sėkmingai"));
    }

    // create 1 new kindergarten then delete
    @Test
    public void api_shouldCreateNewKindergarten() {

        logInApi("manager@manager.lt", "manager@manager.lt", reqSpec);

        Kindergarten kg = new Kindergarten();
        kg.setAddress("gatve 13");
        kg.setCapacityAgeGroup2to3(1);
        kg.setCapacityAgeGroup3to6(2);
        kg.setElderate("Antakalnio");
        kg.setId("123456789");
        kg.setName("AAMontessori");

        createNewKindergarten(kg, reqSpec).
                then().
                contentType("text/plain; charset=UTF-8").
                statusCode(200).
                body(equalTo("Darželis sukurtas sėkmingai"));

        // delete kindergarten
        deleteKindergarten("123456789", reqSpec).
                then().
                statusCode(200).
                contentType("text/plain; charset=UTF-8").
                body(equalTo("Darželis ištrintas sėkmingai"));
    }

    // submit new application to kindergarten as USER
    @Test
    public void api_shouldSubmitNewApplicationToKindergarten() throws IOException {

        // open registration if needed
        logInApi("manager@manager.lt", "manager@manager.lt", reqSpec);
        if(!isRegistrationActive(reqSpec)) {
            openRegistration(reqSpec);
        }
        logOutApi(reqSpec);

        // submit application
        logInApi("user@user.lt", "user@user.lt", reqSpec);
        submitNewApplication(new String(Files.readAllBytes(Paths.get("src/test/resources/application1.json"))), reqSpec).
                then().
                statusCode(200).
                body(equalTo("Prašymas sukurtas sėkmingai"));

        // get id of submitted application
        ArrayList<Integer> applicationId = getApplicationsOfLoggedInUser(reqSpec).
                then().
                statusCode(200).
                extract().path("id");

        // delete previously created application
        deleteApplicationAsUserById(applicationId.get(0), reqSpec).
                then().
                statusCode(200).
                body(equalTo("Ištrinta sėkmingai"));

        // close registration
        logInApi("manager@manager.lt", "manager@manager.lt", reqSpec);
        closeRegistration(reqSpec);
        logOutApi(reqSpec);
    }


    // get info on all users registered in the system
    @Test
    public void api_shouldGetAllUsers() {

        SessionFilter sessionFilter = logInApi("admin@admin.lt", "admin@admin.lt", reqSpec);

        given().
                spec(reqSpec).
                filter(sessionFilter).
                queryParam("page", 0).
                queryParam("size", 10).
        when().
                get("api/users/admin/allusers").
        then().
                body("content.size", not(0));
    }


    @DataProvider
    public Object[][] parameters() {

        return new Object[][]{
                {"user@user.lt", "user@user.lt", "USER"},
                {"admin@admin.lt", "admin@admin.lt", "ADMIN"},
                {"manager@manager.lt", "manager@manager.lt", "MANAGER"}
        };
    }

}
