package com.example.demo.service;

import com.example.demo.dto.JwtAuthResponseDto;
import com.example.demo.dto.LoginDto;
import com.example.demo.dto.RegisterDto;
import com.example.demo.dto.UpdateDto;

import java.util.Date;

public interface AuthService {
    String register(RegisterDto registerDto);
    JwtAuthResponseDto login(LoginDto loginDto);
    String registerAsAdmin(RegisterDto registerDto);
    String updateInformation(UpdateDto updateDto);
}
