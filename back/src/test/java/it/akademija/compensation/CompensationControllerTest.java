package it.akademija.compensation;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThrows;
import static org.junit.Assert.assertTrue;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.test.context.support.WithMockUser;

import it.akademija.App;

@SpringBootTest(classes = { App.class,
		CompensationController.class },
	webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(OrderAnnotation.class)
 
public class CompensationControllerTest {
	
	@Autowired
	private CompensationController controller;
	
 
	private CompensationDTO data = new CompensationDTO (
			new ChildInfo("12345678911",
					"Testas",
					"Testas",
					"2001-01-01"),
		new KindergartenInfo("Testprivatus",
							"302295680",
							"Vysniu gatve 13",
							"123123124",
							"test@test.com",
							"Testbankas",
							"TBANK1",
							"1234"),
		new GuardianInfo("test",
						 "test",
						 "123455123",
						 "1234124",
						 "test@test.lt",
						 "testaddr")
		
		);
 
	@Test
	@Order(1)
	public void contextLoads() {
		assertNotNull(controller);
	}
	
	@Test 
	@Order(2)
	@WithMockUser(username="test@test.lt", roles = { "USER"})
	void controllerRespondsWith201And400() {
	
		
		assertEquals(HttpStatus.CREATED, controller.createNewCompensationApplication(data)
				.getStatusCode());
		assertEquals(HttpStatus.BAD_REQUEST, controller.createNewCompensationApplication(data)
				.getStatusCode());
				
	}

	@Test
	@Order(3)
	@WithMockUser(username="test@test.lt", roles = { "USER"})
	void userCantAccessAllCompensations () {
		AccessDeniedException exception = 
				assertThrows(AccessDeniedException.class,
						() -> controller.getAllCopensationApplications()
				  );
	}
	
	@Test
	@Order(4)
	@WithMockUser(username="test1@test.lt", roles = { "MANAGER"})
	void managerCanRetrieveCompensationApplications() {
		assertEquals(controller.getAllCopensationApplications().getStatusCode(),
				HttpStatus.OK);
		
		
	}
	
	@Test
	@Order(5)
	@WithMockUser(username="test@test.lt", roles = { "MANAGER"})
	void managerCanDeleteCompensationApplicationByChildCode() {
		//assertEquals(controller.deleteCompensationApplicationByUsername(null))
		
		
		int size = controller.getAllCopensationApplications()
				.getBody()
				.size();

		
		assertTrue(size > 0 );
	 
		
		controller.deleteCompensationApplicationByChildCode(
				data.getChildInfo().getPersonalID());
		
		assertTrue(controller.getAllCopensationApplications()
				.getBody()
				.size() < size );
 
		
		
	}
		
 
}
