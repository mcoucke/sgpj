package com.mcoucke.sgpj.model;

import java.time.LocalDateTime;

public class Task {
    public String description;
    public int duration;
    public LocalDateTime date;
    public LocalDateTime creationDate;

    public Task(String description, int duration, LocalDateTime date, LocalDateTime creationDate) {
        this.description = description;
        this.duration = duration;
        this.date = this.roundDateTime(date);
        this.creationDate = creationDate;
    }

    private LocalDateTime roundDateTime(LocalDateTime date) {
        int min = date.getMinute();
        int mode = min % 15;
        if (mode > 15 / 2) {
            min = 15 - mode;
        } else {
            min = -mode;
        }
        date = date.plusMinutes(min).withSecond(0).withNano(0);
        return date;

    }

    public String getDescription() {
        return description;
    }

    public int getDuration() {
        return duration;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }
}
