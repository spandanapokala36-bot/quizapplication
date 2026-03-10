package com.example.backend.controller;

import com.example.backend.entity.Question;
import com.example.backend.entity.Score;
import com.example.backend.repository.QuestionRepository;
import com.example.backend.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.backend.entity.Quiz;
import com.example.backend.repository.QuizRepository;
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private ScoreRepository scoreRepository;

    @Autowired
private QuizRepository QuizRepository;

@PostMapping("/add-question/{quizId}")
public String addQuestion(@PathVariable Long quizId,
                          @RequestBody Question question) {

    Quiz quiz = quizRepository.findById(quizId)
            .orElseThrow(() -> new RuntimeException("Quiz not found"));

    question.setQuiz(quiz);

    questionRepository.save(question);

    return "Question Added Successfully";
}

    @Autowired
private QuizRepository quizRepository;

@PostMapping("/create-quiz")
public String createQuiz(@RequestBody Quiz quiz) {
    quizRepository.save(quiz);
    return "Quiz Created Successfully";
}
    @GetMapping("/scores")
    public List<Score> getAllScores() {
        return scoreRepository.findAll();
    }
}