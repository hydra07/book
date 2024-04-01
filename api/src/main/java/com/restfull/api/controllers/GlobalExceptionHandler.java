package com.restfull.api.controllers;

import com.restfull.api.dtos.StandardErrorDTO;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<StandardErrorDTO> exception(Exception ex, HttpServletRequest request) {
        return ResponseEntity.badRequest().body(new StandardErrorDTO(HttpStatus.BAD_REQUEST, ex, request));
    }

}