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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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
	@PostMapping("/user/new")

	@ApiOperation(value = "Create new application for compensation")
	public ResponseEntity<String> createNewCompensationApplication(@Valid @RequestBody CompensationDTO data) {
		
		compensationService.createNewCompensationApplication(data);
		
		return new ResponseEntity<>("Prasymas jau egzistuoja", HttpStatus.BAD_REQUEST);
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
	public List<Compensation> getAllCopensationApplications() {
		
		return compensationService.getAllCompensationApplications();
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
