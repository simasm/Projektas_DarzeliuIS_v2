package it.akademija.passwordresetrequest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.security.test.context.support.WithMockUser;

import it.akademija.role.Role;
import it.akademija.user.UserDTO;
import it.akademija.user.UserService;
import it.akademija.user.passwordresetrequests.UserPasswordResetRequestsController;

@SpringBootTest
public class PasswordRequestControllerTest {

	@Autowired
	private UserPasswordResetRequestsController controller;
	
	@Autowired
	private UserService userService;
	
	@Test
	void contextLoads() {
		assertNotNull(controller);
	}
	
	@Test
	@WithMockUser(username = "admin@admin.lt", roles = { "ADMIN" })
	void testAllPasswordRequests() {
		assertNotNull(controller.getAllPasswordResetRequests());
	}
	
	@Test
	@WithMockUser(username = "admin@admin.lt", roles = { "ADMIN" })
	void testResponseWith200Request() {
		
		UserDTO testUser = new UserDTO(Role.USER.toString(), "Testasauskas", "Testauskasaras", "48600239081", "Ateities g. 14", "Vilnius", 
				                       "+37078952104", "user4@test.lt", "user4@test.lt", "testPassword4");

		userService.createUser(testUser);
		
		//User user = userService.findByUsername(testUser.getUsername());
		
		assertEquals(controller.requestPasswordReset(testUser.getUsername()).getStatusCode(), HttpStatus.OK);
		
		assertEquals(controller.deletePasswordResetRequest(testUser.getUsername()).getStatusCode(), HttpStatus.OK);
		
		userService.deleteUser(testUser.getUsername());
	}
	
}
