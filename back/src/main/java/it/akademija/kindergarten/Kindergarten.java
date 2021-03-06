package it.akademija.kindergarten;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import it.akademija.application.Application;
import it.akademija.kindergartenchoise.KindergartenChoise;

@Entity
public class Kindergarten {

	@Id
	@Column(name = "kindergarten_id")
	@Pattern(regexp = "^\\d{9}$", message = "Neteisingas kodo formatas. Įstaigos kodas turi būti sudarytas iš 9 skaitmenų") //^(?!\\s*$)[0-9\\s]{9}$
	private String id;

	@NotBlank(message = "Pavadinimas privalomas")
	@Pattern(regexp = "\\S[\\s\\S]{2,49}", message = "Neteisingas pavadinimo formatas. Nuo 3 iki 50 simbolių") // ^[A-ZĄČĘĖĮŠŲŪŽ]{1}[\\S\\s]{1,64}$
	@Column(name = "name", unique = true)
	private String name;

	@Column
	@Size(max=128)
	@NotBlank(message = "Adresas privalomas")
	private String address;

	@Column
	@Pattern(regexp = "^[\\p{L}\\s]{3,20}$")
	@NotBlank(message = "Seniūnija privaloma")
	private String elderate;

	@Min(value = 0, message = "Laisvų vietų skaičius negali būti mažesnis už 0")
	@Max(value=999, message = "Laisvų vietų skaičius negali būti didesnis už 999")
	private int capacityAgeGroup2to3;
	
	private int placesTakenAgeGroup2to3;

	@Min(value = 0, message = "Laisvų vietų skaičius negali būti mažesnis už 0")
	@Max(value=999, message = "Laisvų vietų skaičius negali būti didesnis už 999")
	private int capacityAgeGroup3to6;
	
	private int placesTakenAgeGroup3to6;
	
	@NotBlank(message = "Direktoriaus vardas privalomas")
	@Pattern(regexp = "^[A-ZĄ-Ž]{1}[\\S\\s]{1,32}$", message = "Direktoriaus vardas ir pavardė turi būti iki 32 simbolių. Pirmoji žodžio raidė - didžioji.")
	private String directorName;
	
	@NotBlank(message = "Direktoriaus pavardė privaloma")
	@Pattern(regexp = "^[A-ZĄ-Ž]{1}[\\S\\s]{1,32}$", message = "Direktoriaus vardas ir pavardė turi būti iki 32 simbolių. Pirmoji žodžio raidė - didžioji.")
	private String directorSurname;
	
	private String coordinates;

	

	@OneToMany(mappedBy = "kindergarten", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Set<KindergartenChoise> kindergartenChoises;
	
	@OneToMany(mappedBy = "approvedKindergarten", cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE}, fetch = FetchType.LAZY)
	private Set<Application> approvedApplications;

	public Kindergarten() {

	}
	
	public Kindergarten(String id, String name, String address, String elderate, 
			            String directorName, String directorSurname,
			            int capacityAgeGroup2to3, int capacityAgeGroup3to6) {
		super();
		this.id = id;
		this.name = name;
		this.address = address;
		this.elderate = elderate;
		this.directorName = directorName;
		this.directorSurname = directorSurname;
		this.capacityAgeGroup2to3 = capacityAgeGroup2to3;
		this.capacityAgeGroup3to6 = capacityAgeGroup3to6;
	}
	
	public Kindergarten(String id, String name, String address, String elderate, int capacityAgeGroup2to3,
			int capacityAgeGroup3to6, String directorName, String directorSurname, String coordinates) {
		super();
		this.id = id;
		this.name = name;
		this.address = address;
		this.elderate = elderate;
		this.capacityAgeGroup2to3 = capacityAgeGroup2to3;
		this.capacityAgeGroup3to6 = capacityAgeGroup3to6;
		this.directorName = directorName;
		this.directorSurname = directorSurname;
		this.coordinates = coordinates;
	}

	public Kindergarten(String id, String name, String address, String elderate, int capacityAgeGroup2to3,
			int capacityAgeGroup3to6, String coordinates) {
		super();
		this.id = id;
		this.name = name;
		this.address = address;
		this.elderate = elderate;
		this.capacityAgeGroup2to3 = capacityAgeGroup2to3;
		this.capacityAgeGroup3to6 = capacityAgeGroup3to6;
		this.coordinates = coordinates;
	}	
	
	public Kindergarten(String id, String name, String address, String elderate, int capacityAgeGroup2to3,
			int capacityAgeGroup3to6) {
		super();
		this.id = id;
		this.name = name;
		this.address = address;
		this.elderate = elderate;
		this.capacityAgeGroup2to3 = capacityAgeGroup2to3;
		this.capacityAgeGroup3to6 = capacityAgeGroup3to6;
	}	

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getElderate() {
		return elderate;
	}

	public void setElderate(String elderate) {
		this.elderate = elderate;
	}

	public int getCapacityAgeGroup2to3() {
		return capacityAgeGroup2to3;
	}

	public void setCapacityAgeGroup2to3(int capacityAgeGroup2to3) {
		this.capacityAgeGroup2to3 = capacityAgeGroup2to3;
	}

	public int getCapacityAgeGroup3to6() {
		return capacityAgeGroup3to6;
	}

	public void setCapacityAgeGroup3to6(int capacityAgeGroup3to6) {
		this.capacityAgeGroup3to6 = capacityAgeGroup3to6;
	}

	public int getPlacesTakenAgeGroup2to3() {
		return placesTakenAgeGroup2to3;
	}

	public void setPlacesTakenAgeGroup2to3(int placesTakenAgeGroup2to3) {
		this.placesTakenAgeGroup2to3 = placesTakenAgeGroup2to3;
	}

	public int getPlacesTakenAgeGroup3to6() {
		return placesTakenAgeGroup3to6;
	}

	public void setPlacesTakenAgeGroup3to6(int placesTakenAgeGroup3to6) {
		this.placesTakenAgeGroup3to6 = placesTakenAgeGroup3to6;
	}
	
	
	public String getDirectorName() {
		return directorName;
	}

	public void setDirectorName(String directorName) {
		this.directorName = directorName;
	}

	public String getDirectorSurname() {
		return directorSurname;
	}

	public void setDirectorSurname(String directorSurname) {
		this.directorSurname = directorSurname;
	}

	public String getCoordinates() {
		return coordinates;
	}

	public void setCoordinates(String coordinates) {
		this.coordinates = coordinates;
	}

	public Set<KindergartenChoise> getKindergartenChoises() {
		return kindergartenChoises;
	}

	public void setKindergartenChoises(Set<KindergartenChoise> kindergartenChoises) {
		this.kindergartenChoises = kindergartenChoises;
	}
	
	

	public Set<Application> getApprovedApplications() {
		return approvedApplications;
	}

	public void setApprovedApplications(Set<Application> approvedApplications) {
		this.approvedApplications = approvedApplications;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Kindergarten other = (Kindergarten) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	

}
