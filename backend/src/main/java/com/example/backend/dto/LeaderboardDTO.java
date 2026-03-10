package com.example.backend.dto;

public class LeaderboardDTO {

    private int rank;
    private String email;
    private int score;

    public LeaderboardDTO(int rank, String email, int score) {
        this.rank = rank;
        this.email = email;
        this.score = score;
    }

    public int getRank() { return rank; }
    public String getEmail() { return email; }
    public int getScore() { return score; }
}