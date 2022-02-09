package it.akademija.registrycenter;

 

public class RegistrycenterDetailsDTO {

	private String vardas;
	
	private String pavarde;

	private String asmensKodas;
	 
	private String gimimoData;	
	
	public RegistrycenterDetailsDTO(String vardas, String pavarde, String asmensKodas, String gimimoData) {
		super();
		this.vardas = vardas;
		this.pavarde = pavarde;
		this.asmensKodas = asmensKodas;
		this.gimimoData = gimimoData;
	}


	public String getVardas() {
		return vardas;
	}

	public void setVardas(String vardas) {
		this.vardas = vardas;
	}

	public String getPavarde() {
		return pavarde;
	}

	public void setPavarde(String pavarde) {
		this.pavarde = pavarde;
	}

	public String getAsmensKodas() {
		return asmensKodas;
	}

	public void setAsmensKodas(String asmensKodas) {
		this.asmensKodas = asmensKodas;
	}

	public String getGimimoData() {
		return gimimoData;
	}

	public void setGimimoData(String gimimoData) {
		this.gimimoData = gimimoData;
	}


}
