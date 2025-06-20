package com.quizapp.thequizapp;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;


import java.util.List;

@Entity
@Table(name = "exams")
@Data
@AllArgsConstructor
public class Exam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL)
    private List<Question> questions;

    // Constructors
    public Exam() {}

    public Exam(String title, String description) {
        this.title = title;
        this.description = description;
    }


}
