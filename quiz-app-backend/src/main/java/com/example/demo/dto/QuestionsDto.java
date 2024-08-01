package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class QuestionsDto {
    private String description;
    private String option_a;
    private String option_b;
    private String option_c;
    private String option_d;
    private String option;
    private String topic;
}
