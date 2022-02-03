package apiTest;

import basetest.BaseApiTest;
import org.testng.annotations.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.is;


public class ApiTest extends BaseApiTest {

    @Test
    public void logIn() {
        given()
                .spec(reqSpec)
                .contentType("application/x-www-form-urlencoded; charset=utf-8")
                .formParam("username", "user@user.lt")
                .formParam("password", "user@user.lt")

                .when()
                .post("login")
                .then()
                .assertThat().body("role", is("USER"));
    }
}
