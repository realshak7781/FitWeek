package com.fitweek.backend.service;

import com.fitweek.backend.domain.entities.WorkoutSession;
import com.fitweek.backend.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.Map;

@Service
public class AiArchitectClient {
    private final WebClient webClient;
    private final WorkoutRepository workoutRepository;

    public AiArchitectClient(WebClient.Builder webClientBuilder,@Value("${ai.service.url}") String aiServiceUrl,
                             WorkoutRepository workoutRepository) {
        // Points to the Python service you verified in Postman
        this.webClient = webClientBuilder.baseUrl(aiServiceUrl).build();
        this.workoutRepository = workoutRepository;
    }

    @Async // Runs this method in a separate thread, freeing the Controller
    public void generateAndSaveAiNotesAsync(WorkoutSession session) {
        try {
            // Block only this background thread to wait for the AI
            Map<String, Object> response = webClient.post()
                    .uri("/analyze")
                    .bodyValue(session)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response != null && response.containsKey("aiCoachNotes")) {
                String notes = (String) response.get("aiCoachNotes");
                session.setAiCoachNotes(notes);
                workoutRepository.save(session); // Update the DB with the new notes
            }
        } catch (Exception e) {
            // Roark Integrity Check: If AI fails, the saved workout remains safe
            System.err.println("AI Background Task Failed: " + e.getMessage());
        }
    }
}