package it.akademija;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;


/**
 *  to do
 *  doesn't use ErrorResponse,
 *  Constraint violations response are non-UTF8
 *
 */
 @RestControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {
	 
	 
	@ExceptionHandler( ConstraintViolationException.class )
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public Map<String, Object> handleValidationError(ConstraintViolationException exception) {
 		Map<String, Object> response = new HashMap<>();
		List<Map<String, String>> errors = new ArrayList<>();

		for (ConstraintViolation<?> violation : exception.getConstraintViolations()) {
			Map<String, String> transformedError = new HashMap<>();

			String fieldName = violation.getPropertyPath().toString();
			transformedError.put("field", fieldName.substring(fieldName.lastIndexOf('.') + 1));
			transformedError.put("error", violation.getMessage());

			errors.add(transformedError);
		}
		response.put("errors", errors);

		return response;
	}
 
	

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		List<String> details = new ArrayList<>();
		for (ObjectError error : ((BindException) ex).getBindingResult().getAllErrors()) {
			details.add(error.getDefaultMessage());
		}
		ErrorResponse exceptionResponse = new ErrorResponse("Validation Failed", details);
//returning exception structure and specific status 
		return new ResponseEntity<Object>(exceptionResponse, HttpStatus.BAD_REQUEST);
	}
}