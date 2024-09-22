package com.example.demo.mapper;

import com.example.demo.dto.QuestionsDto;
import com.example.demo.entity.CNSQuestions;
import com.example.demo.entity.DBMSQuestions;
import com.example.demo.entity.OOPSQuestions;

public class Mapper {
    public static QuestionsDto mapToQuestionsDto(DBMSQuestions questions){
        QuestionsDto questionsDto = new QuestionsDto();
        questionsDto.setDescription(questions.getDescription());
        questionsDto.setTopic(questions.getTopic());
        questionsDto.setOption_a(questions.getOptionA());
        questionsDto.setOption_b(questions.getOptionB());
        questionsDto.setOption_c(questions.getOptionC());
        questionsDto.setOption_d(questions.getOptionD());
        return questionsDto;
    }
    public static QuestionsDto mapCnsToQuestionsDto(CNSQuestions cnsQuestions){
        QuestionsDto questionsDto = new QuestionsDto();
        questionsDto.setDescription(cnsQuestions.getDescription());
        questionsDto.setTopic(cnsQuestions.getTopic());
        questionsDto.setOption_b(cnsQuestions.getOptionB());
        questionsDto.setOption_c(cnsQuestions.getOptionC());
        questionsDto.setOption_d(cnsQuestions.getOptionD());
        questionsDto.setOption_a(cnsQuestions.getOptionA());
        return questionsDto;
    }
    public static QuestionsDto mapOOPSToQuestionsDto(OOPSQuestions oopsQuestions){
        QuestionsDto questionsDto = new QuestionsDto();
        questionsDto.setDescription(oopsQuestions.getDescription());
        questionsDto.setTopic(oopsQuestions.getTopic());
        questionsDto.setOption_a(oopsQuestions.getOptionA());
        questionsDto.setOption_b(oopsQuestions.getOptionB());
        questionsDto.setOption_c(oopsQuestions.getOptionC());
        questionsDto.setOption_d(oopsQuestions.getOptionD());
        return questionsDto;
    }
}
