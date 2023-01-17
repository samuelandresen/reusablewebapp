package com.drp21.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

import static com.drp21.backend.utils.StringFormatUtils.*;

@Entity
@Table(name = "listings")
public class Listing {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "title")
  private String title;

  @Column(name = "description")
  private String description;

  @Column(name = "datePosted")
  private LocalDateTime datePosted;

  @Column(name = "availableUntil")
  private LocalDateTime availableUntil;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "owner")
  @JsonBackReference(value="user-listing")
  private User owner;

  private String ownerEmail;

  @OneToMany(mappedBy = "listing", fetch = FetchType.EAGER)
  @JsonManagedReference(value="listing-photos")
  private Set<ListingPhoto> photos;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Listing() {
    datePosted = LocalDateTime.now();
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getDatePosted() {
    return stringifyDateTime(datePosted);
  }

  public void setDatePosted(LocalDateTime datePosted) {
    this.datePosted = datePosted;
  }

  public String getAvailableUntil() {
    return stringifyDateTime(availableUntil);
  }

  public void setAvailableUntil(String availableUntil) {
    this.availableUntil = LocalDateTime.parse(availableUntil);
  }

  public String getTimeRemaining() {
    if (availableUntil != null) {
      return stringifyDuration(availableUntil);
    }
    return null;
  }

  public User getOwner() {
    return owner;
  }

  public void setOwner(User owner) {
    this.owner = owner;
    ownerEmail = owner.getEmail();
  }


  public void setOwnerEmail(String email) {
    ownerEmail = email;
  }

  public String getOwnerEmail() {
    return ownerEmail;
  }

  public Set<ListingPhoto> getPhotos() {
    return photos;
  }

  public void setPhotos(Set<ListingPhoto> photos) {
    this.photos = photos;
  }

  public void deletePhoto(ListingPhoto photo) {
    photos.remove(photo);
  }
}
