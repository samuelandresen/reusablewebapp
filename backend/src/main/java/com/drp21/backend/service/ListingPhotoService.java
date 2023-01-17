package com.drp21.backend.service;

import com.drp21.backend.model.Listing;
import com.drp21.backend.model.ListingPhoto;
import com.drp21.backend.repository.ListingPhotoRepository;
import com.drp21.backend.repository.ListingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ListingPhotoService {

  @Autowired
  private ListingPhotoRepository photoRepository;

  @Autowired
  private ListingRepository listingRepository;

  public ListingPhoto storePhoto(MultipartFile file, Long listingId)  {

    String fileName = StringUtils.cleanPath(
            Objects.requireNonNull(file.getOriginalFilename()));

    try {
      Listing listing = listingRepository.getById(listingId);
      ListingPhoto photo = new ListingPhoto(fileName, file.getContentType(),
              file.getBytes(), listing);
      return photoRepository.save(photo);
    } catch (IOException e) {
      throw new ResourceNotFoundException("Could not store file.");
    }
  }

  public ListingPhoto getPhoto(Long photoId) {
    return photoRepository.findById(photoId)
            .orElseThrow(() -> new ResourceNotFoundException("No photo with id: " + photoId));
  }

  public List<Long> getPhotoIds() {
    return photoRepository.findAll().stream()
            .map(ListingPhoto::getId).collect(Collectors.toList());
  }

  public void deletePhoto(Long photoId) {
    photoRepository.delete(getPhoto(photoId));
  }
}
