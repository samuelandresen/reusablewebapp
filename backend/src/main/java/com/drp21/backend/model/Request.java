package com.drp21.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.time.LocalDateTime;

import static com.drp21.backend.utils.StringFormatUtils.stringifyDateTime;
import static com.drp21.backend.utils.StringFormatUtils.stringifyDuration;

@Entity
@Table(name = "requests")
public class Request {

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
  @JsonBackReference(value="user-request")
  private User owner;

  private String ownerEmail;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Request() {
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

  public Boolean getOwnerCharity() {
    return owner.getCharity();
  }

  public Long getCharityLogoId() {
    if (owner.getCharity() != null && owner.getCharity() && owner.getLogo() != null) {
      return owner.getLogo().getId();
    }
    return null;
  }
}
