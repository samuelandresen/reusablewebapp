package com.drp21.backend.service;

import com.drp21.backend.model.CharityLogo;
import com.drp21.backend.model.User;
import com.drp21.backend.repository.CharityLogoRepository;
import com.drp21.backend.repository.UserRepository;
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
public class CharityLogoService {

  @Autowired
  private CharityLogoRepository logoRepository;

  @Autowired
  private UserRepository userRepository;

  public CharityLogo storeLogo(MultipartFile file, String email) {

    String fileName = StringUtils.cleanPath(
            Objects.requireNonNull(file.getOriginalFilename()));

    try {
      User charity = userRepository.findByEmail(email)
              .orElseThrow(() -> new ResourceNotFoundException("No charity with email: " + email));
      CharityLogo logo = new CharityLogo(fileName, file.getContentType(),
              file.getBytes(), charity);
      return logoRepository.save(logo);
    } catch (IOException e) {
      throw new ResourceNotFoundException("Could not store file");
    }
  }

  public CharityLogo getLogo(Long logoId) {
    return logoRepository.findById(logoId)
            .orElseThrow(() -> new ResourceNotFoundException("No photo with id: " + logoId));
  }

  public List<Long> getLogoIds() {
    return logoRepository.findAll().stream()
            .map(CharityLogo::getId).collect(Collectors.toList());
  }

  public void deleteLogo(Long logoId) {
    logoRepository.delete(logoRepository.getById(logoId));
  }
}
