package com.foodood.service.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/")
public class DefaultController {
    @GetMapping(
            path="/",
            produces="text/plain"
    )
    public String helloWorld() {
        return "Hello, world!";
    }
}
