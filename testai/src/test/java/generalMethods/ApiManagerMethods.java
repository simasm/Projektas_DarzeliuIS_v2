package generalMethods;

import io.restassured.path.json.JsonPath;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import models.Kindergarten;

import static io.restassured.RestAssured.given;

public class ApiManagerMethods {
    // requires prior login as MANAGER to get session ID
    public static Response createNewKindergarten(Kindergarten kindergarten, RequestSpecification reqSpec) {
        return
                given().
                        spec(reqSpec).
                        filter(ApiGeneralMethods.sessionFilter).
                        body(kindergarten).
                when().
                        post("api/darzeliai/manager/createKindergarten");
    }

    // requires prior login as MANAGER to get session ID
    public static Response deleteKindergarten(String id, RequestSpecification reqSpec) {
        return
                given().
                        spec(reqSpec).
                        filter(ApiGeneralMethods.sessionFilter).
                        pathParam("id", id).
                when().
                        delete("api/darzeliai/manager/delete/{id}");
    }

    // get compensation application by child personal id
    // requires prior login as MANAGER
    public static Response getCompensationApplicationByChildId(String childId, RequestSpecification reqSpec) {
        return
                given().
                        spec(reqSpec).
                        filter(ApiGeneralMethods.sessionFilter).
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
                        filter(ApiGeneralMethods.sessionFilter).
                        pathParam("childCode", childId).
                when().
                        delete("api/kompensacija/manager/{childCode}");
    }

    // check if application process is open
    // requires prior login as any role
    public static Boolean isRegistrationActive(RequestSpecification reqSpec) {
          String body =
                given().
                        spec(reqSpec).
                        filter(ApiGeneralMethods.sessionFilter).
                when().
                        get("api/status").
                then().extract().body().asString();
        JsonPath jsonPath = JsonPath.from(body);
        return jsonPath.getBoolean("registrationActive");

    }

    // open registration to kindergartens
    // requires prior login as MANAGER
    public static Response openRegistration(RequestSpecification reqSpec) {
        return
                given().
                        spec(reqSpec).
                        filter(ApiGeneralMethods.sessionFilter).
                when().
                        post("api/status/true");
    }

    // close registration to kindergartens
    // requires prior login as MANAGER
    public static Response closeRegistration(RequestSpecification reqSpec) {
        return
                given().
                        spec(reqSpec).
                        filter(ApiGeneralMethods.sessionFilter).
                when().
                        post("api/status/false");
    }

    // process queue
    // requires prior login as MANAGER
    public static Response processQueue(RequestSpecification reqSpec) {
       return
               given().
                       spec(reqSpec).
                       filter(ApiGeneralMethods.sessionFilter).
               when().
                       post("api/queue/process");
    }

    // confirm queue
    // requires prior login as MANAGER
    public static Response confirmQueue(RequestSpecification reqSpec) {
        return
                given().
                        spec(reqSpec).
                        filter(ApiGeneralMethods.sessionFilter).
                when().
                        post("api/queue/confirm");
    }

    // get all applications in queue
    // requires prior login as MANAGER
    public static Response getApplicationQueue(RequestSpecification reqSpec) {
        return
                given().
                        spec(reqSpec).
                        filter(ApiGeneralMethods.sessionFilter).
                        queryParam("page", 0).
                        queryParam("size", 10).
               when().
                        get("api/eile/manager/queue");
    }
}
