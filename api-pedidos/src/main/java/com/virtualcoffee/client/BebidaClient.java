package com.virtualcoffee.client;

import com.virtualcoffee.model.BebidaDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;

@Component
public class BebidaClient {
    
    private final RestTemplate restTemplate;
    private final String bebidaApiUrl;

    public BebidaClient(RestTemplate restTemplate, 
                       @Value("${bebida.api.url}") String bebidaApiUrl) {
        this.restTemplate = restTemplate;
        this.bebidaApiUrl = bebidaApiUrl;
    }

    /**
     * Obtiene una bebida por nombre desde la API de Bebidas
     * @param name nombre de la bebida
     * @return BebidaDTO si existe
     * @throws HttpClientErrorException.NotFound si la bebida no existe
     */
    public BebidaDTO getBebidaByName(String name) {
        String url = bebidaApiUrl + "/menu/" + name;
        return restTemplate.getForObject(url, BebidaDTO.class);
    }

    /**
     * Verifica si una bebida existe y está disponible
     * @param name nombre de la bebida
     * @return true si existe y está disponible
     */
    public boolean isBebidaAvailable(String name) {
        try {
            BebidaDTO bebida = getBebidaByName(name);
            return bebida != null && bebida.isAvailable();
        } catch (HttpClientErrorException.NotFound e) {
            return false;
        }
    }
}
