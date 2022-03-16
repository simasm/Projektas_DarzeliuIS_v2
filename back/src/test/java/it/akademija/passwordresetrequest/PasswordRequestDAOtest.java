package it.akademija.passwordresetrequest;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import it.akademija.role.Role;
import it.akademija.user.User;
import it.akademija.user.UserDAO;
import it.akademija.user.passwordresetrequests.UserPasswordResetRequestsDAO;
import it.akademija.user.passwordresetrequests.UserPasswordResetRequestsEntity;

@DataJpaTest
public class PasswordRequestDAOtest {
	
	@Autowired
	private UserPasswordResetRequestsDAO passwordDAO;
	
	@Autowired
	private TestEntityManager entityManager;
	
	@Autowired
	private UserDAO userDAO;
	
	@Test
	public void shouldCreateAndFindPasswordRequest() {
		
		User testUser = userDAO.save(
				new User(Role.USER, "Test", "Test", "test@test.lt", null, "test@test.lt", "test@test.lt"));
		
		UserPasswordResetRequestsEntity testRequest = new UserPasswordResetRequestsEntity(testUser.getUserId());
		
		testRequest = entityManager.persistAndFlush(testRequest);
		
		assertTrue(passwordDAO.findById(testUser.getUserId()).isPresent());
		
		passwordDAO.deleteById(testUser.getUserId());
		assertTrue(passwordDAO.findById(testUser.getUserId()).isEmpty());
		
		userDAO.delete(testUser);
	}
}
