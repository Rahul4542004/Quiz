package com.example.demo.service.Impl;

import com.example.demo.dto.ScoreDto;
import com.example.demo.entity.Score;
import com.example.demo.repository.ScoreRepository;
import com.example.demo.service.ScoreService;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
@Service
@AllArgsConstructor
public class ScoreServiceImpl implements ScoreService {
    private ScoreRepository scoreRepository;
    private final ConcurrentMap<Long, Score> map = new ConcurrentHashMap<>();
    @PostConstruct
    public void init(){
        map.clear();
        List<Score> scores = scoreRepository.findAll();
        for(Score score : scores){
            map.put(score.getId(),score);
        }
    }
    @Override
    public String saveScore( String username, ScoreDto scoreDto) {
        Score score = new Score();
        score.setScore(scoreDto.getScore());
        score.setSubject(scoreDto.getSubject());
        score.setUsername(username);
        score.setTotalScore(scoreDto.getTotalScore());
        Score savedScore = scoreRepository.save(score);
        map.put(savedScore.getId(),savedScore);
        return "Score saved successfully!!!";
    }

    @Override
    public List<ScoreDto> getScoresByUser(String username) {
        List<ScoreDto> scores = new ArrayList<>();
        for(Score score : map.values()){
            if(score.getUsername().equals(username)){
                ScoreDto scoreDto = new ScoreDto();
                scoreDto.setScore(score.getScore());
                scoreDto.setSubject(score.getSubject());
                scoreDto.setTotalScore(score.getTotalScore());
                scores.add(scoreDto);
            }
        }
        return scores;
    }
}
