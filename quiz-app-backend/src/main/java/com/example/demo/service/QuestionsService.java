package com.example.demo.service;

import com.example.demo.dto.QuestionsDto;
import com.example.demo.dto.ResponseDto;
import org.springframework.http.ResponseEntity;
import java.util.*;
public interface QuestionsService {
    String addOSQuestion(QuestionsDto questionsDto);
    List<QuestionsDto> getOSQuestions();
    Integer processOSResponses(List<ResponseDto> responseDto);
    List<QuestionsDto> getOSQuestions(String topic);
    String addDBMSQuestion(QuestionsDto questionsDto);
    List<QuestionsDto> getDBMSQuestions();
    List<QuestionsDto> getDBMSQuestions(String topic);
    Integer processDBMSResponses(List<ResponseDto> responseDtos);
    String addCNSQuestion(QuestionsDto questionsDto);
    List<QuestionsDto> getCNSQuestions();
    List<QuestionsDto> getCNSQuestions(String topic);
    Integer processCNSResponses(List<ResponseDto> responseDtos);
    String addOOPSQuestion(QuestionsDto questionsDto);
    List<QuestionsDto> getOOPSQuestions();
    List<QuestionsDto> getOOPSQuestions(String topic);
    Integer processOOPSResponses(List<ResponseDto> list);
}
