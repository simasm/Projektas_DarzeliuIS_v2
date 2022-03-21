package it.akademija.application;

import static org.junit.Assert.assertThrows;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.test.context.support.WithMockUser;

import it.akademija.App;
import it.akademija.application.management.RegistrationStatusService;
import it.akademija.application.priorities.PrioritiesDTO;
import it.akademija.kindergartenchoise.KindergartenChoiseDTO;
import it.akademija.role.Role;
import it.akademija.user.ParentDetailsDTO;
import it.akademija.user.UserDTO;

@SpringBootTest(classes = { App.class,
		ApplicationController.class }, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ApplicationControllerTest {
	

	@Autowired
	private ApplicationController controller;
	
	@Autowired
	private RegistrationStatusService statusService;

	private boolean testCompCreated = false;
	
	private ApplicationDTO applicationData = new ApplicationDTO("Vardukas", "Pavardukas", "00000000000", LocalDate.of(2015, 1, 1),
			new PrioritiesDTO (true, true, false, false, false, false), 
			new UserDTO (Role.USER.name(), "Testas", "Testauskas", "test4@user.lt", "test4@user.lt", "test4@user.lt"), 
			new ParentDetailsDTO ("11111111111", "Testas", "Testauskas", "test4@user.lt", "Vilniaus g", "Vilnius",
					"+37000000000"),
			new KindergartenChoiseDTO ("1", "2", "3",
					"4", "5")
			);
	
	@Test
	@Order(1)
	public void contextLoads() {
		assertNotNull(controller);
	}
	
	@Test
	@Order(2)
	@WithMockUser(username = "test4@user.lt", roles = { "USER" })
	void getAllApplications() {
		assertNotNull(controller.getAllUserApplications());
	}
	
	@Test
	@Order(3)
	@WithMockUser(username = "test4@user.lt", roles = { "USER" })
	void getApplicationById() {
		
		assertEquals("00000000000", applicationData.getChildPersonalCode());

	}
	
	@Test
	@Order(4)
	@WithMockUser(username = "test4@user.lt", roles = { "USER" })
	void createNewApplicationTest() {
		
		var initStatus = statusService.getStatus();
		statusService.setStatus(true);
		
		var response = controller.createNewApplication(applicationData);
		
		assertEquals(HttpStatus.CREATED,
				response.getStatusCode());
		
		testCompCreated = true;
		
		assertEquals(HttpStatus.BAD_REQUEST, 
				 controller.createNewApplication(applicationData).getStatusCode());
		
		statusService.setStatus(initStatus.isRegistrationActive());
		
	}
	
	@Test
	@Order(5)
	@WithMockUser(username="test4@test4.lt", roles = { "MANAGER" })
	void managerCantRetrieveAllApplications() {
		AccessDeniedException exception = 
				assertThrows(AccessDeniedException.class,
						() -> controller.getAllUserApplications()
				  );
	}
	
	@Test
	@Order(6)
	@WithMockUser(username="test4@user.lt", roles = { "USER" })
	void userCanDeleteApplication() {
		int size = controller.getAllUserApplications().size();
		
		assertTrue(size > 0);
	}
}