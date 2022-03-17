package it.akademija.application;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.application.management.RegistrationStatusService;
import it.akademija.journal.JournalService;
import it.akademija.journal.ObjectType;
import it.akademija.journal.OperationType;

@RestController
@Api(value = "application")
@RequestMapping(path = "/api/prasymai")
public class ApplicationController {

	private static final Logger LOG = LoggerFactory.getLogger(ApplicationController.class);

	@Autowired
	private ApplicationService service;

	@Autowired
	private RegistrationStatusService statusService;

	@Autowired
	private JournalService journalService;

	/**
	 * 
	 * Create new application for logged user
	 * 
	 * @param data
	 * @return message
	 */
	@Secured({ "ROLE_USER" })
	@PostMapping("/user/new")
	@ApiOperation(value = "Create new application")
	public ResponseEntity<String> createNewApplication(
			@ApiParam(value = "Data of the user and their child", required = true) @Valid @RequestBody ApplicationDTO data) {

		String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();

		String childPersonalCode = data.getChildPersonalCode();

		if (!statusService.getStatus().isRegistrationActive()) {
			
			
			journalService.newJournalEntry(OperationType.APPLICATION_SUBMIT_FAILED, ObjectType.APPLICATION,
					"Prašymas teiktas esant neaktyviai registracijai");
			
			LOG.warn("Naudotojas [{}] bandė registruoti prašymą esant neaktyviai registracijai", currentUsername);
			
			return new ResponseEntity<String>("Šiuo metu registracija nevykdoma.", HttpStatus.METHOD_NOT_ALLOWED);

		} else if (service.existsByPersonalCode(childPersonalCode)) {
			
			journalService.newJournalEntry(OperationType.APPLICATION_SUBMIT_FAILED, ObjectType.APPLICATION,
					"Nepavyko sukurti prašymo nes prašyme nurodytas vaiko asmens kodas jau yra registruotas");
			
			LOG.warn("Naudotojas [{}] bandė registruoti prašymą jau registruotam vaikui su asmens kodu [{}]",
					currentUsername, data.getChildPersonalCode());

			return new ResponseEntity<String>("Prašymas vaikui su tokiu asmens kodu jau yra registruotas",
					HttpStatus.CONFLICT);

		} else {

			Application application = service.createNewApplication(currentUsername, data);

			if (application != null) {

				journalService.newJournalEntry(OperationType.APPLICATION_SUBMITED, application.getId(), ObjectType.APPLICATION,
						"Sukurtas naujas prašymas");

				return new ResponseEntity<String>("Prašymas sukurtas sėkmingai", HttpStatus.OK);

			}

			journalService.newJournalEntry(OperationType.APPLICATION_SUBMIT_FAILED, ObjectType.APPLICATION,
					"Neteisinga užklausa");
			return new ResponseEntity<String>("Prašymo sukurti nepavyko", HttpStatus.BAD_REQUEST);

		}
	}

	/**
	 * Get list of all applications for logged user
	 * 
	 * @return list applications
	 */
	@Secured({ "ROLE_USER" })
	@GetMapping("/user")
	@ApiOperation(value = "Get all user applications")
	public Set<ApplicationInfoUser> getAllUserApplications() {

		String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();

		return service.getAllUserApplications(currentUsername);
	}

	/**
	 * Retrieves an application by its id
	 * 
	 * @return an application data
	 */
	@Secured({ "ROLE_USER" })
	@GetMapping("/user/{id}")
	@ApiOperation(value = "Get a specific application by its id")
	public ApplicationInfo getApplicationByApplicationId(@ApiParam(value="Id of an application")@PathVariable @Valid String id) {


		
		Application application = service.getUserApplicationById(id); 
		return new ApplicationInfo(
				application.getId(),
				application.getChildPersonalCode(),
				application.getChildName(),
				application.getChildSurname(),
				application.getStatus()
			);
	}
	
	/**
	 *
	 * Get page of applications
	 *
	 * @param page 
	 * @param size 
	 * @return page of applications
	 */
	@Secured({ "ROLE_MANAGER" })
	@GetMapping("/manager")
	@ApiOperation(value = "Get a page of all submitted applications")
	public Page<ApplicationInfo> getPageFromSubmittedApplications(@RequestParam("page") int page,
			@RequestParam("size") int size) {

		List<Order> orders = new ArrayList<>();
		orders.add(new Order(Direction.ASC, "childSurname").ignoreCase());
		orders.add(new Order(Direction.ASC, "childName").ignoreCase());

		Pageable pageable = PageRequest.of(page, size, Sort.by(orders));

		return service.getPageFromSubmittedApplications(pageable);
	}

	/**
	 * Get page of unsorted applications filtered by child personal code
	 * 
	 * @param childPersonalCode
	 * @param page
	 * @param size
	 * @return page of applications
	 */
	@Secured({ "ROLE_MANAGER" })
	@GetMapping("/manager/page/{childPersonalCode}")
	@ApiOperation(value = "Get a page from all submitted applications with specified child personal code")
	public ResponseEntity<Page<ApplicationInfo>> getApplicationnPageFilteredById(@ApiParam(value="Child's code by which to filter the applications")@PathVariable String childPersonalCode,
			@RequestParam("page") int page, @RequestParam("size") int size) {

		List<Order> orders = new ArrayList<>();
		orders.add(new Order(Direction.ASC, "childSurname").ignoreCase());
		orders.add(new Order(Direction.ASC, "childName").ignoreCase());

		Pageable pageable = PageRequest.of(page, size, Sort.by(orders));

		return new ResponseEntity<>(service.getApplicationnPageFilteredById(childPersonalCode, pageable),
				HttpStatus.OK);
	}

	/**
	 * 
	 * Delete user application by id
	 * 
	 * @param id
	 * @return message
	 */

	@Secured({ "ROLE_USER" })
	@DeleteMapping("/user/delete/{id}")
	@ApiOperation("Delete application by application id")
	public ResponseEntity<String> deleteApplication(
			@ApiParam(value = "Application id to be deleted", required = true) @PathVariable Long id) {

		
		LOG.info("**ApplicationController: trinamas prasymas [{}] **", id);

		return service.deleteApplication(id);

	}

	/**
	 * 
	 * Manager sets user application status to inactive
	 * 
	 * @param id
	 * @return message
	 */
	@Secured({ "ROLE_MANAGER" })
	@PostMapping("/manager/deactivate/{id}")
	@ApiOperation("Delete user application by id")
	public ResponseEntity<String> deactivateApplication(
			@ApiParam(value = "Id of an application to be deactivated", required = true) @PathVariable Long id) {

		LOG.info("**ApplicationController: deaktyvuojamas prasymas [{}] **", id);

		return service.deactivateApplication(id);

	}

	public ApplicationService getService() {
		return service;
	}

	public void setService(ApplicationService service) {
		this.service = service;
	}

}
