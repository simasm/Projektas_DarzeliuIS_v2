package it.akademija.compensation;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CompensationDAO extends JpaRepository<Compensation, Long>{
	
	boolean existsCompensationByChildPersonalCode(String childPersonalCode);
	
	Compensation findCompensationByMainGuardianUsername(String username);
	
	Compensation findCompensationByMainGuardianParentDetailsPersonalCode(String personalCode);

	Compensation findCompensationByChildPersonalCode(String childPersonalCode);
	
	void deleteCompensationByChildPersonalCode(String childPersonalCode);
	
}
