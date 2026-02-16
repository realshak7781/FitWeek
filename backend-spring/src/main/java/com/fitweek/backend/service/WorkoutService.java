package com.fitweek.backend.service;


import com.fitweek.backend.domain.entities.WorkoutSession;
import com.fitweek.backend.repository.WorkoutRepository;
import jakarta.transaction.Transactional;
import org.hibernate.jdbc.Work;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class WorkoutService {
    private final WorkoutRepository workoutRepository;

    public WorkoutService(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    @Transactional
    public WorkoutSession saveWorkout(WorkoutSession workoutSession) {
        if (workoutSession.getSetLogs() != null) {
            workoutSession.getSetLogs().forEach(set -> set.setSession(workoutSession));
        }
        return workoutRepository.save(workoutSession);
    }

    public List<WorkoutSession> getAllWorkouts() {
        return workoutRepository.findAll();
    }

    public WorkoutSession getWorkoutByDate(LocalDate date) {
        return workoutRepository.findByWorkoutDate(date).orElse(null);
    }

}
