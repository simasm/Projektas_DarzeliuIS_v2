package basetest;

import io.restassured.builder.RequestSpecBuilder;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.filter.log.ResponseLoggingFilter;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;
import org.testng.annotations.BeforeSuite;

import java.util.Arrays;

public class BaseApiTest {

    protected static RequestSpecification reqSpec;

    @BeforeSuite
    public static void setUp() {

        reqSpec = new RequestSpecBuilder().
                setBaseUri("https://sextet.akademijait.vtmc.lt/test-darzelis/").
                setContentType(ContentType.JSON).
                addFilters(Arrays.asList(new RequestLoggingFilter(), new ResponseLoggingFilter())).
                build();
    }
}
