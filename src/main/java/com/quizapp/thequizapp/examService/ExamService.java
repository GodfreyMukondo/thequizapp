package com.quizapp.thequizapp.examService;

import com.quizapp.thequizapp.Exam;

import java.util.List;

public interface ExamService {
    Exam saveExam(Exam exam);
    List<Exam> getAllExams();
    Exam getExamById(Long id);
}
