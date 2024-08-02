package com.example.demo.service.Impl;

import com.example.demo.dto.JwtAuthResponseDto;
import com.example.demo.dto.LoginDto;
import com.example.demo.dto.RegisterDto;
import com.example.demo.dto.UpdateDto;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.exception.CustomException;
import com.example.demo.exception.UserNotFoundException;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtTokenProvider;
import com.example.demo.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private JwtTokenProvider tokenProvider;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    @Override
    public String register(RegisterDto registerDto) {
        if(userRepository.existsByUsername(registerDto.getUsername())){
            throw new UserNotFoundException("Username already exists");
        }
        if(userRepository.existsByEmail(registerDto.getEmail())){
            throw new UserNotFoundException("Email already exists");
        }
        User user = new User();
        user.setEmail(registerDto.getEmail());
        user.setFirstName(registerDto.getFirstName());
        user.setLastName(registerDto.getLastName());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setUsername(registerDto.getUsername());
        user.setPhoneNo(registerDto.getPhoneNo());
        user.setGender("");
        user.setInstitution("");
        user.setDob("");
        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByRole("ROLE_USER");
        roles.add(role);
        user.setRoles(roles);
        userRepository.save(user);
        return "User successfully registered";
    }

    @Override
    public JwtAuthResponseDto login(LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getUsernameOrEmail(),loginDto.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.generateJwtToken(authentication);

        Optional<User> user = userRepository.findByUsernameOrEmail(loginDto.getUsernameOrEmail(),loginDto.getUsernameOrEmail());
        String role = null;
        String username = null;
        JwtAuthResponseDto responseDto = new JwtAuthResponseDto();
        if(user.isPresent()){
            User user1 = user.get();
            responseDto.setUser(user1);
            username = user1.getUsername();
            Optional<Role> currentRole = user1.getRoles().stream().findFirst();
            if(currentRole.isPresent())
                role = currentRole.get().getRole();
        }
        responseDto.setUsername(username);
        responseDto.setAccessToken(token);
        responseDto.setRole(role);
        return responseDto;
    }

    @Override
    public String registerAsAdmin(RegisterDto registerDto) {
        if(userRepository.existsByUsername(registerDto.getUsername())){
            throw new CustomException(HttpStatus.BAD_REQUEST,"Username already exists");
        }
        if(userRepository.existsByEmail(registerDto.getEmail())){
            throw new CustomException(HttpStatus.BAD_REQUEST,"Email already exists");
        }
        User user = new User();
        user.setEmail(registerDto.getEmail());
        user.setFirstName(registerDto.getFirstName());
        user.setLastName(registerDto.getLastName());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setUsername(registerDto.getUsername());
        user.setPhoneNo(registerDto.getPhoneNo());

        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByRole("ROLE_ADMIN");
        roles.add(role);
        user.setRoles(roles);
        userRepository.save(user);
        return "User successfully registered";
    }

    @Override
    public String updateInformation(UpdateDto user) {
        User currentUser = userRepository.findByUsername(user.getUsername());
        boolean isUpdated = false;
        if(user.getEmail()!=null && !user.getEmail().equals(currentUser.getEmail())){
            isUpdated = true;
            currentUser.setEmail(user.getEmail());
        }
        if(user.getFirstName()!=null && !user.getFirstName().equals(currentUser.getFirstName()))
        {
            isUpdated = true;
            currentUser.setFirstName(user.getFirstName());
        }
        if(user.getLastName()!=null && !user.getLastName().equals(currentUser.getLastName()))
        {
            isUpdated = true;
            currentUser.setLastName(user.getLastName());
        }
        if(user.getGender()!=null && !user.getGender().equals(currentUser.getGender()))
        {
            isUpdated = true;
            currentUser.setGender(user.getGender());
        }
        if(user.getInstitution()!=null && !user.getInstitution().equals(currentUser.getInstitution())){
            isUpdated = true;
            currentUser.setInstitution(user.getInstitution());
        }
        if(user.getPhoneNo()!=null && !user.getPhoneNo().equals(currentUser.getPhoneNo())){
            isUpdated = true;
            currentUser.setPhoneNo(user.getPhoneNo());
        }
        if(user.getDob()!=null && !user.getDob().equals(currentUser.getDob())){
            isUpdated = true;
            currentUser.setDob(user.getDob());
        }
        if(isUpdated) {
            userRepository.save(currentUser);
            return "User details successfully updated";
        }
        else
            return "No changes detected";
    }
}
