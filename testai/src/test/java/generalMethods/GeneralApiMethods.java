package generalMethods;

import basetest.BaseApiTest;
import com.google.gson.Gson;
import io.restassured.filter.session.SessionFilter;
import io.restassured.response.Response;
import models.Child;

import java.util.HashMap;

import static io.restassured.RestAssured.given;

public class GeneralApiMethods extends BaseApiTest {

   static SessionFilter sessionFilter = new SessionFilter();

    public static SessionFilter logIn(String username, String pwd) {

        given().
                spec(reqSpec).
                contentType("application/x-www-form-urlencoded; charset=utf-8").
                formParam("username", username).
                formParam("password", pwd).
                filter(sessionFilter).
                post("login");
        return sessionFilter;

    }

    // requires prior login as admin to get session ID
    public static void createNewUser(HashMap<String, Object> user) {

        given().
                spec(reqSpec).
                filter(sessionFilter).
                body(user).
        when().
                post("api/users/admin/createuser");
    }

    // get child by id from Registru Centras API
    public static Child getChildById (String asmensKodas) {

        Response response =  given().
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
