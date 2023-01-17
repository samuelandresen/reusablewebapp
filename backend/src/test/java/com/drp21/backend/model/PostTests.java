package com.drp21.backend.model;

import org.junit.jupiter.api.Test;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;

import static com.drp21.backend.utils.StringFormatUtils.stringifyDate;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class PostTests {

  Post post = new Post();

  @Test
  public void postDateIsSetCorrectly() {
    String today = stringifyDate(LocalDate.now());
    assertThat(post.getDateStr(), is(today));
  }

  @Test
  public void postTimeIsSetCorrectly() {
    // Time of post
    LocalTime posted = LocalTime.parse(post.getTimeStr());
    Duration difference = Duration.between(posted, LocalTime.now());
    // Make sure difference is less than one.
    assertTrue(difference.getSeconds() < 1);
  }
}
