package it.akademija.document;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.application.ApplicationController;
import it.akademija.journal.JournalService;
import it.akademija.journal.ObjectType;
import it.akademija.journal.OperationType;
import it.akademija.user.UserService;

@RestController
@Api(value = "Documents")
@RequestMapping(path = "/api/documents")
public class DocumentController {

	private static final Logger LOG = LoggerFactory.getLogger(ApplicationController.class);

	@Autowired
	DocumentService documentService;

	@Autowired
	UserService userService;

	@Autowired
	private JournalService journalService;

	/**
	 * Retrieves the document by document id
	 * 
	 * @return document data
	 */
	@Secured({ "ROLE_USER", "ROLE_MANAGER" })
	@ApiOperation(value = "Get a document by document id")
	@GetMapping(path = "/get/{id}")
	public ResponseEntity<byte[]> getDocumentFileById(@ApiParam(value = "Id of a document to be retrieved") @PathVariable Long id) {

		journalService.newJournalEntry(OperationType.MEDICAL_RECORD_DOWNLOADED, id, ObjectType.MEDICAL_RECORD,
				"Atsisiųsta pažyma");
		var document = documentService.getDocumentById(id);
		if(document != null)
			return new ResponseEntity<byte[]>(document.getData(), HttpStatus.OK);
		else return new ResponseEntity<byte[]>(HttpStatus.NOT_FOUND);
	}

	/**
	 * Uploads a document to database
	 * 
	 * @return response
	 */
	@Secured("ROLE_USER")
	@ApiOperation(value="Uploads a document to database")
	@PostMapping(path = "/upload")
	public ResponseEntity<String> UploadDocument(@RequestParam("file") MultipartFile file,
			@RequestParam("name") String name) {

		if (documentService.uploadDocument(file, name, userService
				.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName()).getUserId())) {

			journalService.newJournalEntry(OperationType.MEDICAL_RECORD_SUBMITED, userService
					.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName()).getUserId(),
					ObjectType.MEDICAL_RECORD, "Įkelta pažyma");

			return new ResponseEntity<String>("Pažyma buvo įkelta sėkmingai", HttpStatus.CREATED);

		} else {

			LOG.warn("Įvyko klaida įkeliant pažymą");
			return new ResponseEntity<String>("Įvyko klaida", HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * Deletes a file by its id
	 * 
	 * @return response
	 */
	@Secured({ "ROLE_USER", "ROLE_MANAGER" })
	@ApiOperation(value="Delete a document by document id")
	@DeleteMapping(path = "/delete/{id}")
	public ResponseEntity<String> deleteDocument(@ApiParam(value = "Id of a document to be deleted") @PathVariable final long id) {

		documentService.deleteDocument(id);

		journalService.newJournalEntry(OperationType.MEDICAL_RECORD_DELETE, id, ObjectType.MEDICAL_RECORD,
				"Pažyma ištrinta");
		
		return new ResponseEntity<String>("Pažyma ištrinta", HttpStatus.OK);
	}

	/**
	 * Shows user a list of their submitted documents
	 * 
	 * @return a list of documents
	 */
	@Secured("ROLE_USER")
	@ApiOperation(value="Get all submitted documents for logged in user")
	@GetMapping(path = "/documents")
	public List<DocumentViewmodel> getLoggedUserDocuments() {

		List<DocumentEntity> docEntityList = 
				documentService.getDocumentsByUploaderId(userService.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName()).getUserId());

		List<DocumentViewmodel> docViewmodelList = new ArrayList<>();

		for (DocumentEntity doc : docEntityList) {

			docViewmodelList.add(new DocumentViewmodel(doc.getId(), doc.getName(), doc.getUploadDate()));
		}
		return docViewmodelList;
	}
	
	
	/**
	 * Retrieves a list of all submitted documents
	 * 
	 * @return a list of documents
	 */
	@Secured("ROLE_MANAGER")
	@ApiOperation(value="Get all submitted documents for manager")
	@GetMapping(path = "/documents/all")
	public List<DocumentEntity> getAllExistingDocuments() {
		
		
		return documentService.getAllExistingDocuments();
	}
	/**
	 * Retrieves a page of all submitted documents
	 * 
	 * @return a page of submitted documents
	 */
	@Secured({ "ROLE_MANAGER" })
	@ApiOperation(value="Get a page of all submitted documents for manager")
	@GetMapping(path = "/page")
	public ResponseEntity<Page<DocumentEntity>> getDocumentPages(
			@RequestParam("page") int page, 
			  @RequestParam("size") int size) {	
		
		Sort.Order order1 = new Sort.Order(Sort.Direction.DESC, "uploadDate");
		Sort.Order order2 = new Sort.Order(Sort.Direction.DESC, "uploaderSurname");
		Sort.Order order3 = new Sort.Order(Sort.Direction.DESC, "name");
						
		Pageable pageable = PageRequest.of(page, size, Sort.by(order1).and(Sort.by(order2).and(Sort.by(order3))));

		return new ResponseEntity<>(documentService.getAllDocuments(pageable), HttpStatus.OK);
	}
	
	
	/**
	 * Retrieves a page of all submitted documents filtered by uploader's surname
	 * 
	 * @return a page of filtered documents
	 */
	@Secured({ "ROLE_MANAGER" })
	@ApiOperation(value="Get a page of all submitted documents filtered by uploader's surname")
	@GetMapping("/manager/page/{uploaderSurname}")
	public ResponseEntity<Page<DocumentEntity>> GetDocumentPageFilteredByUploaderSurname(@ApiParam(value = "Uploader's surname by which to filter the list") @PathVariable String uploaderSurname,
			@RequestParam("page") int page, @RequestParam("size") int size) {

		
		Sort.Order order1 = new Sort.Order(Sort.Direction.DESC, "uploadDate");
		Sort.Order order2 = new Sort.Order(Sort.Direction.DESC, "uploaderSurname");
		Sort.Order order3 = new Sort.Order(Sort.Direction.DESC, "name");

		Pageable pageable = PageRequest.of(page, size, Sort.by(order1).and(Sort.by(order2).and(Sort.by(order3))));

		return new ResponseEntity<>(documentService.GetDocumentPageFilteredByUploaderSurname(uploaderSurname, pageable),
				HttpStatus.OK);
	}

}
