package it.akademija.application;
 import static org.junit.Assert.assertThrows;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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
import it.akademija.application.management.RegistrationStatusController;
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
import it.akademija.user.UserController;
import it.akademija.user.UserDTO;
import it.akademija.user.UserService;
@TestInstance(Lifecycle.PER_CLASS)
@SpringBootTest(classes = { App.class,
        ApplicationController.class ,RegistrationStatusController.class,UserController.class}, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
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
    private ApplicationController controller;
    @Autowired
	private ApplicationService applicationService;
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
    @Order(4)
    @WithMockUser(username = "test4@user.lt", roles = { "USER", "MANAGER", "ADMIN" })
    void createNewDeleteApplicationTest() throws Exception {
      
    	MvcResult initRegStatus = mvc.perform(get("/api/status"))
    						.andExpect(status().isOk()).andReturn();
    	boolean initStatus = initRegStatus.getResponse().getContentAsString().contains("\"registrationActive\":true");
    	
    	MvcResult setRegistrationStatus = mvc.perform(post("/api/status/{registrationActive}",true))
    			.andExpect(status().isOk()).andReturn();
    	
    	assertTrue(setRegistrationStatus.getResponse().getContentAsString().contains("\"registrationActive\":true"));
    	
    	String jsonRequest = mapper.writeValueAsString(applicationData.getMainGuardian());
    	
    	
    	
    	var user = userService.findByUsername(applicationData.getMainGuardian().getUsername());
    	if(user!= null)
			mvc.perform(delete("/api/users/admin/delete/{username}",
    				applicationData.getMainGuardian().getUsername()))
        			 .andExpect(status().isOk()).andReturn();
       
    	MvcResult createUser = mvc.perform(post("/api/users/admin/createuser")
    			.content(jsonRequest).contentType(MediaType.APPLICATION_JSON))
    			//.andExpect(status().isOk()).andReturn();
    			.andReturn();
     
    	
    	assertNotNull(userService.findByUsername(applicationData.getMainGuardian().getUsername()));
    	
    	
    	jsonRequest = mapper.writeValueAsString(applicationData);
    	MvcResult createApplication = mvc.perform(post("/api/prasymai/user/new")
    			.content(jsonRequest).contentType(MediaType.APPLICATION_JSON))
    			.andExpect(status().isOk()).andReturn();
    	
   
    	
    	assertTrue(applicationService.existsByPersonalCode(applicationData.getChildPersonalCode()));
    	mvc.perform(get("/api/prasymai/user"))
    			.andExpect(status().isOk()).andReturn();
    		
    	var appList = applicationService.getAllUserApplications(applicationData.getMainGuardian().getUsername());
    	assertTrue(appList.size() > 0);
    	 mvc.perform(delete("/api/prasymai/user/delete/{id}",
    			 appList.stream().findFirst().orElse(null).getId()))
    			 .andExpect(status().isOk()).andReturn();
	 
    	 appList = applicationService.getAllUserApplications(applicationData.getMainGuardian().getUsername());
     	assertTrue(appList.size() == 0);
    	user = userService.findByUsername(applicationData.getMainGuardian().getUsername());
    	if(user!= null)
			mvc.perform(delete("/api/users/admin/delete/{username}",
    				applicationData.getMainGuardian().getUsername()))
        			 .andExpect(status().isOk()).andReturn();
    	
    	setRegistrationStatus = mvc.perform(post("/status/{registrationActive}",initStatus))
    			.andReturn();
    }
    
 
    
    @Test
    @Order(5)
    @WithMockUser(username="test4@test4.lt", roles = { "MANAGER" })
    void managerCantRetrieveAllApplications() {
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