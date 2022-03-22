package it.akademija.pdfgenerate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.time.LocalDate;

import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.security.test.context.support.WithMockUser;

import it.akademija.App;
import it.akademija.application.Application;
import it.akademija.application.ApplicationController;
import it.akademija.application.ApplicationDAO;
import it.akademija.application.ApplicationDTO;
import it.akademija.application.ApplicationService;
import it.akademija.application.management.RegistrationStatusController;
import it.akademija.application.pdf.ApplicationPdfService;
import it.akademija.application.priorities.PrioritiesDTO;
import it.akademija.kindergarten.Kindergarten;
import it.akademija.kindergarten.KindergartenDAO;
import it.akademija.kindergartenchoise.KindergartenChoiseDTO;
import it.akademija.role.Role;
import it.akademija.user.UserDTO;
import it.akademija.user.UserService;


@TestInstance(Lifecycle.PER_CLASS)
//@RunWith(SpringRunner.class)
@SpringBootTest(classes = { App.class, ApplicationController.class }, 
              webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(OrderAnnotation.class)
public class PdfGenerateServiceTest {
	@Autowired
	private ApplicationDAO applicationDAO;

	@Autowired
	private KindergartenDAO kindergartenDAO;
	
	@Autowired
	private ApplicationPdfService pdfService;
	
	@Autowired
	private RegistrationStatusController regControler;
	
	@Autowired
	private ApplicationService applicationService;

	@Autowired
	private UserService userService;
	
	Application application;
	
	private ApplicationDTO data = new ApplicationDTO (
            "Benadas",
            "Juozauskas",
            "51609260069",
            LocalDate.parse("2016-09-26"),
            new PrioritiesDTO(true, true, false, false, false, false),
            new UserDTO(
            	Role.USER.name(),
                "Jonas",
                "Juozauskas",
                "38204252589",
                "Antakalnio g. 16-15",
                "Vilnius",
                "+37065685214",
                "jonas.juozauskas144@gmail.com",
                "user1@user.lt",
                "user1@user.lt"
            ),
            null,
            new KindergartenChoiseDTO("111222333", "", "", "", "")
        );
	
	@Test
	@Order(1)
	@WithMockUser(username="manager1@manager.lt", roles = { "MANAGER"})
	public void managerSetsFreeKindergartenSlotsTest(){

		Kindergarten newKindergarten = new Kindergarten("111222333", "Erelis", "Aštuonkojų g. 14", "Šnipiškių", 
				                                        3, 3, "Laimonas", "Strazdauskas", "54.584845, 66.45515");

		kindergartenDAO.save(newKindergarten);
		
		assertTrue(kindergartenDAO.existsById("111222333"));
	}
		
	@Test
	@Order(2)
	@WithMockUser(username="user1@user.lt", roles = { "USER"})
	public void generateNewUserApplicationForPDFTest(){

		userService.createUser(new UserDTO(
            	Role.USER.name(),
                "Jonas",
                "Juozauskas",
                "38204252589",
                "Antakalnio g. 16-15",
                "Vilnius",
                "+37065685214",
                "jonas.juozauskas144@gmail.com",
                "user1@user.lt",
                "user1@user.lt"
            ));
		
        application = applicationService.createNewApplication("user1@user.lt", data);
        
        assertEquals("Benadas", application.getChildName());
        
	}
        
	@Test
	@Order(3)
	@WithMockUser(username="manager1@manager.lt", roles = { "MANAGER"})
	public void managerApprovesGartensTest(){
		
		regControler.processQueue();
		
		assertTrue(regControler.confirmQueue().getStatusCode() == HttpStatus.OK);	
	}
	
	@Test
	@Order(4)
	@WithMockUser(username="user1@user.lt", roles = { "USER"})
	public void generatePdfTest(){

		byte[] contents =  new byte[0];//null;
		try {
			contents = pdfService.createPdf(application.getId().toString());
		} catch (IOException e) {
			e.printStackTrace();
		}

		assertTrue(contents.length > 0);

		applicationDAO.deleteById(application.getId());
		kindergartenDAO.deleteById("111222333");
		userService.deleteUser("user1@user.lt");
	}
}
