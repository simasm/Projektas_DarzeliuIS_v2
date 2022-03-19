package it.akademija.compensation;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
 
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
 
 import it.akademija.journal.JournalService;
import it.akademija.journal.ObjectType;
import it.akademija.journal.OperationType;
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
	public ResponseEntity<CompensationDetails> createNewCompensationApplication(@ApiParam(value="Data of child, mainGuardian and kindergarten")@Valid @RequestBody CompensationDTO data) {
		
		Compensation compensation = null; 
	
		try {
			compensation = compensationService.createNewCompensationApplication(data);
	
		}
		catch (Exception e) {
				//jau egzistuoja vaiko id duomenu bazeje
		}
		
		
	   if(compensation != null)  {
			String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
			
			journalService.newJournalEntry(OperationType.COMPENSATION_SUBMIT, compensation.getId(), ObjectType.APPLICATION,
					"Kompensacijos prašymas sukurtas");
			
			return new ResponseEntity<>(CompensationService.compensationToDTO(compensation), HttpStatus.CREATED);
	   }
		  else 
			  journalService.newJournalEntry(OperationType.COMPENSATION_SUBMIT_FAILED, null, ObjectType.APPLICATION,
						"Kompensacijos prašymas vaikui asmens kodu " + data.getChildInfo().getPersonalID() + " jau yra pateiktas");
	   
		 	return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		 	
	}
	
	/**
	 * 
	 * Delete compensation application by child personal code
	 * 
	 * @param childCode
	 * 
	 */
	@Secured({ "ROLE_MANAGER", "ROLE_ADMIN"})
	@ApiOperation(value = "Delete compensation application by child personal code")
	@RequestMapping(value = "/manager/delete/{childCode}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteCompensationApplicationByChildCode(@ApiParam(value="Child personal code whose application to be deleted")
			@PathVariable String childCode) {
		
		  compensationService.deleteCompensationApplicationByChildCode(childCode);
	}
	
	/**
	 * 
	 * Retrieve a an application for compensation by child personal code
	 * 
	 * @param childPersonalCode
	 * @return compensation data
	 */
	@Secured({ "ROLE_USER", "ROLE_MANAGER", "ROLE_ADMIN" })
	@ApiOperation(value="Get a compensation application by child personal code")
	@GetMapping("/{childPersonalCode}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<CompensationDetails> getCompensationApplicationByChildCode(
			@ApiParam(value="Child personal code whose application to be retrieved")@PathVariable
			String childPersonalCode ) {
		
		Compensation compensation = compensationService.
				getCompensationApplicationByChildCode(childPersonalCode);
		
		   if(compensation != null)
		   {
			   
			   
				return new ResponseEntity<>(CompensationService.compensationToDTO(compensation), HttpStatus.OK);
		   }
			  else 
			 	return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			
		
	}
	
	
	/**
	 * 
	 * Retrieve application for review viewing
	 * 
	 */
	@Secured({ "ROLE_USER", "ROLE_MANAGER", "ROLE_ADMIN" })
	@GetMapping("/user")
	@ApiOperation(value = "Retrieve application for compensation for selected user for viewing") 
	public ResponseEntity<List<CompensationDetails>> 
			getCompensationApplicationsForUser(String currentUsername) {
		
		
		List<Compensation> compensations = compensationService.
						getCompensationApplicationForUser( currentUsername);
		
		if(compensations != null) {
			
			List<CompensationDetails> compensationDetails = new ArrayList<>();
		
			for(Compensation compensation : compensations) {
					compensationDetails.add(CompensationService.compensationToDTO(compensation));	

		
			}
		
		return new ResponseEntity<>(compensationDetails, HttpStatus.OK);
		}
		else 
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			   
			
	}
	
	
	/**
	 * 
	 * Retrieve all submitted applications for compensation
	 * @return list of compensations
	 */
	@Secured({ "ROLE_MANAGER" })
	@GetMapping("/manager/list")
	@ApiOperation(value = "Retrieve all applications for compensation")
	public ResponseEntity<List<CompensationDetails>> getAllCopensationApplications() {
		List<Compensation> compensations = compensationService
				.getAllCompensationApplications();

	if(compensations != null) {
		
		List<CompensationDetails> compensationDetails = new ArrayList<>();
		
	
		for(Compensation compensation : compensations) {
				compensationDetails.add(CompensationService.compensationToDTO(compensation) );	
		
			}
		
		return new ResponseEntity<>(compensationDetails, HttpStatus.OK);
		}
		else 
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			   
			
	}
	 
	 
	/**
	 * 
	 * Retrieve a page from all submitted applications for compensations
	 * @param page
	 * @param size
	 * 
	 * @return page of applications for compensation
	 */
	@Secured({ "ROLE_MANAGER" })
	@GetMapping("/manager/page")
	@ApiOperation(value = "Get a page from all submitted applications")
	public Page<CompensationDetails>  getPageCompensationApplications (@RequestParam("page") int page,
	@RequestParam("size") int size) {
		
		
		Sort.Order order = new Sort.Order(Sort.Direction.ASC, "childName").ignoreCase();
		Pageable compensation = PageRequest.of(page, size, Sort.by(order));
		return compensationService.getPageFromCompensationApplications(compensation);
	}
	
 

}
