package it.akademija.registrycenter;

import java.time.LocalDate;

public class RegistrycenterDTO {

	private String vardas;
	
	private String pavarde;

	private String asmensKodas;
	
	private LocalDate gimimoData;	
	
	public RegistrycenterDTO(String vardas, String pavarde, String asmensKodas, LocalDate gimimoData) {
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

	public LocalDate getGimimoData() {
		return gimimoData;
	}

	public void setGimimoData(LocalDate gimimoData) {
		this.gimimoData = gimimoData;
	}


}
