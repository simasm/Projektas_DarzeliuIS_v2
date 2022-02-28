package it.akademija.compensation;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;

import it.akademija.user.User;

@Entity
@Table(uniqueConstraints= {@UniqueConstraint(columnNames= {"childPersonalCode"})})
public class Compensation {
	

	@Id
	@Column(name = "compensation_application_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	
	@Column(name = "date_of_submission")
	private LocalDate submittedAt;
	
	//child info
	
	@NotEmpty(message = "Vardas privalomas!")
	@Size(min = 2, max = 70)
	//@Pattern(regexp = "^\\p{L}+(?: \\p{L}+)*$")
	private String childName;

	@NotEmpty(message = "Pavardė privaloma!")
	@Size(min = 2, max = 70)
	//@Pattern(regexp = "^\\p{L}+(?: \\p{L}+)*$")
	private String childSurname;

	//@Pattern(regexp = "^(?!\\s*$)[0-9\\s]{11}$|")
	@NotEmpty(message = "Kodas privalomas")
 	private String childPersonalCode;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate childBirthdate;
	
	//guardian info
	
	@ManyToOne(cascade = { CascadeType.MERGE, CascadeType.DETACH })
	@JoinColumn(name = "user_id")
	private User mainGuardian;	
	
	@Column
	private String guardianName;
	@Column
	private String guardianSurname;
	@Column
	private String guardianPersonalCode;
	@Column
	private String guardianPhone;
	@Column
	private String guardianEmail;
	@Column
	private String guardianAddress;

	//kindergarten ifno
	 
	@Column(name = "kindergarten_id")
	//@Pattern(regexp = "^(?!\\s*$)[0-9\\s]{9}$|", message = "Įstaigos kodas turi būti sudarytas iš 9 skaitmenų")
	private String kindergartenId;

	@NotBlank(message = "Pavadinimas privalomas")
	//@Pattern(regexp = "\\S[\\s\\S]{2,49}")
	private String kindergartenName;

	@Column
	@NotBlank(message = "Adresas privalomas")
	private String kindergartenAddress;
	
	@Column
	@NotBlank(message = "Telefonas privalomas")
	private String kindergartenPhoneNumber;
	
	@Email
	@NotEmpty(message = "El. paštas privalomas")
	@Column
	private String kindergartenEmail;
	
	@NotBlank(message = "Banko pavadinimas privalomas")
	//@Pattern(regexp = "\\S[\\s\\S]{2,49}")
	private String kindergartenBankName;

	@Column
	@NotBlank(message = "Banko saskaitos numeris privalomas")
	private String kindergartenBankAccountNumber;
	
	@Column
	@NotBlank(message = "Banko kodas privalomas")
	private String kindergartenBankCode;
	
	public Compensation() {
		
	}
	
	

	public Compensation(@NotEmpty(message = "Vardas privalomas!") @Size(min = 2, max = 70) String childName,
			@NotEmpty(message = "Pavardė privaloma!") @Size(min = 2, max = 70) String childSurname,
			@NotEmpty(message = "Kodas privalomas") String childPersonalCode, LocalDate childBirthdate,
			User mainGuardian,
			GuardianInfo guardianInfo,
			String kindergartenId,
			@NotBlank(message = "Pavadinimas privalomas") String kindergartenName,
			@NotBlank(message = "Adresas privalomas") String kindergartenAddress,
			@NotBlank(message = "Telefonas privalomas") String kindergartenPhoneNumber,
			@Email @NotEmpty(message = "El. paštas privalomas") String kindergartenEmail,
			@NotBlank(message = "Banko pavadinimas privalomas") String kindergartenBankName,
			@NotBlank(message = "Banko saskaitos numeris privalomas") String kindergartenBankAccountNumber,
			@NotBlank(message = "Banko kodas privalomas") String kindergartenBankCode) {
		super();
		this.childName = childName;
		this.childSurname = childSurname;
		this.childPersonalCode = childPersonalCode;
		this.childBirthdate = childBirthdate;
		this.mainGuardian = mainGuardian;
		
		this.guardianName = guardianInfo.getName();
		this.guardianSurname = guardianInfo.getSurname();
		this.guardianAddress = guardianInfo.getAddress();
		this.guardianEmail = guardianInfo.getEmail();
		this.guardianPersonalCode = guardianInfo.getPersonalCode();
		this.guardianPhone = guardianInfo.getPhone();
		
		
		this.kindergartenId = kindergartenId;
		this.kindergartenName = kindergartenName;
		this.kindergartenAddress = kindergartenAddress;
		this.kindergartenPhoneNumber = kindergartenPhoneNumber;
		this.kindergartenEmail = kindergartenEmail;
		this.kindergartenBankName = kindergartenBankName;
		this.kindergartenBankAccountNumber = kindergartenBankAccountNumber;
		this.kindergartenBankCode = kindergartenBankCode;
		
	}



	public LocalDate getSubmittedAt() {
		return submittedAt;
	}

	public void setSubmittedAt() {
		this.submittedAt = LocalDate.now();
	}

	public String getChildName() {
		return childName;
	}

	public void setChildName(String childName) {
		this.childName = childName;
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

	public User getMainGuardian() {
		return mainGuardian;
	}

	public void setMainGuardian(User mainGuardian) {
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
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}



	public String getGuardianName() {
		return guardianName;
	}



	public void setGuardianName(String guardianName) {
		this.guardianName = guardianName;
	}



	public String getGuardianSurname() {
		return guardianSurname;
	}



	public void setGuardianSurname(String guardianSurname) {
		this.guardianSurname = guardianSurname;
	}



	public String getGuardianPersonalCode() {
		return guardianPersonalCode;
	}



	public void setGuardianPersonalCode(String guardianPersonalCode) {
		this.guardianPersonalCode = guardianPersonalCode;
	}



	public String getGuardianPhone() {
		return guardianPhone;
	}



	public void setGuardianPhone(String guardianPhone) {
		this.guardianPhone = guardianPhone;
	}



	public String getGuardianEmail() {
		return guardianEmail;
	}



	public void setGuardianEmail(String guardianEmail) {
		this.guardianEmail = guardianEmail;
	}



	public String getGuardianAddress() {
		return guardianAddress;
	}



	public void setGuardianAddress(String guardianAddress) {
		this.guardianAddress = guardianAddress;
	}
	
	 
	public GuardianInfo getGuardianInfo() {
		return new GuardianInfo(
				this.guardianName, 
				this.guardianSurname,
				this.guardianPersonalCode,
				this.guardianPhone, 
				this.guardianEmail,
				this.guardianAddress);
	}
	

}
