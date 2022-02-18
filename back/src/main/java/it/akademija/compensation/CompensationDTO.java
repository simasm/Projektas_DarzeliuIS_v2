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
	private ChildInfoData data = new ChildInfoData();



	public ChildInfo(String personalID, String name, String surname, String dateOfBirth) {
		super();
		this.data.personalID = personalID;
		this.data.name = name;
		this.data.surname = surname;
		this.data.dateOfBirth = dateOfBirth;
	}
	public String getPersonalID() {
		return data.personalID;
	}
	public void setPersonalID(String personalID) {
		this.data.personalID = personalID;
	}
	public String getName() {
		return data.name;
	}
	public void setName(String name) {
		this.data.name = name;
	}
	public String getSurname() {
		return data.surname;
	}
	public void setSurname(String surname) {
		this.data.surname = surname;
	}
	public String getDateOfBirth() {
		return data.dateOfBirth;
	}
	public void setDateOfBirth(String dateOfBirth) {
		this.data.dateOfBirth = dateOfBirth;
	}
	
}

  class KindergartenInfo {
	private KindergartenInfoData data = new KindergartenInfoData();



	public KindergartenInfo(String name, String code, String address, String phone, String email, String bankName,
			String accountNumber, String bankCode) {
		super();
		this.data.name = name;
		this.data.code = code;
		this.data.address = address;
		this.data.phone = phone;
		this.data.email = email;
		this.data.bankName = bankName;
		this.data.accountNumber = accountNumber;
		this.data.bankCode = bankCode;
	}
	public String getName() {
		return data.name;
	}
	public void setName(String name) {
		this.data.name = name;
	}
	public String getCode() {
		return data.code;
	}
	public void setCode(String code) {
		this.data.code = code;
	}
	public String getAddress() {
		return data.address;
	}
	public void setAddress(String address) {
		this.data.address = address;
	}
	public String getPhone() {
		return data.phone;
	}
	public void setPhone(String phone) {
		this.data.phone = phone;
	}
	public String getEmail() {
		return data.email;
	}
	public void setEmail(String email) {
		this.data.email = email;
	}
	public String getBankName() {
		return data.bankName;
	}
	public void setBankName(String bankName) {
		this.data.bankName = bankName;
	}
	public String getAccountNumber() {
		return data.accountNumber;
	}
	public void setAccountNumber(String accountNumber) {
		this.data.accountNumber = accountNumber;
	}
	public String getBankCode() {
		return data.bankCode;
	}
	public void setBankCode(String bankCode) {
		this.data.bankCode = bankCode;
	}
	
	
	
}


