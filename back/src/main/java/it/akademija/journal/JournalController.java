package it.akademija.journal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;

@RestController
public class JournalController {
	
	@Autowired
	private JournalService journalService;
	
	
	/**
	 * Retrieves a page of log
	 * 
	 * @return a list of log items
	 */
	@Secured({ "ROLE_ADMIN" })
	@ApiOperation(value = "Get a page of a log")
	@GetMapping(path = "/admin/getjournal/page")
	public ResponseEntity<Page<JournalEntry>> getJournalEntriesPage(
			@RequestParam("page") int page, 
			  @RequestParam("size") int size) {	
		
		Sort.Order order = new Sort.Order(Sort.Direction.DESC, "eventTime");
						
		Pageable pageable = PageRequest.of(page, size, Sort.by(order));

		return new ResponseEntity<>(journalService.getAllJournalEntries(pageable), HttpStatus.OK);
	}

	
	
}
