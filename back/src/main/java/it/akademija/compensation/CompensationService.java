package it.akademija.compensation;

import java.time.LocalDate;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.user.User;
import it.akademija.user.UserService;

  

@Service
public class CompensationService {
    
	@Autowired
	private CompensationDAO compensationDAO;
	
	@Autowired
	private UserService userService;
	
	@Transactional
	public Compensation createNewCompensationApplication(@Valid CompensationDTO data) {
		
		String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
		
		User mainGuardian = userService.findByUsername(currentUsername);
		
		Compensation compensation =  new Compensation(
				data.getChildInfo().getName(),
				data.getChildInfo().getSurname(),
				data.getChildInfo().getPersonalID(),
				LocalDate.parse(data.getChildInfo().getDateOfBirth()),
				mainGuardian,
				data.getGuardianInfo(),
				data.getKindergartenInfo().getCode(),
				data.getKindergartenInfo().getName(),
				data.getKindergartenInfo().getAddress(),
				data.getKindergartenInfo().getPhone(),
				data.getKindergartenInfo().getEmail(),
				data.getKindergartenInfo().getBankName(),
				data.getKindergartenInfo().getAccountNumber(),
				data.getKindergartenInfo().getBankCode() );
		
				compensation.setSubmittedAt();
				
		return compensationDAO.saveAndFlush(compensation);
	}
	
	public List<Compensation> getCompensationApplicationForUser (String currentUsername) {
		return compensationDAO.findCompensationsByMainGuardianUsername(currentUsername);
	}
	@Transactional(readOnly = true)
	public List<Compensation> getAllCompensationApplications() {
		
		
		return compensationDAO.findAll();
	}
	
	@Transactional
	public String deleteCompensationsApplicationByUsername(String username) {
		List<Compensation> compensations = 
				compensationDAO.findCompensationsByMainGuardianUsername(username);
		if(compensations != null) {
		 compensations.forEach(compensation->compensationDAO.delete(compensation));
		 	
		 return "Naudotojo kompensaciju prasymai istrinti";
		  
		}
		 
			return "Naudotojas neturi kompensaciju prasymu";
	}
	
	@Transactional
	public Compensation getCompensationApplicationByChildCode(String childCode) {
		 
			return	compensationDAO.findCompensationByChildPersonalCode(childCode);
	 
	}
	
	
	//to do return messasge
	@Transactional
	public void deleteCompensationApplicationByChildCode(String childCode) {
		
		  compensationDAO.deleteCompensationByChildPersonalCode(childCode);
	}
	
 	public boolean existsByChildCode(String childCode) {
	    return compensationDAO.existsCompensationByChildPersonalCode(childCode);
	}

	
	public Page<CompensationDetails> getPageFromCompensationApplications(Pageable pageable) {
		 
		 var compensationPage =  compensationDAO.findAll(pageable);
		 
		 Page<CompensationDetails> 	compensationDetailsPage = compensationPage.map(  
				compensation-> new CompensationDetails(
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
		
		 return compensationDetailsPage;
	}
	
}
