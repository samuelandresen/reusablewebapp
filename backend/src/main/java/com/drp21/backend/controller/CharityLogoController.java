package com.drp21.backend.controller;

import com.drp21.backend.model.CharityLogo;
import com.drp21.backend.service.CharityLogoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class CharityLogoController {

  @Autowired
  private CharityLogoService logoService;

  @CrossOrigin
  @GetMapping("/logoIds")
  public List<Long> getLogoIds() {
    return logoService.getLogoIds();
  }

  @CrossOrigin
  @GetMapping("/downloadLogo/{logoId}")
  public ResponseEntity<Resource> downloadLogo(@PathVariable(value = "logoId") Long logoId) {
    CharityLogo logo = logoService.getLogo(logoId);

    return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(logo.getFileType()))
            .header(HttpHeaders.CONTENT_DISPOSITION,
                    String.format("attachment; filename\"%s\"", logo.getFileName()))
            .body(new ByteArrayResource(logo.getImage()));
  }

  @CrossOrigin
  @PostMapping("/uploadLogo")
  public Map<String, String> uploadLogo(@RequestParam("logo") MultipartFile file,
                                        @RequestParam("charity") String email) {
    CharityLogo logo = logoService.storeLogo(file, email);

    String logoDownloadUri = ServletUriComponentsBuilder
            .fromCurrentContextPath()
            .path("/api/v1/downloadLogo/")
            .path(logo.getId().toString())
            .toUriString();

    Map<String, String> response = new LinkedHashMap<>();

    response.put("Photo ID: ", logo.getId().toString());
    response.put("File name: ", logo.getFileName());
    response.put("File type: ", logo.getFileType());
    response.put("Charity email: ", logo.getCharity().getEmail());
    response.put("Logo download URI: ", logoDownloadUri);

    return response;
  }

  @CrossOrigin
  @DeleteMapping("/deleteLogo/{logoId}")
  public Map<String, Boolean> deleteLogo(@PathVariable(value = "logoId") Long logoId) {
    logoService.deleteLogo(logoId);
    Map<String, Boolean> response = new HashMap<>();
    response.put("deleted", true);
    return response;
  }
}
