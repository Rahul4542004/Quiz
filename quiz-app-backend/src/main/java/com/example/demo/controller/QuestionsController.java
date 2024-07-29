package com.example.demo.controller;

import com.example.demo.dto.QuestionsDto;
import com.example.demo.dto.ResponseDto;
import com.example.demo.service.QuestionsService;
import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;
@RequestMapping("/api/questions")
@CrossOrigin("*")
@RestController
@AllArgsConstructor
public class QuestionsController {
    QuestionsService questionsService;
    @PostMapping("/os")
    public ResponseEntity<String> addOSQuestion(@RequestBody QuestionsDto questionsDto){
        String message = questionsService.addOSQuestion(questionsDto);
        return new ResponseEntity<>(message, HttpStatus.CREATED);
    }
    @GetMapping("/os")
    public ResponseEntity<List<QuestionsDto>> getOSQuestions(){
        List<QuestionsDto> list = questionsService.getOSQuestions();
        return ResponseEntity.ok(list);
    }
    @PostMapping("/os/submit")
    public ResponseEntity<String> processResponse(@RequestBody List<ResponseDto> responseDto){
        String result = questionsService.processResponses(responseDto);
        return ResponseEntity.ok(result);
    }
}
