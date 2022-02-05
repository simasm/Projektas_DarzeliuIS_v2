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
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.http.HttpResponse;

@Service
public class RegistrycenterService {

	private static String url =
			"https://darzelis.akademijait.vtmc.lt/registru-centras/vaikai/";

	public RegistrycenterDetailsDTO getDataByID(String id) {

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

			reader = new InputStreamReader(connection.getInputStream());

		} catch (IOException e) {
			e.printStackTrace();
		}

		if (reader != null) {
			return new Gson().fromJson(reader, RegistrycenterDetailsDTO.class);

		} else
			return null;
	}

}
