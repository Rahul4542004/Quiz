package com.example.demo.controller;

import com.example.demo.dto.QuestionsDto;
import com.example.demo.dto.ResponseDto;
import com.example.demo.dto.TopicDto;
import com.example.demo.service.QuestionsService;
import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

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
    @GetMapping("/os/topic")
    public ResponseEntity<List<QuestionsDto>> getOSQuestions(@RequestBody TopicDto topicDto){
        List<QuestionsDto> list = questionsService.getOSQuestions(topicDto.getTopic());
        return ResponseEntity.ok(list);
    }
    @PostMapping("/os/submit")
    public ResponseEntity<String> processOSsResponses(@RequestBody List<ResponseDto> responseDto){
        String result = questionsService.processOSResponses(responseDto);
        return ResponseEntity.ok(result);
    }
    @PostMapping("/dbms")
    public ResponseEntity<String> addDBMSQuestion(@RequestBody QuestionsDto questionsDto){
        String message = questionsService.addDBMSQuestion(questionsDto);
        return new ResponseEntity<>(message,HttpStatus.CREATED);
    }
    @GetMapping("/dbms")
    public ResponseEntity<List<QuestionsDto>> getDBMSQuestions(){
        List<QuestionsDto> list = questionsService.getDBMSQuestions();
        return ResponseEntity.ok(list);
    }
    @GetMapping("/dbms/topic")
    public ResponseEntity<List<QuestionsDto>> getDBMSQuestions(@RequestBody TopicDto topicDto){
        List<QuestionsDto> list = questionsService.getDBMSQuestions(topicDto.getTopic());
        return ResponseEntity.ok(list);
    }
    @PostMapping("/dbms/submit")
    public ResponseEntity<String> processDBMSResponses(@RequestBody List<ResponseDto> responseDtos){
        String message = questionsService.processDBMSResponses(responseDtos);
        return ResponseEntity.ok(message);
    }
    @PostMapping("/cns")
    public ResponseEntity<String> addCNSQuestion(@RequestBody QuestionsDto questionsDto){
        String message = questionsService.addCNSQuestion(questionsDto);
        return new ResponseEntity<>(message,HttpStatus.CREATED);
    }
    @GetMapping("/cns")
    public ResponseEntity<List<QuestionsDto>> getCNSQuestions(){
        List<QuestionsDto> list = questionsService.getCNSQuestions();
        return ResponseEntity.ok(list);
    }
    @GetMapping("/cns/topic")
    public ResponseEntity<List<QuestionsDto>> getCNSQuestions(@RequestBody TopicDto topicDto){
        List<QuestionsDto> list = questionsService.getCNSQuestions(topicDto.getTopic());
        return ResponseEntity.ok(list);
    }
    @PostMapping("/cns/submit")
    public ResponseEntity<String> processCNSResponses(@RequestBody List<ResponseDto> responseDtos) {
        String message = questionsService.processCNSResponses(responseDtos);
        return ResponseEntity.ok(message);
    }
    @PostMapping("/oops")
    public ResponseEntity<String> addOOPSQuestion(@RequestBody QuestionsDto questionsDto){
        String message = questionsService.addOOPSQuestion(questionsDto);
        return new ResponseEntity<>(message,HttpStatus.CREATED);
    }
    @GetMapping("/oops")
    public ResponseEntity<List<QuestionsDto>> getOOPSQuestions(){
        List<QuestionsDto> list = questionsService.getOOPSQuestions();
        return ResponseEntity.ok(list);
    }
    @GetMapping("/oops/topic")
    public ResponseEntity<List<QuestionsDto>> getOOPSQuestions(@RequestBody TopicDto topicDto){
        List<QuestionsDto> list = questionsService.getOOPSQuestions(topicDto.getTopic());
        return ResponseEntity.ok(list);
    }
    @PostMapping("oops/submit")
    public ResponseEntity<String> processOOPSResponses(@RequestBody List<ResponseDto> responseDtos){
        String message = questionsService.processOOPSResponses(responseDtos);
        return ResponseEntity.ok(message);
    }
}
