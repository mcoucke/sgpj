package com.mcoucke.sgpj.service;

import com.mcoucke.sgpj.model.Task;

import java.time.LocalDateTime;
import java.util.List;

public class TaskService {

    public int getMaxNeighboursCount(List<Task> tasks, LocalDateTime date, int duration) {
        int count = 0;
        LocalDateTime endCurrentDate = date.plusMinutes((long) duration);
        for (Task t : tasks) {
            LocalDateTime startDate = t.getDate();
            LocalDateTime endDate = t.getDate().plusMinutes((long) t.getDuration());
            // Check crossing tasks
            if ( (startDate.isAfter(date) || startDate.isEqual(date)) && (startDate.isBefore(endCurrentDate))
                || startDate.isBefore(date) && endDate.isAfter(date) ) {
                count += 1;
            }
        }
        return count;
    }
}
