package it.akademija.compensation;

 

public class CompensationDTO {
	
	private ChildInfo childInfo;
	private KindergartenInfo kindergartenInfo;
	private GuardianInfo guardianInfo;
	
	
    public CompensationDTO() {
    	
    }
    

	public CompensationDTO(ChildInfo childInfo, KindergartenInfo kindergartenInfo, GuardianInfo guardianInfo) {
		super();
		this.childInfo = childInfo;
		this.kindergartenInfo = kindergartenInfo;
		this.guardianInfo = guardianInfo;
	}



	public ChildInfo getChildInfo() {
		return childInfo;
	}

	public void setChildInfo(ChildInfo childInfo) {
		this.childInfo = childInfo;
	}

	public KindergartenInfo getKindergartenInfo() {
		return kindergartenInfo;
	}

	public void setKindergartenInfo(KindergartenInfo kindergartenInfo) {
		this.kindergartenInfo = kindergartenInfo;
	}

	public GuardianInfo getGuardianInfo() {
		return guardianInfo;
	}

	public void setGuardianInfo(GuardianInfo guardianInfo) {
		this.guardianInfo = guardianInfo;
	}

	
	
	


}



  class ChildInfo {
	private String personalID;
	private String name;
	private String surname;
	private String dateOfBirth;
	
	
	
	public ChildInfo(String personalID, String name, String surname, String dateOfBirth) {
		super();
		this.personalID = personalID;
		this.name = name;
		this.surname = surname;
		this.dateOfBirth = dateOfBirth;
	}
	public String getPersonalID() {
		return personalID;
	}
	public void setPersonalID(String personalID) {
		this.personalID = personalID;
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
	public String getDateOfBirth() {
		return dateOfBirth;
	}
	public void setDateOfBirth(String dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	
}

  class KindergartenInfo {
	private String name;
	private String code;
	private String address;
	private String phone;
	private String email;
	private String bankName;
	private String accountNumber;
	private String bankCode;
	
	
	
	public KindergartenInfo(String name, String code, String address, String phone, String email, String bankName,
			String accountNumber, String bankCode) {
		super();
		this.name = name;
		this.code = code;
		this.address = address;
		this.phone = phone;
		this.email = email;
		this.bankName = bankName;
		this.accountNumber = accountNumber;
		this.bankCode = bankCode;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
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
	public String getBankName() {
		return bankName;
	}
	public void setBankName(String bankName) {
		this.bankName = bankName;
	}
	public String getAccountNumber() {
		return accountNumber;
	}
	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}
	public String getBankCode() {
		return bankCode;
	}
	public void setBankCode(String bankCode) {
		this.bankCode = bankCode;
	}
	
	
	
}

  class GuardianInfo {
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
