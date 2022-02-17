package adminTests;

import generalMethods.GeneralMethods;
import org.testng.annotations.Test;

public class CreateAndDeleteNewUser extends GeneralMethods {

    /**
     * Test scenario:
     * Create new admin and delete it afterwards.
     * <p>
     * Test steps:
     * 1. Login as admin
     * 2. Create new admin user
     * 3. Delete the user
     * 4. Logout
     */

    @Test(groups = {"regression"})
    public void successfullyCreateAndDeleteNewAdmin() {
        createNewAdmin(0);
        deleteNewUser();
    }

    /**
     * Test scenario:
     * Create new kindergarten specialist and delete it afterwards.
     * <p>
     * Test steps:
     * 1. Login as admin
     * 2. Create new kindergarten specialist
     * 3. Delete the user
     * 4. Logout
     */

    @Test(groups = {"regression"})
    public void successfullyCreateAndDeleteNewKindergartenSpecialist() {
        createNewManager(1);
        deleteNewUser();
    }

    /**
     * Test scenario:
     * Create new parent/ guardian and delete it afterwards.
     * <p>
     * Test steps:
     * 1. Login as admin
     * 2. Create new parent
     * 3. Delete the user
     * 4. Logout
     */

    @Test(groups = {"regression"})
    public void successfullyCreateAndDeleteNewParent() {
        uiLogInAsAdmin();
        createNewParent(2);
        deleteNewUser();
    }

}
