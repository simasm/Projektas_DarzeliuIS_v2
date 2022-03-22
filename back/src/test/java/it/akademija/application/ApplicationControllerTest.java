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
import it.akademija.application.management.RegistrationStatusService;
import it.akademija.application.priorities.PrioritiesDTO;
import it.akademija.kindergarten.Kindergarten;
import it.akademija.kindergarten.KindergartenDAO;
import it.akademija.kindergartenchoise.KindergartenChoiseDTO;
import it.akademija.role.Role;
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
    private boolean testCompCreated = false;
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
    @Transactional
    @WithMockUser(username = "test4@user.lt", roles = { "USER" })
    void createNewDeleteApplicationTest() throws Exception {
        var initStatus = statusService.getStatus();        
        
        statusService.setStatus(true);
        userService.createUser(applicationData.getMainGuardian());
        Kindergarten garten = new Kindergarten("111111111", "A darzelis", "Adresas darzelio A", "Antakalnio", 
        		                                "Justas", "Pivoriūnas", 0, 0);
        gartenDao.save(garten);
        var response = controller.createNewApplication(applicationData);
        assertEquals(HttpStatus.OK,
                response.getStatusCode());
        
        testCompCreated = true;
        
        statusService.setStatus(false);
        MvcResult createWhileDisabled = mvc.perform(post("/api/prasymai/user/new",
        		applicationService.getByPersonalCode(applicationData.getChildPersonalCode()).getId()))
                .andExpect(status().isMethodNotAllowed()).andReturn();
        assertEquals(405, createWhileDisabled.getResponse().getStatus());
        
        statusService.setStatus(true);
        
        assertEquals(HttpStatus.CONFLICT, 
                 controller.createNewApplication(applicationData).getStatusCode());
        statusService.setStatus(initStatus.isRegistrationActive());
        
        User usr = userService.findByUsername(applicationData.getMainGuardian().getUsername());
        
        System.out.println("FIND " + usr.getUserApplications());
        
        int size = controller.getAllUserApplications().size();
        
        System.out.println("FIND "+ size) ;
        
        assertTrue(size > 0);
    //  gartenDao.delete(garten);
        //controller.getAllUserApplications().forEach(a->controller.deleteApplication(a.getId()));
    //  assertTrue(size >  controller.getAllUserApplications().size());
        // controller.getAllUserApplications().stream().findFirst().orElse(null).getId().toString()
        //applicationService.getByPersonalCode("51702151236").setId(123L);
        
        System.out.println("APPLICATION ID: "+applicationService.getByPersonalCode("51702151236").getId());
        
        MvcResult deleteApplication = mvc.perform(delete("/api/prasymai/user/delete/{id}", 
        		applicationService.getByPersonalCode("51702151236").getId() ))
                .andExpect(status().isOk()).andReturn();
        assertEquals(200, deleteApplication.getResponse().getStatus()); 
    }
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