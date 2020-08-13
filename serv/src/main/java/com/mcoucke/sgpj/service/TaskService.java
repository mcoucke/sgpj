package com.mcoucke.sgpj.service;

import com.mcoucke.sgpj.model.Task;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class TaskService {
    private List<Task> taskList;

    private static TaskService ts = new TaskService();

    public static TaskService getService() { return ts; }

    private TaskService() {
        taskList = new ArrayList<>();
    }

    public Task addTask(String description, LocalDateTime date, int duration) {
        Task task = new Task(description, duration, date, LocalDateTime.now());
        taskList.add(task);
        return task;
    }

    public List<Task> getTasks(LocalDate date) {
        List<Task> tasks = new ArrayList<>();
        for (Task t : taskList) {
            if (t.getDate().toLocalDate().equals(date)) {
                tasks.add(t);
            }
        }
        return tasks;
    }
}
