package it.akademija.compensation;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
 
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
 
 import it.akademija.journal.JournalService;
import it.akademija.kindergarten.KindergartenController;
import it.akademija.role.Role;
import it.akademija.user.UserInfo;
import it.akademija.user.UserService;

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
	public ResponseEntity<CompensationDetails> createNewCompensationApplication(@Valid @RequestBody CompensationDTO data) {
		
		Compensation compensation = null; 
	
		try {
			compensation = compensationService.createNewCompensationApplication(data);
	
		}
		catch (Exception e) {
				//jau egzistuoja vaiko id duomenu bazeje
		}
		
		
	   if(compensation != null)  {
			String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
			
			return new ResponseEntity<>(new CompensationDetails(
					compensation.getId(),
					compensation.getSubmittedAt(),
					compensation.getChildName(),
					compensation.getChildSurname(),
					compensation.getChildPersonalCode(),
					compensation.getChildBirthdate(),
					
					compensation.getGuardianInfo(),
					
					compensation.getKindergartenId(),
					compensation.getKindergartenName(),
					compensation.getKindergartenAddress(),
					compensation.getKindergartenPhoneNumber(),
					compensation.getKindergartenEmail(),
					compensation.getKindergartenBankName(),
					compensation.getKindergartenBankAccountNumber(),
					compensation.getKindergartenBankCode()), HttpStatus.CREATED);
	   }
		  else 
		 	return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
	
	
	@Secured({ "ROLE_MANAGER", "ROLE_ADMIN"})
	@ApiOperation(value="delete compensation application")
	@RequestMapping(value ="/manager/{childCode}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteCompensationApplicationByChildCode(@ApiParam(value="child code")
			@PathVariable String childCode) {
		
		  compensationService.deleteCompensationApplicationByChildCode(childCode);
	}
	
	
	@Secured({ "ROLE_USER", "ROLE_MANAGER", "ROLE_ADMIN" })
	@GetMapping("/{childPersonalCode}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<CompensationDetails> getCompensationApplicationByChildCode(
			@PathVariable
			String childPersonalCode ) {
		
		Compensation compensation = compensationService.
				getCompensationApplicationByChildCode(childPersonalCode);
		
		   if(compensation != null)
		   {
			   
			   
				return new ResponseEntity<>(new CompensationDetails(
						compensation.getId(),
						compensation.getSubmittedAt(),
						compensation.getChildName(),
						compensation.getChildSurname(),
						compensation.getChildPersonalCode(),
						compensation.getChildBirthdate(),
						
						compensation.getGuardianInfo(),
						
						
						compensation.getKindergartenId(),
						compensation.getKindergartenName(),
						compensation.getKindergartenAddress(),
						compensation.getKindergartenPhoneNumber(),
						compensation.getKindergartenEmail(),
						compensation.getKindergartenBankName(),
						compensation.getKindergartenBankAccountNumber(),
						compensation.getKindergartenBankCode()), HttpStatus.OK);
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
					compensationDetails.add( new CompensationDetails(
							compensation.getId(),
							compensation.getSubmittedAt(),
							compensation.getChildName(),
							compensation.getChildSurname(),
							compensation.getChildPersonalCode(),
							compensation.getChildBirthdate(),
							
							compensation.getGuardianInfo(),
							
							compensation.getKindergartenId(),
							compensation.getKindergartenName(),
							compensation.getKindergartenAddress(),
							compensation.getKindergartenPhoneNumber(),
							compensation.getKindergartenEmail(),
							compensation.getKindergartenBankName(),
							compensation.getKindergartenBankAccountNumber(),
							compensation.getKindergartenBankCode()));	
					
		
		
		
			}
		
		return new ResponseEntity<>(compensationDetails, HttpStatus.OK);
		}
		else 
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			   
			
	}
	
	
	/* kol kas be paging */
	@Secured({ "ROLE_MANAGER" })
	@GetMapping("/manager")
	@ApiOperation(value = "Retrieve all applications for compensation")
	public ResponseEntity<List<CompensationDetails>> getAllCopensationApplications() {
		List<Compensation> compensations = compensationService
				.getAllCompensationApplications();

	if(compensations != null) {
		
		List<CompensationDetails> compensationDetails = new ArrayList<>();
	
		for(Compensation compensation : compensations) {
				compensationDetails.add( new CompensationDetails(
						compensation.getId(),
						compensation.getSubmittedAt(),
						compensation.getChildName(),
						compensation.getChildSurname(),
						compensation.getChildPersonalCode(),
						compensation.getChildBirthdate(),
						
						compensation.getGuardianInfo(),
						
						compensation.getKindergartenId(),
						compensation.getKindergartenName(),
						compensation.getKindergartenAddress(),
						compensation.getKindergartenPhoneNumber(),
						compensation.getKindergartenEmail(),
						compensation.getKindergartenBankName(),
						compensation.getKindergartenBankAccountNumber(),
						compensation.getKindergartenBankCode()));	
				
	
	
		
			}
		
		return new ResponseEntity<>(compensationDetails, HttpStatus.OK);
		}
		else 
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			   
			
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
