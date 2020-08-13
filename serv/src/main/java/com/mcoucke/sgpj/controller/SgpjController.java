package com.mcoucke.sgpj.controller;

import com.mcoucke.sgpj.DTO.TaskDTO;
import com.mcoucke.sgpj.model.Task;
import com.mcoucke.sgpj.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;

@RestController
public class SgpjController {

    TaskService taskService = TaskService.getService();

    @GetMapping("/day/{date}")
    public ResponseEntity<List<Task>> getDaySchedule(@PathVariable String date) {
        try {
            LocalDate localDate = LocalDate.parse(date);
            List<Task> tasks = taskService.getTasks(localDate);
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
            Task task = taskService.addTask(taskDTO.getDescription(), taskDTO.getDate(), taskDTO.getDuration());
            return ResponseEntity.ok().body(task);
        }
    }
}
