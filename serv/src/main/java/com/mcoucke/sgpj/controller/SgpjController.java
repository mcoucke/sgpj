package com.mcoucke.sgpj.controller;

import com.mcoucke.sgpj.DTO.TaskDTO;
import com.mcoucke.sgpj.model.Task;
import com.mcoucke.sgpj.repository.TaskRepository;
import com.mcoucke.sgpj.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeParseException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class SgpjController {

    @Autowired
    private TaskRepository taskRepository;

    private final TaskService taskService = new TaskService();

    @GetMapping(value="/day/{date}")
    public ResponseEntity<List<Task>> getDaySchedule(@PathVariable String date) {
        try {
            LocalDate localDate = LocalDate.parse(date);
            List<Task> tasks = taskRepository.findTasksByDate(LocalDateTime.of(localDate, LocalTime.MIDNIGHT));
            return ResponseEntity.ok().body(tasks);
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping(value="/day")
    public ResponseEntity<Task> addTask(@RequestBody TaskDTO taskDTO) {
        if (taskDTO.getDescription() == null || taskDTO.getDescription().isBlank()) {
            return ResponseEntity.badRequest().build();
        } else {
            // Check maximum task limit
            List<Task> tasks = taskRepository.findTasksByDate(LocalDateTime.of(taskDTO.getDate().toLocalDate(), LocalTime.MIDNIGHT));
            if (taskService.getMaxNeighboursCount(tasks, taskDTO.getDate(), taskDTO.getDuration()) > 2) {
                return ResponseEntity.badRequest().build();
            }
            Task task = new Task(taskDTO, LocalDateTime.now());
            if (!(taskService.isDurationCorrect(task) && taskService.isDurationCorrect(task))) {
                return ResponseEntity.badRequest().build();
            }
            taskRepository.save(task);
            return ResponseEntity.ok().body(task);
        }
    }

    @PutMapping(value="/task/{taskId}")
    public ResponseEntity<Task> editTask(@PathVariable String taskId, @RequestBody TaskDTO taskDTO) {
        try {
            Task t = taskRepository.findById(Long.parseLong(taskId)).orElse(null);
            if (t == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            t.updateTask(taskDTO);
            Task saved = taskRepository.save(t);
            return ResponseEntity.ok().body(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping(value="/task/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable String id) {
        try {
            Task t = taskRepository.findById(Long.parseLong(id)).orElse(null);
            if (t == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            taskRepository.deleteById(Long.parseLong(id));
            return ResponseEntity.ok().build();
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping(value="/week/{date}")
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
