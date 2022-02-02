package it.akademija.registrycenter;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.security.test.context.support.WithMockUser;

import it.akademija.App;

@SpringBootTest(classes = { App.class,
		RegistrycenterController.class }, 
webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class RegistrycenterControllerTest {
	
	@Autowired
	private RegistrycenterController controller;

	@Test
	void contextLoads() {
		assertNotNull(controller);
	}
	
	@Test
	@WithMockUser(username = "admin@admin.lt", roles = { "ADMIN" })
	void controllerRespondsWith400OnBadRequest() {
		assertEquals(controller.getChildDataByIDFromExternalAPI("bad code")
				.getStatusCode(), HttpStatus.BAD_REQUEST);
	}
	

}
