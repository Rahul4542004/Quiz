package com.example.demo.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtTokenProvider {
    @Value("${app.jwt-secret-key}")
    private String secretKey;
    @Value("${app.jwt-expiration-date}")
    private Long expirationDateInMilliSeconds;

    public String generateToken(Authentication authentication){
        String username = authentication.getName();
        Date date = new Date();
        Date expirationDate = new Date(date.getTime() + expirationDateInMilliSeconds);
        String token = Jwts.builder().setSubject(username).setIssuedAt(new Date()).setExpiration(expirationDate)
                .signWith(getKey())
                .compact();
        return token;
    }
    private Key getKey(){
        return Keys.hmacShaKeyFor(
                Decoders.BASE64.decode(secretKey)
        );
    }
    public String getUsername(String token){
        Claims claims = Jwts.parser()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        String username = claims.getSubject();

        return username;
    }
    public boolean validate(String token){
        Jwts.parser()
                .setSigningKey(getKey())
                .build()
                .parse(token);
        return true;
    }
}
