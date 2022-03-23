package it.akademija.compensation;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThrows;
import static org.junit.Assert.assertTrue;

import javax.annotation.PreDestroy;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.test.context.support.WithMockUser;
import it.akademija.App;
import it.akademija.user.User;
import it.akademija.user.UserService;

@SpringBootTest(classes = { App.class,
		CompensationController.class },
	webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(OrderAnnotation.class)
 
public class CompensationControllerTest {
	
	@Autowired
	private CompensationController controller;
	
	@Autowired
	private UserService userService;
	
	
	private User testUser = null;

	private boolean testCompCreated = false;
	
 
	private CompensationDTO data = new CompensationDTO (
			new ChildInfo("12345678912",
					"Testas",
					"Testas",
					"2001-01-01"),
		new KindergartenInfo("Testprivatus",
							"302295680",
							"Vysniu gatve 13",
							"+37067625896",
							"test@test.com",
							"Testbankas",
							"LT187045112069350325",
							"70451"),
		new  GuardianInfo("Test",
						 "Test",
						 "12345512355",
						 "+37085258906",
						 "test@test.lt",
						 "Testaddr")
		
		);
 
	@Test
	@Order(1)
	public void contextLoads() {
		assertNotNull(controller);
	}
	
	/*
	@PostConstruct
	@Transactional
	void initTestCompensationUpload() {
		
		User user = new User();
		user.setRole(Role.USER);
		user.setName("test");
		user.setSurname("test");
		user.setPassword("test@test.lt");
		user.setEmail("test@test.lt");
		user.setUsername("test@test.lt");
		
		ParentDetails upd = new ParentDetails ();
		upd.setAddress("testaddr");
		upd.setEmail( "test@test.lt");
		upd.setName("test");
		upd.setPersonalCode("12345512355");
		upd.setPhone("+1234124");
		upd.setSurname("test");
		upd.setUser(user);
		
		user.setParentDetails(upd);

		user = userDAO.saveAndFlush(user);
		testUser = user;
	
		
	}*/
	
	@Test 
	@Order(2)
	@WithMockUser(username="test@test.lt", roles = { "USER"})
	void controllerRespondsWith201And400() {
	
		var response =  controller.createNewCompensationApplication(data);
	 
		assertEquals(HttpStatus.CREATED,
				response.getStatusCode());
		
		testCompCreated = true;
		
		
		//jei irasas kartojasi, nesukuriamas 
		assertEquals(HttpStatus.BAD_REQUEST, 
				 controller.createNewCompensationApplication(data)
				.getStatusCode());
				
	}

	@Test
	@Order(3)
	@WithMockUser(username="test@test.lt", roles = { "USER"})
	void userCantAccessAllCompensations () {
				assertThrows(AccessDeniedException.class,
						() -> controller.getAllCopensationApplications()
				  );
	}
	
	@Test
	@Order(4)
	@WithMockUser(username="test1@test.lt", roles = { "MANAGER"})
	void managerCanRetrieveCompensationApplications() {
		assertEquals(HttpStatus.OK,
				controller.getAllCopensationApplications().getStatusCode()
				);
 
	}
	
	  
	@Test
	@Order(5)
	@WithMockUser(username="test@test.lt", roles = { "MANAGER", "ADMIN"})
	void getsCompensationApplicationByChildCode() {
		CompensationDetails compensation = null;
		compensation = controller.getCompensationApplicationByChildCode(
				data.getChildInfo().getPersonalID()).getBody();
		assertNotNull(compensation);
		assertEquals(data.getChildInfo().getPersonalID(),
				compensation.getChildPersonalCode());
				
		
		
	}
	 
	
	@Test
	@Order(7)
	@WithMockUser(username="test@test.lt", roles = { "MANAGER"})
	void managerCanDeleteCompensationApplicationByChildCode() {
		//assertEquals(controller.deleteCompensationApplicationByUsername(null))
		
		
		int size = controller.getAllCopensationApplications()
				.getBody()
				.size();
 
		assertTrue(size > 0 );
 
		controller.deleteCompensationApplicationByChildCode(
				data.getChildInfo()
					.getPersonalID());
		
		assertTrue(controller.getAllCopensationApplications()
				.getBody()
				.size() < size );
 
	}
	
	@Test
	@Order(6)
	@WithMockUser(username="test@test.lt", roles = { "MANAGER"})
	void getCompensationApplicationForUser() {
		
		int size = controller.getAllCopensationApplications()
				.getBody()
				.size();
 
		System.out.println("FIND " + size);
		assertTrue(size > 0);
		
		controller.getCompensationApplicationsForUser(data.getGuardianInfo().getName());
		
		assertNotNull(controller.getAllCopensationApplications().getBody().size());
	}
	
	 
	@PreDestroy
	@WithMockUser(username = "admin@admin.lt", roles = { "ADMIN" })
	void deleteTestUserAndTestComp() {
		
		if(testUser != null)
			userService.deleteUser(testUser.getUsername());
		
		if(testCompCreated)
			controller.deleteCompensationApplicationByChildCode(
					data.getChildInfo()
						.getPersonalID());
			
		
		
	}

	
	/* to do  
	 *      deleteCompensationApplicationByUsername
	 *      getCompensationApplicationForUser
	 */    
}
