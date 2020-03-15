package com.example.demo;
// import lombok.Getter;
// import lombok.Setter;
// import lombok.AccessLevel;

public class User{
    private final int id;
    private final String message;
    public User(int id,String message) {
        this.id = id;
        this.message = message;
    }
    public int getId(){return this.id;}
    public String getMessage() { return this.message; }
}