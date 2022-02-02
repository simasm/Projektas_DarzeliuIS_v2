package it.akademija.registrycenter;

import java.time.LocalDate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.application.ApplicationController;


@RestController
@Api(value = "Registry center")
@RequestMapping(path = "/api/registru-centras")
public class RegistrycenterController {
	
	private static final Logger LOG = LoggerFactory.getLogger(ApplicationController.class);
	
//	@Autowired
//	private JournalService journalService;
	
	@Autowired
	private RegistrycenterService registrycenterService;
	
//	@Secured({ "ROLE_USER", "ROLE_ADMIN", "ROLE_MANAGER" })
 	@RequestMapping(value = "/{childPersonalCode}", method = RequestMethod.GET)
	//@GetMapping("/{childPersonalCode}")
	@ApiOperation(value = "Get full info about child from ID code")
	@ResponseBody
	public RegistrycenterInfo getChildDataByIDFromExternalAPI( 
			@ApiParam(value = "Application id", required = true) @PathVariable String childPersonalCode) {
			
		
		RegistrycenterDTO data = registrycenterService.getDataByID(childPersonalCode);
		
	//	System.out.println("registru centras - " + childPersonalCode + " " + data);
		
	//	System.out.println();
		 return  new RegistrycenterInfo(data.getVardas(), data.getPavarde(), data.getAsmensKodas(), LocalDate.parse(data.getGimimoData()));
				 
		//return new ResponseEntity<>(data.toString(), HttpStatus.OK);
	}

}
