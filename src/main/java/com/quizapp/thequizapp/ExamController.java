package com.quizapp.thequizapp;

import com.quizapp.thequizapp.Exam;
import com.quizapp.thequizapp.examService.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/exams")
@CrossOrigin(origins = "http://localhost:5176") // React frontend port
public class ExamController {

    @Autowired
    private ExamService examService;

    @GetMapping("/{id}")
    public Exam getExamById(@PathVariable Long id) {
        return examService.getExamById(id);
    }

    @GetMapping
    public List<Exam> getAllExams() {
        return examService.getAllExams();
    }

    @PostMapping
    public ResponseEntity<Exam> createExam(@RequestBody Exam exam) {
        Exam savedExam = examService.saveExam(exam);
        return ResponseEntity.status(201).body(savedExam);
    }
}
