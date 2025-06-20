package com.quizapp.thequizapp.resultServiceImplimentation;

import com.quizapp.thequizapp.Result;
import com.quizapp.thequizapp.resultRepository.ResultRepository;
import com.quizapp.thequizapp.resultService.ResultService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultServiceImpl implements ResultService {
    private final ResultRepository repo;

    public ResultServiceImpl(ResultRepository repo) {
        this.repo = repo;
    }

    public Result saveResult(Result result) { return repo.save(result); }

    public List<Result> getResultsByStudentId(Long studentId) {
        return repo.findByStudentId(studentId);
    }

    public List<Result> getAllResults() { return repo.findAll(); }
}

