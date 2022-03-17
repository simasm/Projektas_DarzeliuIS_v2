package it.akademija.application.pdf;

 import java.io.IOException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.application.Application;
import it.akademija.application.ApplicationService;
@RestController
@Api(value = "application pdf generation")
@RequestMapping(path = "/api/pdfgeneration")
public class ApplicationPdfController {
	
	@Autowired
	private ApplicationService applicationService;
	
	@Autowired
	private ApplicationPdfService service;
	
	
	/**
	 * Downloads an application as a .pdf file
	 * 
	 * 
	 */
	@Secured({ "ROLE_USER" })
 	@RequestMapping(value = "/{id}", method = RequestMethod.GET   )
 	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Download application information as generated PDF file")
	@ResponseBody
	public ResponseEntity<byte[]> generateApplicationPdf( 
			@ApiParam(value = "Application ID", required = true) @PathVariable @Valid String id) {
		if(applicationService.existsById(id)) {
		 		
			try {				
			 
		
				byte[] contents =  service.createPdf(id);
			
				HttpHeaders headers = new HttpHeaders();
				 headers.setContentType(MediaType.APPLICATION_PDF);
			   
				headers.add("Content-Disposition", "filename=" + id +".pdf");
				//headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
		 
				headers.setContentDispositionFormData(id+".pdf",id+".pdf");
				
				return new ResponseEntity<byte[]>( contents, headers, HttpStatus.OK);				
			} catch (IOException e) {
				e.printStackTrace();
			}
			
		}
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
}
