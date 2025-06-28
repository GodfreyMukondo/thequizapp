package com.quizapp.thequizapp.userService;

import com.quizapp.thequizapp.AppUser;
import com.quizapp.thequizapp.LoginRequest;
import com.quizapp.thequizapp.LoginResponse;
import com.quizapp.thequizapp.Security.JwtUtil;
import com.quizapp.thequizapp.userRepository.UserRepository;
import com.quizapp.thequizapp.userService1.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil; //Injected

    @Autowired
    public UserServiceImpl(UserRepository repo, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public AppUser saveUser(AppUser user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repo.save(user);
    }

    @Override
    public ResponseEntity<?> registerUser(AppUser user) {
        if (repo.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }

        // Validating role
        String role = user.getRole();
        if (role == null || (!role.equalsIgnoreCase("student") && !role.equalsIgnoreCase("admin"))) {
            return ResponseEntity.badRequest().body("Invalid role. Must be 'student' or 'admin'.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(role.toLowerCase()); // Optional: standardising the role

        AppUser savedUser = repo.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }


    @Override
    public ResponseEntity<?> login(LoginRequest request) {
        Optional<AppUser> optionalUser = repo.findByUsername(request.getUsername());

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }

        AppUser user = optionalUser.get();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }

        //  Including role in the authorities because Spring expects roles prefixed with "ROLE_"
        List<SimpleGrantedAuthority> authorities =
                List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().toUpperCase()));

        UserDetails userDetails = new User(user.getUsername(), user.getPassword(), authorities);

        // Generate JWT token
        String token = jwtUtil.generateToken(userDetails);

        // Return user and token wrapped in LoginResponse
        LoginResponse loginResponse = new LoginResponse(user, token);
        return ResponseEntity.ok(loginResponse);
    }

    @Override
    public Optional<AppUser> getUserById(Long id) {
        return repo.findById(id);
    }

    @Override
    public Optional<AppUser> getUserByUsername(String username) {
        return repo.findByUsername(username);
    }

    @Override
    public List<AppUser> getAllUsers() {
        return repo.findAll();
    }
}
