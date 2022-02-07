package it.akademija.compensation;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.security.test.context.support.WithMockUser;

import it.akademija.App;

@SpringBootTest(classes = { App.class,
		CompensationController.class },
	webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(OrderAnnotation.class)
 
public class CompensationControllerTest {
	
	@Autowired
	private CompensationController controller;
	
 
	
 
	@Test
 
	public void contextLoads() {
		assertNotNull(controller);
	}
	
	@Test
	@WithMockUser(username="test@test.lt", roles = { "USER"})
	void controllerTest() {
		
		CompensationDTO data = new CompensationDTO (
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
				
		
		assertEquals(controller.createNewCompensationApplication(data)
				.getStatusCode(), HttpStatus.CREATED);
	}

 
}
