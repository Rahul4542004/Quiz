package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "oops_questions")
public class OOPSQuestions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String topic;
    private String description;
    @ManyToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinTable(name = "oops_questions_answers",
            joinColumns = @JoinColumn(name = "q_id",referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "ans_id",referencedColumnName = "id")
    )
    Set<Answers> answers;
}
