package it.akademija.kindergarten;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.restassured.RestAssured;

import it.akademija.App;

@TestInstance(Lifecycle.PER_CLASS)
@SpringBootTest(classes = { App.class, KindergartenController.class,
		 KindergartenService.class }, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(OrderAnnotation.class)
@AutoConfigureMockMvc
class KindergartenRESTTest {

	@Value("${local.server.port}")
	int port;

	@Autowired
	private MockMvc mvc;

	@Autowired
	ObjectMapper mapper;

	@Autowired
	private WebApplicationContext context;
	
	@Autowired 
	private KindergartenService service;

 

	@BeforeAll
	public void setUp() throws Exception {
		RestAssured.port = port;
		mvc = MockMvcBuilders.webAppContextSetup(context).apply(springSecurity()).build();

	}

	@Test
	@Order(1)
	@WithMockUser(username = "manager", roles = { "MANAGER" })
	public void testKindergartenControllerGetMethodsAccessibleForManager() throws Exception {
		MvcResult getAll = mvc.perform(get("/api/darzeliai")).andExpect(status().isOk()).andReturn();
		assertEquals(200, getAll.getResponse().getStatus());

		MvcResult getPage = mvc.perform(get("/api/darzeliai/manager/page").param("page", "1").param("size", "10"))
				.andExpect(status().isOk()).andReturn();
		assertEquals(200, getPage.getResponse().getStatus());

	}

	@Test
	@Order(2)
	@Transactional
	@WithMockUser(username = "manager@manager.lt", roles = { "MANAGER" })

	public void testPostDeleteNewKindergartenMethod() throws Exception {
 
		Kindergarten newKindergarten = new Kindergarten("111111110", "Testas","Testas" ,"Testas","Testas", "Testas", 10, 10);
		Kindergarten newKindergarten2 = new Kindergarten("111111113", "Testas","Testas" ,"Testas","Testas", "Testas", 10, 10);
		
		String jsonRequest = mapper.writeValueAsString(newKindergarten);
		String jsonRequest2 = mapper.writeValueAsString(newKindergarten2);
		
		MvcResult postNew = mvc.perform(post("/api/darzeliai/manager/createKindergarten").content(jsonRequest)
				.contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andReturn();
		assertEquals(200, postNew.getResponse().getStatus());
 
		assertNotNull(service.findById("111111110"));
	


		MvcResult postDuplicate = mvc.perform(post("/api/darzeliai/manager/createKindergarten").content(jsonRequest)
				.contentType(MediaType.APPLICATION_JSON)).andExpect(status().isBadRequest()).andReturn();
		assertEquals(400, postDuplicate.getResponse().getStatus());
		
		MvcResult postDuplicateName = mvc.perform(post("/api/darzeliai/manager/createKindergarten").content(jsonRequest2)
				.contentType(MediaType.APPLICATION_JSON)).andExpect(status().isConflict()).andReturn();
		assertEquals(409, postDuplicateName.getResponse().getStatus());
		
		assertNull(service.findById("111111113"));

		MvcResult update = mvc.perform(put("/api/darzeliai/manager/update/{id}", "111111112").content(jsonRequest)
				.contentType(MediaType.APPLICATION_JSON)).andExpect(status().isNotFound()).andReturn();
		assertEquals(404, update.getResponse().getStatus());

		MvcResult deleteOne = mvc.perform(delete("/api/darzeliai/manager/delete/{id}", "111111110"))
				.andExpect(status().isOk()).andReturn();
		assertEquals(200, deleteOne.getResponse().getStatus());
		
		MvcResult deleteTwo = mvc.perform(delete("/api/darzeliai/manager/delete/{id}", "111111113"))
				.andExpect(status().isNotFound()).andReturn();
		assertEquals(404, deleteTwo.getResponse().getStatus()); 

	}
	
	@Test
  	@WithMockUser(username="test@test.lt", roles = { "MANAGER"})
	public void validationError() throws Exception {
		
		
	 
			KindergartenDTO newKindergarten = new KindergartenDTO("asd", "123","123" ,"123","123", "123", 10, 10, "asd");
			String jsonRequest = mapper.writeValueAsString(newKindergarten);
			MvcResult postInvalid = mvc.perform(post("/api/darzeliai/manager/createKindergarten").content(jsonRequest)
					.contentType(MediaType.APPLICATION_JSON)).andExpect(
							status().isBadRequest()).andReturn();
			System.out.println( postInvalid.getResponse().getContentAsString());

		 
	 
	}

}
