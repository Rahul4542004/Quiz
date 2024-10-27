package com.example.demo.controller;

import com.example.demo.dto.ResponseDto;
import com.example.demo.dto.ScoreDto;
import com.example.demo.service.ScoreService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;
@RestController
@RequestMapping("/api/score")
@CrossOrigin("*")
@AllArgsConstructor
public class ScoreController {
    private ScoreService scoreService;
    @PostMapping("/")
    public ResponseEntity<String> saveScore(@RequestParam String username, @RequestBody ScoreDto scoreDto){
        String message = scoreService.saveScore(username,scoreDto);
        return new ResponseEntity<>(message, HttpStatus.CREATED);
    }
    @GetMapping("/")
    public ResponseEntity<List<ScoreDto>> getScoresByUser(@RequestParam String username){
        List<ScoreDto> list = scoreService.getScoresByUser(username);
        return ResponseEntity.ok(list);
    }
}
