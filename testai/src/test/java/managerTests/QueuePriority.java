package managerTests;

import generalMethods.ApiGeneralMethods;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.filter.log.ResponseLoggingFilter;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;
import org.testng.annotations.Test;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.HashMap;

import static generalMethods.ApiAdminMethods.createNewUser;
import static generalMethods.ApiAdminMethods.deleteUser;
import static generalMethods.ApiManagerMethods.*;
import static generalMethods.ApiUserMethods.submitNewApplication;
import static org.hamcrest.Matchers.equalTo;
import static org.testng.Assert.assertTrue;

public class QueuePriority extends ApiGeneralMethods {

    /**
     * Test steps API:
     * ADMIN - Create two new USER accounts.
     * USERs - Post two applications to kindergarten.
     * MANAGER - Form queues.
     * Assert queues are formed correctly.
     * ADMIN - Delete USERs created for this test.
     */

    @Test(groups = "regression", priority = 3)
    public void queuePriority() throws IOException {

        RequestSpecification reqSpec = new RequestSpecBuilder().
                setBaseUri("https://sextet.akademijait.vtmc.lt/test-darzelis/").
                setContentType(ContentType.JSON).
                addFilters(Arrays.asList(new RequestLoggingFilter(), new ResponseLoggingFilter())).
                build();

        // check if registration is open; if not - open it;
        logInApi("manager@manager.lt", "manager@manager.lt", reqSpec);
        if(!isRegistrationActive(reqSpec)) {
            openRegistration(reqSpec);
        }
        logOutApi(reqSpec);

        // create 2 new USERs for this test
        HashMap<String, Object> user1 = new HashMap<>();
        user1.put("email", "andriusd@andrius.lt");
        user1.put("name", "Andrius");
        user1.put("password", "andriusd@andrius.lt");
        user1.put("role", "USER");
        user1.put("surname", "Andriulis");
        user1.put("username", "andriusd@andrius.lt");

        HashMap<String, Object> user2 = new HashMap<>();
        user2.put("email", "benas@benas.lt");
        user2.put("name", "Benas");
        user2.put("password", "benas@benas.lt");
        user2.put("role", "USER");
        user2.put("surname", "Beniušis");
        user2.put("username", "benas@benas.lt");

        logInApi("admin@admin.lt", "admin@admin.lt", reqSpec);
        createNewUser(user1, reqSpec).
                then().
                contentType("text/plain; charset=UTF-8").
                statusCode(201).
                body(equalTo("Naudotojas sukurtas sėkmingai!"));
        createNewUser(user2, reqSpec).
                then().
                contentType("text/plain; charset=UTF-8").
                statusCode(201).
                body(equalTo("Naudotojas sukurtas sėkmingai!"));
        logOutApi(reqSpec);

        // submit 3 applications with 2 USER accounts
        logInApi("andriusd@andrius.lt", "andriusd@andrius.lt", reqSpec);
        submitNewApplication(new String(Files.readAllBytes(Paths.get("src/test/resources/application1.json"))), reqSpec).
                then().
                statusCode(200).
                body(equalTo("Prašymas sukurtas sėkmingai"));
        logOutApi(reqSpec);

        logInApi("benas@benas.lt", "benas@benas.lt", reqSpec);
        submitNewApplication(new String(Files.readAllBytes(Paths.get("src/test/resources/application2.json"))), reqSpec).
                then().
                statusCode(200).
                body(equalTo("Prašymas sukurtas sėkmingai"));
        submitNewApplication(new String(Files.readAllBytes(Paths.get("src/test/resources/application3.json"))), reqSpec).
                then().
                statusCode(200).
                body(equalTo("Prašymas sukurtas sėkmingai"));
        logOutApi(reqSpec);

        // process queue as MANAGER
        logInApi("manager@manager.lt", "manager@manager.lt", reqSpec);
        closeRegistration(reqSpec);
        processQueue(reqSpec);
        confirmQueue(reqSpec);

        // assert queue was formed with correct priorities
        // API does not include priority weight in response, assert is done manually
        // applications were submitted with descending priority weight (15 > 11 > 10), first submitted should be first in queue
        int firstChildPosInWaitingList = getApplicationQueue(reqSpec).
                then().
                statusCode(200).
                extract().path("content[0].numberInWaitingList");

        int secondChildPosInWaitingList = getApplicationQueue(reqSpec).
                then().
                statusCode(200).
                extract().path("content[1].numberInWaitingList");
        assertTrue(firstChildPosInWaitingList < secondChildPosInWaitingList, "Highest priority child is first in queue");
        logOutApi(reqSpec);

        // delete users created for this test, applications will also be deleted
        logInApi("admin@admin.lt", "admin@admin.lt", reqSpec);
        deleteUser("andriusd@andrius.lt", reqSpec);
        deleteUser("benas@benas.lt", reqSpec);
        logOutApi(reqSpec);
    }
}
