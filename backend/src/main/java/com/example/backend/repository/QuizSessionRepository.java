package com.example.backend.repository;

import com.example.backend.entity.QuizSession;
import com.example.backend.entity.User;
import com.example.backend.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface QuizSessionRepository extends JpaRepository<QuizSession, Long> {

    List<QuizSession> findByQuizAndCompletedTrueOrderByScoreDesc(Quiz quiz);

    Optional<QuizSession> findByUserAndQuizAndCompletedFalse(User user, Quiz quiz);
}