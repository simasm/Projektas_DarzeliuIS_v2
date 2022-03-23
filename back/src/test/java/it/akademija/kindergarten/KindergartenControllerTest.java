package it.akademija.kindergarten;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.security.test.context.support.WithMockUser;
 
import it.akademija.App;
 
 
@SpringBootTest(classes = { App.class,
		KindergartenController.class }, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class KindergartenControllerTest {

	@Autowired
	private KindergartenController controller;
	
	@Autowired
	private KindergartenService kindergartenService;

	@Test
	public void contextLoads() {
		assertNotNull(controller);
	}
	
	@Test
	@WithMockUser(username = "manager@manager.lt", roles = { "MANAGER" })
	void getAllElderatesTest() {
		assertNotNull(controller.getAllElderates());
	}
	
	@Test
	@WithMockUser(username = "manager@manager.lt", roles = { "MANAGER" })
	void testResponseWith200Request() {
		
		KindergartenDTO kinderTest = new KindergartenDTO("123456789", "TestinisDarzelis", "TestAddress", "TestElderate",
				"Jonas", "Jonauskas", 2, 6, "54.85959, 45.845626");
		
		kindergartenService.createNewKindergarten(kinderTest);
		
	//	Kindergarten kindergarten = kindergartenService.findById(kinderTest.getId());
		
		assertEquals(controller.getAllKindergartens().getStatusCode(), HttpStatus.OK);
		assertEquals(controller.deleteKindergarten(kinderTest.getId()).getStatusCode(), HttpStatus.OK);
		
		kindergartenService.deleteKindergarten(kinderTest.getId());
		
	}
	

}