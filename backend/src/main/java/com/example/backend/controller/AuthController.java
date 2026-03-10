package com.example.backend.controller;

import com.example.backend.config.JwtUtil;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // ✅ Register Normal User
    @PostMapping("/register-user")
    public String registerUser(@RequestBody User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ROLE_USER");

        userRepository.save(user);

        return "User Registered Successfully";
    }

    // ✅ Register Admin
    @PostMapping("/register-admin")
    public String registerAdmin(@RequestBody User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ROLE_ADMIN");

        userRepository.save(user);

        return "Admin Registered Successfully";
    }

    // ✅ Login
    @PostMapping("/login")
    public String login(@RequestBody User request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // 🔥 Generate token WITH role
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        // 🔥 RETURN TOKEN (VERY IMPORTANT)
        return token;
    }
}