package it.akademija.document;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;

import it.akademija.user.UserDAO;

@RunWith(SpringRunner.class)
@SpringBootTest
class DocumentServiceTest {

	@InjectMocks
	@Autowired
	private DocumentService documentService;

	@MockBean
	private DocumentDAO documentDao;

	@Autowired
	private UserDAO userDao;

	@Test
	void testUploadAndDeleteDocument() {

		MockMultipartFile file = new MockMultipartFile("file", "file.pdf", MediaType.APPLICATION_PDF_VALUE,
				"Hello, World!".getBytes());

		var userId = userDao.findByUsername("user@user.lt").getUserId();
		
		assertTrue(documentService.uploadDocument(file, "file.pdf", userId));
		int docListSize = documentService.getAllExistingDocuments().size();
		List<DocumentEntity> docsList = documentService.getDocumentsByUploaderId(userId);
		
		assertNotNull(docsList);
		System.out.println(docsList.size() + "keywordas");
		
		docsList.stream().forEach(doc -> {
			documentService.deleteDocument(doc.getId());
			assertTrue(documentService.getAllExistingDocuments().size() < docListSize);
			}
		
		);
		assertTrue(documentService.getDocumentsByUploaderId(userId).isEmpty());

	}

	@Test
	void getDocumentById() {

		DocumentViewmodel newDocument = new DocumentViewmodel();
		newDocument.setDocumentId(123L);
		newDocument.setName("pazyma");
		newDocument.setUploadDate(LocalDate.of(2019, 5, 5));

		assertEquals(123L, newDocument.getDocumentId());
		assertEquals("pazyma", newDocument.getName());
		assertEquals(LocalDate.of(2019, 5, 5), newDocument.getUploadDate());

		var a = userDao.findByUsername("user@user.lt");
		var b = a.getUserId();
		var c = documentService.getDocumentsByUploaderId(b);
				
		assertTrue(c
				.size() == 0);

	}

}
