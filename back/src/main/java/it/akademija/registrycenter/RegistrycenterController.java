package it.akademija.registrycenter;

import java.time.LocalDate;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.application.ApplicationController;


@RestController
@Api(value = "Registry center")
@RequestMapping(path = "/api/registru-centras")
public class RegistrycenterController {
	
	
	//todo logging
	private static final Logger LOG = LoggerFactory.getLogger(ApplicationController.class);
	
	//todo
	//	@Autowired
	//	private JournalService journalService;
	
	
	
	@Autowired
	private RegistrycenterService registrycenterService;

	/**
	 * Get child's data from external registry center API
	 * by querying personal ID code
	 * @return name, surname, personalID, date of birth
	 */
 	@Secured({ "ROLE_USER", "ROLE_ADMIN", "ROLE_MANAGER" })
 	@RequestMapping(value = "/{childPersonalCode}", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
 	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get full info about child from ID code")
	@ResponseBody
	public ResponseEntity<RegistrycenterDetails> getChildDataByIDFromExternalAPI( 
			@ApiParam(value = "Child personal code", required = true) @PathVariable @Valid String childPersonalCode) {
			
		 
		RegistrycenterDetailsDTO data = registrycenterService.getDataByID(childPersonalCode);
		
		if(data != null) {
		 		
			return new ResponseEntity<>(new RegistrycenterDetails(data.getVardas(),
					data.getPavarde(),
					data.getAsmensKodas(),
					LocalDate.parse(data.getGimimoData())),
					HttpStatus.OK);
		}
		else {
			//if id code doesn't exist in api or connection is not established
			//returns empty strings
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			 
		} 
	}

}
