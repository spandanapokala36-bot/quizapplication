package com.example.backend.controller;

import com.example.backend.dto.LeaderboardDTO;
import com.example.backend.entity.Question;
import com.example.backend.entity.Quiz;
import com.example.backend.entity.QuizSession;
import com.example.backend.entity.User;
import com.example.backend.repository.QuestionRepository;
import com.example.backend.repository.QuizRepository;
import com.example.backend.repository.QuizSessionRepository;
import com.example.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuizSessionRepository quizSessionRepository;

    @Autowired
    private QuizRepository quizRepository;

    // 🔥 GET QUESTIONS BY QUIZ
    @GetMapping("/{quizId}/questions")
    public List<Question> getQuestionsByQuiz(@PathVariable Long quizId) {
        return questionRepository.findByQuizId(quizId);
    }

    // 🔥 START QUIZ
    @GetMapping("/{quizId}/start")
    public String startQuiz(@PathVariable Long quizId,
                            Authentication authentication) {

        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow();
        Quiz quiz = quizRepository.findById(quizId).orElseThrow();

        if (quizSessionRepository
                .findByUserAndQuizAndCompletedFalse(user, quiz)
                .isPresent()) {
            return "You already have an active session for this quiz!";
        }

        QuizSession session = new QuizSession();
        session.setUser(user);
        session.setQuiz(quiz);
        session.setStartTime(LocalDateTime.now());
        session.setCompleted(false);

        quizSessionRepository.save(session);

        return "Quiz Started Successfully!";
    }

    // 🔥 SUBMIT QUIZ
    @PostMapping("/{quizId}/submit")
    public String submitQuiz(@PathVariable Long quizId,
                             @RequestBody Map<Long, String> answers,
                             Authentication authentication) {

        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow();
        Quiz quiz = quizRepository.findById(quizId).orElseThrow();

        QuizSession session = quizSessionRepository
                .findByUserAndQuizAndCompletedFalse(user, quiz)
                .orElseThrow(() -> new RuntimeException("No active quiz session found!"));

        long minutes = Duration
                .between(session.getStartTime(), LocalDateTime.now())
                .toMinutes();

        if (minutes > quiz.getDurationMinutes()) {
            session.setCompleted(true);
            session.setEndTime(LocalDateTime.now());
            session.setScore(0);
            quizSessionRepository.save(session);
            return "Time Over! Quiz Auto Submitted.";
        }

        List<Question> questions = questionRepository.findByQuizId(quizId);

        int scoreValue = 0;

        for (Question question : questions) {
            String userAnswer = answers.get(question.getId());

            if (userAnswer != null &&
                    question.getCorrectAnswer().equalsIgnoreCase(userAnswer)) {
                scoreValue++;
            }
        }

        session.setScore(scoreValue);
        session.setCompleted(true);
        session.setEndTime(LocalDateTime.now());

        quizSessionRepository.save(session);

        return "Quiz Submitted Successfully! Your Score: " + scoreValue;
    }

    // 🏆 LEADERBOARD
    @GetMapping("/{quizId}/leaderboard")
    public List<LeaderboardDTO> getLeaderboard(@PathVariable Long quizId) {

        Quiz quiz = quizRepository.findById(quizId).orElseThrow();

        List<QuizSession> sessions =
                quizSessionRepository
                        .findByQuizAndCompletedTrueOrderByScoreDesc(quiz);

        List<LeaderboardDTO> leaderboard = new ArrayList<>();

        int rank = 1;

        for (QuizSession session : sessions) {
            leaderboard.add(
                    new LeaderboardDTO(
                            rank++,
                            session.getUser().getEmail(),
                            session.getScore()
                    )
            );
        }

        return leaderboard;
    }

    // 📚 GET ALL QUIZZES
    @GetMapping("/all")
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }
}