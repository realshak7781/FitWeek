//package com.fitweek.backend.domain.entities;
//
//
//import jakarta.persistence.*;
//import lombok.*;
//
//@Entity
//@Table(name="set_logs")
//@NoArgsConstructor
//@AllArgsConstructor
//@Getter @Setter
//public class SetLog {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//
//    private String exerciseName;
//    private Double weight;
//    private Integer reps;
//
//    // RPE (Rate of Perceived Exertion) is our "Level 2" secret sauce.
//    // It tells the AI how hard the set actually felt (1-10).
//    private Integer rpe;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "workout_session_id")
//    private WorkoutSession session;
//}
