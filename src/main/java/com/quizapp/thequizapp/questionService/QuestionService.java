package com.quizapp.thequizapp.questionService;

import com.quizapp.thequizapp.Question;

import java.util.List;

public interface QuestionService {
    Question saveQuestion(Question question);
    List<Question> getAllQuestions();
    List<Question> getQuestionsByExamId(Long examId);
}
