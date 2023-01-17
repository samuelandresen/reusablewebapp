package com.drp21.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import static com.drp21.backend.utils.StringFormatUtils.*;

@Entity
@Table(name = "posts")
public class Post {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(name = "category")
  private String category;

  @Column(name = "title")
  private String title;

  @Column(name = "body")
  private String body;

  @Column(name = "dateStr")
  private final String dateStr;

  @Column(name = "timeStr")
  private final String timeStr;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "author")
  @JsonBackReference(value="author-post")
  private User author;

  private String authorEmail;

  @OneToMany(mappedBy = "post", fetch = FetchType.LAZY,
             cascade = CascadeType.ALL)
  @JsonManagedReference(value="post-comment")
  private List<Comment> comments;

  public Post() {
    //Set date and time fields upon creation of post
    dateStr = stringifyDate(LocalDate.now());
    timeStr = stringifyTime(LocalTime.now());
  }

  public Post(long id) {
    this();
    this.id = id;
  }

  /* Getters and setters are all required for database access. */

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public String getText() {
    return body;
  }

  public void setText(String text) {
    this.body = text;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public User getAuthor() {
    return author;
  }

  public void setAuthor(User author) {
    this.author = author;
    authorEmail = author.getEmail();
  }

  public String getAuthorEmail() {
    return authorEmail;
  }

  public void setAuthorEmail(String authorEmail) {
    this.authorEmail = authorEmail;
  }

  public String getDateStr() {
    return dateStr;
  }

  public String getTimeStr() {
    return timeStr;
  }

  public List<Comment> getComments() {
    return comments;
  }

  public void setComments(List<Comment> comments) {
    this.comments = comments;
  }
}