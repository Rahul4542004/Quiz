package com.example.demo.controller;

import com.example.demo.dto.JwtAuthResponseDto;
import com.example.demo.dto.LoginDto;
import com.example.demo.dto.RegisterDto;
import com.example.demo.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {
    AuthService authService;
    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponseDto> login(@RequestBody LoginDto loginDto){
        JwtAuthResponseDto responseDto = authService.login(loginDto);
        return ResponseEntity.ok(responseDto);
    }
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
        String message = authService.register(registerDto);
        return new ResponseEntity<>(message, HttpStatus.CREATED);
    }
    @PostMapping("/register/admin")
    public ResponseEntity<String> registerAsAdmin(@RequestBody RegisterDto registerDto){
        String message = authService.registerAsAdmin(registerDto);
        return new ResponseEntity<>(message,HttpStatus.CREATED);
    }
}
