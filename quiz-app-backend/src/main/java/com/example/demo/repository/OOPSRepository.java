package com.example.demo.repository;

import com.example.demo.entity.OOPSQuestions;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
public interface OOPSRepository extends JpaRepository<OOPSQuestions,Long> {
    Set<OOPSQuestions> findByTopic(String topic);
}
