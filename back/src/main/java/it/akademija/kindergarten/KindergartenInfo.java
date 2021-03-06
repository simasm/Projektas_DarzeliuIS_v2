package it.akademija.kindergarten;

/**
 * 
 * Kindergarten data transfer class to return partial info from the database
 *
 */
public class KindergartenInfo {

	private String id;
	private String name;
	private String address;
	private String elderate;
	
	private String coordinates;

	public KindergartenInfo() {
	}

	public KindergartenInfo(String id, String name, String address, String elderate) {
		this.id = id;
		this.name = name;
		this.address = address;
		this.elderate = elderate;
	}
	
	public KindergartenInfo(String id, String name, String address, String elderate, String coordinates) {
		this.id = id;
		this.name = name;
		this.address = address;
		this.elderate = elderate;
		this.coordinates = coordinates;
	}

	public String getCoordinates() {
		return coordinates;
	}

	public void setCoordinates(String coordinates) {
		this.coordinates = coordinates;
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

}
