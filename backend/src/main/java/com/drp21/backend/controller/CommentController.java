package com.drp21.backend.controller;

import com.drp21.backend.model.Comment;
import com.drp21.backend.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class CommentController {

  @Autowired
  private CommentRepository commentRepository;

  // Get all comments
  @CrossOrigin
  @GetMapping("/comments")
  public List<Comment> getComments() {
    return commentRepository.findAll();
  }

  // Get a comment by its id
  @CrossOrigin
  @GetMapping("/comments/{id}")
  public Comment getCommentById(@PathVariable(value = "id") long id) {
    return findCommentById(id);
  }

  // Create a comment.
  @CrossOrigin
  @PostMapping("comments")
  public Comment createComment(@RequestBody Comment comment) {
    return commentRepository.save(comment);
  }

  @CrossOrigin
  @DeleteMapping("comments/{id}")
  public Map<String, Boolean> deleteListing(@PathVariable(value = "id") long id) {
    Comment comment = findCommentById(id);
    commentRepository.delete(comment);
    Map<String, Boolean> response = new HashMap<>();
    response.put("deleted", true);
    return response;
  }

  private Comment findCommentById(long id) {
    return commentRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("No comment with this id: " + id));  }
}
