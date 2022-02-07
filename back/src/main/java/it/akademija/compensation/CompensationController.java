package it.akademija.compensation;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.application.ApplicationDTO;
 import it.akademija.journal.JournalService;
import it.akademija.kindergarten.KindergartenController;

@RestController
@Api(value = "application for compensation")
@RequestMapping(path = "/api/kompensacija")
public class CompensationController {
	
	private static final Logger LOG = LoggerFactory.getLogger(KindergartenController.class);
	
	@Autowired
	private CompensationService compensationService;
	
	@Autowired
	private JournalService journalService;
	
	
	/**
	 * 
	 * Create new application for compensation for logged user
	 * 
	 * @param data
	 * @return message
	 */
	@Secured({ "ROLE_USER" })
	 @RequestMapping(value = "/user/new", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ApiOperation(value = "Create new application for compensation")
	@ResponseBody
	public ResponseEntity<Compensation> createNewCompensationApplication(@Valid @RequestBody CompensationDTO data) {
		
		Compensation compensation = compensationService.createNewCompensationApplication(data);
		
	   if(compensation != null)
			return new ResponseEntity<>(compensation, HttpStatus.CREATED);
		  else 
		 	return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
	
	
	@Secured({ "ROLE_MANAGER", "ROLE_ADMIN"})
	@ApiOperation(value="delete compensation application")
	@RequestMapping(value ="/manager/{username}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public String deleteCompensationApplicationByUsername(@ApiParam(value="User name")
			@PathVariable final String username) {
		return username + " kompensacijos prasymas bus istrintas";
	}
	
	
	@Secured({ "ROLE_USER", "ROLE_MANAGER", "ROLE_ADMIN" })
	/**
	 * 
	 * Retreive application for review viewing
	 * 
	 */
	@GetMapping("/user")
	@ApiOperation(value = "Retreive application for compensation for selected user for viewing") 
	public ResponseEntity<Compensation> getCompensationApplicationForUser(String currentUsername,
			CompensationDTO data) {
		
		
		Compensation compensation = compensationService.getCompensationApplicationForUser( currentUsername);
		
		if (compensation != null) 
			return new ResponseEntity<Compensation>(compensation, HttpStatus.OK);
		
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
	
	
	/* kol kas be paging */
	@Secured({ "ROLE_MANAGER" })
	@GetMapping("/manager")
	@ApiOperation(value = "Retreive all applications for compensation")
	public ResponseEntity<List<Compensation>> getAllCopensationApplications() {
		
		return new ResponseEntity<>(compensationService.getAllCompensationApplications(),
				HttpStatus.OK);
 	}
	
	/*
	pagingas to do
	
	@Secured({ "ROLE_MANAGER" })
	@GetMapping("/manager")
	@ApiOperation(value = "Get a page from all submitted applications")
	public Page<CompensationInfo>  getPageAllCompensationApplications (@RequestParam("page") int page,
	@RequestParam("size") int size) {
		
		return null;
	}
	
	
	*/

}
