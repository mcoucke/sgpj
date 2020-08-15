package com.mcoucke.sgpj.DTO;

import java.time.LocalDateTime;

public class TaskDTO {
    public String description;
    public int duration;
    public LocalDateTime date;

    public String getDescription() {
        return description;
    }

    public int getDuration() {
        return duration;
    }

    public LocalDateTime getDate() {
        return date;
    }
}

