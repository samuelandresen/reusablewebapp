package com.drp21.backend.controller;

import com.drp21.backend.model.Post;
import com.drp21.backend.model.User;
import com.drp21.backend.repository.PostRepository;
import com.drp21.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class PostController {

  @Autowired
  private PostRepository postRepository;

  @Autowired
  private UserRepository userRepository;

  // Get posts
  @CrossOrigin
  @GetMapping("/posts")
  public List<Post> getPosts() {
    List<Post> posts = postRepository.findAll();
    Collections.reverse(posts); // Most recent posts should be first.
    return posts;
  }

  // Get a post by its id
  // Get user by email
  @CrossOrigin
  @GetMapping("/posts/{id}")
  public Post getPostById(@PathVariable(value = "id") long id) {
    return postRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("No post with id: " + id));
  }

  // Create post
  @CrossOrigin
  @PostMapping("/posts")
  public Post createPost(@RequestBody Post post) {
    return postRepository.save(post);
  }

  //TODO: Edit post

  @CrossOrigin
  @DeleteMapping("/posts/{id}")
  public Map<String, Boolean> deletePost(@PathVariable(value = "id") Long postId)
          throws ResourceNotFoundException {
    Post post = postRepository.findById(postId)
            .orElseThrow(() -> new ResourceNotFoundException("Post not found for this id :: " + postId));

    User author = userRepository.findByEmail(post.getAuthorEmail())
            .orElseThrow(() -> new ResourceNotFoundException("No user with email: " + post.getAuthorEmail()));

    author.deletePost(post);
    postRepository.delete(post);
    Map<String, Boolean> response = new HashMap<>();
    response.put("deleted", true);
    return response;
  }
}
