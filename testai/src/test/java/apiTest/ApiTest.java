package apiTest;

import generalMethods.GeneralApiMethods;
import io.restassured.filter.session.SessionFilter;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import java.util.HashMap;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;


public class ApiTest extends GeneralApiMethods {

    // log in with all available user roles
    @Test(dataProvider = "parameters")
    public void logInTest(String username, String pwd, String role) {
        SessionFilter sessionFilter = logIn(username, pwd);
        given().
              spec(reqSpec).
              filter(sessionFilter).
        when().
              get("api/users/user").
        then().
              body("role", is(role)).
              body("username", is(username));
    }

    // create 5 new users
    @Test
    public void createUserTest() {

        SessionFilter sessionFilter = logIn("admin@admin.lt", "admin@admin.lt");

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

        createNewUser(user);


        given().
                spec(reqSpec).
                filter(sessionFilter).
                queryParam("page", 0).
                queryParam("size", 10).
        when().
                get("api/users/admin/allusers").
                then().
                body("content.username", hasItem(user.get("username")));

        // delete user


    }

    // get data on all users registered in the system
    @Test
    public void getAllUsers() {
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
