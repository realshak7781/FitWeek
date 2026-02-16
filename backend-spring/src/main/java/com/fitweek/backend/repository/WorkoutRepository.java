package com.fitweek.backend.repository;

import com.fitweek.backend.domain.entities.WorkoutSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface WorkoutRepository extends JpaRepository<WorkoutSession,Long> {
    Optional<WorkoutSession> findWorkoutDate(LocalDate date);
}
