package it.akademija.compensation;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
 

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.role.Role;
import it.akademija.compensation.GuardianInfo;
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
	@Transactional
	public void repositorySavesAndDeletes() {
		

 

		User mainGuardian = userDAO.save(
				new User(Role.USER, "Test", "Test", "test@test.lt", null, "test@test.lt", "test@test.lt"));
		
		Compensation compensation = new Compensation(
				"Testvvardas",
				"Testvpavarde",
				"51701011234",
				LocalDate.of(2017,1, 1),
				mainGuardian,
				new GuardianInfo( "Test",
						"Test",
						"48602257896",
						"+37063502254",
						"test@test.lt",
						"Adresas 1"),
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
		 	compensationDAO.findCompensationsByMainGuardianUsername("test@test.lt").get(0));
		
		assertEquals(compensation,
				compensationDAO
				.findCompensationByMainGuardianParentDetailsPersonalCode(
						"48602257896"));
		
		compensationDAO.deleteById(compensation.getId());
		 
		assertTrue(compensationDAO.findAll().isEmpty());
		
		userDAO.delete(mainGuardian);
		
	}

}
