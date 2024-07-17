package com.example.demo.repository;

import com.example.demo.entity.Answers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswersRepository extends JpaRepository<Answers,Long> {
}
