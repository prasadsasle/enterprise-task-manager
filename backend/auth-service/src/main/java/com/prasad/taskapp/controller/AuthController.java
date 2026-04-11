package com.prasad.taskapp.controller;
 
import com.prasad.taskapp.dto.AuthRequest;
import com.prasad.taskapp.dto.AuthResponse;
import com.prasad.taskapp.entity.Role;
import com.prasad.taskapp.entity.User;
import com.prasad.taskapp.repository.UserRepository;
import com.prasad.taskapp.security.JwtUtil;
import com.prasad.taskapp.security.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
 
@RestController
@RequestMapping("/auth")
public class AuthController {
 
    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private UserDetailsServiceImpl userDetailsService;
    @Autowired private JwtUtil jwtUtil;
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
 
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    authRequest.getUsername(), authRequest.getPassword()));
 
            UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
            User user = userRepository.findByUsername(authRequest.getUsername())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
            String jwt = jwtUtil.generateToken(userDetails.getUsername());
 
            return ResponseEntity.ok(new AuthResponse(jwt, user.getRole().name(), user.getUsername()));
 
        } catch (BadCredentialsException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials", e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Login failed", e);
        }
    }
 
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody AuthRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
 
        User newUser = new User();
        newUser.setUsername(request.getUsername());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
 
        if ("ADMIN".equalsIgnoreCase(request.getRole())) {
            newUser.setRole(Role.ADMIN);
        } else {
            newUser.setRole(Role.EMPLOYEE);
        }
 
        userRepository.save(newUser);
        return ResponseEntity.ok("User registered successfully as " + newUser.getRole());
    }
}
