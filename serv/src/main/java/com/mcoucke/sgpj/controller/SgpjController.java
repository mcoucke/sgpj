package com.mcoucke.sgpj.controller;

import com.mcoucke.sgpj.model.Day;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SgpjController {

    @GetMapping("/day/{date}")
    public ResponseEntity<List<Day>> getDaySchedule(@PathVariable String date) {
        return ResponseEntity.ok().body(null);
    }
}
