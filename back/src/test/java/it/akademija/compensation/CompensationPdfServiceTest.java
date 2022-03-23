 package it.akademija.compensation;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import java.io.IOException;

import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;

import it.akademija.App;
import it.akademija.application.ApplicationController;
import it.akademija.application.pdf.CompensationPdfService;
 
 
@TestInstance(Lifecycle.PER_CLASS)
//@RunWith(SpringRunner.class)
@SpringBootTest(classes = { App.class, ApplicationController.class, CompensationPdfService.class }, 
              webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(OrderAnnotation.class)
public class CompensationPdfServiceTest {

	
	@Autowired
	private CompensationService compensationService;
	@Autowired
	private CompensationPdfService pdfService;
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
	@WithMockUser(username="test@test.lt", roles = { "USER"})
	public void compensationPDF() throws IOException {
		var comp = compensationService
				 .createNewCompensationApplication(data);
		assertNotNull( pdfService.createCompensationPdf(comp.getId().toString()));
		compensationService.deleteCompensationApplicationByChildCode(comp.getChildPersonalCode());
		assertNull(compensationService.getCompensationApplicationByChildCode(comp.getChildPersonalCode()));
	}

}
