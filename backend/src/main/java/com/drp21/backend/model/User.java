package com.drp21.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

  public User() {}

  public User(String email) {
    this.email = email;
  }

  @Id
  @Column(name = "email")
  private String email;

  @Column(name = "firstname")
  private String firstname;

  @Column(name = "surname")
  private String surname;

  @OneToMany(mappedBy = "author", fetch = FetchType.EAGER,
             cascade = CascadeType.ALL)
  @JsonManagedReference("author-post")
  private List<Post> posts;

  @OneToMany(mappedBy = "owner", fetch = FetchType.EAGER,
             cascade = CascadeType.ALL)
  @JsonManagedReference(value="user-listing")
  private Set<Listing> listings;

  @OneToMany(mappedBy = "owner", fetch = FetchType.EAGER,
          cascade = CascadeType.ALL)
  @JsonManagedReference(value="user-request")
  private Set<Request> requests;

  @OneToMany(mappedBy = "author", fetch = FetchType.LAZY,
             cascade = CascadeType.ALL)
  @JsonManagedReference(value="user-comment")
  private List<Comment> comments;

  @Column(name = "charity")
  private Boolean charity = false;

  @OneToOne(mappedBy = "charity")
  @JsonManagedReference(value="charity-logo")
  private CharityLogo logo;

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getFirstname() {
    return firstname;
  }

  public void setFirstname(String firstname) {
    this.firstname = firstname;
  }

  public String getSurname() {
    return surname;
  }

  public void setSurname(String surname) {
    this.surname = surname;
  }

  public List<Post> getPosts() {
    return posts;
  }

  public void setPosts(List<Post> posts) {
    this.posts = posts;
  }

  public void deletePost(Post post) {
    posts.remove(post);
  }

  public Set<Listing> getListings() {
    return listings;
  }

  public void setListings(Set<Listing> listings) {
    this.listings = listings;
  }

  public List<Comment> getComments() {
    return comments;
  }

  public void setComments(List<Comment> comments) {
    this.comments = comments;
  }

  public Set<Request> getRequests() {
    return requests;
  }

  public void setRequests(Set<Request> requests) {
    this.requests = requests;
  }

  public Boolean getCharity() {
    return charity;
  }

  public void setCharity(Boolean charity) {
    this.charity = charity;
  }

  public CharityLogo getLogo() {
    return logo;
  }

  public void setLogo(CharityLogo logo) {
    this.logo = logo;
  }
}