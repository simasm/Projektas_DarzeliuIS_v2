package it.akademija.document;

import java.time.LocalDate;

public class DocumentViewmodel {

	private long documentId;
	private String uploaderName;
	private String uploaderSurname;
	private String name;
	private LocalDate uploadDate;

	public long getDocumentId() {
		return documentId;
	}



	public String getUploaderName() {
		return uploaderName;
	}



	public void setUploaderName(String uploaderName) {
		this.uploaderName = uploaderName;
	}



	public String getUploaderSurname() {
		return uploaderSurname;
	}



	public void setUploaderSurname(String uploaderSurname) {
		this.uploaderSurname = uploaderSurname;
	}



	public void setDocumentId(long documentId) {
		this.documentId = documentId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public LocalDate getUploadDate() {
		return uploadDate;
	}

	public void setUploadDate(LocalDate uploadDate) {
		this.uploadDate = uploadDate;
	}

	public DocumentViewmodel(long documentId, String uploaderName, String uploaderSurname,  String name, LocalDate uploadDate) {
		super();
		this.documentId = documentId;
		this.uploaderName = uploaderName;
		this.uploaderSurname = uploaderSurname;
		this.name = name;
		this.uploadDate = uploadDate;
	}
	
	public DocumentViewmodel(long documentId, String name, LocalDate uploadDate) {
		super();
		this.documentId = documentId;
		this.name = name;
		this.uploadDate = uploadDate;
	}

	public DocumentViewmodel() {
		super();
	}

}
