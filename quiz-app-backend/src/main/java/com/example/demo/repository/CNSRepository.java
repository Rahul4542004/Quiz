package com.example.demo.repository;

import com.example.demo.entity.CNSQuestions;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
public interface CNSRepository extends JpaRepository<CNSQuestions,Long> {
    Set<CNSQuestions> findByTopic(String topic);
}
