package it.akademija.security;

import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;

public class ArgonEncoder extends  Argon2PasswordEncoder{
	
	private String pepper;
	
	public ArgonEncoder(int saltLength, int hashLength, int parallelism, int memory, int iterations, boolean hasPepper) {
		super(saltLength,hashLength,parallelism,memory,iterations);
		if(hasPepper)
			this.pepper = "Red$1&Hot*5^Chilly&VI1CyDbqRrlA3dUu282";
		else
			this.pepper = "";
		 
	}

	@Override
	public String encode(CharSequence rawPassword) {
		
	 
		return  super.encode(rawPassword + pepper);
		 
		
	 
	 
	}

	/**
	 * Add the pepper to the raw password and call BCryptPasswordEncoder.
	 *
	 * @param rawPassword     The original password.
	 * @param encodedPassword The encoded password.
	 * @return Whether passwords match.
	 */
	@Override
	public boolean matches(CharSequence rawPassword, String encodedPassword) {
				
	 
		return super.matches(rawPassword + pepper , encodedPassword);
	 

		 
	}

}
