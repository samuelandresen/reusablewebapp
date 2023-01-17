package com.drp21.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Type;

import javax.persistence.*;

@Entity
@Table(name = "charityLogos")
public class CharityLogo {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private Long id;

  @Column(name = "fileName")
  private String fileName;

  @Column(name = "fileType")
  private String fileType;

  @Lob
  @Type(type="org.hibernate.type.ImageType")
  @JsonIgnore
  private byte[] image;

  @OneToOne
  @JoinColumn(name = "charity", nullable = false)
  @JsonBackReference("charity-logo")
  private User charity;

  public CharityLogo(String fileName, String fileType,
                     byte[] image, User charity) {
    this.fileName = fileName;
    this.fileType = fileType;
    this.image = image;
    this.charity = charity;
  }

  public CharityLogo() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getFileName() {
    return fileName;
  }

  public void setFileName(String fileName) {
    this.fileName = fileName;
  }

  public String getFileType() {
    return fileType;
  }

  public void setFileType(String fileType) {
    this.fileType = fileType;
  }

  public byte[] getImage() {
    return image;
  }

  public void setImage(byte[] image) {
    this.image = image;
  }

  public User getCharity() {
    return charity;
  }

  public void setCharity(User charity) {
    this.charity = charity;
  }
}
