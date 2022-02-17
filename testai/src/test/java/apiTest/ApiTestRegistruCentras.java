package apiTest;

import generalMethods.ApiGeneralMethods;
import models.Child;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import static org.testng.Assert.assertEquals;


public class ApiTestRegistruCentras extends ApiGeneralMethods {

    @Test(dataProvider = "parameters")
    public static void testGetChildById(String asmensKodas) {
        Child child = getChildById(asmensKodas, reqSpec);
        assertEquals(child.getAsmensKodas(), asmensKodas);
    }


    @DataProvider
    public Object[][] parameters() {
        return new Object[][]{
                {"51609260014"},
                {"51609260069"}
        };
    }
}
