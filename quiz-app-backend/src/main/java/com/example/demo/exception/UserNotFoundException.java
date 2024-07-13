package com.example.demo.exception;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class UserNotFoundException extends Exception{
    private String message;
}
