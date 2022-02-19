package it.akademija.document;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import it.akademija.kindergarten.Kindergarten;

public interface DocumentDAO extends JpaRepository<DocumentEntity, Long> {

	DocumentEntity getDocumentById(long id);
	
	void deleteByUploaderId(long uploaderId);

	@Query("SELECT j FROM DocumentEntity j")
	Page<DocumentEntity> getAllDocuments(Pageable pageable);
	

	
	
	@Query("SELECT j FROM DocumentEntity j WHERE LOWER(j.uploaderSurname) LIKE LOWER(concat('%', ?1,'%'))")
	Page<DocumentEntity> findByUploaderSurname(String uploaderSurname, Pageable pageable);
	
}
