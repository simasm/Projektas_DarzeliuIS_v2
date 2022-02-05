package it.akademija.registrycenter;

import java.time.LocalDate;

public class RegistrycenterDetails {
	
	private String name;
	
	private String surname;

	private String personalID;
	
	private LocalDate dateOfBirth;	

	public RegistrycenterDetails(String vardas, String pavarde, String asmensKodas, LocalDate gimimoData) {
		super();
		this.name = vardas;
		this.surname = pavarde;
		this.personalID = asmensKodas;
		this.dateOfBirth = gimimoData;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String vardas) {
		this.name = vardas;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String pavarde) {
		this.surname = pavarde;
	}

	public String getPersonalID() {
		return personalID;
	}

	public void setPersonalID(String asmensKodas) {
		this.personalID = asmensKodas;
	}

	public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(LocalDate gimimoData) {
		this.dateOfBirth = gimimoData;
	}


	



}
