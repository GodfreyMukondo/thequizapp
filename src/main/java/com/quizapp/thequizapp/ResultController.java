package com.quizapp.thequizapp;

import com.quizapp.thequizapp.resultService.ResultService;
import com.quizapp.thequizapp.Result;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/results")
public class ResultController {

    private final ResultService resultService;

    public ResultController(ResultService resultService) {
        this.resultService = resultService;
    }

    @PostMapping
    public ResponseEntity<Result> addResult(@Valid @RequestBody Result result) {
        Result savedResult = resultService.saveResult(result);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedResult);
    }

    @GetMapping
    public List<Result> getResults(@RequestParam(required = false) Long studentId) {
        return (studentId != null) ?
                resultService.getResultsByStudentId(studentId) :
                resultService.getAllResults();
    }
}
