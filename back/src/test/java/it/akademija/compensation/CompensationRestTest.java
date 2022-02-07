package it.akademija.compensation;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.google.gson.Gson;

import it.akademija.role.Role;
import it.akademija.user.ParentDetails;
import it.akademija.user.User;

public class CompensationRestTest {

	@Autowired
	private CompensationController controller;
	
	@Autowired
	private MockMvc mvc;

	@Test
	@Order(2)
	@WithMockUser(username = "test@test.lt", roles = {"USER"}) 
	public void userCanPostCompensation() throws Exception {
		
		ParentDetails parentDetails = new ParentDetails("48602257896", "Test", "Test", "test@test.lt", "Adresas 1",
				"+37063502254");

		User mainGuardian =  
				new User(Role.USER, "Test", "Test", "test@test.lt", parentDetails, "test@test.lt", "test@test.lt");
		
		mvc.perform(MockMvcRequestBuilders.
				post("/user/new")
				.content(asJsonString(new Compensation(
						"Testvvardas",
						"Testvpavarde",
						"51701011234",
						LocalDate.of(2017,1, 1),
						mainGuardian,
						"302295680",
						"Testprivatus",
						"Vysniu gatve 13",
						"123456",
						"darzelis@test.lt",
						"Testbankas",
						"TBANK1",
						"1234" )))
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
				
						
						.andExpect(status().isCreated()).andReturn()
				;
						
						
		
	}
  
	@Test
	@Disabled
	@Order(2)
	@WithMockUser(username = "manager@manager.lt", roles = { "MANAGER" })
	public void managerCanRetrieveCompensationsList() throws Exception {
		
	
	     mvc.perform(MockMvcRequestBuilders
	    		 .get("/manager")
	    		 .accept(MediaType.APPLICATION_JSON))
	     		 .andDo(print())
	     		 .andExpect(status().isOk())
	     		;
	    	
	}
	
	public static String asJsonString(final Object obj) {
	    try {
	    	return    new Gson().toJson(  obj, Compensation.class);
	    } catch (Exception e) {
	    	throw new RuntimeException(e);
	    }
	      
	}
	
}
