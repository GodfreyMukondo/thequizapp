package com.quizapp.thequizapp.examServiceImplimentation;

import com.quizapp.thequizapp.Exam;
import com.quizapp.thequizapp.examService.ExamService;
import com.quizapp.thequizapp.examaRepository.ExamRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamServiceImpl implements ExamService {
    private final ExamRepository repo;

    public ExamServiceImpl(ExamRepository repo) {
        this.repo = repo;
    }

    public Exam saveExam(Exam exam) { return repo.save(exam); }

    public List<Exam> getAllExams() { return repo.findAll(); }

    public Exam getExamById(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
    }
}