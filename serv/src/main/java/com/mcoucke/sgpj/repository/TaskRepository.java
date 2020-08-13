package com.mcoucke.sgpj.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;


import com.mcoucke.sgpj.model.Task;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface TaskRepository extends CrudRepository<Task, Long> {

    @Query(value = "SELECT * FROM task WHERE DATE(date) = :date", nativeQuery = true)
    List<Task> findTasksByDate(@Param("date") LocalDateTime date);
}
