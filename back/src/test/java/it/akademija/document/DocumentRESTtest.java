package it.akademija.document;

import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.IOException;

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
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import com.jayway.restassured.RestAssured;

import it.akademija.App;

@TestInstance(Lifecycle.PER_CLASS)
@SpringBootTest(classes = { App.class,
		DocumentController.class }, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(OrderAnnotation.class)
@AutoConfigureMockMvc
public class DocumentRESTtest {

	@Value("${local.server.port}")
	int port;

	@Autowired
	private MockMvc mvc;


	@Autowired
	private WebApplicationContext context;
	
	@Autowired
	private DocumentController controller;


	@BeforeAll
	public void setup() throws Exception {
		RestAssured.port = port;
		mvc = MockMvcBuilders.webAppContextSetup(context).apply(springSecurity()).build();

	}

	@Test
	@Order(1)
	@WithMockUser(username = "user@user.lt", roles = { "USER" })
	public void testGetDocumentNotFound() throws Exception {

		MvcResult getDocuments = mvc.perform(get("/api/documents/get/{id}", 1L)).andExpect(status().isNotFound()).andReturn();

		assertEquals(404, getDocuments.getResponse().getStatus());
		
		

	}
	
	@Test
	@Order(2)
	@WithMockUser(username = "user@user.lt", roles = { "USER" })
	public void uploadDocument() throws Exception {

		final MockMultipartFile mockFile = mock(MockMultipartFile.class);
		when(mockFile.getOriginalFilename()).thenReturn("pazyma.pdf");
		when(mockFile.getContentType()).thenReturn("application/pdf");
		when(mockFile.getBytes()).thenReturn(new byte[] {1, 2, 3, 4});
		when(mockFile.getSize()).thenReturn(12L);
 
	  var response =  controller.UploadDocument(mockFile, "pazyma");
 	  assertEquals(HttpStatus.CREATED,response.getStatusCode());
	  
	  
	}
	@Test
	@Order(3)
	@WithMockUser(username = "user@user.lt", roles = { "USER" })
	public void getDocument() {
		var response = controller.getLoggedUserDocuments();
		assertTrue(response.size() > 0);
		
		
	}
	
	@Test
	@Order(4)
	@WithMockUser(username = "manager@manager.lt", roles = { "MANAGER" })
	public void managerGetDocumentPage() {
		var response = controller.GetDocumentPageFilteredByUploaderSurname("Manager", 1, 10);
		 assertEquals(HttpStatus.OK,response.getStatusCode());
		 assertTrue(response.getBody().getSize() > 0);
		 
			Sort.Order order1 = new Sort.Order(Sort.Direction.DESC, "uploadDate");
			Sort.Order order2 = new Sort.Order(Sort.Direction.DESC, "uploaderSurname");
			Sort.Order order3 = new Sort.Order(Sort.Direction.DESC, "name");
		 
		assertTrue(response.getBody().getSort().equals(Sort.by(order1).and(Sort.by(order2).and(Sort.by(order3)))));
		 
		 response = controller.getDocumentPages(1, 10);
		 assertEquals(HttpStatus.OK,response.getStatusCode());
		 assertTrue(response.getBody().getSize() > 0);
			assertTrue(response.getBody().getSort().equals(Sort.by(order1).and(Sort.by(order2).and(Sort.by(order3)))));
	}
	
	@Test
	@Order(5)
	@WithMockUser(username = "user@user.lt", roles = { "USER" })
	public void deleteDocument() {
		var getDocumentsResponse =  controller.getLoggedUserDocuments();
		int size = getDocumentsResponse.size();
		var doc = getDocumentsResponse.get(0);
		var id = doc.getDocumentId();
		 var deleteResponse = controller.deleteDocument(id);
		 assertEquals(HttpStatus.OK,deleteResponse.getStatusCode());
		 assertEquals(HttpStatus.NOT_FOUND,controller.getDocumentFileById(id).getStatusCode());
		 assertTrue(size > controller.getLoggedUserDocuments().size());
		
		
	}
	
	@Test
	@Order(6)
	@WithMockUser(username = "user@user.lt", roles = { "USER" })
	public void uploadBadFile() throws IOException {
		
		final MockMultipartFile nonPdfFile = mock(MockMultipartFile.class);
		when(nonPdfFile.getOriginalFilename()).thenReturn("pazyma.txt");
		when(nonPdfFile.getContentType()).thenReturn("text/plain");
		when(nonPdfFile.getBytes()).thenReturn(new byte[] {1, 2, 3, 4});
		when(nonPdfFile.getSize()).thenReturn( 1L);
		
		final MockMultipartFile overSizeFile = mock(MockMultipartFile.class);
		when(overSizeFile.getOriginalFilename()).thenReturn("pazyma.pdf");
		when(overSizeFile.getContentType()).thenReturn("application/pdf");
		when(overSizeFile.getBytes()).thenReturn(new byte[] {1, 2, 3, 4});
		when(overSizeFile.getSize()).thenReturn(1024000L + 10L);
		
		  var response =  controller.UploadDocument(nonPdfFile, "pazymatxt");
	 	  assertEquals(HttpStatus.BAD_REQUEST,response.getStatusCode());
	 	  
	 	  response = controller.UploadDocument(overSizeFile, "tooBig");
	  	 	  assertEquals(HttpStatus.BAD_REQUEST,response.getStatusCode());
 
	 	  
		
	}
	


	
  
	

}
