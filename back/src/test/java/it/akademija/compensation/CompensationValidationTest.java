package it.akademija.compensation;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.role.Role;
import it.akademija.user.User;
import it.akademija.user.UserDAO;

@DataJpaTest
public class CompensationValidationTest {
	
	@Autowired
	private TestEntityManager entityManager;
	
	@Autowired
	private CompensationDAO compensationDAO;
	
	@Autowired
	private UserDAO userDAO;
	
	 
	
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
			"+37067625896",
			"darzelis@test.lt",
			"Testbankas",
			"LT147044012039850426",
			"70440" );
	 
		entityManager.persistAndFlush(compensation);
	
		assertEquals(compensation.getChildName(), 
						compensationDAO.findById(compensation.getId()).get().getChildName());
	
		compensationDAO.deleteById(compensation.getId());
		
		userDAO.delete(mainGuardian);
		
		assertEquals(false,
				compensationDAO.existsCompensationByChildPersonalCode("51701011234"));
	}
	
	
}
