package com.example.backend.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.example.backend.entity.Quiz;
@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String questionTitle;

    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String correctAnswer;

    // 👇 ADD THIS
    @ManyToOne
    private Quiz quiz;

    // Getters and Setters

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getQuestionTitle() { return questionTitle; }

    public void setQuestionTitle(String questionTitle) {
        this.questionTitle = questionTitle;
    }

    public String getOptionA() { return optionA; }

    public void setOptionA(String optionA) { this.optionA = optionA; }

    public String getOptionB() { return optionB; }

    public void setOptionB(String optionB) { this.optionB = optionB; }

    public String getOptionC() { return optionC; }

    public void setOptionC(String optionC) { this.optionC = optionC; }

    public String getOptionD() { return optionD; }

    public void setOptionD(String optionD) { this.optionD = optionD; }

    public String getCorrectAnswer() { return correctAnswer; }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    // 👇 ALSO ADD GETTER & SETTER FOR QUIZ

    public Quiz getQuiz() { return quiz; }

    public void setQuiz(Quiz quiz) { this.quiz = quiz; }
}