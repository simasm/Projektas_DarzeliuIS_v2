package apiTest;

import generalMethods.GeneralApiMethods;
import models.Child;
import org.testng.Assert;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;


public class ApiTestRegistruCentras extends GeneralApiMethods {

    @Test (dataProvider = "parameters")
    public static void testGetChildById (String asmensKodas) {

    Child child = getChildById(asmensKodas);
        Assert.assertEquals(child.getAsmensKodas(), asmensKodas);

    }


    @DataProvider
    public Object[][] parameters() {
        return new Object[][]{
                {"51609260014"},
                {"51609260069"}
        };
    }
}
