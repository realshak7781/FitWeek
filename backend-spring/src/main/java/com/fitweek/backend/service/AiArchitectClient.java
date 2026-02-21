package com.fitweek.backend.service;

import com.fitweek.backend.domain.entities.WorkoutSession;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.Map;

@Service
public class AiArchitectClient {
    private final WebClient webClient;

    public AiArchitectClient(WebClient.Builder webClientBuilder) {
        // Points to the Python service you verified in Postman
        this.webClient = webClientBuilder.baseUrl("http://localhost:8000").build();
    }

    public String fetchArchitectNotes(WorkoutSession workoutSession) {
        try {
            return webClient.post()
                    .uri("/analyze")
                    .bodyValue(workoutSession)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .map(response -> (String) response.get("aiCoachNotes"))
                    .block(); // Ensuring the note is ready before database save
        } catch (Exception e) {
            // Roark Integrity Check: If AI fails, the app must not crash
            return "The Architect is observing silently. (AI Service Offline)";
        }
    }
}