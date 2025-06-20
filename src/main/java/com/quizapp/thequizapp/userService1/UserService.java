package com.quizapp.thequizapp.userService1;

import com.quizapp.thequizapp.AppUser;
import com.quizapp.thequizapp.LoginRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface UserService {
    AppUser saveUser(AppUser user);
    ResponseEntity<?> registerUser(AppUser user);
    ResponseEntity<?> login(LoginRequest request);
    Optional<AppUser> getUserById(Long id);
    Optional<AppUser> getUserByUsername(String username);
    List<AppUser> getAllUsers();
}
