package com.example.demo.service;

import com.example.demo.dto.JwtAuthResponseDto;
import com.example.demo.dto.LoginDto;
import com.example.demo.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);
    JwtAuthResponseDto login(LoginDto loginDto);
    String registerAsAdmin(RegisterDto registerDto);
}
