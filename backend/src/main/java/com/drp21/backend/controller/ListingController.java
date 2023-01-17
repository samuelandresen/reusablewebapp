package com.drp21.backend.controller;

import com.drp21.backend.model.Listing;
import com.drp21.backend.repository.ListingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class ListingController {

  @Autowired
  private ListingRepository listingRepository;

  // Get all listings
  @CrossOrigin
  @GetMapping("/listings")
  public List<Listing> getListings() {
    return listingRepository.findAll();
  }

  // Get a listing by its id
  @CrossOrigin
  @GetMapping("listings/{id}")
  public Listing getListingById(@PathVariable(value = "id") long id) {
    return findListingById(id);
  }

  // Create a listing
  @CrossOrigin
  @PostMapping("listings")
  public Listing createListing(@RequestBody Listing listing) {
    return listingRepository.save(listing);
  }

  // Delete a listing with given id
  @CrossOrigin
  @DeleteMapping("listings/{id}")
  public Map<String, Boolean> deleteListing(@PathVariable(value = "id") long id) {
    Listing listing = findListingById(id);

    listingRepository.delete(listing);
    Map<String, Boolean> response = new HashMap<>();
    response.put("deleted", true);
    return response;
  }

  private Listing findListingById(long id) {
    return listingRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("No listing with id: " + id));
  }


}
