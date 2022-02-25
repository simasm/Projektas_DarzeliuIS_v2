package apiTest;

import generalMethods.ApiGeneralMethods;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.filter.log.ResponseLoggingFilter;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;
import models.Child;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import java.util.Arrays;

import static org.testng.Assert.assertEquals;


public class ApiTestRegistruCentras extends ApiGeneralMethods {

    RequestSpecification reqSpec = new RequestSpecBuilder().
            setBaseUri("https://sextet.akademijait.vtmc.lt/test-darzelis/").
            setContentType(ContentType.JSON).
            addFilters(Arrays.asList(new RequestLoggingFilter(), new ResponseLoggingFilter())).
            build();


    @Test(groups = "smoke", dataProvider = "parameters")
    public void testGetChildById(String asmensKodas) {
        Child child = getChildById(asmensKodas, reqSpec);
        assertEquals(child.getAsmensKodas(), asmensKodas);
    }


    @DataProvider
    public Object[][] parameters() {
        return new Object[][]{
                {"51609260014"},
                {"51609260189"}
        };
    }
}
