package com.example.backend.controller;

import com.example.backend.entity.Question;
import com.example.backend.entity.Score;
import com.example.backend.entity.Quiz;
import com.example.backend.repository.QuestionRepository;
import com.example.backend.repository.ScoreRepository;
import com.example.backend.repository.QuizRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    
    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private ScoreRepository scoreRepository;

    @Autowired
    private QuizRepository quizRepository;

    // ✅ CREATE QUIZ (FIXED)
    @PostMapping("/create-quiz")
    public Quiz createQuiz(@RequestBody Quiz quiz) {
        Quiz savedQuiz = quizRepository.save(quiz);
        return savedQuiz; // 🔥 returns id + data
    }

    // ✅ ADD QUESTION TO QUIZ
    @PostMapping("/add-question/{quizId}")
    public String addQuestion(@PathVariable Long quizId,
                             @RequestBody Question question) {

        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        question.setQuiz(quiz);

        questionRepository.save(question);

        return "Question Added Successfully";
    }

    // ✅ GET ALL SCORES (LEADERBOARD)
    @GetMapping("/scores")
    public List<Score> getAllScores() {
        return scoreRepository.findAll();
    }
}