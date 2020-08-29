package com.mcoucke.sgpj.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String description;
    private int duration;
    private LocalDateTime date;
    private LocalDateTime creationDate;

    public Task() {}

    public Task(String description, int duration, LocalDateTime date, LocalDateTime creationDate) {
        this.description = description;
        this.duration = duration;
        this.date = this.roundDateTime(date);
        this.creationDate = creationDate;
    }

    private LocalDateTime roundDateTime(LocalDateTime date) {
        int min = date.getMinute();
        int mode = min % 30;
        if (mode > 15) {
            min = 30 - mode;
        } else {
            min = -mode;
        }
        date = date.plusMinutes(min).withSecond(0).withNano(0);
        return date;

    }

    public Long getId() {
        return id;
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

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }
}
