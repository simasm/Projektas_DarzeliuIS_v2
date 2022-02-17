package it.akademija.compensation;

import java.time.LocalDate;

import it.akademija.user.ParentDetails;
import it.akademija.user.User;
import it.akademija.user.UserInfo;

public class CompensationDetails {
	
	private Long id;
	private LocalDate submittedAt;
	private String childSurname;
	private String childPersonalCode;
	private LocalDate childBirthdate;
	
	private UserInfo mainGuardian;
	
	private String kindergartenId;
	private String kindergartenName;
	private String kindergartenAddress;
	private String kindergartenPhoneNumber;
	private String kindergartenEmail;
	private String kindergartenBankName;
	private String kindergartenBankAccountNumber;
	private String kindergartenBankCode;
	
	
	public CompensationDetails(Long id, LocalDate submittedAt, String childSurname, String childPersonalCode,
			LocalDate childBirthdate, UserInfo mainGuardian, String kindergartenId, String kindergartenName,
			String kindergartenAddress, String kindergartenPhoneNumber, String kindergartenEmail,
			String kindergartenBankName, String kindergartenBankAccountNumber, String kindergartenBankCode) {
		super();
		this.id = id;
		this.submittedAt = submittedAt;
		this.childSurname = childSurname;
		this.childPersonalCode = childPersonalCode;
		this.childBirthdate = childBirthdate;
		
		this.mainGuardian = mainGuardian;
		
		
		this.kindergartenId = kindergartenId;
		this.kindergartenName = kindergartenName;
		this.kindergartenAddress = kindergartenAddress;
		this.kindergartenPhoneNumber = kindergartenPhoneNumber;
		this.kindergartenEmail = kindergartenEmail;
		this.kindergartenBankName = kindergartenBankName;
		this.kindergartenBankAccountNumber = kindergartenBankAccountNumber;
		this.kindergartenBankCode = kindergartenBankCode;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public LocalDate getSubmittedAt() {
		return submittedAt;
	}


	public void setSubmittedAt(LocalDate submittedAt) {
		this.submittedAt = submittedAt;
	}


	public String getChildSurname() {
		return childSurname;
	}


	public void setChildSurname(String childSurname) {
		this.childSurname = childSurname;
	}


	public String getChildPersonalCode() {
		return childPersonalCode;
	}


	public void setChildPersonalCode(String childPersonalCode) {
		this.childPersonalCode = childPersonalCode;
	}


	public LocalDate getChildBirthdate() {
		return childBirthdate;
	}


	public void setChildBirthdate(LocalDate childBirthdate) {
		this.childBirthdate = childBirthdate;
	}


	public UserInfo getMainGuardian() {
		return mainGuardian;
	}


	public void setMainGuardian(UserInfo mainGuardian) {
		this.mainGuardian = mainGuardian;
	}


	public String getKindergartenId() {
		return kindergartenId;
	}


	public void setKindergartenId(String kindergartenId) {
		this.kindergartenId = kindergartenId;
	}


	public String getKindergartenName() {
		return kindergartenName;
	}


	public void setKindergartenName(String kindergartenName) {
		this.kindergartenName = kindergartenName;
	}


	public String getKindergartenAddress() {
		return kindergartenAddress;
	}


	public void setKindergartenAddress(String kindergartenAddress) {
		this.kindergartenAddress = kindergartenAddress;
	}


	public String getKindergartenPhoneNumber() {
		return kindergartenPhoneNumber;
	}


	public void setKindergartenPhoneNumber(String kindergartenPhoneNumber) {
		this.kindergartenPhoneNumber = kindergartenPhoneNumber;
	}


	public String getKindergartenEmail() {
		return kindergartenEmail;
	}


	public void setKindergartenEmail(String kindergartenEmail) {
		this.kindergartenEmail = kindergartenEmail;
	}


	public String getKindergartenBankName() {
		return kindergartenBankName;
	}


	public void setKindergartenBankName(String kindergartenBankName) {
		this.kindergartenBankName = kindergartenBankName;
	}


	public String getKindergartenBankAccountNumber() {
		return kindergartenBankAccountNumber;
	}


	public void setKindergartenBankAccountNumber(String kindergartenBankAccountNumber) {
		this.kindergartenBankAccountNumber = kindergartenBankAccountNumber;
	}


	public String getKindergartenBankCode() {
		return kindergartenBankCode;
	}


	public void setKindergartenBankCode(String kindergartenBankCode) {
		this.kindergartenBankCode = kindergartenBankCode;
	}
	
	

}
