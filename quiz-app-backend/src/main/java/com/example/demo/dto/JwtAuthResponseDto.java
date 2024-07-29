package com.example.demo.dto;

import com.example.demo.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class JwtAuthResponseDto {
    private String accessToken;
    private String tokenType = "Bearer";
    private String role;
    private String username;
    private User user;
}
