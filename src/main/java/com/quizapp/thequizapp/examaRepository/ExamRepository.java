package com.quizapp.thequizapp.examaRepository;

import com.quizapp.thequizapp.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamRepository extends JpaRepository<Exam, Long> {}