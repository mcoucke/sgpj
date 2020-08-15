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

    @Query(value = "SELECT * FROM task WHERE WEEK(date, 1) = WEEK(:date, 1)", nativeQuery = true)
    List<Task> findTasksByWeek(@Param("date") LocalDateTime date);
}
