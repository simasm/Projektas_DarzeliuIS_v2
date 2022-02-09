package it.akademija.compensation;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
 

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import it.akademija.role.Role;
import it.akademija.user.ParentDetails;
import it.akademija.user.ParentDetailsDAO;
import it.akademija.user.User;
import it.akademija.user.UserDAO;

@DataJpaTest
public class CompensationRepositoryTest {
	
	@Autowired
	private TestEntityManager entityManager;
	
	@Autowired
	private CompensationDAO compensationDAO;
	
	@Autowired
	private UserDAO userDAO;
	
	@Autowired
	private ParentDetailsDAO parentDetailsDAO;
	
	@Test
	public void repositorySavesAndDeletes() {
		

		ParentDetails parentDetails = new ParentDetails("48602257896", "Test", "Test", "test@test.lt", "Adresas 1",
				"+37063502254");

		User mainGuardian = userDAO.save(
				new User(Role.USER, "Test", "Test", "test@test.lt", parentDetails, "test@test.lt", "test@test.lt"));
		
		Compensation compensation = new Compensation(
				"Testvvardas",
				"Testvpavarde",
				"51701011234",
				LocalDate.of(2017,1, 1),
				mainGuardian,
				"302295680",
				"Testprivatus",
				"Vysniu gatve 13",
				"123456",
				"darzelis@test.lt",
				"Testbankas",
				"TBANK1",
				"1234" );
		 
		entityManager.persistAndFlush(compensation);
		
		assertEquals(compensation.getChildName(), 
				compensationDAO.findById(compensation.getId()).get().getChildName());
	 	 
		
		assertEquals(true,
				compensationDAO.existsCompensationByChildPersonalCode("51701011234"));
		
		
		assertEquals(compensation,
		 	compensationDAO.findCompensationByMainGuardianUsername("test@test.lt"));
		
		assertEquals(compensation,
				compensationDAO
				.findCompensationByMainGuardianParentDetailsPersonalCode(
						 parentDetails.getPersonalCode()));
		
		compensationDAO.deleteById(compensation.getId());
		 
		assertTrue(compensationDAO.findAll().isEmpty());
		
	}

}
