package it.akademija.user;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import it.akademija.application.Application;

@Entity
@Table(name = "parentDetails")
public class ParentDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long parentDetailsId;

	@Pattern(regexp = "^[0-9]{11}$", message = "Netinkamas asmens kodo formatas") //^(?!\\s*$)[0-9\\s]{11}$
	@Column
	private String personalCode;

	@OneToOne(mappedBy = "parentDetails")
	private User user;

	@NotEmpty(message = "Vardas privalomas!")
	@Size(min = 2, max = 70)
	@Pattern(regexp = "^[A-ZĄČĘĖĮŠŲŪŽ]{1}[a-zA-Zą-ž\\s\\-']+$", message = "Netinkamas vardo formatas. Pirmoji raidė - didžioji. Ilgis iki 70 simbolių") //^\\p{L}+(?: \\p{L}+)*$
	@Column
	private String name;

	@NotEmpty(message = "Pavardė privaloma!")
	@Size(min = 2, max = 70)
	@Pattern(regexp = "^[A-ZĄČĘĖĮŠŲŪŽ]{1}[a-zA-Zą-ž\\s\\-']+$", message = "Netinkamas pavardės formatas. Pirmoji raidė - didžioji. Ilgis iki 70 simbolių") //^\\p{L}+(?: \\p{L}+)*$
	@Column
	private String surname;

	@Email
	@NotEmpty(message = "El. paštas privalomas!")
	@Column
	private String email;

	@Column
	@NotEmpty(message = "Adresas privalomas")
	@Pattern(regexp = "[\\s\\dA-zÀ-ž-.]{5,64}")
	private String address;
	
	@Column
	private String city;

	@NotEmpty(message = "Telefono numeris privalomas")
	@Pattern(regexp = "[+]{1}[370]{3}[0-9]{8}") //^\\+[0-9\\s]{5,20}$|
	@Column
	private String phone;

	@OneToMany(mappedBy = "additionalGuardian", fetch = FetchType.LAZY)
	private Set<Application> parentApplications;

	public ParentDetails() {

	}

	public ParentDetails(@Pattern(regexp = "^[0-9]{11}$") String personalCode,
			@NotEmpty(message = "Vardas privalomas!") @Size(min = 2, max = 70) @Pattern(regexp = "^[A-ZĄČĘĖĮŠŲŪŽ]{1}[a-zA-Zą-ž\\\\s\\\\-']+$") String name,
			@NotEmpty(message = "Pavardė privaloma!") @Size(min = 2, max = 70) @Pattern(regexp = "^[A-ZĄČĘĖĮŠŲŪŽ]{1}[a-zA-Zą-ž\\\\s\\\\-']+$") String surname,
			@Email @NotEmpty(message = "El. paštas privalomas!") String email, 
			@NotEmpty(message = "Adresas privalomas") @Pattern(regexp = "[\\s\\dA-zÀ-ž-.]{5,64}") String address, 
			String city,
			@NotEmpty(message = "Telefono numeris privalomas")@Pattern(regexp = "[+]{1}[370]{3}[0-9]{8}") String phone) {
		super();
		this.personalCode = personalCode;
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.address = address;
		this.city = city;
		this.phone = phone;
	}

	public void setParentApplications(Set<Application> parentApplications) {
		this.parentApplications = parentApplications;
	}

	public Set<Application> getParentApplications() {
		return parentApplications;
	}

	public int removeApplication(Application application) {
		parentApplications.remove(application);
		return parentApplications.size();
	}

	public Long getParentDetailsId() {
		return parentDetailsId;
	}

	public String getPersonalCode() {
		return personalCode;
	}

	public void setPersonalCode(String personalCode) {
		this.personalCode = personalCode;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
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

	
	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public void setParentDetailsId(Long parentDetailsId) {
		this.parentDetailsId = parentDetailsId;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

}