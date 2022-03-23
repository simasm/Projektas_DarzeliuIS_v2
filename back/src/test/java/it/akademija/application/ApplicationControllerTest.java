package it.akademija.application;
 import static org.junit.Assert.assertThrows;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import java.time.LocalDate;
import javax.annotation.PreDestroy;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.restassured.RestAssured;
import it.akademija.App;
import it.akademija.application.management.RegistrationStatus;
import it.akademija.application.management.RegistrationStatusService;
import it.akademija.application.priorities.PrioritiesDTO;
import it.akademija.kindergarten.Kindergarten;
import it.akademija.kindergarten.KindergartenDAO;
import it.akademija.kindergartenchoise.KindergartenChoiseDTO;
import it.akademija.role.Role;
import it.akademija.user.ParentDetails;
import it.akademija.user.ParentDetailsDAO;
import it.akademija.user.ParentDetailsDTO;
import it.akademija.user.User;
import it.akademija.user.UserDTO;
import it.akademija.user.UserService;
@TestInstance(Lifecycle.PER_CLASS)
@SpringBootTest(classes = { App.class,
        ApplicationController.class }, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@TestMethodOrder(OrderAnnotation.class)
public class ApplicationControllerTest {
    @Value("${local.server.port}")
    int port;
    @Autowired
    private MockMvc mvc;
    @Autowired
    private ObjectMapper mapper;
    @Autowired
    private WebApplicationContext context;
    @Autowired
    private UserService userService;
    @Autowired
    private KindergartenDAO gartenDao;
    @Autowired
	private ApplicationDAO applicationDAO;
    @Autowired
    private ParentDetailsDAO parentDao;
    @Autowired
    private ApplicationController controller;
    @Autowired
	private ApplicationService applicationService;
    @Autowired
    private RegistrationStatusService statusService;
    @BeforeAll
    public void setup() throws Exception {
        RestAssured.port = port;
        mvc = MockMvcBuilders.webAppContextSetup(context).apply(springSecurity()).build();
    }
    
    private ApplicationDTO applicationData = new ApplicationDTO("Vardukas", "Pavardukas", "51702151236", LocalDate.of(2015, 1, 1),
            new PrioritiesDTO (true, true, false, false, false, false), 
            new UserDTO (Role.USER.toString(), "Testas", "Testauskas", "48901231578", "Lukiškių g. 11", "Vilnius", 
            		     "+37045878012", "test4@user.lt", "test4@user.lt", "test4@user.lt"), 
            new ParentDetailsDTO ("11111111111", "Testas", "Testauskas", "test4@user.lt", "Vilniaus g", "Vilnius",
                    "+37000000000"),
            new KindergartenChoiseDTO ("111111111", "", "", "", "")
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
        assertEquals("51702151236", applicationData.getChildPersonalCode());
    }
    @Test
    @Disabled
    @Order(4)
    @Transactional
    @WithMockUser(username = "test4@user.lt", roles = { "USER", "MANAGER" })
    void createNewDeleteApplicationTest() throws Exception {
        var initStatus = statusService.getStatus();        
        
        statusService.setStatus(true);
        userService.createUser(applicationData.getMainGuardian());
        Kindergarten garten = new Kindergarten("111111111", "A darzelis", "Adresas darzelio A", "Antakalnio", 
        		                                "Justas", "Pivoriūnas", 0, 0);
        gartenDao.saveAndFlush(garten);
        
        String jsonRequest  = mapper.writeValueAsString(applicationData);
        
        MvcResult createWhileEnabled = mvc.perform(post("/api/prasymai/user/new").contentType(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest()).andReturn();
        assertEquals(400, createWhileEnabled.getResponse().getStatus());
        
        User usr = userService.findByUsername(applicationData.getMainGuardian().getUsername());
        
        ParentDetails parentDet = new ParentDetails("11111111111", "Testas", "Testauskas", "test4@user.lt", "Vilniaus g", "Vilnius",
                "+37000000000");
        
        parentDao.saveAndFlush(parentDet);
        
        Application appli = new Application(applicationData.getChildName(), applicationData.getChildSurname(),
        		                          applicationData.getChildPersonalCode(), applicationData.getBirthdate(),
        		                          usr , parentDet);
        
        applicationDAO.saveAndFlush(appli);
        
//        var response = controller.createNewApplication(applicationData);
//        assertEquals(HttpStatus.OK,
//                response.getStatusCode());
        
    	RegistrationStatus status = new RegistrationStatus();
		status.setRegistrationActive(false);
		statusService.saveStatus(status);
     
		
//		MvcResult disableRegistration = mvc.perform(post("/api/status/{registrationActive}",false))
//				.andExpect(status().isOk()).andReturn();
//		assertEquals(200, disableRegistration.getResponse().getStatus());
		        
        MvcResult createWhileDisabled = mvc.perform(post("/api/prasymai/user/new").contentType(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest()).andReturn();
        assertEquals(400, createWhileDisabled.getResponse().getStatus());
         
        status.setRegistrationActive(true);
        statusService.saveStatus(status);
      
        MvcResult createSecondTime = mvc.perform(post("/api/prasymai/user/new").contentType(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest()).andReturn();
        assertEquals(400, createSecondTime.getResponse().getStatus());
        
//        assertEquals(HttpStatus.CONFLICT, 
//                 controller.createNewApplication(applicationData).getStatusCode());
        
        statusService.setStatus(initStatus.isRegistrationActive());
        
        //User usr = userService.findByUsername(applicationData.getMainGuardian().getUsername());
        
        System.out.println("FIND " + usr.getUserApplications());
        
        //int size = controller.getAllUserApplications().size();
        
       // System.out.println("FIND "+ size) ;
        
       // assertTrue(size > 0);
        
          System.out.println("APPLICATION ID: "+applicationService.getByPersonalCode("51702151236").getId());
        
        Long number = applicationService.getByPersonalCode("51702151236").getId();
        
        MvcResult deleteApplication = mvc.perform(delete("/api/prasymai/user/delete/{id}", number))
                .andExpect(status().isOk()).andReturn();
        assertEquals(200, deleteApplication.getResponse().getStatus());
      
        statusService.saveStatus(initStatus);
    }
    
//    @Test
//	@Order(5)
//	@WithMockUser(username = "test4@user.lt", roles = { "USER" })
//	public void testDeleteApplicationMethod() throws Exception {
//    	
//    	System.out.println("APPLICATION ID: "+applicationService.getByPersonalCode("51702151236").getId());
//
//    	Long number = applicationService.getByPersonalCode("51702151236").getId();
//    	
//		MvcResult deleteApplication = mvc.perform(delete("/api/prasymai/user/delete/{id}", number))
//				.andExpect(status().isOk()).andReturn();
//		assertEquals(200, deleteApplication.getResponse().getStatus());
//
//	}
    
    @Test
    @Order(5)
    @WithMockUser(username="test4@test4.lt", roles = { "MANAGER" })
    void managerCantRetrieveAllApplications() {
        AccessDeniedException exception = 
                assertThrows(AccessDeniedException.class,
                        () -> controller.getAllUserApplications()
                  );
    }
    @PreDestroy
    void deleteUser() {
    //  controller.getAllUserApplications().forEach(a->controller.deleteApplication(a.getId()));
        userService.deleteUser(applicationData.getMainGuardian().getUsername());
    }
}