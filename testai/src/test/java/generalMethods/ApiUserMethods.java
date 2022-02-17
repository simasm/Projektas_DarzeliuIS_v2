package generalMethods;

import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;

import static io.restassured.RestAssured.given;

public class ApiUserMethods {
    // submit new application to kindergarten
    // requires prior login as USER
    public static Response submitNewApplication(String json, RequestSpecification reqSpec) {
        return
                given().
                        spec(reqSpec).
                        filter(ApiGeneralMethods.sessionFilter).
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
                        filter(ApiGeneralMethods.sessionFilter).
                when().
                        get("api/prasymai/user");
    }

    // delete application by ID
    // requires prior login as USER
    public static Response deleteApplicationAsUserById(int applicationId, RequestSpecification reqSpec) {
        return
                given().
                        spec(reqSpec).
                        filter(ApiGeneralMethods.sessionFilter).
                        pathParam("applicationId", applicationId).
                when().
                        delete("api/prasymai/user/delete/{applicationId}");
    }
}
