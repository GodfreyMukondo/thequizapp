package com.quizapp.thequizapp;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;

    @JsonProperty("correct_answer")//Mapping
    private String correctAnswer;

    @ManyToOne
    @JoinColumn(name = "exam_id")
    private Exam exam;
}
