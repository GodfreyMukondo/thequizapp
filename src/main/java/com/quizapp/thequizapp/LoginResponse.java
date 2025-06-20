package com.quizapp.thequizapp;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginResponse {
    private AppUser user;
    private String token;

    public LoginResponse(AppUser user, String token) {
        this.user = user;
        this.token = token;
    }

}
