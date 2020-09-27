package com.mcoucke.sgpj.service;

import com.mcoucke.sgpj.model.Task;

import java.time.LocalDateTime;
import java.util.List;

public class TaskService {

    public static int getMaxNeighboursCount(List<Task> tasks, LocalDateTime date, int duration) {
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

    public static boolean isDurationCorrect(Task task) {
        if (task.getDuration() <= 0 || task.getDuration() > 660) {
            return false;
        }
        LocalDateTime dateTime = task.getDate().plusMinutes(task.getDuration());
        boolean begin = dateTime.getHour() > 7
                || (dateTime.getHour() == 7 && dateTime.getMinute() >= 30);
        boolean end = dateTime.getHour() < 18
                || (dateTime.getHour() == 18 && dateTime.getMinute() == 0);
        return begin && end;

    }

    public static boolean isDateTimeCorrect(Task task) {
        boolean end = task.getDate().getHour() < 17
                || (task.getDate().getHour() == 17 && task.getDate().getMinute() <= 30);
        return task.getDate().getHour() >= 7 && end;
    }
}
