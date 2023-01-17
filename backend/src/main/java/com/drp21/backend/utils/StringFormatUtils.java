package com.drp21.backend.utils;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class StringFormatUtils {
  public static String stringifyDuration(LocalDateTime availableUntil) {
    LocalDateTime now = LocalDateTime.now();
    Duration duration = Duration.between(now, availableUntil);

    if (duration.isNegative()) {
      return "expired";
    }

    // Seconds per minute minus one.
    int seconds = 59 - Math.abs(availableUntil.getSecond() - now.getSecond());

    return String.format("%s:%s:%s:%s",
            duration.toDays(),
            addZero(duration.toHours() % 24),
            addZero(duration.toMinutes() % 60),
            addZero(seconds));
  }

  public static String stringifyDateTime(LocalDateTime dateTime) {
    return String.format("%s %s",
            stringifyTime(dateTime.toLocalTime()),
            stringifyDate(dateTime.toLocalDate()));
  }

  public static String stringifyTime(LocalTime time) {
    return String.format("%s:%s:%s",
            addZero(time.getHour()),
            addZero(time.getMinute()),
            addZero(time.getSecond()));
  }

  public static String stringifyDate(LocalDate date) {
    return String.format("%s %s %s %s",
            date.getDayOfWeek(),
            date.getDayOfMonth(),
            date.getMonth(),
            date.getYear()).toLowerCase();
  }

  private static String addZero(int amount) {
    return addZero((long) amount);
  }

  private static String addZero(long amount) {
    if (amount < 10 && amount > -10) {
      return "0" + amount;
    }
    return Long.toString(amount);
  }
}
