package managerTests;

import generalMethods.GeneralMethods;
import org.testng.annotations.Test;

public class UpdateManagerDetails extends GeneralMethods {

    /**
     * Test scenario:
     * Change MANAGER details
     * <p>
     * Preconditions:
     * User admin@admin.lt is already created. User manager123@manager.lt is created during this test.
     * <p>
     * Test steps:
     * 1. Login as admin
     * 2. Create new MANAGER for the test
     * 3. Logout.
     * 4. Login as newly created MANAGER
     * 5. Go to "Mano paskyra" page
     * 6. Change user details (email, name, surname)
     */

    @Test(groups = "regression", priority = 1)
    public void successfullyChangeManagerDetails() {
        // create  new  MANAGER for this test
        createNewManager(1);
        logOutUi();
        logInUi(createNewUserManagerEmail, createNewUserManagerEmail);

        // go to "Mano paskyra" page
        clickNavButtonSpecialistMyAccount();

        // change user details
        inputUserDetails();
        clickChangeUserDetails();
    }

    /**
     * Test scenario:
     * Change user password
     * <p>
     * Preconditions:
     * Users admin@admin.lt and user123@parent.lt are already created. User manager123@manager.lt is logged in.
     * New password must have at least 8 symbols, have one uppercase and one lowercase letters and at least one number.
     * <p>
     * Test steps:
     * 1. Press "Keisti" button
     * 2. Enter old password
     * 3. Enter new password
     * 4. Enter new password again
     * 5. Click "Issaugoti"
     * 6. Logout
     * 7. Login with new password
     * 8. Logout
     */

    @Test(groups = "regression", priority = 2)
    public void successfullyChangeManagerPassword() {
        changeUserPassword(createNewUserManagerEmail);
    }

    /**
     * Test scenario:
     * Reset user (parent) password.
     * <p>
     * Preconditions:
     * Users admin@admin.lt and manager123@manager.lt are already created.
     * If a user asks to reset his password, button "Atkurti" (admin page "Naudotojai") becomes grey.
     * <p>
     * Test steps:
     * 1. Go to login page
     * 2. Click button "Pamirsau slaptazodi"
     * 3. Enter user email (username)
     * 4. Login as admin
     * 5. Click "Atkurti"
     * 6. Logout
     * 7. Login as the test user, using the reset password
     * 8. Logout
     */

    @Test(groups = "regression", priority = 3)
    public void successfullyResetManagerPasswordToOriginal() {
        resetUserPassword(createNewUserManagerEmail);

        // delete MANAGER after successful details change
        uiLogInAsAdmin();
        deleteNewUser();
    }

}
