package com.quizapp.thequizapp.questionRepository;

import com.quizapp.thequizapp.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByExamId(Long examId);
}
