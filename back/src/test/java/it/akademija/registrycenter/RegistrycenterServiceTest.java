package it.akademija.registrycenter;

 

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
class RegistrycenterServiceTest {

	@Autowired
	private RegistrycenterService service;
	private static String url = 
			"https://darzelis.akademijait.vtmc.lt/registru-centras/vaikai/";
	//known good id
	private static String testId = "51702123212";
	
	@Test
	void TestConnectionToExternalAPI() {
		try {
			HttpURLConnection connection = (HttpURLConnection) new URL(url+testId).openConnection();
		 assertEquals(HttpURLConnection.HTTP_OK, connection.getResponseCode());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}
