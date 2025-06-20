package com.quizapp.thequizapp;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "results")
@Data
@AllArgsConstructor
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int score;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private AppUser student;

    @ManyToOne
    @JoinColumn(name = "exam_id")
    private Exam exam;

    // Constructors
    public Result() {}

    public Result(AppUser student, Exam exam, int score) {
        this.student = student;
        this.exam = exam;
        this.score = score;
    }


}
