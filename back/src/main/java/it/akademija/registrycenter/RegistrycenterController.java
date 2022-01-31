package it.akademija.registrycenter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.application.ApplicationController;
import it.akademija.journal.JournalService;

@RestController
@Api(value = "Registrycenter")
@RequestMapping(path = "/api/registrucentras")
public class RegistrycenterController {
	
	private static final Logger LOG = LoggerFactory.getLogger(ApplicationController.class);
	
//	@Autowired
//	private JournalService journalService;
	
	
//	@Secured({ "ROLE_USER", "ROLE_ADMIN", "ROLE_MANAGER" })
	@GetMapping("/{childPersonalCode}")
	@ApiOperation(value = "Get full info about child from ID code")
	public String  getChildDataFromID( 
			@ApiParam(value = "Application id", required = true) @PathVariable String childPersonalCode) {
				
		
		String url = "https://darzelis.akademijait.vtmc.lt/registru-centras/vaikai/" +
				childPersonalCode;
		RestTemplate restTemplate = new RestTemplate();
 		Object  data = restTemplate.getForObject(url, Object.class);
 		System.out.println(data.toString());
 		System.out.println(data);
		return null;
				 
		
	}

}
