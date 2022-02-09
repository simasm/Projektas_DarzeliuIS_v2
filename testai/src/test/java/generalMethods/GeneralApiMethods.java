package generalMethods;

import basetest.BaseApiTest;
import com.google.gson.Gson;
import io.restassured.filter.session.SessionFilter;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import models.Child;
import models.Kindergarten;

import java.util.HashMap;

import static io.restassured.RestAssured.given;

public class GeneralApiMethods extends BaseApiTest {

   static SessionFilter sessionFilter = new SessionFilter();

   // log in and return session ID
    public static SessionFilter logIn(String username, String pwd, RequestSpecification reqSpec) {
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
    public static void logOut(RequestSpecification reqSpec) {
        given().
                spec(reqSpec).
                filter(sessionFilter).
        when().
                post("logout");
    }

    // requires prior login as admin to get session ID
    public static Response createNewUser(HashMap<String, Object> user, RequestSpecification reqSpec) {

      return
      given().
              spec(reqSpec).
              filter(sessionFilter).
              body(user).
      when().
              post("api/users/admin/createuser");
    }

    // requires prior login as admin to get session ID
    public static Response deleteUser(String userName, RequestSpecification reqSpec) {
       return
       given().
               spec(reqSpec).
               filter(sessionFilter).
               pathParam("username", userName).
       when().
               delete("api/users/admin/delete/{username}");
    }

    // requires prior login as manager to get session ID
    public static Response createNewKindergarten(Kindergarten kindergarten, RequestSpecification reqSpec) {
        return
        given().
                spec(reqSpec).
                filter(sessionFilter).
                body(kindergarten).
        when().
                post("api/darzeliai/manager/createKindergarten");
    }

    // requires prior login as manager to get session ID
    public static Response deleteKindergarten(String id, RequestSpecification reqSpec) {
        return
        given().
                spec(reqSpec).
                filter(sessionFilter).
                pathParam("id", id).
        when().
                delete("api/darzeliai/manager/delete/{id}");
    }


    // get child by personal id from Registru Centras API
    public static Child getChildById (String asmensKodas, RequestSpecification reqSpec) {
        Response response = given().
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

    // submit new application to kindergarten
    // requires prior login as USER
    public static Response submitNewApplication(String json, RequestSpecification reqSpec) {
       return
       given().
               spec(reqSpec).
               filter(sessionFilter).
               body(json).
       when().
               post("api/prasymai/user/new");
    }

    // get all applications submitted by user, return application ID
    // requires prior login as USER
    public static Response getApplicationsOfLoggedInUser(RequestSpecification reqSpec) {
        return
        given().
                spec(reqSpec).
                filter(sessionFilter).
        when().
                get("api/prasymai/user");
    }

    // delete application by ID
    // requires prior login as USER
    public static Response deleteApplicationAsUserById(int applicationId, RequestSpecification reqSpec) {
        return
        given().
                spec(reqSpec).
                filter(sessionFilter).
                pathParam("applicationId", applicationId).
        when().
                delete("api/prasymai/user/delete/{applicationId}");
    }


    // get compensation application by child personal id
    // requires prior login as MANAGER
    public static Response getCompensationApplicationByChildId(String childId, RequestSpecification reqSpec) {
        return
        given().
                spec(reqSpec).
                filter(sessionFilter).
                pathParam("childPersonalCode", childId).
        when().
                get("api/kompensacija/{childPersonalCode}");
    }

    // delete compensation application by child personal id
    // requires prior login as MANAGER
    public static Response deleteCompensationApplicationByChildId(String childId, RequestSpecification reqSpec) {
        return
        given().
                spec(reqSpec).
                filter(sessionFilter).
                pathParam("childCode", childId).
        when().
                delete("api/kompensacija/manager/{childCode}");
    }

}
