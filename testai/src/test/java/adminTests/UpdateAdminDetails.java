package adminTests;

import generalMethods.GeneralMethods;
import org.testng.annotations.Test;

public class UpdateAdminDetails extends GeneralMethods {

    /**
     * Test scenario:
     * Change user details (admin)
     * <p>
     * Preconditions:
     * User admin@admin.lt is already created. User admin123@admin.lt is created during this test.
     * <p>
     * Test steps:
     * 1. Login as admin
     * 2. Create new admin for the test
     * 3. Logout.
     * 4. Login as newly created admin
     * 5. Go to "Mano paskyra" page
     * 6. Change user details (email, name, surname)
     */

    @Test(groups = "regression", priority = 1)
    public void successfullyChangeAdminDetails() {
        // create a new user (admin) for this test
        createNewAdmin(0);
        logOutUi();
        logInUi(createNewUserAdminEmail, createNewUserAdminEmail);

        // go to "Mano paskyra" page
        clickNavButtonAdminMyAccount();

        // change admin details
        inputUserDetails();
        clickChangeUserDetails();
    }

    /**
     * Test scenario:
     * Change user password
     * <p>
     * Preconditions:
     * Users admin@admin.lt and admin123@admin.lt are already created. User admin123@admin.lt is logged in.
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
    public void successfullyChangeAdminPassword() {
        changeUserPassword(createNewUserAdminEmail);
    }

    /**
     * Test scenario:
     * Reset admin password.
     * <p>
     * Preconditions:
     * Users admin@admin.lt and admin123@admin.lt are already created.
     * If a user asks to reset his password, button "Atkurti" (admin page "Naudotojai") becomes grey.
     * <p>
     * Test steps:
     * 1. Go to login page
     * 2. Click button "Pamirsau slaptazodi"
     * 3. Enter user email (username)
     * 4. Login as admin
     * 5. Click "Atkurti"
     * 6. Logout
     * 7. Login as the test admin, using the reset password
     * 8. Logout
     */

    @Test(groups = "regression", priority = 3)
    public void successfullyResetAdminPasswordToOriginal() {
        resetUserPassword(createNewUserAdminEmail);

        // delete user after successful user details change
        uiLogInAsAdmin();
        deleteNewUser();
//	  doLogout();
    }
}
