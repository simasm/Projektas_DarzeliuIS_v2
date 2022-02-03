package specialistTests;

import generalMethods.GeneralMethods;
import org.testng.annotations.Test;

public class CreateAndDeleteNewKindergarten extends GeneralMethods {

    /**
     * Test scenario:
     * Create, update and delete new kindergarten
     * <p>
     * Preconditions:
     * User manager@manager.lt is already created.
     * <p>
     * Test steps:
     * 1. Login as kindergarten specialist
     * 2. Input kindergarten details
     * 3. Submit
     * 4. Update kindergarten details
     * 5. Delete the kindergarten
     * 6. Logout
     */

    @Test
    public void createAndDeleteNewKindergarten() {
        successfullyCreateNewKindergarten();
        deleteNewKindergarten();
        doLogout();
    }
}
