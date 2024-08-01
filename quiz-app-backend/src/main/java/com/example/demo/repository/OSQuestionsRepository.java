package com.example.demo.repository;

import com.example.demo.entity.OSQuestions;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
public interface OSQuestionsRepository extends JpaRepository<OSQuestions,Long> {
    Set<OSQuestions> findByTopic(String topic);
}
