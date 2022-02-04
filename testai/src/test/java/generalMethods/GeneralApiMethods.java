package generalMethods;

import basetest.BaseApiTest;
import io.restassured.filter.session.SessionFilter;
import org.openqa.selenium.json.Json;

import java.util.HashMap;

import static io.restassured.RestAssured.given;

public class GeneralApiMethods extends BaseApiTest {

    SessionFilter sessionFilter = new SessionFilter();

    public SessionFilter logIn(String username, String pwd) {

        given().
                spec(reqSpec).
                contentType("application/x-www-form-urlencoded; charset=utf-8").
                formParam("username", username).
                formParam("password", pwd).
                filter(sessionFilter).
                post("login");
        return sessionFilter;

    }

    // requires prior login as admin
    public void createNewUser(HashMap<String, Object> user) {

        given().
                spec(reqSpec).
                filter(sessionFilter).
                body(user).
        when().
                post("api/users/admin/createuser");
    }
}
