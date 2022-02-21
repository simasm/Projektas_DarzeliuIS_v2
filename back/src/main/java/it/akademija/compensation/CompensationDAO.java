package it.akademija.compensation;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CompensationDAO extends JpaRepository<Compensation, Long>{
	
	boolean existsCompensationByChildPersonalCode(String childPersonalCode);
	
	List<Compensation> findCompensationsByMainGuardianUsername(String username);


	Compensation findCompensationByChildPersonalCode(String childPersonalCode);
	
	void deleteCompensationByChildPersonalCode(String childPersonalCode);
	
}
