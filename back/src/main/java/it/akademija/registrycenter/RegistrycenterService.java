package it.akademija.registrycenter;

import java.io.IOException;
import java.net.URL;
import java.nio.charset.Charset;

import org.apache.commons.io.IOUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;


@Service
public class RegistrycenterService {

	private static String url =
			"https://darzelis.akademijait.vtmc.lt/registru-centras/vaikai/";

	public RegistrycenterDetailsDTO getDataByID(String id) {

		/*
		URL urlObject = null;
		try {
			urlObject = new URL(url + id);
		} catch (MalformedURLException e) {
			e.printStackTrace();

		}

		InputStreamReader reader = null;

		try {

			HttpURLConnection connection = 
					(HttpURLConnection) urlObject.openConnection();
			if (connection.getResponseCode() != HttpURLConnection.HTTP_OK)
				return null;

			reader = new InputStreamReader(connection.getInputStream(), Charset.forName("UTF-8"));

		} catch (IOException e) {
			e.printStackTrace();
		}

		if (reader != null) {
			return new Gson().fromJson(reader, RegistrycenterDetailsDTO.class);

		} else
			return null;*/
		
		JSONObject json = null;
		
		 try {
			json = new JSONObject(IOUtils.toString(new URL(url + id), Charset.forName("UTF-8")));
		} catch (JSONException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		 
		 if(json != null && json.getString("vardas").length() > 0)
		 
			return new RegistrycenterDetailsDTO(json.getString("vardas"),
					json.getString("pavarde"),
					json.getString("asmensKodas"),
					json.getString("gimimoData"));
 		 
		 else 
			 return null;
				

	}
		
		
}
