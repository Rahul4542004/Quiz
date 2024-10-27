package com.example.demo.repository;

import com.example.demo.entity.Score;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ScoreRepository extends JpaRepository<Score,Long> {
}
