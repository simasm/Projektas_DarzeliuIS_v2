package it.akademija.compensation;

import static org.junit.Assert.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import it.akademija.App;

@SpringBootTest(classes = { App.class,
		CompensationController.class },
	webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
 
public class CompensationControllerTest {
	
	@Autowired
	private CompensationController controller;
	
	@Test
	public void contextLoads() {
		assertNotNull(controller);
	}

}
