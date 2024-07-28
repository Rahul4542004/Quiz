package com.example.demo.service;

import com.example.demo.dto.QuestionsDto;
import com.example.demo.dto.ResponseDto;
import org.springframework.http.ResponseEntity;
import java.util.*;
public interface QuestionsService {
    String addOSQuestion(QuestionsDto questionsDto);
    List<QuestionsDto> getOSQuestions();
    Boolean processResponse(ResponseDto responseDto);
}
