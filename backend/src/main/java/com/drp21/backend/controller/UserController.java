package com.drp21.backend.controller;

import com.drp21.backend.model.User;
import com.drp21.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class UserController {

  @Autowired
  private UserRepository userRepository;

  // Get users
  @CrossOrigin
  @GetMapping("/users")
  public List<User> getUsers() {
    return userRepository.findAll();
  }

  // Get user by email
  @CrossOrigin
  @GetMapping("/users/{email}")
  public User getUserByEmail(@PathVariable(value = "email") String email) {
    return userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("No user with email: " + email));
  }

  // Create new user account
  @CrossOrigin
  @PostMapping("/users")
  public User createUser(@RequestBody User user) {
    return userRepository.save(user);
  }

  //TODO: Edit user details

  @CrossOrigin
  @DeleteMapping("/users/{email}")
  public Map<String, Boolean> deleteUser(@PathVariable(value = "email") String email)
          throws ResourceNotFoundException {
    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("No user wit this email: " + email));

    userRepository.delete(user);
    Map<String, Boolean> response = new HashMap<>();
    response.put("deleted", true);
    return response;
  }
}
