package generalMethods;

import basetest.BaseApiTest;
import com.google.gson.Gson;
import io.restassured.filter.session.SessionFilter;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import models.Child;

import static io.restassured.RestAssured.given;

public class ApiGeneralMethods extends BaseApiTest {

    static SessionFilter sessionFilter = new SessionFilter();

    // log in and return session ID
    public static SessionFilter logInApi(String username, String pwd, RequestSpecification reqSpec) {
        given().
                spec(reqSpec).
                contentType("application/x-www-form-urlencoded; charset=utf-8").
                formParam("username", username).
                formParam("password", pwd).
                filter(sessionFilter).
        when().
                post("login");
        return sessionFilter;
    }

    // log out
    public static void logOutApi(RequestSpecification reqSpec) {
        given().
                spec(reqSpec).
                filter(sessionFilter).
        when().
                post("logout");
    }


    // get child by personal id from Registru Centras API
    public static Child getChildById(String asmensKodas, RequestSpecification reqSpec) {
        Response response =
        given().
                spec(reqSpec).
                baseUri("https://darzelis.akademijait.vtmc.lt/registru-centras/vaikai/").
                pathParam("asmensKodas", asmensKodas).
        when().
                get("/{asmensKodas}").
        then().
                extract().response();

        Gson gson = new Gson();
        return gson.fromJson(response.asString(), Child.class);
    }


}
