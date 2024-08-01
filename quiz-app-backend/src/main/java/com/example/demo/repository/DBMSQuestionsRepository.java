package com.example.demo.repository;

import com.example.demo.entity.DBMSQuestions;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface DBMSQuestionsRepository extends JpaRepository<DBMSQuestions,Long> {
    Set<DBMSQuestions> findByTopic(String topic);
}
