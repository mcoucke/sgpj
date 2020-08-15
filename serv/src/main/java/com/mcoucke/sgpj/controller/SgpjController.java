package com.mcoucke.sgpj.controller;

import com.mcoucke.sgpj.DTO.TaskDTO;
import com.mcoucke.sgpj.model.Task;
import com.mcoucke.sgpj.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeParseException;
import java.util.List;

@RestController
public class SgpjController {

    @Autowired
    private TaskRepository taskRepository;

    @GetMapping("/day/{date}")
    public ResponseEntity<List<Task>> getDaySchedule(@PathVariable String date) {
        try {
            LocalDate localDate = LocalDate.parse(date);
            List<Task> tasks = taskRepository.findTasksByDate(LocalDateTime.of(localDate, LocalTime.MIDNIGHT));
            return ResponseEntity.ok().body(tasks);
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/day")
    public ResponseEntity<Task> addTask(@RequestBody TaskDTO taskDTO) {
        if (taskDTO.getDescription() == null || taskDTO.getDescription().isBlank()) {
            return ResponseEntity.badRequest().build();
        } else {
            Task task = new Task(taskDTO.getDescription(), taskDTO.getDuration(), taskDTO.getDate(), LocalDateTime.now());
            taskRepository.save(task);
            return ResponseEntity.ok().body(task);
        }
    }

    @GetMapping("/week/{date}")
    public ResponseEntity<List<Task>> getWeekSchedule(@PathVariable String date) {
        try {
            LocalDate localDate = LocalDate.parse(date);
            List<Task> tasks = taskRepository.findTasksByWeek(LocalDateTime.of(localDate, LocalTime.MIDNIGHT));
            return ResponseEntity.ok().body(tasks);
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
