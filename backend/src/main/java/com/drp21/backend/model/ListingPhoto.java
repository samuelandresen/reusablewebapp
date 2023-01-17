package com.drp21.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Type;

import javax.persistence.*;

@Entity
@Table(name = "listingPhotos")
public class ListingPhoto {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  @Column(name = "id")
  private Long id;

  @Column(name = "fileName")
  private String fileName;

  @Column(name = "fileType")
  private String fileType;

  @Lob
  @Type(type="org.hibernate.type.ImageType")
  @JsonIgnore
  private byte[] image;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "listing")
  @JsonBackReference("listing-photos")
  private Listing listing;

  public ListingPhoto(String fileName, String fileType, byte[] image, Listing listing) {
    this.fileName = fileName;
    this.fileType = fileType;
    this.image = image;
    this.listing = listing;
  }

  public ListingPhoto() {
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

  public Listing getListing() {
    return listing;
  }

  public void setListing(Listing listing) {
    this.listing = listing;
  }
}
