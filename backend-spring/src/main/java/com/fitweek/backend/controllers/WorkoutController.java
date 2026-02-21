package com.fitweek.backend.controllers;


import com.fitweek.backend.domain.entities.WorkoutSession;
import com.fitweek.backend.service.AiArchitectClient;
import com.fitweek.backend.service.WorkoutService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/workouts")
public class WorkoutController {
    private final WorkoutService workoutService;
    private final AiArchitectClient aiArchitectClient;

    public WorkoutController(WorkoutService workoutService,AiArchitectClient aiArchitectClient) {
        this.workoutService = workoutService;
        this.aiArchitectClient = aiArchitectClient;
    }

    @PostMapping
    public ResponseEntity<WorkoutSession> createWorkout(@RequestBody WorkoutSession workoutSession) {
        String aiNotes = aiArchitectClient.fetchArchitectNotes(workoutSession);
        workoutSession.setAiCoachNotes(aiNotes);
        WorkoutSession session=workoutService.saveWorkout(workoutSession);
        return ResponseEntity.status(HttpStatus.CREATED).body(session);
    }

    @GetMapping
    public ResponseEntity<List<WorkoutSession>> getAllWorkouts() {
        List<WorkoutSession> sessions=workoutService.getAllWorkouts();
        return ResponseEntity.ok().body(sessions);
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<WorkoutSession> getWorkoutByDate(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return workoutService.getWorkoutByDate(date).map(
                ResponseEntity::ok
        ).orElse(ResponseEntity.notFound().build());
    }
}
