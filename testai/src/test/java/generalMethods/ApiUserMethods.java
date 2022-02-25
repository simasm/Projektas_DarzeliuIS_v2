package generalMethods;

import basetest.BaseTest;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;

import static generalMethods.ApiGeneralMethods.sessionFilter;
import static io.restassured.RestAssured.given;

public class ApiUserMethods extends BaseTest {
    // submit new application to kindergarten
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
    public static Response getApplicationsOfLoggedInUser(RequestSpecification reqSpec) {
        return
                given().
                        spec(reqSpec).
                        filter(sessionFilter).
                when().
                        get("api/prasymai/user");
    }

    // delete application by ID
    public static Response deleteApplicationAsUserById(int applicationId, RequestSpecification reqSpec) {
        return
                given().
                        spec(reqSpec).
                        filter(sessionFilter).
                        pathParam("applicationId", applicationId).
                when().
                        delete("api/prasymai/user/delete/{applicationId}");
    }
}
