package it.akademija.kindergarten;

public class KindergartenDTO {
	
	private String id;

	private String name;

	private String address;

	private String elderate;
	
	private String directorName;

	private String directorSurname;

	private int capacityAgeGroup2to3;

	private int capacityAgeGroup3to6;
	
	private String coordinates;

	public KindergartenDTO() {
		
	}	
	
	public KindergartenDTO(String id, String name, String address, String elderate, String directorName,
			String directorSurname, int capacityAgeGroup2to3, int capacityAgeGroup3to6, String coordinates) {
		super();
		this.id = id;
		this.name = name;
		this.address = address;
		this.elderate = elderate;
		this.directorName = directorName;
		this.directorSurname = directorSurname;
		this.capacityAgeGroup2to3 = capacityAgeGroup2to3;
		this.capacityAgeGroup3to6 = capacityAgeGroup3to6;
		this.coordinates = coordinates;
	}

	public KindergartenDTO(String id, String name, String address, String elderate, int capacityAgeGroup2to3,
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
	
	public KindergartenDTO(String id, String name, String address, String elderate) {
		
		this.id = id;
		this.name = name;
		this.address = address;
		this.elderate = elderate;
		
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

	public String getCoordinates() {
		return coordinates;
	}

	public void setCoordinates(String coordinates) {
		this.coordinates = coordinates;
	}
	
	
	
	public String getCoordinates() {
		return coordinates;
	}

	public void setCoordinates(String coordinates) {
		this.coordinates = coordinates;
	}
}
