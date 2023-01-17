package com.drp21.backend.controller;

import com.drp21.backend.model.Request;
import com.drp21.backend.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class RequestController {

  @Autowired
  private RequestRepository requestRepository;

  @CrossOrigin
  @GetMapping("/requests")
  public List<Request> getRequests() {
    return requestRepository.findAll();
  }

  @CrossOrigin
  @GetMapping("/requests/{id}")
  public Request getRequestById(@PathVariable(value = "id") Long id) {
    return findRequestById(id);
  }

  @CrossOrigin
  @PostMapping("/requests")
  public Request createRequest(@RequestBody Request request) {
    return requestRepository.save(request);
  }

  @CrossOrigin
  @DeleteMapping("/requests/{id}")
  public Map<String, Boolean> deleteRequest(@PathVariable(value = "id") Long id) {
    Request request = findRequestById(id);

    requestRepository.delete(request);
    Map<String, Boolean> response = new HashMap<>();
    response.put("deleted", true);
    return response;
  }

  private Request findRequestById(Long id) {
    return requestRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("No request with id: " + id));
  }
}
