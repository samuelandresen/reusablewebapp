package com.drp21.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.time.LocalDateTime;

import static com.drp21.backend.utils.StringFormatUtils.stringifyDateTime;

@Entity
@Table(name = "comments")
public class Comment {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(name = "body")
  private String body;

  @Column(name = "datePosted")
  private LocalDateTime datePosted;

  @Column(name = "video")
  private String video;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "author")
  @JsonBackReference(value="user-comment")
  private User author;

  private String authorEmail;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "post")
  @JsonBackReference(value="post-comment")
  private Post post;

  public Comment() {
    datePosted = LocalDateTime.now();
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getBody() {
    return body;
  }

  public void setBody(String body) {
    this.body = body;
  }

  public String getDatePosted() {
    return stringifyDateTime(datePosted);
  }

  public void setDatePosted(LocalDateTime datePosted) {
    this.datePosted = datePosted;
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

  public Post getPost() {
    return post;
  }

  public void setPost(Post post) {
    this.post = post;
  }

  public String getVideo() {
    return video;
  }

  public void setVideo(String video) {
    this.video = video;
  }
}
