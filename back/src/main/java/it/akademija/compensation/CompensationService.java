package it.akademija.compensation;

import java.time.LocalDate;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
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
	
	public Compensation getCompensationApplicationForUser (String currentUsername) {
		return compensationDAO.findCompensationByMainGuardianUsername(currentUsername);
	}
	@Transactional(readOnly = true)
	public List<Compensation> getAllCompensationApplications() {
		
		
		return compensationDAO.findAll();
	}
	
	@Transactional
	public String deleteCompensationApplicationByUsername(String username) {
		Compensation compensaion = 
				compensationDAO.findCompensationByMainGuardianUsername(username);
		if(compensaion != null) {
		  compensationDAO.delete(compensaion);
		  return "Naudotojo " + username + " kompensacija su id " + compensaion.getId() +
				  " istrinta";
		}
		else
			return "Tokios kompensacijos nera";
	}
	
}
