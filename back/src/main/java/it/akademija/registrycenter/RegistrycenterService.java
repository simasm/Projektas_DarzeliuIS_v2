package it.akademija.registrycenter;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
@Service
public class RegistrycenterService {
	
	private static String url = 
			"https://darzelis.akademijait.vtmc.lt/registru-centras/vaikai/";
	RegistrycenterDTO  getDataByID(String id) {
//		 
//		RestTemplate restTemplate = new RestTemplate();
// 		Gson gson = new Gson();
// 		String jsonString = gson.toJson(restTemplate.getForObject(url + id, String.class));
// 		System.out.println();
// 		System.out.println("service " + jsonString);
// 		JsonElement jsonTree = gson.toJsonTree(jsonString);
// 		System.out.println("service " + jsonTree.toString());
// 		JsonObject jsonObject = jsonTree.getAsJsonObject();
// 		System.out.println("service " + jsonObject);
// 		System.out.println("service " + jsonObject.getAsString());
// 		System.out.println();
// 		
 	
		URL urlObject = null;
		try {
			urlObject = new URL(url + id);
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		InputStreamReader reader = null;
		try {
			reader = new InputStreamReader(urlObject.openStream());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		RegistrycenterDTO dto = new Gson().fromJson(reader, RegistrycenterDTO.class);
	//	System.out.println(dto.toString());
  //todo validation
 		
 		/*return new RegistrycenterDTO(jsonObject.get("vardas").getAsString(),
 				jsonObject.get("pavarde").getAsString(),
 				jsonObject.get("asmensKodas").getAsString(),
 				jsonObject.get("gimimoData").getAsString());  */
  	return dto;

	}

}
 