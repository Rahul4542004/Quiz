package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.*;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UpdateDto {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String phoneNo;
    private String gender;
    private String institution;
    private String dob;
}
