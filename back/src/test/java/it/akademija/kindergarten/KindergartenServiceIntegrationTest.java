package it.akademija.kindergarten;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;

@SpringBootTest
public class KindergartenServiceIntegrationTest {

	@Autowired
	private KindergartenService service;

	@Test
	public void testNameAlreadyExist() {
		boolean doesKindergartenExists = service.nameAlreadyExists("Karuselė", "190033652");
		assertTrue(doesKindergartenExists);
	}

	@Test
	public void testFindKindergartens() {
		Kindergarten kindergarten = service.findById("190033652");
		assertEquals("Karuselė", kindergarten.getName());

		PageRequest page = PageRequest.of(1, 10);
		assertEquals(10, service.getKindergartenPageFilteredByName("Gudrutis", page).getSize());

		assertTrue(service.getKindergartenPage(page).getSize() != 0);

		assertTrue(service.getKindergartenStatistics(page).getSize() != 0);

	}

	@Test
	public void testGetAllElderates() {

		KindergartenInfo info = new KindergartenInfo();
		info.setAddress("Adresas 2");
		info.setElderate("Senamiestis");
		info.setId("123456987");
		info.setName("Mazutis");

		assertTrue(service.getAllElderates().size() != 0);
	}

	@Test
	public void testCreateDeleteKindergarten() {
		
		
		KindergartenDTO newGarten = new KindergartenDTO("123456789", "Testa", "Testa", "Testa", 
                                                        "Aleksandras", "Makedonietis", 10, 10, "56.78952, 57.96946");
		service.createNewKindergarten(newGarten);
		assertTrue(service.findById("123456789").getAddress().equals("Testa"));

		KindergartenDTO updatedInfo = new KindergartenDTO("123456789", "Testa", "Testa", "Testa", 
                                                          "Aleksandras", "Makedonietis", 10, 10, "56.78952, 57.96946");
		service.updateKindergarten("123456789", updatedInfo);
		assertEquals(10, service.findById("123456789").getCapacityAgeGroup2to3());

		service.decreaseNumberOfTakenPlacesInAgeGroup(service.findById("123456789"), 2);
		assertEquals(10, service.findById("123456789").getCapacityAgeGroup2to3());
		service.deleteByName("Testa");
		assertNull(service.findById("123456789"));

		KindergartenDTO garten = new KindergartenDTO("123456787", "Testas", "Testas", "Testas", 
                                                     "Aliona", "Juško", 11, 9, "58.78952, 56.96946");
		service.createNewKindergarten(garten);
		long age = 4;
		service.increaseNumberOfTakenPlacesInAgeGroup(service.findById("123456787"), age);
		assertTrue(service.findById("123456787").getCapacityAgeGroup2to3() == 11);
		service.deleteKindergarten("123456787");
		assertNull(service.findById("123456787"));
	}

}