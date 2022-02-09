package apiTest;

import generalMethods.GeneralApiMethods;
import io.restassured.filter.session.SessionFilter;
import models.Kindergarten;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;


public class ApiTest extends GeneralApiMethods {

    // log in with all available user roles
    @Test(dataProvider = "parameters")
    public void api_shouldLogInAndOut(String username, String pwd, String role) {

        SessionFilter sessionFilter =
                logIn(username, pwd);

        given().
               spec(reqSpec).
               filter(sessionFilter).
        when().
               get("api/users/user").
        then().
               body("role", equalTo(role)).
               body("username", equalTo(username));

        logOut();

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

        logIn("admin@admin.lt", "admin@admin.lt");

        HashMap<String, Object> user = new HashMap<>();
        user.put("address", "gatve 33-14");
        user.put("email", "andriusd@andrius.lt");
        user.put("name", "Andrius");
        user.put("password", "andriusd@andrius.lt");
        user.put("personalCode", "34512321234");
        user.put("phone", "+37012312345");
        user.put("role", "USER");
        user.put("surname", "Andriulis");
        user.put("username", "andriusd@andrius.lt");

        createNewUser(user).
                then().
                contentType("text/plain; charset=UTF-8").
                statusCode(201).
                body(equalTo("Naudotojas sukurtas sėkmingai!"));

        // delete user
        deleteUser("andriusd@andrius.lt").
                then().
                contentType("text/plain; charset=UTF-8").
                statusCode(200).
                body(equalTo("Naudotojas ištrintas sėkmingai"));

    }

    // create 1 new kindergarten then delete
    @Test
    public void api_shouldCreateNewKindergarten() {

        logIn("manager@manager.lt", "manager@manager.lt");

        Kindergarten kg = new Kindergarten();
        kg.setAddress("gatve 13");
        kg.setCapacityAgeGroup2to3(1);
        kg.setCapacityAgeGroup3to6(2);
        kg.setElderate("Antakalnio");
        kg.setId("123456789");
        kg.setName("AAMontessori");



        createNewKindergarten(kg).
        then().
               contentType("text/plain; charset=UTF-8").
               statusCode(200).
               body(equalTo("Darželis sukurtas sėkmingai"));

        // delete kindergarten
        deleteKindergarten("123456789").
        then().
               statusCode(200).
               contentType("text/plain; charset=UTF-8").
               body(equalTo("Darželis ištrintas sėkmingai"));

    }

    // submit new application to kindergarten as USER
    @Test
    public void api_shouldSubmitNewApplicationToKindergarten() throws IOException {

       logIn("user@user.lt", "user@user.lt");

       submitNewApplication(new String(Files.readAllBytes(Paths.get("src/test/resources/application.json")))).
       then().
              statusCode(200).
              body(equalTo("Prašymas sukurtas sėkmingai"));

       // get id of submitted application
       ArrayList<Integer> applicationId = getApplicationsOfLoggedInUser().
       then().
              statusCode(200).
              extract(). path("id");

       // delete previously created application
       deleteApplicationAsUserById(applicationId.get(0)).
       then().
              statusCode(200).
              body(equalTo("Ištrinta sėkmingai"));

    }


    // get info on all users registered in the system
    @Test
    public void api_shouldGetAllUsers() {

       SessionFilter sessionFilter = logIn("admin@admin.lt", "admin@admin.lt");

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
