package com.fitweek.backend.domain.entities;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "workout_sessions")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate workoutDate;
//    this is the name of the type of the workout
    private String title;

    @Column(columnDefinition = "TEXT")
    private String aiCoachNotes;

//    now this contains a list of workout sessions
    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SetLog> setLogs=new ArrayList<>();
}
