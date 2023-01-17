package com.drp21.backend.controller;

import com.drp21.backend.model.ListingPhoto;
import com.drp21.backend.service.ListingPhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1")
public class ListingPhotoController {

  @Autowired
  private ListingPhotoService photoService;

  @CrossOrigin
  @GetMapping("/photoIds")
  public List<Long> getPhotoIds() {
    return photoService.getPhotoIds();
  }

  @CrossOrigin
  @GetMapping("/downloadPhoto/{photoId}")
  public ResponseEntity<Resource> downloadPhoto(@PathVariable(value = "photoId") Long photoId) {
    ListingPhoto photo = photoService.getPhoto(photoId);

    return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(photo.getFileType()))
            .header(HttpHeaders.CONTENT_DISPOSITION, String.format("attachment; filename\"%s\"", photo.getFileName()))
            .body(new ByteArrayResource(photo.getImage()));
  }

  @CrossOrigin
  @PostMapping("/uploadPhoto")
  public Map<String, String> uploadPhoto(@RequestParam("photo") MultipartFile file,
                                         @RequestParam("listing") Long listingId) {
    ListingPhoto photo = photoService.storePhoto(file, listingId);

    String photoDownloadUri = ServletUriComponentsBuilder
            .fromCurrentContextPath()
            .path("/api/v1/downloadPhoto/")
            .path(photo.getId().toString())
            .toUriString();

    Map<String, String> response = new LinkedHashMap<>();

    response.put("Photo ID: ", photo.getId().toString());
    response.put("File name: ", photo.getFileName());
    response.put("File type: ", photo.getFileType());
    response.put("Listing ID: ", photo.getListing() == null ? "null" : photo.getListing().getId().toString());
    response.put("Photo download URI: ", photoDownloadUri);

    return response;
  }

  @CrossOrigin
  @PostMapping("/uploadMultiplePhotos")
  public List<Map<String, String>> uploadMultiplePhotos(@RequestParam("photos") MultipartFile[] photos,
                                                        @RequestParam("listing") Long listingId) {
    return Arrays.stream(photos)
            .map(photo -> uploadPhoto(photo, listingId))
            .collect(Collectors.toList());
  }

  @CrossOrigin
  @DeleteMapping("/deletePhoto/{photoId}")
  public Map<String, Boolean> deletePhoto(@PathVariable(value = "photoId") Long photoId) {
    photoService.deletePhoto(photoId);
    Map<String, Boolean> response = new HashMap<>();
    response.put("deleted", true);
    return response;
  }
}
