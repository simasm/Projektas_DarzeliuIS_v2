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
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;
 
import it.akademija.user.User;

@Entity
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
	@Pattern(regexp = "^\\p{L}+(?: \\p{L}+)*$")
	private String childName;

	@NotEmpty(message = "Pavardė privaloma!")
	@Size(min = 2, max = 70)
	@Pattern(regexp = "^\\p{L}+(?: \\p{L}+)*$")
	private String childSurname;

	@Pattern(regexp = "^(?!\\s*$)[0-9\\s]{11}$|")
	@NotEmpty(message = "Kodas privalomas")
	@Column(unique=true)
	private String childPersonalCode;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate childBirthdate;
	
	//guardian info
	
	@ManyToOne(cascade = { CascadeType.MERGE, CascadeType.DETACH })
	@JoinColumn(name = "user_id")
	private User mainGuardian;
	
 
	
	//kindergarten ifno
	 
	@Column(name = "kindergarten_id")
	@Pattern(regexp = "^(?!\\s*$)[0-9\\s]{9}$|", message = "Įstaigos kodas turi būti sudarytas iš 9 skaitmenų")
	private String kindergartenId;

	@NotBlank(message = "Pavadinimas privalomas")
	@Pattern(regexp = "\\S[\\s\\S]{2,49}")
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
	@Pattern(regexp = "\\S[\\s\\S]{2,49}")
	private String kindergartenBankName;

	
	@Column
	@NotBlank(message = "Banko saskaitos numeris privalomas")
	private String kindergartenBankAccountNumber;
	
	@Column
	@NotBlank(message = "Banko kodas privalomas")
	private String kindergartenBankCode;
	
	public Compensation() {
		
	}

	public Compensation(
			@NotEmpty(message = "Vardas privalomas!") @Size(min = 2, max = 70) @Pattern(regexp = "^\\p{L}+(?: \\p{L}+)*$") String childName,
			@NotEmpty(message = "Pavardė privaloma!") @Size(min = 2, max = 70) @Pattern(regexp = "^\\p{L}+(?: \\p{L}+)*$") String childSurname,
			@Pattern(regexp = "^(?!\\s*$)[0-9\\s]{11}$|") String childPersonalCode, LocalDate birthdate,
			User mainGuardian,
			@Pattern(regexp = "^(?!\\s*$)[0-9\\s]{9}$|", message = "Įstaigos kodas turi būti sudarytas iš 9 skaitmenų") String kindergartenId,
			@NotBlank(message = "Pavadinimas privalomas") @Pattern(regexp = "\\S[\\s\\S]{2,49}") String kindergartenName,
			@NotBlank(message = "Adresas privalomas") String kindergartenAddress,
			@NotBlank(message = "Telefonas privalomas")  String kindergartenPhoneNumber,
			@Email @NotEmpty(message = "El. paštas privalomas") String kindergartenEmail,
			@NotBlank(message = "Banko pavadinimas privalomas") @Pattern(regexp = "\\S[\\s\\S]{2,49}") String kindergartenBankName,
			@NotBlank(message = "Banko saskaitos numeris privalomas") String kindergartenBankAccountNumber,
			@NotBlank(message = "Banko kodas privalomas") String kindergartenBankCode) {
		super();
		this.childName = childName;
		this.childSurname = childSurname;
		this.childPersonalCode = childPersonalCode;
		this.childBirthdate = birthdate;
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
	
	

}
