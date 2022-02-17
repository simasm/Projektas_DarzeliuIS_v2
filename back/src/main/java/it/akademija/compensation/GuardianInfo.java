package it.akademija.compensation;

public class GuardianInfo {
	private String name;
	private String surname;
	private String personalCode;
	private String phone;
	private String email;
	private String address;


	public GuardianInfo(String name, String surname, String personalCode, String phone, String email,
			String address) {
		super();
		this.name = name;
		this.surname = surname;
		this.personalCode = personalCode;
		this.phone = phone;
		this.email = email;
		this.address = address;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	public String getPersonalCode() {
		return personalCode;
	}
	public void setPersonalCode(String personalCode) {
		this.personalCode = personalCode;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
	
}