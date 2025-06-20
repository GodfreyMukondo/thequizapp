package com.quizapp.thequizapp.resultService;

import com.quizapp.thequizapp.Result;

import java.util.List;

public interface ResultService {
    Result saveResult(Result result);
    List<Result> getResultsByStudentId(Long studentId);
    List<Result> getAllResults();
}
