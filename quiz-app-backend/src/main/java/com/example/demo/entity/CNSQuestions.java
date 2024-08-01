package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.*;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "cns_questions")
public class CNSQuestions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String topic;
    @ManyToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinTable(name = "cns_questions_answers",
            joinColumns = @JoinColumn(name = "q_id",referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "ans_id",referencedColumnName = "id")
    )
    private Set<Answers> answersSet;
}
