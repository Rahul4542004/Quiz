package com.example.demo.repository;

import com.example.demo.entity.OSQuestions;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OSQuestionsRepository extends JpaRepository<OSQuestions,Long> {
}
