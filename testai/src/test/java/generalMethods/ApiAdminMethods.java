package generalMethods;

import basetest.BaseTest;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;

import java.util.HashMap;

import static io.restassured.RestAssured.given;

public class ApiAdminMethods extends BaseTest {

    // requires prior login as admin to get session ID
    public static Response createNewUser(HashMap<String, Object> user, RequestSpecification reqSpec) {
        return
                given().
                        spec(reqSpec).
                        filter(ApiGeneralMethods.sessionFilter).
                        body(user).
                when().
                        post("api/users/admin/createuser");
    }

    // requires prior login as admin to get session ID
    public static Response deleteUser(String userName, RequestSpecification reqSpec) {
        return
                given().
                        spec(reqSpec).
                        filter(ApiGeneralMethods.sessionFilter).
                        pathParam("username", userName).
                when().
                        delete("api/users/admin/delete/{username}");
    }
}
