package com.example.demo.service;

import com.example.demo.dto.ScoreDto;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ScoreService {
    String saveScore(String username, ScoreDto scoreDto);
    List<ScoreDto> getScoresByUser(String username);
}
