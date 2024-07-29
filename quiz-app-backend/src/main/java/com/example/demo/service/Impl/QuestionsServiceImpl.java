package com.example.demo.service.Impl;

import com.example.demo.dto.QuestionsDto;
import com.example.demo.dto.ResponseDto;
import com.example.demo.entity.Answers;
import com.example.demo.entity.OSQuestions;
import com.example.demo.exception.UserNotFoundException;
import com.example.demo.repository.AnswersRepository;
import com.example.demo.repository.OSQuestionsRepository;
import com.example.demo.service.QuestionsService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class QuestionsServiceImpl implements QuestionsService {
    private AnswersRepository answersRepository;
    private OSQuestionsRepository osQuestionsRepository;
    @Override
    public String addOSQuestion(QuestionsDto questionsDto) {
        OSQuestions questions = new OSQuestions();
        questions.setDescription(questionsDto.getDescription());
        questions.setOptionA(questionsDto.getOption_a());
        questions.setOptionB(questionsDto.getOption_b());
        questions.setOptionC(questionsDto.getOption_c());
        questions.setOptionD(questionsDto.getOption_d());
        Answers answers = answersRepository.findByOptions(questionsDto.getOption());
        Set<Answers> answersSet = new HashSet<>();
        answersSet.add(answers);
        questions.setAnswers(answersSet);
        osQuestionsRepository.save(questions);
        return "OS question successfully added";
    }

    @Override
    public List<QuestionsDto> getOSQuestions() {
        List<OSQuestions> list = osQuestionsRepository.findAll();
        List<QuestionsDto> result = new ArrayList<>();
        for(OSQuestions question : list){
            QuestionsDto questionsDto = new QuestionsDto();
            questionsDto.setDescription(question.getDescription());
            Optional<Answers> answer = question.getAnswers().stream().findFirst();
            answer.ifPresent(answers -> questionsDto.setOption(answers.getOptions()));
            questionsDto.setOption_a(question.getOptionA());
            questionsDto.setOption_b(question.getOptionB());
            questionsDto.setOption_c(question.getOptionC());
            questionsDto.setOption_d(question.getOptionD());
            result.add(questionsDto);
        }
        return result;
    }
    private Boolean processResponse(ResponseDto responseDto) {
        long id = responseDto.getId();
        OSQuestions question = osQuestionsRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Unexpected error occured"));
        Optional<Answers> answers = question.getAnswers().stream().findFirst();
        boolean flag = false;
        if(answers.isPresent()){
            if(answers.get().getOptions().equals(responseDto.getResponse()))
                flag = true;
        }
        return flag;
    }
    @Override
    public String processResponses(List<ResponseDto> list){
        int score = 0;
        for(ResponseDto responseDto : list){
            if(processResponse(responseDto))
                score++;
        }
        return "Your score is " + score + "/5";
    }
}
